// API SERVICE LAYER — WorkWay V2
// Handles all communication with the Node.js/Express backend.
// Falls back gracefully to mock data when the backend is unavailable.

const BASE = '/api/v1';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('workway_token') || ''}`
});

// ─── Authentication ────────────────────────────────────────────────────────────

/**
 * Authenticate a user and receive a JWT token.
 * @param {string} email
 * @param {string} password
 * @returns {{ success: boolean, token?: string, user?: object, error?: string }}
 */
export async function apiLogin(email, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

// ─── Geospatial / Providers ────────────────────────────────────────────────────

/**
 * Fetch nearby active providers from the PostGIS backend.
 * @param {{ lat: number, lng: number, radius_km: number, category?: string }} params
 * @returns {Promise<Array>} array of provider rows
 */
export async function fetchNearbyProviders({ lat, lng, radius_km = 5, category = null } = {}) {
  const params = new URLSearchParams({ lat, lng, radius_km });
  if (category) params.append('category', category);

  const res = await fetch(`${BASE}/providers/nearby?${params.toString()}`, {
    headers: authHeaders()
  });
  const data = await res.json();
  return data.data || [];
}

// ─── Provider Status ───────────────────────────────────────────────────────────

/**
 * Toggle a provider's on-duty status and update GPS location.
 * @param {{ is_online: boolean, lat: number, lng: number }} payload
 */
export async function updateProviderStatus({ is_online, lat, lng }) {
  const res = await fetch(`${BASE}/providers/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ is_online, lat, lng })
  });
  return res.json();
}

// ─── Bookings ──────────────────────────────────────────────────────────────────

/**
 * Create a new booking and trigger a WebSocket dispatch to the provider.
 * @param {{ provider_id, category, estimated_cost, user_lat, user_lng }} payload
 */
export async function createBackendBooking(payload) {
  const res = await fetch(`${BASE}/bookings`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload)
  });
  return res.json();
}

/**
 * Transition a booking status (accepted → in_progress → completed, etc.)
 * @param {string} bookingId
 * @param {string} status
 */
export async function updateBookingStatusApi(bookingId, status, note = '') {
  const res = await fetch(`${BASE}/bookings/${bookingId}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status, note })
  });
  return res.json();
}

// ─── Verification ──────────────────────────────────────────────────────────────

/**
 * Upload a verification document for a provider.
 * @param {FormData} formData
 */
export async function uploadVerificationDocument(formData) {
  const res = await fetch(`${BASE}/verification/documents`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('workway_token') || ''}`
      // NOTE: Do NOT set Content-Type with FormData; browser handles boundary
    },
    body: formData
  });
  return res.json();
}

/**
 * Admin: Update a provider's verification badge level.
 * @param {string} providerId
 * @param {number} level  1 | 2 | 3
 */
export async function adminUpdateVerificationLevel(providerId, level) {
  const res = await fetch(`${BASE}/admin/verification/${providerId}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ verification_level: level })
  });
  return res.json();
}
