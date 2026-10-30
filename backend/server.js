import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import pg from 'pg';
const { Pool } = pg;
import jwt from 'jsonwebtoken';
import cors from 'cors';
import fs from 'fs';
import crypto from 'crypto';

// Load .env in Node 20+ if present
if (fs.existsSync('.env')) {
  try {
    process.loadEnvFile('.env');
  } catch (err) {
    // ignore
  }
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

// 1. Database Connection (PostgreSQL + PostGIS)
const db = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/workway'
});

// Guard against unhandled pool connection crashes in offline mode
db.on('error', (err) => {
  console.warn('PostgreSQL Pool background notice:', err.message);
});


// Mock Data for Demo Auth
const DEMO_USERS = {
  'consumer@workway.app': { id: 'c-1', role: 'consumer', full_name: 'Rahul Sharma' },
  'provider@workway.app': { id: 'p-101', role: 'provider', full_name: 'Rohan Mehta' },
  'admin@workway.app': { id: 'a-1', role: 'admin', full_name: 'Admin User' }
};

// 1.5 API: Login (Added to generate JWT for frontend)
app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Fallback to consumer if not found in demo list
  const user = DEMO_USERS[email] || { id: 'u-' + Date.now(), role: 'consumer', full_name: email.split('@')[0] };
  const token = jwt.sign(user, process.env.JWT_SECRET || 'workway_secret_key', { expiresIn: '1d' });
  res.json({ success: true, token, user });
});

// 2. Middleware: JWT Authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'workway_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// 3. API: Hyperlocal Radius Search (PostGIS ST_DWithin)
app.get('/api/v1/providers/nearby', async (req, res) => {
  const { lat, lng, radius_km = 5, category } = req.query;

  try {
    const query = `
      SELECT 
        p.id, 
        u.full_name AS name, 
        u.avatar_url AS avatar, 
        p.category AS trade, 
        p.hourly_rate AS "hourlyRate", 
        p.verification_level AS "verificationLevel",
        p.current_latitude AS latitude,
        p.current_longitude AS longitude,
        p.approx_address AS "approxAddress",
        ST_Distance(
          p.location, 
          ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
        ) / 1000 AS distance_km
      FROM provider_profiles p
      JOIN users u ON p.user_id = u.id
      WHERE p.is_online = true
        AND ($3::text IS NULL OR p.category = $3)
        AND ST_DWithin(
          p.location, 
          ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, 
          $4 * 1000
        )
      ORDER BY distance_km ASC;
    `;
    
    const { rows } = await db.query(query, [lng, lat, category || null, radius_km]);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    // If PostgreSQL / PostGIS is not active locally, return simulated hyperlocal providers with valid coordinates
    const mockProviders = [
      {
        id: 'p-101',
        name: 'Rohan Mehta',
        trade: 'electrician',
        tradeLabel: 'Master Electrician',
        avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=300',
        hourlyRate: 550,
        rating: 4.9,
        reviewCount: 142,
        jobsCompleted: 312,
        dutyStatus: 'available',
        verificationLevel: 'level_3_master_pro',
        insuranceVerified: true,
        latitude: 12.9752,
        longitude: 77.5995,
        approxAddress: 'Indiranagar 100ft Road, Bangalore',
        badges: ['Master Pro', 'Background Cleared', 'Fast Responder'],
        responseTimeMinutes: 10
      },
      {
        id: 'p-102',
        name: 'Vikram Singh',
        trade: 'plumber',
        tradeLabel: 'Senior Hydro Specialist',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
        hourlyRate: 600,
        rating: 4.95,
        reviewCount: 198,
        jobsCompleted: 420,
        dutyStatus: 'available',
        verificationLevel: 'level_3_master_pro',
        insuranceVerified: true,
        latitude: 12.9698,
        longitude: 77.5890,
        approxAddress: 'Koramangala 4th Block, Bangalore',
        badges: ['Master Pro', 'Background Cleared', 'Fast Responder'],
        responseTimeMinutes: 12
      },
      {
        id: 'p-103',
        name: 'Priya Sharma',
        trade: 'housemaid',
        tradeLabel: 'Sanitization & Deep Clean Pro',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
        hourlyRate: 350,
        rating: 4.88,
        reviewCount: 110,
        jobsCompleted: 240,
        dutyStatus: 'available',
        verificationLevel: 'level_2_background',
        insuranceVerified: true,
        latitude: 12.9780,
        longitude: 77.6050,
        approxAddress: 'Ulsoor Lake Road, Bangalore',
        badges: ['Background Cleared', 'Fast Responder'],
        responseTimeMinutes: 15
      },
      {
        id: 'p-104',
        name: 'Ananya Verma',
        trade: 'carpenter',
        tradeLabel: 'Architectural Woodcraft Artisan',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
        hourlyRate: 500,
        rating: 4.82,
        reviewCount: 86,
        jobsCompleted: 175,
        dutyStatus: 'busy',
        verificationLevel: 'level_2_background',
        insuranceVerified: false,
        latitude: 12.9640,
        longitude: 77.6100,
        approxAddress: 'Richmond Town, Bangalore',
        badges: ['Background Cleared'],
        responseTimeMinutes: 20
      }
    ].filter(p => !category || p.trade === category);
    res.json({ success: true, count: mockProviders.length, data: mockProviders, isFallback: true });
  }
});

// 4. API: Request Booking & Dispatch Notification
app.post('/api/v1/bookings', authenticateToken, async (req, res) => {
  const { provider_id, category, estimated_cost, user_lat, user_lng } = req.body;
  const consumer_id = req.user.id;

  try {
    const insertQuery = `
      INSERT INTO bookings (consumer_id, provider_id, category, estimated_cost, status)
      VALUES ($1, $2, $3, $4, 'pending')
      RETURNING *;
    `;
    const { rows } = await db.query(insertQuery, [consumer_id, provider_id, category, estimated_cost]);
    const booking = rows[0];

    // Emit real-time WebSocket notification to assigned worker room
    io.to(`provider_${provider_id}`).emit('new_job_request', {
      booking_id: booking.id,
      category: booking.category,
      estimated_cost: booking.estimated_cost,
      consumer_lat: user_lat,
      consumer_lng: user_lng,
      timestamp: booking.created_at
    });

    res.status(201).json({ success: true, booking });
  } catch (err) {
    const mockBooking = {
      id: 'b-' + Math.random().toString(36).substring(7),
      booking_code: 'WW-' + Math.floor(1000 + Math.random() * 9000),
      consumer_id,
      provider_id,
      category,
      estimated_cost,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    io.to(`provider_${provider_id}`).emit('new_job_request', mockBooking);
    res.status(201).json({ success: true, booking: mockBooking, isFallback: true });
  }
});

// 5. API: Worker On-Duty Toggle & Location Update
app.patch('/api/v1/providers/status', authenticateToken, async (req, res) => {
  const { is_online, lat, lng } = req.body;
  const user_id = req.user.id;

  try {
    const updateQuery = `
      UPDATE provider_profiles 
      SET 
        is_online = $1,
        location = ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography
      WHERE user_id = $4
      RETURNING *;
    `;
    const { rows } = await db.query(updateQuery, [is_online, lng, lat, user_id]);
    res.json({ success: true, profile: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to update status' });
  }
});

// 5b. API: Update Booking Status
app.patch('/api/v1/bookings/:id/status', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;

  try {
    const { rows } = await db.query(
      `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *;`,
      [status, id]
    );
    res.json({ success: true, booking: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to update booking status' });
  }
});

// 5c. API: Upload Verification Document
app.post('/api/v1/verification/documents', authenticateToken, async (req, res) => {
  // Real implementation would handle multipart form + S3/Supabase Storage upload
  // Stub: acknowledge receipt for demo
  res.json({ success: true, message: 'Document received for review. Verification is pending admin approval.' });
});

// 5d. API: Admin Update Verification Level
app.patch('/api/v1/admin/verification/:provider_id', authenticateToken, async (req, res) => {
  const { provider_id } = req.params;
  const { verification_level } = req.body;

  try {
    const { rows } = await db.query(
      `UPDATE provider_profiles SET verification_level = $1 WHERE id = $2 RETURNING *;`,
      [verification_level, provider_id]
    );
    res.json({ success: true, profile: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to update verification level' });
  }
});

// 5e. API: Server-Side AI Problem Diagnosis (Protects Gemini API Key from browser exposure)
app.post('/api/v1/ai/diagnose', async (req, res) => {
  const { description, category } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && !apiKey.includes('your-gemini')) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Analyze this home repair issue. Category selected: ${category || 'General'}. Problem Description: ${description || 'Not provided'}.
                    Return a JSON object strictly with:
                    {
                      "possibleIssue": "Short summary of likely issue",
                      "recommendedCategory": "electrician | plumber | carpenter | housemaid | handyman",
                      "urgency": "emergency_asap | today | this_week | flexible",
                      "estimatedLaborRange": "₹400–₹700",
                      "recommendedAction": "Actionable advice for homeowner",
                      "safetyWarning": "Optional safety precaution"
                    }`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const text = data.candidates[0].content.parts[0].text;
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return res.json({
            success: true,
            diagnosis: {
              ...parsed,
              isAiGenerated: true,
              disclaimer: 'Note: AI diagnosis is an automated estimate and not binding professional trade advice.'
            }
          });
        }
      }
    } catch (err) {
      console.warn('Backend Gemini API call failed:', err.message);
    }
  }

  // Smart Server Fallback Diagnosis Engine (if Gemini is unavailable or not configured)
  const descLower = (description || '').toLowerCase();
  let fallback;

  if (descLower.includes('leak') || descLower.includes('pipe') || descLower.includes('water') || descLower.includes('tap') || category === 'plumber') {
    fallback = {
      possibleIssue: descLower.includes('leak') ? 'Pipe Joint Leakage & Pressure Sealing Required' : 'Drain Blockage or Faucet Washer Wear',
      recommendedCategory: 'plumber',
      urgency: descLower.includes('overflow') || descLower.includes('burst') ? 'emergency_asap' : 'today',
      estimatedLaborRange: '₹350 – ₹650',
      recommendedAction: 'Turn off the local stop valve immediately to prevent water damage and book a verified plumber.',
      safetyWarning: 'Ensure electrical appliances near water leakage are disconnected from wall outlets.',
      isAiGenerated: false,
      disclaimer: 'Note: AI diagnosis is an automated estimate and not binding professional trade advice.'
    };
  } else if (descLower.includes('spark') || descLower.includes('mcb') || descLower.includes('short') || descLower.includes('wire') || descLower.includes('light') || category === 'electrician') {
    fallback = {
      possibleIssue: descLower.includes('spark') ? 'Neutral Wire Overload & Short Circuit' : 'MCB Trip Due to High-Power Appliance Surge',
      recommendedCategory: 'electrician',
      urgency: 'emergency_asap',
      estimatedLaborRange: '₹450 – ₹850',
      recommendedAction: 'Trip the main DB circuit breaker box and request a Master Pro electrician for safe inspection.',
      safetyWarning: 'Do not touch exposed copper wires or burning switches with bare hands.',
      isAiGenerated: false,
      disclaimer: 'Note: AI diagnosis is an automated estimate and not binding professional trade advice.'
    };
  } else if (descLower.includes('door') || descLower.includes('lock') || descLower.includes('cabinet') || descLower.includes('hinge') || category === 'carpenter') {
    fallback = {
      possibleIssue: 'Wood Swelling / Misaligned Hydraulic Hinge Mechanism',
      recommendedCategory: 'carpenter',
      urgency: 'today',
      estimatedLaborRange: '₹350 – ₹550',
      recommendedAction: 'Book a skilled carpenter to re-align hinges or replace worn mortise lock cylinders.',
      safetyWarning: 'Avoid forcing jammed doors to prevent frame cracking.',
      isAiGenerated: false,
      disclaimer: 'Note: AI diagnosis is an automated estimate and not binding professional trade advice.'
    };
  } else {
    fallback = {
      possibleIssue: 'General Household Maintenance / Wall Mounting Issue',
      recommendedCategory: category || 'handyman',
      urgency: 'this_week',
      estimatedLaborRange: '₹300 – ₹500',
      recommendedAction: 'Schedule a verified handyman for inspection and on-site repair.',
      safetyWarning: 'Verify electrical and plumbing wall conduits before drilling.',
      isAiGenerated: false,
      disclaimer: 'Note: AI diagnosis is an automated estimate and not binding professional trade advice.'
    };
  }

  res.json({ success: true, diagnosis: fallback });
});

// 5f. API: Create Payment Order (Keeps Razorpay Secret Key secure on backend)
app.post('/api/v1/payments/create-order', authenticateToken, async (req, res) => {
  const { amount, bookingId, currency = 'INR' } = req.body;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;

  if (keyId && keySecret && !keySecret.includes('your_razorpay')) {
    try {
      const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${basicAuth}`
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100),
          currency,
          receipt: `receipt_b_${bookingId}`,
          notes: { bookingId }
        })
      });
      const order = await response.json();
      return res.json({ success: true, order });
    } catch (err) {
      console.warn('Live Razorpay order creation failed, fallback to mock order:', err);
    }
  }

  // Offline / Demo Mode Order Simulation
  res.json({
    success: true,
    order: {
      id: 'order_demo_' + Math.random().toString(36).substring(7),
      amount: Math.round(amount * 100),
      currency: 'INR',
      status: 'created',
      isDemo: true
    }
  });
});

// 5g. API: Verify Payment Signature (Server-side HMAC-SHA256 verification)
app.post('/api/v1/payments/verify', authenticateToken, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret || keySecret.includes('your_razorpay')) {
    // In demo mode without live secrets, treat test payments as valid
    return res.json({ success: true, verified: true, mode: 'demo' });
  }

  const generatedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  const isValid = generatedSignature === razorpay_signature;
  res.json({ success: isValid, verified: isValid });
});

// 6. WebSocket Real-time Gateway
io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Join Provider-specific socket channel for live alerts
  socket.on('join_provider_room', (providerId) => {
    socket.join(`provider_${providerId}`);
    console.log(`Provider joined room: provider_${providerId}`);
  });

  // Relay live GPS updates from active provider to customer
  socket.on('update_location', (data) => {
    const { providerId, lat, lng } = data;
    io.to(`booking_track_${providerId}`).emit('location_changed', { lat, lng });
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`WorkWay Backend Service running on port ${PORT}`);
});
