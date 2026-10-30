// WORKWAY V2 REALISTIC SEED / MOCK DATA FOR DEMO MODE

export const DEMO_CREDENTIALS = {
  consumer: { email: 'consumer@workway.app', role: 'consumer', name: 'Rahul Sharma' },
  provider: { email: 'provider@workway.app', role: 'provider', name: 'Rohan Mehta' },
  admin: { email: 'admin@workway.app', role: 'admin', name: 'WorkWay Operations Admin' }
};

export const INITIAL_CATEGORIES = [
  {
    id: 'electrician',
    name: 'Electrician',
    icon: 'Zap',
    description: 'Wiring, MCB, fan installation, lighting, & emergency electrical repair',
    popularServices: ['Fan Installation', 'Switch Repair', 'Short Circuit Fix', 'MCB Replacement']
  },
  {
    id: 'plumber',
    name: 'Plumber',
    icon: 'Wrench',
    description: 'Pipe leakage, tap repair, drain cleaning, water tank & bathroom fittings',
    popularServices: ['Pipe Leakage Repair', 'Tap Replacement', 'Drain Unclogging', 'Water Tank Cleaning']
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    icon: 'Hammer',
    description: 'Furniture assembly, door lock repair, modular work, shelf installation',
    popularServices: ['Door Lock Fitting', 'Modular Furniture Repair', 'TV Unit Assembly', 'Cabinet Repair']
  },
  {
    id: 'housemaid',
    name: 'Housemaid',
    icon: 'Sparkles',
    description: 'Deep home cleaning, daily maid service, kitchen & washroom sanitation',
    popularServices: ['Deep Home Cleaning', 'Kitchen Sanitation', 'Move-in Cleaning', 'Bathroom Scrubbing']
  },
  {
    id: 'handyman',
    name: 'Handyman',
    icon: 'ShieldCheck',
    description: 'TV mounting, wall drilling, curtain rods, minor home repairs & fixes',
    popularServices: ['TV Wall Mount', 'Curtain Rod Fitting', 'Geyser Installation', 'General Repair']
  }
];

export const INITIAL_SERVICES_CATALOG = {
  electrician: [
    { id: 'e1', name: 'Fan Installation / Repair', priceRange: '₹300 - ₹500', minPrice: 300, type: 'fixed' },
    { id: 'e2', name: 'Switch / Socket Replacement', priceRange: '₹150 - ₹300', minPrice: 150, type: 'fixed' },
    { id: 'e3', name: 'Full House Inspection & Wiring', priceRange: '₹600 / hr', minPrice: 600, type: 'hourly' },
    { id: 'e4', name: 'MCB / Fuse Repair', priceRange: '₹400 - ₹800', minPrice: 400, type: 'range' },
    { id: 'e5', name: 'Emergency Electrical Fix', priceRange: '₹750+', minPrice: 750, type: 'range' }
  ],
  plumber: [
    { id: 'p1', name: 'Tap Leakage Repair', priceRange: '₹250 - ₹450', minPrice: 250, type: 'fixed' },
    { id: 'p2', name: 'Pipe Joint / Drain Cleaning', priceRange: '₹500 - ₹900', minPrice: 500, type: 'range' },
    { id: 'p3', name: 'Bathroom Sanitary Fitting', priceRange: '₹650 / hr', minPrice: 650, type: 'hourly' },
    { id: 'p4', name: 'Water Tank Deep Clean', priceRange: '₹1,200 - ₹2,000', minPrice: 1200, type: 'range' }
  ],
  carpenter: [
    { id: 'c1', name: 'Door Fitting & Lock Repair', priceRange: '₹350 - ₹600', minPrice: 350, type: 'fixed' },
    { id: 'c2', name: 'Furniture Assembly / Modular', priceRange: '₹500 / hr', minPrice: 500, type: 'hourly' },
    { id: 'c3', name: 'Shelf / Mirror Installation', priceRange: '₹250 - ₹400', minPrice: 250, type: 'fixed' }
  ],
  housemaid: [
    { id: 'h1', name: 'Full Home Deep Cleaning', priceRange: '₹1,800 - ₹3,500', minPrice: 1800, type: 'range' },
    { id: 'h2', name: 'Kitchen & Washroom Scrub', priceRange: '₹800 - ₹1,400', minPrice: 800, type: 'range' },
    { id: 'h3', name: 'Daily Maid Service (Monthly)', priceRange: '₹4,000 / mo', minPrice: 4000, type: 'fixed' }
  ],
  handyman: [
    { id: 'hm1', name: 'TV Mount & Drilling Work', priceRange: '₹350 - ₹550', minPrice: 350, type: 'fixed' },
    { id: 'hm2', name: 'Curtain Rod & Frame Mounting', priceRange: '₹250 - ₹400', minPrice: 250, type: 'fixed' },
    { id: 'hm3', name: 'General Repairs & Maintenance', priceRange: '₹450 / hr', minPrice: 450, type: 'hourly' }
  ]
};

// Base coordinates: MG Road, Bangalore (12.9716, 77.5946)
export const INITIAL_PROVIDERS = [
  {
    id: 'p-101',
    name: 'Rohan Mehta',
    trade: 'electrician',
    tradeLabel: 'Master Electrician',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=300',
    bio: 'Licensed Senior Electrical Technician with 8+ years of residential and commercial wiring experience in Bangalore.',
    hourlyRate: 550,
    rating: 4.9,
    reviewCount: 142,
    jobsCompleted: 312,
    experienceYears: 8,
    completionRatePercent: 98,
    repeatCustomersCount: 42,
    responseTimeMinutes: 10,
    acceptanceRatePercent: 99,
    dutyStatus: 'available', // available, busy, on_the_way, offline
    emergencyAvailable: true,
    availableToday: true,
    verificationLevel: 'level_3_master_pro',
    insuranceVerified: true,
    latitude: 12.9752,
    longitude: 77.5995,
    approxAddress: 'Indiranagar 100ft Road, Bangalore',
    societyName: 'Green Valley Apartments',
    societyJobsCompleted: 38,
    badges: ['Master Pro', 'Background Cleared', 'Fast Responder', '100+ Jobs', 'Always On Time', 'Emergency 24x7'],
    portfolio: [
      {
        id: 'pf-1',
        title: 'Complete Villa Rewiring & MCB Upgrade',
        description: 'Upgraded 3BHK outdated wiring to concealed heavy-duty fire-safe copper wiring with 63A MCB panel.',
        beforeImg: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400',
        afterImg: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'pf-2',
        title: 'Smart LED Architectural Lighting',
        description: 'Installed modern ambient ceiling profile lights with smart dimmer switches.',
        beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400',
        afterImg: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&q=80&w=400'
      }
    ],
    reviewsList: [
      { id: 'r-1', user: 'Ananya K.', rating: 5, date: '2 days ago', comment: 'Rohan diagnosed the short circuit in 10 minutes. Extremely polite and brought his own clean equipment!' },
      { id: 'r-2', user: 'Siddharth M.', rating: 5, date: '1 week ago', comment: 'Punctual, professional, and transparent about material costs. Recommended for any electrical work.' }
    ]
  },
  {
    id: 'p-102',
    name: 'Vikram Singh',
    trade: 'plumber',
    tradeLabel: 'Senior Hydro Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    bio: 'Specialist in concealed pipe leakages, high-pressure pump installations, and sanitary fitting replacement.',
    hourlyRate: 600,
    rating: 4.95,
    reviewCount: 198,
    jobsCompleted: 420,
    experienceYears: 10,
    completionRatePercent: 99,
    repeatCustomersCount: 56,
    responseTimeMinutes: 12,
    acceptanceRatePercent: 98,
    dutyStatus: 'available',
    emergencyAvailable: true,
    availableToday: true,
    verificationLevel: 'level_3_master_pro',
    insuranceVerified: true,
    latitude: 12.9698,
    longitude: 77.5890,
    approxAddress: 'Koramangala 5th Block, Bangalore',
    societyName: 'Prestige Ozone Apartments',
    societyJobsCompleted: 24,
    badges: ['Master Pro', 'Background Cleared', 'Five-Star Provider', '100+ Jobs', 'Emergency 24x7'],
    portfolio: [
      {
        id: 'pf-3',
        title: 'Kitchen Concealed Leakage Repair',
        description: 'Replaced corroded galvanised iron pipes with CPVC joints under kitchen sink without damaging tiles.',
        beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400',
        afterImg: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=400'
      }
    ],
    reviewsList: [
      { id: 'r-3', user: 'Rahul Sharma', rating: 5, date: 'Yesterday', comment: 'Saved our water tank from overflowing at midnight during an emergency. True life saver!' }
    ]
  },
  {
    id: 'p-103',
    name: 'Priya Sharma',
    trade: 'housemaid',
    tradeLabel: 'Deep Cleaning Specialist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    bio: 'Professional deep house cleaning and sanitation specialist using non-toxic eco-friendly disinfectants.',
    hourlyRate: 350,
    rating: 4.8,
    reviewCount: 92,
    jobsCompleted: 184,
    experienceYears: 6,
    completionRatePercent: 96,
    repeatCustomersCount: 28,
    responseTimeMinutes: 15,
    acceptanceRatePercent: 96,
    dutyStatus: 'available',
    emergencyAvailable: false,
    availableToday: true,
    verificationLevel: 'level_2_background',
    insuranceVerified: false,
    latitude: 12.9730,
    longitude: 77.6010,
    approxAddress: 'Ulsoor Lake Area, Bangalore',
    societyName: 'Green Valley Apartments',
    societyJobsCompleted: 19,
    badges: ['Background Cleared', 'Basic Verified', 'Always On Time'],
    portfolio: [],
    reviewsList: [
      { id: 'r-4', user: 'Meera Deshmukh', rating: 5, date: '3 days ago', comment: 'Our kitchen sparkling clean like brand new after move-in deep clean.' }
    ]
  },
  {
    id: 'p-104',
    name: 'Suresh Kumar',
    trade: 'carpenter',
    tradeLabel: 'Master Wood Craftsman',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    bio: 'Precision woodworking, modular cabinet fitting, hydraulic hinge alignment, and custom furniture assembly.',
    hourlyRate: 500,
    rating: 4.7,
    reviewCount: 64,
    jobsCompleted: 95,
    experienceYears: 7,
    completionRatePercent: 94,
    repeatCustomersCount: 18,
    responseTimeMinutes: 20,
    acceptanceRatePercent: 94,
    dutyStatus: 'busy',
    emergencyAvailable: false,
    availableToday: true,
    verificationLevel: 'level_2_background',
    insuranceVerified: false,
    latitude: 12.9810,
    longitude: 77.5920,
    approxAddress: 'Vasanth Nagar, Bangalore',
    societyName: 'Sobha Royal Pavilion',
    societyJobsCompleted: 12,
    badges: ['Background Cleared', 'Basic Verified'],
    portfolio: [],
    reviewsList: []
  },
  {
    id: 'p-105',
    name: 'Rajesh Verma',
    trade: 'handyman',
    tradeLabel: 'Home Repair Expert',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    bio: 'All-in-one fix for TV wall brackets, heavy curtain rods, bathroom accessories, and general household fixes.',
    hourlyRate: 400,
    rating: 4.65,
    reviewCount: 38,
    jobsCompleted: 48,
    experienceYears: 5,
    completionRatePercent: 97,
    repeatCustomersCount: 14,
    responseTimeMinutes: 8,
    acceptanceRatePercent: 100,
    dutyStatus: 'available',
    emergencyAvailable: true,
    availableToday: true,
    verificationLevel: 'level_1_basic',
    insuranceVerified: false,
    latitude: 12.9650,
    longitude: 77.6080,
    approxAddress: 'Domlur Layout, Bangalore',
    societyName: 'Green Valley Apartments',
    societyJobsCompleted: 8,
    badges: ['Basic Verified', 'Fast Responder', 'Emergency 24x7'],
    portfolio: [],
    reviewsList: []
  },
  {
    id: 'p-106',
    name: 'Ananya Nair',
    trade: 'housemaid',
    tradeLabel: 'Sanitation & Hygiene Pro',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    bio: '5-star rated hygiene specialist. Certified in industrial sanitation and residential deep cleaning standards.',
    hourlyRate: 400,
    rating: 5.0,
    reviewCount: 110,
    jobsCompleted: 210,
    experienceYears: 9,
    completionRatePercent: 100,
    repeatCustomersCount: 48,
    responseTimeMinutes: 5,
    acceptanceRatePercent: 100,
    dutyStatus: 'available',
    emergencyAvailable: false,
    availableToday: true,
    verificationLevel: 'level_3_master_pro',
    insuranceVerified: true,
    latitude: 12.9780,
    longitude: 77.5850,
    approxAddress: 'Malleshwaram, Bangalore',
    societyName: 'Brigade Gateway',
    societyJobsCompleted: 45,
    badges: ['Master Pro', 'Five-Star Provider', 'Background Cleared', '100+ Jobs'],
    portfolio: [],
    reviewsList: []
  },
  {
    id: 'p-107',
    name: 'Kavita Desai',
    trade: 'housemaid',
    tradeLabel: 'Standard & Express Cleaner',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    bio: 'Reliable, affordable daily and weekly cleaning assistant. Fast turnaround for kitchen, floors, and dusting.',
    hourlyRate: 280,
    rating: 4.4,
    reviewCount: 42,
    jobsCompleted: 68,
    experienceYears: 4,
    completionRatePercent: 95,
    repeatCustomersCount: 12,
    responseTimeMinutes: 14,
    acceptanceRatePercent: 95,
    dutyStatus: 'available',
    emergencyAvailable: false,
    availableToday: true,
    verificationLevel: 'level_2_background',
    insuranceVerified: false,
    latitude: 12.9725,
    longitude: 77.5960,
    approxAddress: 'MG Road Metro Area, Bangalore',
    societyName: 'Green Valley Apartments',
    societyJobsCompleted: 14,
    badges: ['Background Cleared', 'Budget Friendly'],
    portfolio: [],
    reviewsList: []
  },
  {
    id: 'p-108',
    name: 'Arun Balaji',
    trade: 'electrician',
    tradeLabel: 'EV & Heavy Power Master Pro',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
    bio: 'Commercial and residential grade high-load wiring, EV home charger setup, and industrial power backup systems.',
    hourlyRate: 700,
    rating: 4.95,
    reviewCount: 164,
    jobsCompleted: 350,
    experienceYears: 11,
    completionRatePercent: 99,
    repeatCustomersCount: 52,
    responseTimeMinutes: 9,
    acceptanceRatePercent: 99,
    dutyStatus: 'available',
    emergencyAvailable: true,
    availableToday: true,
    verificationLevel: 'level_3_master_pro',
    insuranceVerified: true,
    latitude: 12.9640,
    longitude: 77.6150,
    approxAddress: 'Koramangala 1st Block, Bangalore',
    societyName: 'Prestige Ozone Apartments',
    societyJobsCompleted: 31,
    badges: ['Master Pro', 'Background Cleared', 'Emergency 24x7', 'Fast Responder'],
    portfolio: [],
    reviewsList: []
  },
  {
    id: 'p-109',
    name: 'Mohammed Farooq',
    trade: 'plumber',
    tradeLabel: 'Precision Pipeline Expert',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300',
    bio: 'Hydro-jet cleaning, bathroom remodelling, pressure regulator valve tuning, and immediate pipeline rupture fix.',
    hourlyRate: 450,
    rating: 4.85,
    reviewCount: 88,
    jobsCompleted: 140,
    experienceYears: 8,
    completionRatePercent: 98,
    repeatCustomersCount: 24,
    responseTimeMinutes: 11,
    acceptanceRatePercent: 97,
    dutyStatus: 'available',
    emergencyAvailable: true,
    availableToday: true,
    verificationLevel: 'level_2_background',
    insuranceVerified: false,
    latitude: 12.9550,
    longitude: 77.5800,
    approxAddress: 'Jayanagar 4th Block, Bangalore',
    societyName: 'Sobha Royal Pavilion',
    societyJobsCompleted: 16,
    badges: ['Background Cleared', 'Emergency 24x7', 'Fast Responder'],
    portfolio: [],
    reviewsList: []
  },
  {
    id: 'p-110',
    name: 'Deepak Rathod',
    trade: 'carpenter',
    tradeLabel: 'Master Architectural Joiner',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300',
    bio: 'Custom modular kitchens, wardrobe hinges, solid teak wood restorations, and lock security upgrades.',
    hourlyRate: 650,
    rating: 4.9,
    reviewCount: 120,
    jobsCompleted: 240,
    experienceYears: 12,
    completionRatePercent: 97,
    repeatCustomersCount: 36,
    responseTimeMinutes: 22,
    acceptanceRatePercent: 96,
    dutyStatus: 'available',
    emergencyAvailable: false,
    availableToday: false,
    verificationLevel: 'level_3_master_pro',
    insuranceVerified: true,
    latitude: 12.9950,
    longitude: 77.5700,
    approxAddress: 'Sadashivanagar, Bangalore',
    societyName: 'Brigade Gateway',
    societyJobsCompleted: 22,
    badges: ['Master Pro', 'Background Cleared', '100+ Jobs'],
    portfolio: [],
    reviewsList: []
  },
  {
    id: 'p-111',
    name: 'Sunil Patil',
    trade: 'handyman',
    tradeLabel: 'Quick Fix Assistant',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=300',
    bio: 'Budget-friendly quick mounting, door handle tightening, wall hanging, and general household adjustments.',
    hourlyRate: 250,
    rating: 4.3,
    reviewCount: 29,
    jobsCompleted: 35,
    experienceYears: 3,
    completionRatePercent: 92,
    repeatCustomersCount: 9,
    responseTimeMinutes: 18,
    acceptanceRatePercent: 92,
    dutyStatus: 'available',
    emergencyAvailable: false,
    availableToday: true,
    verificationLevel: 'level_1_basic',
    insuranceVerified: false,
    latitude: 12.9600,
    longitude: 77.6200,
    approxAddress: 'Ejipura, Bangalore',
    societyName: 'Green Valley Apartments',
    societyJobsCompleted: 5,
    badges: ['Basic Verified', 'Budget Friendly'],
    portfolio: [],
    reviewsList: []
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'WW-8291',
    bookingCode: 'WW-8291',
    consumerId: 'c-1',
    consumerName: 'Rahul Sharma',
    consumerPhone: '+91 98765 43210',
    providerId: 'p-101',
    providerName: 'Rohan Mehta',
    providerTrade: 'electrician',
    serviceTitle: 'Kitchen Short Circuit & MCB Trip',
    problemDescription: 'Frequent tripping of MCB whenever microwave and geyser run simultaneously.',
    urgency: 'emergency_asap',
    bookingStatus: 'in_progress', // pending, accepted, on_the_way, in_progress, completed, cancelled, disputed
    addressLine: 'Flat 402, Green Valley Apartments, Indiranagar, Bangalore',
    latitude: 12.9716,
    longitude: 77.5946,
    scheduledDate: '2026-08-11',
    scheduledTime: '04:30 PM',
    estimatedLabour: 550,
    materialsCost: 260,
    platformFee: 49,
    totalAmount: 859,
    paymentStatus: 'pending',
    materialsRequested: [
      { id: 'm-1', name: 'Havells 32A Double Pole MCB', cost: 180, approved: true },
      { id: 'm-2', name: 'Heat Resistant PVC Electrical Tape & Wire', cost: 80, approved: true }
    ],
    timestamps: {
      created: '2026-08-11T14:00:00Z',
      accepted: '2026-08-11T14:05:00Z',
      onTheWay: '2026-08-11T14:15:00Z',
      started: '2026-08-11T14:30:00Z'
    }
  },
  {
    id: 'WW-7402',
    bookingCode: 'WW-7402',
    consumerId: 'c-1',
    consumerName: 'Rahul Sharma',
    consumerPhone: '+91 98765 43210',
    providerId: 'p-102',
    providerName: 'Vikram Singh',
    providerTrade: 'plumber',
    serviceTitle: 'Bathroom Tap Gasket & Leak Repair',
    problemDescription: 'Water continuously dripping from master bath faucet.',
    urgency: 'today',
    bookingStatus: 'completed',
    addressLine: 'Flat 402, Green Valley Apartments, Indiranagar, Bangalore',
    latitude: 12.9716,
    longitude: 77.5946,
    scheduledDate: '2026-08-05',
    scheduledTime: '11:00 AM',
    estimatedLabour: 400,
    materialsCost: 150,
    platformFee: 49,
    totalAmount: 599,
    paymentStatus: 'captured',
    timestamps: {
      created: '2026-08-05T10:00:00Z',
      completed: '2026-08-05T12:00:00Z'
    }
  }
];

export const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    bookingId: 'WW-8291',
    senderId: 'p-101',
    senderName: 'Rohan Mehta',
    text: 'Hello Rahul sir! I have accepted your booking and I am on the way. Reaching in 10 minutes.',
    isSystem: false,
    timestamp: '14:15'
  },
  {
    id: 'msg-2',
    bookingId: 'WW-8291',
    senderId: 'system',
    senderName: 'WorkWay System',
    text: '⚡ Provider status update: Rohan Mehta is ON THE WAY (ETA: 8 mins)',
    isSystem: true,
    timestamp: '14:16'
  },
  {
    id: 'msg-3',
    bookingId: 'WW-8291',
    senderId: 'c-1',
    senderName: 'Rahul Sharma',
    text: 'Thanks Rohan! Please call gate security when you reach Green Valley main gate.',
    isSystem: false,
    timestamp: '14:18'
  }
];

export const INITIAL_VERIFICATION_QUEUE = [
  {
    id: 'v-901',
    providerId: 'p-105',
    providerName: 'Rajesh Verma',
    trade: 'handyman',
    targetLevel: 'level_2_background',
    documentType: 'Aadhaar Government ID & Police Clearance',
    documentUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=400',
    submittedDate: '2026-08-10',
    status: 'pending'
  },
  {
    id: 'v-902',
    providerId: 'p-104',
    providerName: 'Suresh Kumar',
    trade: 'carpenter',
    targetLevel: 'level_3_master_pro',
    documentType: 'ITI Carpenter Trade Certification & Insurance Proof',
    documentUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=400',
    submittedDate: '2026-08-09',
    status: 'pending'
  }
];

export const INITIAL_DISPUTES = [
  {
    id: 'disp-801',
    disputeCode: 'WW-DISP-801',
    bookingCode: 'WW-7100',
    consumerName: 'Ananya K.',
    providerName: 'Sunita Yadav',
    issueType: 'overcharging',
    description: 'Provider demanded ₹600 extra in cash outside the WorkWay estimate for standard cleaning.',
    estimatedAmount: 800,
    chargedAmount: 1400,
    status: 'open',
    submittedAt: '2026-08-08'
  }
];
