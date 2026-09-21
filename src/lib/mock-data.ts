// =============================================================================
// EventCraft - Mock Data
// =============================================================================

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  founded: string;
  employees: number;
  plan: "starter" | "professional" | "enterprise";
}

export interface Event {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "draft" | "published" | "on-sale" | "sold-out" | "cancelled" | "completed";
  category: string;
  startDate: string;
  endDate: string;
  timezone: string;
  venueId: string;
  capacity: number;
  attendees: number;
  budget: number;
  revenue: number;
  expenses: number;
  ticketsSold: number;
  checkIns: number;
  rating: number;
  image: string;
  tags: string[];
  featured: boolean;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  capacity: number;
  costPerDay: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  amenities: string[];
  rating: number;
  image: string;
  available: boolean;
}

export interface Session {
  id: string;
  eventId: string;
  title: string;
  description: string;
  track: string;
  speakerId: string;
  startTime: string;
  endTime: string;
  room: string;
  capacity: number;
  attendees: number;
  level: "beginner" | "intermediate" | "advanced";
  tags: string[];
  status: "scheduled" | "live" | "completed" | "cancelled";
}

export interface Speaker {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  title: string;
  company: string;
  website: string;
  linkedin: string;
  twitter: string;
  sessions: string[];
  rating: number;
  fee: number;
  expertise: string[];
  featured: boolean;
}

export interface Attendee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  ticketType: string;
  ticketPrice: number;
  checkInStatus: "checked-in" | "no-show" | "cancelled" | "pending";
  checkedInAt: string | null;
  dietary: string;
  sessionsRegistered: string[];
  registeredAt: string;
  avatar: string;
  notes: string;
  amountPaid: number;
}

export interface TicketType {
  id: string;
  eventId: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  sold: number;
  revenue: number;
  saleStart: string;
  saleEnd: string;
  status: "active" | "inactive" | "sold-out";
  perks: string[];
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: "platinum" | "gold" | "silver" | "bronze" | "community";
  amount: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  benefits: string[];
  status: "confirmed" | "pending" | "cancelled";
  since: string;
}

export interface Vendor {
  id: string;
  name: string;
  service: string;
  category: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  cost: number;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  startDate: string;
  endDate: string;
  notes: string;
  rating: number;
  contractUrl: string;
}

export interface CateringMenu {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  type: string;
  pricePerPerson: number;
  minGuests: number;
  maxGuests: number;
  items: string[];
  dietary: string[];
  eventId: string;
  scheduledDate: string;
  servings: number;
  status: "planned" | "confirmed" | "delivered";
}

export interface Accommodation {
  id: string;
  hotelName: string;
  address: string;
  city: string;
  starRating: number;
  roomBlocks: RoomBlock[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  checkInDate: string;
  checkOutDate: string;
  negotiatedRate: number;
  totalCost: number;
  status: "reserved" | "confirmed" | "cancelled";
}

export interface RoomBlock {
  roomType: string;
  count: number;
  ratePerNight: number;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  channel: "email" | "sms" | "social" | "paid" | "direct";
  status: "draft" | "scheduled" | "sending" | "sent" | "paused" | "completed";
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  conversions: number;
  revenue: number;
  cost: number;
  startDate: string;
  endDate: string;
  targetAudience: string;
  content: string;
}

export interface Promotion {
  id: string;
  code: string;
  name: string;
  description: string;
  discountType: "percentage" | "fixed" | "bogo";
  discountValue: number;
  minPurchase: number;
  maxUses: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  status: "active" | "inactive" | "expired";
  applicableTickets: string[];
}

export interface Merchandise {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  revenue: number;
  image: string;
  sizes: string[];
  colors: string[];
  sku: string;
  eventId: string;
}

export interface FloorPlan {
  id: string;
  name: string;
  venueId: string;
  level: string;
  image: string;
  zones: FloorZone[];
  width: number;
  height: number;
}

export interface FloorZone {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  capacity: number;
  currentOccupancy: number;
}

export interface CheckIn {
  id: string;
  attendeeId: string;
  eventId: string;
  timestamp: string;
  method: "qr" | "manual" | "nfc" | "self";
  stationId: string;
  status: "success" | "failed" | "duplicate";
  checkedInBy: string;
  notes: string;
}

export interface Feedback {
  id: string;
  eventId: string;
  attendeeId: string;
  overallRating: number;
  contentRating: number;
  venueRating: number;
  speakerRating: number;
  cateringRating: number;
  organizationRating: number;
  wouldRecommend: boolean;
  comments: string;
  improvementSuggestions: string;
  submittedAt: string;
}

export interface BudgetItem {
  id: string;
  eventId: string;
  category: string;
  description: string;
  budgetedAmount: number;
  actualAmount: number;
  variance: number;
  status: "planned" | "approved" | "spent" | "over-budget";
  vendor: string;
  dueDate: string;
  paidDate: string | null;
  notes: string;
}

export interface RevenueRecord {
  month: string;
  tickets: number;
  sponsors: number;
  merchandise: number;
  concessions: number;
  other: number;
  total: number;
  expenses: number;
  profit: number;
}

export interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  user: string;
  avatar: string;
  eventId: string;
  metadata: Record<string, string>;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  timestamp: string;
  action?: { label: string; href: string };
}

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  avatar: string;
  shiftStart: string;
  shiftEnd: string;
  assignedArea: string;
  status: "on-duty" | "off-duty" | "break" | "unavailable";
  permissions: string[];
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  prefix: string;
  permissions: string[];
  createdAt: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
  status: "active" | "revoked" | "expired";
  requestsToday: number;
  rateLimit: number;
}

// -----------------------------------------------------------------------------
// MOCK_COMPANY
// -----------------------------------------------------------------------------

export const MOCK_COMPANY: Company = {
  id: "comp_01HQJK2M3N4P5R6S7T8V9W0X",
  name: "EventCraft Studios",
  logo: "/images/company-logo.png",
  description: "Premier event management company specializing in tech conferences, product launches, and corporate experiences across North America.",
  website: "https://eventcraft.io",
  email: "hello@eventcraft.io",
  phone: "+1 (415) 555-0123",
  address: "742 Innovation Drive, Suite 400, San Francisco, CA 94105",
  founded: "2019-03-15",
  employees: 47,
  plan: "enterprise",
};

// -----------------------------------------------------------------------------
// MOCK_EVENTS (10)
// -----------------------------------------------------------------------------

export const MOCK_EVENTS: Event[] = [
  {
    id: "evt_001",
    name: "TechVision Summit 2026",
    slug: "techvision-summit-2026",
    description: "The premier AI and cloud computing conference bringing together 3,000+ developers, engineers, and tech leaders for three days of workshops, keynotes, and networking.",
    status: "on-sale",
    category: "Conference",
    startDate: "2026-03-15T09:00:00Z",
    endDate: "2026-03-17T18:00:00Z",
    timezone: "America/Los_Angeles",
    venueId: "ven_001",
    capacity: 3000,
    attendees: 2347,
    budget: 850000,
    revenue: 1245000,
    expenses: 620000,
    ticketsSold: 2100,
    checkIns: 0,
    rating: 4.8,
    image: "/images/events/techvision.jpg",
    tags: ["AI", "Cloud", "Machine Learning", "DevOps"],
    featured: true,
  },
  {
    id: "evt_002",
    name: "DesignCraft Workshop Series",
    slug: "designcraft-workshop-series",
    description: "A hands-on workshop series focused on UI/UX design principles, design systems, and prototyping with industry experts.",
    status: "published",
    category: "Workshop",
    startDate: "2026-04-10T10:00:00Z",
    endDate: "2026-04-10T17:00:00Z",
    timezone: "America/New_York",
    venueId: "ven_002",
    capacity: 150,
    attendees: 128,
    budget: 45000,
    revenue: 62000,
    expenses: 38000,
    ticketsSold: 128,
    checkIns: 0,
    rating: 4.6,
    image: "/images/events/designcraft.jpg",
    tags: ["Design", "UX", "Workshop", "Figma"],
    featured: false,
  },
  {
    id: "evt_003",
    name: "StartupPitch Live",
    slug: "startuppitch-live",
    description: "Where emerging startups pitch their ideas to top-tier VCs and angel investors.  in prizes and funding opportunities.",
    status: "on-sale",
    category: "Competition",
    startDate: "2026-05-22T13:00:00Z",
    endDate: "2026-05-23T21:00:00Z",
    timezone: "America/Chicago",
    venueId: "ven_003",
    capacity: 800,
    attendees: 623,
    budget: 320000,
    revenue: 480000,
    expenses: 210000,
    ticketsSold: 580,
    checkIns: 0,
    rating: 4.9,
    image: "/images/events/startuppitch.jpg",
    tags: ["Startup", "Investing", "Pitch", "VC"],
    featured: true,
  },
  {
    id: "evt_004",
    name: "CommunityMakers Festival",
    slug: "communitymakers-festival",
    description: "A two-day community festival celebrating open source, maker culture, and grassroots technology projects.",
    status: "on-sale",
    category: "Festival",
    startDate: "2026-06-07T09:00:00Z",
    endDate: "2026-06-08T18:00:00Z",
    timezone: "America/Denver",
    venueId: "ven_004",
    capacity: 1500,
    attendees: 987,
    budget: 180000,
    revenue: 290000,
    expenses: 145000,
    ticketsSold: 900,
    checkIns: 0,
    rating: 4.5,
    image: "/images/events/communitymakers.jpg",
    tags: ["Open Source", "Maker", "Community", "DIY"],
    featured: false,
  },
  {
    id: "evt_005",
    name: "FinTech Forward Conference",
    slug: "fintech-forward-conference",
    description: "Exploring the future of financial technology, blockchain, DeFi, and digital banking innovation.",
    status: "sold-out",
    category: "Conference",
    startDate: "2026-02-20T09:00:00Z",
    endDate: "2026-02-21T17:00:00Z",
    timezone: "America/New_York",
    venueId: "ven_005",
    capacity: 1200,
    attendees: 1200,
    budget: 520000,
    revenue: 780000,
    expenses: 410000,
    ticketsSold: 1200,
    checkIns: 1156,
    rating: 4.7,
    image: "/images/events/fintech.jpg",
    tags: ["FinTech", "Blockchain", "DeFi", "Banking"],
    featured: true,
  },
  {
    id: "evt_006",
    name: "GreenTech Innovation Summit",
    slug: "greentech-innovation-summit",
    description: "Dedicated to sustainable technology, clean energy solutions, and green innovation for a better planet.",
    status: "draft",
    category: "Conference",
    startDate: "2026-09-14T09:00:00Z",
    endDate: "2026-09-15T17:00:00Z",
    timezone: "Europe/London",
    venueId: "ven_006",
    capacity: 600,
    attendees: 0,
    budget: 280000,
    revenue: 0,
    expenses: 45000,
    ticketsSold: 0,
    checkIns: 0,
    rating: 0,
    image: "/images/events/greentech.jpg",
    tags: ["GreenTech", "Sustainability", "Clean Energy", "Innovation"],
    featured: false,
  },
  {
    id: "evt_007",
    name: "HealthTech Connect",
    slug: "healthtech-connect",
    description: "Bridging healthcare and technology with talks on telemedicine, health AI, wearable tech, and digital health records.",
    status: "completed",
    category: "Conference",
    startDate: "2025-11-08T09:00:00Z",
    endDate: "2025-11-09T17:00:00Z",
    timezone: "America/Los_Angeles",
    venueId: "ven_001",
    capacity: 800,
    attendees: 764,
    budget: 350000,
    revenue: 510000,
    expenses: 295000,
    ticketsSold: 764,
    checkIns: 742,
    rating: 4.4,
    image: "/images/events/healthtech.jpg",
    tags: ["HealthTech", "Telemedicine", "Wearables", "AI"],
    featured: false,
  },
  {
    id: "evt_008",
    name: "WomenInTech Gala 2026",
    slug: "womenintech-gala-2026",
    description: "An evening of inspiration, recognition, and networking celebrating women leaders in technology.",
    status: "on-sale",
    category: "Gala",
    startDate: "2026-03-08T18:00:00Z",
    endDate: "2026-03-08T23:00:00Z",
    timezone: "America/New_York",
    venueId: "ven_002",
    capacity: 400,
    attendees: 312,
    budget: 195000,
    revenue: 310000,
    expenses: 160000,
    ticketsSold: 300,
    checkIns: 0,
    rating: 4.9,
    image: "/images/events/womenintech.jpg",
    tags: ["WomenInTech", "Networking", "Diversity", "Gala"],
    featured: true,
  },
  {
    id: "evt_009",
    name: "DevOps Days Portland",
    slug: "devops-days-portland",
    description: "Community-organized conference on DevOps practices, infrastructure automation, and site reliability engineering.",
    status: "cancelled",
    category: "Conference",
    startDate: "2026-07-11T09:00:00Z",
    endDate: "2026-07-12T17:00:00Z",
    timezone: "America/Los_Angeles",
    venueId: "ven_004",
    capacity: 500,
    attendees: 0,
    budget: 120000,
    revenue: 15000,
    expenses: 62000,
    ticketsSold: 45,
    checkIns: 0,
    rating: 0,
    image: "/images/events/devops.jpg",
    tags: ["DevOps", "SRE", "Infrastructure", "Automation"],
    featured: false,
  },
  {
    id: "evt_010",
    name: "CreativeCode Jam",
    slug: "creativecode-jam",
    description: "A 48-hour hackathon combining art and technology. Build generative art, interactive installations, and creative software.",
    status: "completed",
    category: "Hackathon",
    startDate: "2025-12-05T18:00:00Z",
    endDate: "2025-12-07T18:00:00Z",
    timezone: "America/Chicago",
    venueId: "ven_003",
    capacity: 200,
    attendees: 186,
    budget: 85000,
    revenue: 95000,
    expenses: 72000,
    ticketsSold: 186,
    checkIns: 180,
    rating: 4.3,
    image: "/images/events/creativecode.jpg",
    tags: ["Hackathon", "Creative Coding", "Art", "Generative"],
    featured: false,
  },
];

// -----------------------------------------------------------------------------
// MOCK_VENUES (6)
// -----------------------------------------------------------------------------

export const MOCK_VENUES: Venue[] = [
  {
    id: "ven_001",
    name: "Moscone Center West",
    address: "800 Howard Street",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    country: "US",
    capacity: 3000,
    costPerDay: 45000,
    contactName: "Maria Chen",
    contactEmail: "bookings@moscone.com",
    contactPhone: "+1 (415) 555-0200",
    amenities: [
      "High-Speed WiFi",
      "AV Equipment",
      "Stage & Lighting",
      "Catering Kitchen",
      "Green Room",
      "Exhibit Hall",
      "Parking Garage",
      "Public Transit Access",
      "Wheelchair Accessible",
      "Coat Check",
    ],
    rating: 4.7,
    image: "/images/venues/moscone.jpg",
    available: true,
  },
  {
    id: "ven_002",
    name: "The Metropolitan Pavilion",
    address: "125 West 18th Street",
    city: "New York",
    state: "NY",
    zip: "10011",
    country: "US",
    capacity: 500,
    costPerDay: 28000,
    contactName: "James O'Brien",
    contactEmail: "events@metpavilion.com",
    contactPhone: "+1 (212) 555-0300",
    amenities: [
      "High-Speed WiFi",
      "Built-in AV",
      "Natural Light",
      "Climate Control",
      "Freight Elevator",
      "Street-Level Access",
      "Green Room",
      "ADA Compliant",
    ],
    rating: 4.5,
    image: "/images/venues/metpavilion.jpg",
    available: true,
  },
  {
    id: "ven_003",
    name: "Austin Convention Center",
    address: "500 East Cesar Chavez Street",
    city: "Austin",
    state: "TX",
    zip: "78701",
    country: "US",
    capacity: 1500,
    costPerDay: 32000,
    contactName: "Sarah Williams",
    contactEmail: "booking@austincc.com",
    contactPhone: "+1 (512) 555-0400",
    amenities: [
      "High-Speed WiFi",
      "Full AV Suite",
      "Outdoor Terrace",
      "Multiple Halls",
      "Catering Services",
      "On-site Parking",
      "Hotel Connected",
      "Box Office",
      "Loading Dock",
      "Security Team",
    ],
    rating: 4.6,
    image: "/images/venues/austincc.jpg",
    available: true,
  },
  {
    id: "ven_004",
    name: "Denver Convention Center",
    address: "700 14th Street",
    city: "Denver",
    state: "CO",
    zip: "80202",
    country: "US",
    capacity: 2000,
    costPerDay: 30000,
    contactName: "Tom Bradley",
    contactEmail: "events@denvercc.com",
    contactPhone: "+1 (303) 555-0500",
    amenities: [
      "High-Speed WiFi",
      "AV Equipment",
      "Mountain Views",
      "Rooftop Deck",
      "Catering Kitchen",
      "Parking Garage",
      "Light Rail Access",
      "Meeting Rooms",
      "Green Room",
      "Press Room",
    ],
    rating: 4.4,
    image: "/images/venues/denvercc.jpg",
    available: true,
  },
  {
    id: "ven_005",
    name: "Javits Center",
    address: "429 11th Avenue",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "US",
    capacity: 5000,
    costPerDay: 65000,
    contactName: "Lisa Park",
    contactEmail: "reservations@javitscenter.com",
    contactPhone: "+1 (212) 555-0600",
    amenities: [
      "High-Speed WiFi",
      "Massive Exhibit Hall",
      "Full AV Production",
      "Green Roof",
      "Catering Facilities",
      "Multi-Level Parking",
      "NYC Ferry Access",
      "Press Center",
      "VIP Lounge",
      "Security Screening",
      "Medical Station",
      "Business Center",
    ],
    rating: 4.8,
    image: "/images/venues/javits.jpg",
    available: false,
  },
  {
    id: "ven_006",
    name: "ExCeL London",
    address: "Royal Victoria Dock, 1 Western Gateway",
    city: "London",
    state: "England",
    zip: "E16 1XL",
    country: "UK",
    capacity: 4000,
    costPerDay: 55000,
    contactName: "David Mitchell",
    contactEmail: "events@excel.london",
    contactPhone: "+44 20 555 0700",
    amenities: [
      "High-Speed WiFi",
      "International AV",
      "Dockside Location",
      "Elizabeth Line Access",
      "Air Freight Access",
      "Catering Village",
      "Hotel Adjacent",
      "Customs Facility",
      "Sustainability Certified",
      "Multi-Faith Room",
    ],
    rating: 4.5,
    image: "/images/venues/excellondon.jpg",
    available: true,
  },
];

// -----------------------------------------------------------------------------
// MOCK_SESSIONS (12)
// -----------------------------------------------------------------------------

export const MOCK_SESSIONS: Session[] = [
  {
    id: "ses_001",
    eventId: "evt_001",
    title: "Opening Keynote: The AI-First Future",
    description: "A visionary look at how artificial intelligence is reshaping every industry and what it means for developers in 2026 and beyond.",
    track: "Keynote",
    speakerId: "spk_001",
    startTime: "2026-03-15T09:00:00Z",
    endTime: "2026-03-15T10:00:00Z",
    room: "Main Hall A",
    capacity: 3000,
    attendees: 2847,
    level: "intermediate",
    tags: ["AI", "Future", "Keynote"],
    status: "scheduled",
  },
  {
    id: "ses_002",
    eventId: "evt_001",
    title: "Building Scalable ML Pipelines with Kubernetes",
    description: "Deep dive into deploying and managing machine learning pipelines at scale using Kubernetes and MLOps best practices.",
    track: "Technical",
    speakerId: "spk_002",
    startTime: "2026-03-15T10:30:00Z",
    endTime: "2026-03-15T11:30:00Z",
    room: "Room 201",
    capacity: 300,
    attendees: 278,
    level: "advanced",
    tags: ["ML", "Kubernetes", "MLOps", "Pipelines"],
    status: "scheduled",
  },
  {
    id: "ses_003",
    eventId: "evt_001",
    title: "Workshop: Hands-On React Server Components",
    description: "Interactive workshop where you'll build a full-stack app using React Server Components, streaming, and the new Next.js patterns.",
    track: "Workshop",
    speakerId: "spk_003",
    startTime: "2026-03-15T13:00:00Z",
    endTime: "2026-03-15T15:00:00Z",
    room: "Workshop Lab 1",
    capacity: 60,
    attendees: 58,
    level: "intermediate",
    tags: ["React", "Next.js", "RSC", "Workshop"],
    status: "scheduled",
  },
  {
    id: "ses_004",
    eventId: "evt_001",
    title: "Panel: Ethics in AI — Who's Responsible?",
    description: "Industry leaders debate the ethical implications of AI deployment, algorithmic bias, and corporate responsibility in the age of automation.",
    track: "Panel",
    speakerId: "spk_004",
    startTime: "2026-03-15T14:00:00Z",
    endTime: "2026-03-15T15:00:00Z",
    room: "Room 302",
    capacity: 250,
    attendees: 241,
    level: "beginner",
    tags: ["AI Ethics", "Panel", "Responsible AI"],
    status: "scheduled",
  },
  {
    id: "ses_005",
    eventId: "evt_001",
    title: "Zero Trust Architecture in Practice",
    description: "Real-world implementation strategies for zero trust security, covering identity, device, network, and application layers.",
    track: "Technical",
    speakerId: "spk_005",
    startTime: "2026-03-15T15:30:00Z",
    endTime: "2026-03-15T16:30:00Z",
    room: "Room 201",
    capacity: 300,
    attendees: 189,
    level: "advanced",
    tags: ["Security", "Zero Trust", "Infrastructure"],
    status: "scheduled",
  },
  {
    id: "ses_006",
    eventId: "evt_002",
    title: "Design Systems That Scale",
    description: "How to build and maintain design systems that grow with your organization, from tokens to component libraries.",
    track: "Keynote",
    speakerId: "spk_006",
    startTime: "2026-04-10T10:00:00Z",
    endTime: "2026-04-10T11:00:00Z",
    room: "Auditorium",
    capacity: 150,
    attendees: 142,
    level: "intermediate",
    tags: ["Design Systems", "UI", "Components"],
    status: "scheduled",
  },
  {
    id: "ses_007",
    eventId: "evt_001",
    title: "Networkng Mixer: AI Builders Connect",
    description: "Informal networking session for AI practitioners to share experiences, challenges, and opportunities over drinks and appetizers.",
    track: "Networking",
    speakerId: "spk_001",
    startTime: "2026-03-15T17:00:00Z",
    endTime: "2026-03-15T18:30:00Z",
    room: "Terrace Lounge",
    capacity: 500,
    attendees: 342,
    level: "beginner",
    tags: ["Networking", "Social", "AI"],
    status: "scheduled",
  },
  {
    id: "ses_008",
    eventId: "evt_003",
    title: "Pitch Workshop: Storytelling for Startups",
    description: "Learn to craft compelling pitch narratives that resonate with investors. Includes live practice rounds with feedback.",
    track: "Workshop",
    speakerId: "spk_007",
    startTime: "2026-05-22T13:00:00Z",
    endTime: "2026-05-22T15:00:00Z",
    room: "Workshop Room A",
    capacity: 80,
    attendees: 76,
    level: "intermediate",
    tags: ["Pitch", "Startups", "Storytelling"],
    status: "scheduled",
  },
  {
    id: "ses_009",
    eventId: "evt_001",
    title: "WebAssembly: Beyond the Browser",
    description: "Exploring WASM on the server, edge computing with WASM, and the future of portable, sandboxed computing.",
    track: "Technical",
    speakerId: "spk_008",
    startTime: "2026-03-16T09:30:00Z",
    endTime: "2026-03-16T10:30:00Z",
    room: "Room 201",
    capacity: 300,
    attendees: 215,
    level: "advanced",
    tags: ["WebAssembly", "WASM", "Edge", "Server"],
    status: "scheduled",
  },
  {
    id: "ses_010",
    eventId: "evt_001",
    title: "Fireside Chat: From Side Project to  ARR",
    description: "Founders share their journey from weekend hack to venture-backed company with honest lessons learned along the way.",
    track: "Panel",
    speakerId: "spk_003",
    startTime: "2026-03-16T11:00:00Z",
    endTime: "2026-03-16T12:00:00Z",
    room: "Room 302",
    capacity: 250,
    attendees: 248,
    level: "beginner",
    tags: ["Startup", "Growth", "Fireside Chat"],
    status: "scheduled",
  },
  {
    id: "ses_011",
    eventId: "evt_001",
    title: "Workshop: Advanced TypeScript Patterns",
    description: "Master advanced TypeScript techniques including conditional types, template literals, and building type-safe APIs.",
    track: "Workshop",
    speakerId: "spk_002",
    startTime: "2026-03-16T13:00:00Z",
    endTime: "2026-03-16T15:00:00Z",
    room: "Workshop Lab 2",
    capacity: 50,
    attendees: 49,
    level: "advanced",
    tags: ["TypeScript", "Advanced", "Type System"],
    status: "scheduled",
  },
  {
    id: "ses_012",
    eventId: "evt_004",
    title: "Open Source Sustainability Panel",
    description: "Maintainers and sponsors discuss the challenges of sustaining open source projects and building healthy communities.",
    track: "Panel",
    speakerId: "spk_005",
    startTime: "2026-06-07T14:00:00Z",
    endTime: "2026-06-07T15:00:00Z",
    room: "Main Stage",
    capacity: 600,
    attendees: 478,
    level: "beginner",
    tags: ["Open Source", "Sustainability", "Community"],
    status: "scheduled",
  },
];

// -----------------------------------------------------------------------------
// MOCK_SPEAKERS (8)
// -----------------------------------------------------------------------------

export const MOCK_SPEAKERS: Speaker[] = [
  {
    id: "spk_001",
    name: "Dr. Amara Okafor",
    email: "amara.okafor@deepmind.dev",
    phone: "+1 (650) 555-0101",
    bio: "Chief AI Scientist at DeepMind. PhD from MIT in Machine Learning. Published 40+ papers on reinforcement learning and neural architecture search. Keynote speaker at NeurIPS, ICML, and CVPR.",
    avatar: "/images/speakers/amara.jpg",
    title: "Chief AI Scientist",
    company: "DeepMind",
    website: "https://amaraokafor.com",
    linkedin: "linkedin.com/in/amaraokafor",
    twitter: "@amara_ml",
    sessions: ["ses_001", "ses_007"],
    rating: 4.9,
    fee: 25000,
    expertise: ["Machine Learning", "Reinforcement Learning", "Neural Architecture", "AI Ethics"],
    featured: true,
  },
  {
    id: "spk_002",
    name: "Marcus Chen",
    email: "marcus.chen@cloudscale.io",
    phone: "+1 (408) 555-0102",
    bio: "Principal Engineer at CloudScale, specializing in distributed systems and Kubernetes. Core contributor to several CNCF projects. Author of 'Scaling Kubernetes in Production'.",
    avatar: "/images/speakers/marcus.jpg",
    title: "Principal Engineer",
    company: "CloudScale",
    website: "https://marcuschen.dev",
    linkedin: "linkedin.com/in/marcuschen",
    twitter: "@mchen_dev",
    sessions: ["ses_002", "ses_011"],
    rating: 4.8,
    fee: 15000,
    expertise: ["Kubernetes", "Distributed Systems", "Cloud Infrastructure", "MLOps"],
    featured: true,
  },
  {
    id: "spk_003",
    name: "Sarah Kim",
    email: "sarah.kim@vercel.com",
    phone: "+1 (512) 555-0103",
    bio: "Staff Engineer at Vercel, working on Next.js and the React ecosystem. Previously at Meta on the React team. Passionate about developer experience and web performance.",
    avatar: "/images/speakers/sarah.jpg",
    title: "Staff Engineer",
    company: "Vercel",
    website: "https://sarahkim.io",
    linkedin: "linkedin.com/in/sarahkim",
    twitter: "@sarahkim_dev",
    sessions: ["ses_003", "ses_010"],
    rating: 4.7,
    fee: 18000,
    expertise: ["React", "Next.js", "TypeScript", "Web Performance"],
    featured: true,
  },
  {
    id: "spk_004",
    name: "Prof. Elena Volkov",
    email: "elena.volkov@stanford.edu",
    phone: "+1 (650) 555-0104",
    bio: "Professor of Computer Science at Stanford University. Director of the AI Ethics Lab. Advisor to multiple AI policy organizations and author of 'The Ethical Algorithm'.",
    avatar: "/images/speakers/elena.jpg",
    title: "Professor of Computer Science",
    company: "Stanford University",
    website: "https://elenavolkov.stanford.edu",
    linkedin: "linkedin.com/in/elenavolkov",
    twitter: "@elena_ethics",
    sessions: ["ses_004"],
    rating: 4.9,
    fee: 12000,
    expertise: ["AI Ethics", "Algorithmic Fairness", "AI Policy", "Responsible AI"],
    featured: false,
  },
  {
    id: "spk_005",
    name: "James Rodriguez",
    email: "james.rodriguez@norton.cyber",
    phone: "+1 (703) 555-0105",
    bio: "VP of Security Engineering at Norton Cyber. Former NSA red team lead. CISSP, OSCP certified. Known for pioneering zero trust implementations at Fortune 500 companies.",
    avatar: "/images/speakers/james.jpg",
    title: "VP of Security Engineering",
    company: "Norton Cyber",
    website: "https://jamesrodriguez.security",
    linkedin: "linkedin.com/in/jamesrodriguez-sec",
    twitter: "@jrod_security",
    sessions: ["ses_005", "ses_012"],
    rating: 4.6,
    fee: 20000,
    expertise: ["Cybersecurity", "Zero Trust", "Penetration Testing", "Security Architecture"],
    featured: false,
  },
  {
    id: "spk_006",
    name: "Priya Sharma",
    email: "priya.sharma@figma.com",
    phone: "+1 (415) 555-0106",
    bio: "Head of Design Systems at Figma. Previously led design systems at Airbnb and Google. Speaker at Config, WWDC, and Google I/O. Advocate for inclusive design practices.",
    avatar: "/images/speakers/priya.jpg",
    title: "Head of Design Systems",
    company: "Figma",
    website: "https://priyasharma.design",
    linkedin: "linkedin.com/in/priyasharma-ds",
    twitter: "@priya_designs",
    sessions: ["ses_006"],
    rating: 4.8,
    fee: 14000,
    expertise: ["Design Systems", "UI/UX", "Figma", "Inclusive Design"],
    featured: true,
  },
  {
    id: "spk_007",
    name: "Alex Petrov",
    email: "alex.petrov@sequoiacap.com",
    phone: "+1 (650) 555-0107",
    bio: "Partner at Sequoia Capital focused on early-stage SaaS investments. Former founder of two acquired startups. Mentor at Y Combinator and Techstars.",
    avatar: "/images/speakers/alex.jpg",
    title: "Partner",
    company: "Sequoia Capital",
    website: "https://alexpetrov.vc",
    linkedin: "linkedin.com/in/alexpetrov",
    twitter: "@alexpetrov_vc",
    sessions: ["ses_008"],
    rating: 4.5,
    fee: 10000,
    expertise: ["Venture Capital", "SaaS", "Startup Strategy", "Fundraising"],
    featured: false,
  },
  {
    id: "spk_008",
    name: "Yuki Tanaka",
    email: "yuki.tanaka@bytecode.org",
    phone: "+1 (206) 555-0108",
    bio: "WebAssembly lead at Bytecode Alliance. Core contributor to Rust and WASM toolchains. Creator of the popular WasmEdge runtime. Speaker and educator on systems programming.",
    avatar: "/images/speakers/yuki.jpg",
    title: "WebAssembly Lead",
    company: "Bytecode Alliance",
    website: "https://yukitanaka.dev",
    linkedin: "linkedin.com/in/yukitanaka",
    twitter: "@yuki_wasm",
    sessions: ["ses_009"],
    rating: 4.7,
    fee: 12000,
    expertise: ["WebAssembly", "Rust", "Systems Programming", "Edge Computing"],
    featured: false,
  },
];

// -----------------------------------------------------------------------------
// MOCK_ATTENDEES (15)
// -----------------------------------------------------------------------------

export const MOCK_ATTENDEES: Attendee[] = [
  {
    id: "att_001",
    firstName: "Emily",
    lastName: "Watson",
    email: "emily.watson@google.com",
    phone: "+1 (650) 555-1001",
    company: "Google",
    jobTitle: "Senior Software Engineer",
    ticketType: "vip",
    ticketPrice: 1200,
    checkInStatus: "checked-in",
    checkedInAt: "2026-03-15T08:42:00Z",
    dietary: "vegetarian",
    sessionsRegistered: ["ses_001", "ses_002", "ses_003", "ses_007"],
    registeredAt: "2026-01-15T10:30:00Z",
    avatar: "/images/avatars/emily.jpg",
    notes: "VIP guest, interested in ML talks",
    amountPaid: 1200,
  },
  {
    id: "att_002",
    firstName: "David",
    lastName: "Nguyen",
    email: "d.nguyen@microsoft.com",
    phone: "+1 (425) 555-1002",
    company: "Microsoft",
    jobTitle: "Cloud Solutions Architect",
    ticketType: "general",
    ticketPrice: 599,
    checkInStatus: "checked-in",
    checkedInAt: "2026-03-15T08:55:00Z",
    dietary: "none",
    sessionsRegistered: ["ses_001", "ses_005", "ses_009"],
    registeredAt: "2026-01-20T14:00:00Z",
    avatar: "/images/avatars/david.jpg",
    notes: "",
    amountPaid: 599,
  },
  {
    id: "att_003",
    firstName: "Sophia",
    lastName: "Martinez",
    email: "sophia.m@spotify.com",
    phone: "+46 70 555 1003",
    company: "Spotify",
    jobTitle: "Staff Frontend Engineer",
    ticketType: "early-bird",
    ticketPrice: 399,
    checkInStatus: "checked-in",
    checkedInAt: "2026-03-15T09:02:00Z",
    dietary: "vegan",
    sessionsRegistered: ["ses_001", "ses_003", "ses_010"],
    registeredAt: "2025-12-01T09:00:00Z",
    avatar: "/images/avatars/sophia.jpg",
    notes: "Early bird, vegetarian meals requested",
    amountPaid: 399,
  },
  {
    id: "att_004",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.b@amazon.com",
    phone: "+1 (206) 555-1004",
    company: "Amazon Web Services",
    jobTitle: "Principal Solutions Architect",
    ticketType: "vip",
    ticketPrice: 1200,
    checkInStatus: "checked-in",
    checkedInAt: "2026-03-15T08:30:00Z",
    dietary: "none",
    sessionsRegistered: ["ses_001", "ses_002", "ses_005", "ses_009"],
    registeredAt: "2026-01-10T11:00:00Z",
    avatar: "/images/avatars/michael.jpg",
    notes: "Speaking on AWS Lambda panel",
    amountPaid: 1200,
  },
  {
    id: "att_005",
    firstName: "Lisa",
    lastName: "Anderson",
    email: "l.anderson@stripe.com",
    phone: "+1 (415) 555-1005",
    company: "Stripe",
    jobTitle: "Product Manager",
    ticketType: "general",
    ticketPrice: 599,
    checkInStatus: "pending",
    checkedInAt: null,
    dietary: "gluten-free",
    sessionsRegistered: ["ses_001", "ses_004", "ses_006"],
    registeredAt: "2026-02-05T16:30:00Z",
    avatar: "/images/avatars/lisa.jpg",
    notes: "Interested in FinTech sessions",
    amountPaid: 599,
  },
  {
    id: "att_006",
    firstName: "Ryan",
    lastName: "Garcia",
    email: "ryan.g@netflix.com",
    phone: "+1 (408) 555-1006",
    company: "Netflix",
    jobTitle: "Senior Backend Engineer",
    ticketType: "general",
    ticketPrice: 599,
    checkInStatus: "checked-in",
    checkedInAt: "2026-03-15T09:10:00Z",
    dietary: "none",
    sessionsRegistered: ["ses_002", "ses_009", "ses_011"],
    registeredAt: "2026-02-12T13:15:00Z",
    avatar: "/images/avatars/ryan.jpg",
    notes: "Attending ML and WASM sessions",
    amountPaid: 599,
  },
  {
    id: "att_007",
    firstName: "Aisha",
    lastName: "Patel",
    email: "aisha.p@figma.com",
    phone: "+1 (415) 555-1007",
    company: "Figma",
    jobTitle: "Design Engineer",
    ticketType: "early-bird",
    ticketPrice: 399,
    checkInStatus: "checked-in",
    checkedInAt: "2026-03-15T09:15:00Z",
    dietary: "vegetarian",
    sessionsRegistered: ["ses_001", "ses_003", "ses_006"],
    registeredAt: "2025-12-10T08:00:00Z",
    avatar: "/images/avatars/aisha.jpg",
    notes: "Co-attending with Priya Sharma",
    amountPaid: 399,
  },
  {
    id: "att_008",
    firstName: "Chris",
    lastName: "Johnson",
    email: "chris.j@datadog.com",
    phone: "+1 (646) 555-1008",
    company: "Datadog",
    jobTitle: "Site Reliability Engineer",
    ticketType: "student",
    ticketPrice: 199,
    checkInStatus: "no-show",
    checkedInAt: null,
    dietary: "none",
    sessionsRegistered: ["ses_005", "ses_009"],
    registeredAt: "2026-02-28T17:45:00Z",
    avatar: "/images/avatars/chris.jpg",
    notes: "Student discount applied",
    amountPaid: 199,
  },
  {
    id: "att_009",
    firstName: "Olivia",
    lastName: "Lee",
    email: "olivia.lee@shopify.com",
    phone: "+1 (647) 555-1009",
    company: "Shopify",
    jobTitle: "Engineering Manager",
    ticketType: "premium",
    ticketPrice: 999,
    checkInStatus: "checked-in",
    checkedInAt: "2026-03-15T08:50:00Z",
    dietary: "halal",
    sessionsRegistered: ["ses_001", "ses_002", "ses_004", "ses_010"],
    registeredAt: "2026-01-22T10:00:00Z",
    avatar: "/images/avatars/olivia.jpg",
    notes: "Managing team of 8 attending",
    amountPaid: 999,
  },
  {
    id: "att_010",
    firstName: "Jake",
    lastName: "Thompson",
    email: "jake.t@twilio.com",
    phone: "+1 (415) 555-1010",
    company: "Twilio",
    jobTitle: "Developer Advocate",
    ticketType: "general",
    ticketPrice: 599,
    checkInStatus: "checked-in",
    checkedInAt: "2026-03-15T09:20:00Z",
    dietary: "none",
    sessionsRegistered: ["ses_001", "ses_003", "ses_008"],
    registeredAt: "2026-02-18T09:30:00Z",
    avatar: "/images/avatars/jake.jpg",
    notes: "Live-tweeting sessions",
    amountPaid: 599,
  },
  {
    id: "att_011",
    firstName: "Nina",
    lastName: "Kowalski",
    email: "nina.k@uber.com",
    phone: "+1 (415) 555-1011",
    company: "Uber",
    jobTitle: "Data Scientist",
    ticketType: "early-bird",
    ticketPrice: 399,
    checkInStatus: "pending",
    checkedInAt: null,
    dietary: "none",
    sessionsRegistered: ["ses_001", "ses_002", "ses_011"],
    registeredAt: "2025-12-15T12:00:00Z",
    avatar: "/images/avatars/nina.jpg",
    notes: "",
    amountPaid: 399,
  },
  {
    id: "att_012",
    firstName: "Tom",
    lastName: "Bradshaw",
    email: "tom.b@slack.com",
    phone: "+1 (415) 555-1012",
    company: "Slack",
    jobTitle: "iOS Engineer",
    ticketType: "general",
    ticketPrice: 599,
    checkInStatus: "checked-in",
    checkedInAt: "2026-03-15T09:25:00Z",
    dietary: "nut-free",
    sessionsRegistered: ["ses_003", "ses_006", "ses_010"],
    registeredAt: "2026-02-20T14:30:00Z",
    avatar: "/images/avatars/tom.jpg",
    notes: "Allergic to peanuts",
    amountPaid: 599,
  },
  {
    id: "att_013",
    firstName: "Rachel",
    lastName: "Kim",
    email: "rachel.k@airbnb.com",
    phone: "+1 (415) 555-1013",
    company: "Airbnb",
    jobTitle: "Staff Engineer",
    ticketType: "vip",
    ticketPrice: 1200,
    checkInStatus: "checked-in",
    checkedInAt: "2026-03-15T08:35:00Z",
    dietary: "none",
    sessionsRegistered: ["ses_001", "ses_004", "ses_007", "ses_010"],
    registeredAt: "2026-01-05T15:00:00Z",
    avatar: "/images/avatars/rachel.jpg",
    notes: "VIP speaker lounge access",
    amountPaid: 1200,
  },
  {
    id: "att_014",
    firstName: "Kevin",
    lastName: "O'Brien",
    email: "kevin.ob@coinbase.com",
    phone: "+1 (415) 555-1014",
    company: "Coinbase",
    jobTitle: "Blockchain Engineer",
    ticketType: "general",
    ticketPrice: 599,
    checkInStatus: "cancelled",
    checkedInAt: null,
    dietary: "none",
    sessionsRegistered: ["ses_001"],
    registeredAt: "2026-02-25T11:00:00Z",
    avatar: "/images/avatars/kevin.jpg",
    notes: "Cancelled due to schedule conflict",
    amountPaid: 0,
  },
  {
    id: "att_015",
    firstName: "Priya",
    lastName: "Ramanathan",
    email: "priya.r@atlassian.com",
    phone: "+61 2 5551 0015",
    company: "Atlassian",
    jobTitle: "Principal Product Designer",
    ticketType: "premium",
    ticketPrice: 999,
    checkInStatus: "checked-in",
    checkedInAt: "2026-03-15T08:58:00Z",
    dietary: "vegan",
    sessionsRegistered: ["ses_001", "ses_003", "ses_006", "ses_007"],
    registeredAt: "2026-01-18T08:00:00Z",
    avatar: "/images/avatars/priya_r.jpg",
    notes: "Speaker at DesignCraft workshop",
    amountPaid: 999,
  },
];

// -----------------------------------------------------------------------------
// MOCK_TICKETS (8 types)
// -----------------------------------------------------------------------------

export const MOCK_TICKETS: TicketType[] = [
  {
    id: "tkt_001",
    eventId: "evt_001",
    name: "Early Bird",
    description: "Limited early access pricing for the first 500 registrants. Full conference access at a discounted rate.",
    price: 399,
    capacity: 500,
    sold: 500,
    revenue: 199500,
    saleStart: "2025-10-01T00:00:00Z",
    saleEnd: "2025-12-31T23:59:59Z",
    status: "sold-out",
    perks: ["Full Conference Access", "Lunch Included", "Conference Swag Bag", "WiFi Access"],
  },
  {
    id: "tkt_002",
    eventId: "evt_001",
    name: "General Admission",
    description: "Standard conference pass with access to all keynotes, sessions, and networking events.",
    price: 599,
    capacity: 1500,
    sold: 1200,
    revenue: 718800,
    saleStart: "2026-01-01T00:00:00Z",
    saleEnd: "2026-03-10T23:59:59Z",
    status: "active",
    perks: ["Full Conference Access", "Lunch Included", "WiFi Access", "Session Recordings"],
  },
  {
    id: "tkt_003",
    eventId: "evt_001",
    name: "VIP Pass",
    description: "Premium experience with VIP lounge, speaker meet & greet, and priority seating.",
    price: 1200,
    capacity: 200,
    sold: 185,
    revenue: 222000,
    saleStart: "2025-11-01T00:00:00Z",
    saleEnd: "2026-03-01T23:59:59Z",
    status: "active",
    perks: [
      "Full Conference Access",
      "VIP Lounge",
      "Speaker Meet & Greet",
      "Priority Seating",
      "Premium Catering",
      "Exclusive Networking Dinner",
      "Conference Swag Bag Plus",
    ],
  },
  {
    id: "tkt_004",
    eventId: "evt_001",
    name: "Workshop Add-On",
    description: "Additional pass for hands-on workshop sessions. Must hold a conference ticket.",
    price: 199,
    capacity: 300,
    sold: 245,
    revenue: 48755,
    saleStart: "2026-01-15T00:00:00Z",
    saleEnd: "2026-03-12T23:59:59Z",
    status: "active",
    perks: ["Workshop Access", "Laptop Rental Available", "Workshop Materials", "Certificate of Completion"],
  },
  {
    id: "tkt_005",
    eventId: "evt_001",
    name: "Student Pass",
    description: "Discounted rate for verified students. Valid student ID required at check-in.",
    price: 199,
    capacity: 300,
    sold: 170,
    revenue: 33830,
    saleStart: "2026-01-01T00:00:00Z",
    saleEnd: "2026-03-14T23:59:59Z",
    status: "active",
    perks: ["Full Conference Access", "Lunch Included", "WiFi Access", "Mentorship Program"],
  },
  {
    id: "tkt_006",
    eventId: "evt_001",
    name: "Group Pass (5+)",
    description: "Discounted group rate for teams of 5 or more. Must register together.",
    price: 499,
    capacity: 500,
    sold: 320,
    revenue: 159680,
    saleStart: "2026-01-01T00:00:00Z",
    saleEnd: "2026-03-10T23:59:59Z",
    status: "active",
    perks: ["Full Conference Access", "Dedicated Group Seating", "Lunch Included", "Team Photo Session"],
  },
  {
    id: "tkt_007",
    eventId: "evt_001",
    name: "Virtual Pass",
    description: "Access to live-streamed sessions and on-demand recordings. No in-person access.",
    price: 149,
    capacity: 5000,
    sold: 890,
    revenue: 132610,
    saleStart: "2026-01-01T00:00:00Z",
    saleEnd: "2026-03-17T18:00:00Z",
    status: "active",
    perks: ["Live Streaming", "On-Demand Recordings", "Virtual Networking Lounge", "Digital Swag Bag"],
  },
  {
    id: "tkt_008",
    eventId: "evt_001",
    name: "Speaker Pass",
    description: "Complimentary pass for confirmed speakers and moderators.",
    price: 0,
    capacity: 50,
    sold: 32,
    revenue: 0,
    saleStart: "2025-09-01T00:00:00Z",
    saleEnd: "2026-03-17T18:00:00Z",
    status: "active",
    perks: ["Full Conference Access", "VIP Lounge", "Speaker Green Room", "Premium Catering", "Travel Reimbursement"],
  },
];

// -----------------------------------------------------------------------------
// MOCK_SPONSORS (6)
// -----------------------------------------------------------------------------

export const MOCK_SPONSORS: Sponsor[] = [
  {
    id: "spon_001",
    name: "Google Cloud",
    logo: "/images/sponsors/google-cloud.png",
    tier: "platinum",
    amount: 150000,
    contactName: "Rachel Adams",
    contactEmail: "sponsors@google.com",
    contactPhone: "+1 (650) 555-2001",
    website: "https://cloud.google.com",
    benefits: [
      "Main Stage Branding",
      "Keynote Slot (10 min)",
      "Large Booth (20x20)",
      "VIP Dinner Host",
      "Logo on All Marketing",
      "10 VIP Passes",
      "Workshop Room Sponsor",
      "Podcast Interview",
    ],
    status: "confirmed",
    since: "2025-08-15",
  },
  {
    id: "spon_002",
    name: "Microsoft Azure",
    logo: "/images/sponsors/azure.png",
    tier: "platinum",
    amount: 120000,
    contactName: "Brian Foster",
    contactEmail: "events@microsoft.com",
    contactPhone: "+1 (425) 555-2002",
    website: "https://azure.microsoft.com",
    benefits: [
      "Main Stage Branding",
      "Session Slot (30 min)",
      "Large Booth (20x20)",
      "Logo on All Marketing",
      "8 VIP Passes",
      "Networking Event Sponsor",
    ],
    status: "confirmed",
    since: "2025-09-01",
  },
  {
    id: "spon_003",
    name: "Vercel",
    logo: "/images/sponsors/vercel.png",
    tier: "gold",
    amount: 75000,
    contactName: "Katie Liu",
    contactEmail: "sponsors@vercel.com",
    contactPhone: "+1 (415) 555-2003",
    website: "https://vercel.com",
    benefits: [
      "Workshop Room Sponsor",
      "Medium Booth (15x15)",
      "Logo on Website",
      "4 VIP Passes",
      "Swag Bag Insert",
      "Lightning Talk Slot",
    ],
    status: "confirmed",
    since: "2025-10-01",
  },
  {
    id: "spon_004",
    name: "Stripe",
    logo: "/images/sponsors/stripe.png",
    tier: "gold",
    amount: 60000,
    contactName: "Michael O'Neill",
    contactEmail: "events@stripe.com",
    contactPhone: "+1 (415) 555-2004",
    website: "https://stripe.com",
    benefits: [
      "Medium Booth (15x15)",
      "Logo on Website",
      "3 VIP Passes",
      "Session Slot (30 min)",
      "Lunch Sponsor",
    ],
    status: "confirmed",
    since: "2025-10-15",
  },
  {
    id: "spon_005",
    name: "MongoDB",
    logo: "/images/sponsors/mongodb.png",
    tier: "silver",
    amount: 35000,
    contactName: "Anna Schmidt",
    contactEmail: "partnerships@mongodb.com",
    contactPhone: "+1 (650) 555-2005",
    website: "https://mongodb.com",
    benefits: [
      "Small Booth (10x10)",
      "Logo on Website",
      "2 VIP Passes",
      "Swag Bag Insert",
      "Blog Feature",
    ],
    status: "pending",
    since: "2025-11-01",
  },
  {
    id: "spon_006",
    name: "DigitalOcean",
    logo: "/images/sponsors/digitalocean.png",
    tier: "silver",
    amount: 25000,
    contactName: "Kevin Park",
    contactEmail: "sponsors@digitalocean.com",
    contactPhone: "+1 (212) 555-2006",
    website: "https://digitalocean.com",
    benefits: [
      "Small Booth (10x10)",
      "Logo on Website",
      "1 VIP Pass",
      "Swag Bag Insert",
      "Social Media Mention",
    ],
    status: "confirmed",
    since: "2025-11-15",
  },
];

// -----------------------------------------------------------------------------
// MOCK_VENDORS (6)
// -----------------------------------------------------------------------------

export const MOCK_VENDORS: Vendor[] = [
  {
    id: "vnd_001",
    name: "Apex AV Solutions",
    service: "Audio/Visual Equipment & Production",
    category: "AV & Production",
    contactName: "Daniel Park",
    contactEmail: "dan@apexav.com",
    contactPhone: "+1 (415) 555-3001",
    cost: 85000,
    status: "confirmed",
    startDate: "2026-03-13",
    endDate: "2026-03-18",
    notes: "Full AV setup for Main Hall and 4 breakout rooms. Includes live streaming capability.",
    rating: 4.8,
    contractUrl: "/contracts/vnd_001_apex_av.pdf",
  },
  {
    id: "vnd_002",
    name: "Bloom Florals & Decor",
    service: "Event Decoration & Floral Arrangements",
    category: "Décor",
    contactName: "Isabella Rossi",
    contactEmail: "events@bloomflorals.com",
    contactPhone: "+1 (415) 555-3002",
    cost: 18000,
    status: "confirmed",
    startDate: "2026-03-15",
    endDate: "2026-03-17",
    notes: "Stage backdrop, table centerpieces, and entrance arrangements. Modern minimalist theme.",
    rating: 4.6,
    contractUrl: "/contracts/vnd_002_bloom.pdf",
  },
  {
    id: "vnd_003",
    name: "SecureAll Events",
    service: "Event Security & Crowd Management",
    category: "Security",
    contactName: "Robert Chen",
    contactEmail: "robert@secureall.com",
    contactPhone: "+1 (415) 555-3003",
    cost: 42000,
    status: "confirmed",
    startDate: "2026-03-14",
    endDate: "2026-03-18",
    notes: "24/7 security coverage. 12 security personnel on-site. Bag check and credentialing.",
    rating: 4.7,
    contractUrl: "/contracts/vnd_003_secure.pdf",
  },
  {
    id: "vnd_004",
    name: "TechRent Pro",
    service: "Technology Equipment Rental",
    category: "Technology",
    contactName: "Amy Lawson",
    contactEmail: "rentals@techrentpro.com",
    contactPhone: "+1 (408) 555-3004",
    cost: 35000,
    status: "in-progress",
    startDate: "2026-03-12",
    endDate: "2026-03-19",
    notes: "100 laptops for workshop labs, 20 tablets for check-in, charging stations throughout venue.",
    rating: 4.5,
    contractUrl: "/contracts/vnd_004_techrent.pdf",
  },
  {
    id: "vnd_005",
    name: "Peak Transport Group",
    service: "Shuttle & Transportation Services",
    category: "Transportation",
    contactName: "James Wheeler",
    contactEmail: "events@peaktransport.com",
    contactPhone: "+1 (415) 555-3005",
    cost: 28000,
    status: "confirmed",
    startDate: "2026-03-15",
    endDate: "2026-03-17",
    notes: "Airport shuttles every 30 minutes. Hotel-to-venue shuttle service. VIP car service.",
    rating: 4.4,
    contractUrl: "/contracts/vnd_005_transport.pdf",
  },
  {
    id: "vnd_006",
    name: "SnapShot Photo Booth",
    service: "Photo Booth & Event Photography",
    category: "Photography",
    contactName: "Megan Torres",
    contactEmail: "book@snapshotbooth.com",
    contactPhone: "+1 (415) 555-3006",
    cost: 12000,
    status: "pending",
    startDate: "2026-03-15",
    endDate: "2026-03-17",
    notes: "2 photo booths with custom branding backdrop. 1 event photographer for keynotes.",
    rating: 4.3,
    contractUrl: "/contracts/vnd_006_snapshot.pdf",
  },
];

// -----------------------------------------------------------------------------
// MOCK_CATERING (6)
// -----------------------------------------------------------------------------

export const MOCK_CATERING: CateringMenu[] = [
  {
    id: "cat_001",
    vendorId: "vnd_001",
    name: "Day 1 — Opening Reception Buffet",
    description: "International buffet featuring Mediterranean, Asian, and American cuisine for the opening reception.",
    type: "Buffet",
    pricePerPerson: 45,
    minGuests: 200,
    maxGuests: 500,
    items: [
      "Grilled Chicken with Herbs",
      "Vegetable Pad Thai",
      "Caesar Salad",
      "Hummus & Pita Platter",
      "Fresh Fruit Display",
      "Artisan Bread Basket",
      "Tiramisu",
      "Sparkling Water & Lemonade",
    ],
    dietary: ["vegetarian", "vegan", "gluten-free"],
    eventId: "evt_001",
    scheduledDate: "2026-03-15T18:00:00Z",
    servings: 450,
    status: "confirmed",
  },
  {
    id: "cat_002",
    vendorId: "vnd_001",
    name: "Day 1 — Networking Lunch",
    description: "Gourmet box lunches with premium sandwich options, salads, and sides served during the networking break.",
    type: "Boxed Lunch",
    pricePerPerson: 32,
    minGuests: 100,
    maxGuests: 600,
    items: [
      "Turkey Club Sandwich",
      "Caprese Panini (V)",
      "Mediterranean Grain Bowl (VG)",
      "Mixed Green Side Salad",
      "Kettle Chips",
      "Cookie assortment",
      "Iced Tea & Coffee",
    ],
    dietary: ["vegetarian", "vegan", "gluten-free", "nut-free"],
    eventId: "evt_001",
    scheduledDate: "2026-03-15T12:30:00Z",
    servings: 420,
    status: "confirmed",
  },
  {
    id: "cat_003",
    vendorId: "vnd_001",
    name: "Day 2 — Executive Breakfast",
    description: "Premium breakfast spread with hot items, pastries, fresh juice, and specialty coffee for VIP and speaker attendees.",
    type: "Breakfast Buffet",
    pricePerPerson: 28,
    minGuests: 50,
    maxGuests: 200,
    items: [
      "Eggs Benedict",
      "Avocado Toast",
      "Fresh Croissants & Danish",
      "Yogurt Parfaits",
      "Smoked Salmon Platter",
      "Fresh Squeezed Juices",
      "Specialty Coffee Bar",
      "Fruit Smoothies",
    ],
    dietary: ["vegetarian", "gluten-free"],
    eventId: "evt_001",
    scheduledDate: "2026-03-16T07:30:00Z",
    servings: 150,
    status: "planned",
  },
  {
    id: "cat_004",
    vendorId: "vnd_001",
    name: "VIP Dinner — Day 2",
    description: "Three-course plated dinner for VIP guests and speakers at an exclusive rooftop venue.",
    type: "Plated Dinner",
    pricePerPerson: 85,
    minGuests: 40,
    maxGuests: 80,
    items: [
      "Starter: Burrata with Heirloom Tomatoes",
      "Main: Pan-Seared Salmon with Risotto",
      "Main: Filet Mignon with Truffle Mash",
      "Dessert: Chocolate Lava Cake",
      "Wine & Cocktail Pairings",
      "Artisan Bread Service",
    ],
    dietary: ["vegetarian", "gluten-free"],
    eventId: "evt_001",
    scheduledDate: "2026-03-16T19:00:00Z",
    servings: 72,
    status: "planned",
  },
  {
    id: "cat_005",
    vendorId: "vnd_001",
    name: "Day 3 — Closing Celebration",
    description: "Casual food truck-style lunch with tacos, sliders, and bowls for the closing celebration.",
    type: "Food Stations",
    pricePerPerson: 38,
    minGuests: 100,
    maxGuests: 400,
    items: [
      "Street Taco Station",
      "Gourmet Slider Bar",
      "Buddha Bowl Station",
      "Mac & Cheese Bar",
      "Churros & Dessert Table",
      "Fresh Lemonade & Iced Coffee",
    ],
    dietary: ["vegetarian", "vegan", "gluten-free"],
    eventId: "evt_001",
    scheduledDate: "2026-03-17T12:00:00Z",
    servings: 350,
    status: "planned",
  },
  {
    id: "cat_006",
    vendorId: "vnd_001",
    name: "Workshop Day — Light Bites",
    description: "Snack and refreshment stations throughout the workshop area including coffee, tea, and healthy snacks.",
    type: "Snack Stations",
    pricePerPerson: 15,
    minGuests: 30,
    maxGuests: 100,
    items: [
      "Fresh Coffee & Tea",
      "Energy Bars & Granola",
      "Fresh Fruit",
      "Trail Mix & Nuts",
      "Sparkling Water",
      "Cookies & Biscotti",
    ],
    dietary: ["vegetarian", "vegan", "gluten-free"],
    eventId: "evt_002",
    scheduledDate: "2026-04-10T10:00:00Z",
    servings: 80,
    status: "planned",
  },
];

// -----------------------------------------------------------------------------
// MOCK_ACCOMMODATIONS (6)
// -----------------------------------------------------------------------------

export const MOCK_ACCOMMODATIONS: Accommodation[] = [
  {
    id: "acc_001",
    hotelName: "The St. Regis San Francisco",
    address: "125 3rd Street",
    city: "San Francisco",
    starRating: 5,
    roomBlocks: [
      { roomType: "Deluxe King", count: 30, ratePerNight: 320 },
      { roomType: "Premium Suite", count: 10, ratePerNight: 550 },
    ],
    contactName: "Maria Gonzalez",
    contactEmail: "groups@stregis.com",
    contactPhone: "+1 (415) 555-4001",
    checkInDate: "2026-03-14",
    checkOutDate: "2026-03-18",
    negotiatedRate: 320,
    totalCost: 44800,
    status: "confirmed",
  },
  {
    id: "acc_002",
    hotelName: "Hotel Nikko San Francisco",
    address: "222 Mason Street",
    city: "San Francisco",
    starRating: 4,
    roomBlocks: [
      { roomType: "Standard King", count: 45, ratePerNight: 210 },
      { roomType: "Deluxe Double", count: 20, ratePerNight: 260 },
    ],
    contactName: "Kevin Yamamoto",
    contactEmail: "groups@hotelnikko.com",
    contactPhone: "+1 (415) 555-4002",
    checkInDate: "2026-03-14",
    checkOutDate: "2026-03-18",
    negotiatedRate: 210,
    totalCost: 46200,
    status: "confirmed",
  },
  {
    id: "acc_003",
    hotelName: "W San Francisco",
    address: "181 3rd Street",
    city: "San Francisco",
    starRating: 4,
    roomBlocks: [
      { roomType: "Wonderful Room", count: 25, ratePerNight: 280 },
      { roomType: "Marvelous Suite", count: 8, ratePerNight: 480 },
    ],
    contactName: "Sarah Chen",
    contactEmail: "events@whotels.com",
    contactPhone: "+1 (415) 555-4003",
    checkInDate: "2026-03-14",
    checkOutDate: "2026-03-18",
    negotiatedRate: 280,
    totalCost: 36400,
    status: "reserved",
  },
  {
    id: "acc_004",
    hotelName: "Hilton San Francisco Union Square",
    address: "333 O'Farrell Street",
    city: "San Francisco",
    starRating: 4,
    roomBlocks: [
      { roomType: "King Room", count: 60, ratePerNight: 195 },
      { roomType: "Double Queen", count: 30, ratePerNight: 225 },
    ],
    contactName: "Tom Richards",
    contactEmail: "groups@hiltonsf.com",
    contactPhone: "+1 (415) 555-4004",
    checkInDate: "2026-03-14",
    checkOutDate: "2026-03-18",
    negotiatedRate: 195,
    totalCost: 55800,
    status: "confirmed",
  },
  {
    id: "acc_005",
    hotelName: "InterContinental San Francisco",
    address: "888 Howard Street",
    city: "San Francisco",
    starRating: 5,
    roomBlocks: [
      { roomType: "Classic Room", count: 20, ratePerNight: 350 },
      { roomType: "Executive Suite", count: 6, ratePerNight: 600 },
    ],
    contactName: "Laura Martinez",
    contactEmail: "events@icsanfrancisco.com",
    contactPhone: "+1 (415) 555-4005",
    checkInDate: "2026-03-14",
    checkOutDate: "2026-03-18",
    negotiatedRate: 350,
    totalCost: 32400,
    status: "confirmed",
  },
  {
    id: "acc_006",
    hotelName: "Hotel Zephyr Fisherman's Wharf",
    address: "2500 Mason Street",
    city: "San Francisco",
    starRating: 3,
    roomBlocks: [
      { roomType: "Zephyr King", count: 40, ratePerNight: 165 },
      { roomType: "Standard Double", count: 20, ratePerNight: 185 },
    ],
    contactName: "Jake Morrison",
    contactEmail: "groups@hotelzephyr.com",
    contactPhone: "+1 (415) 555-4006",
    checkInDate: "2026-03-14",
    checkOutDate: "2026-03-18",
    negotiatedRate: 165,
    totalCost: 37400,
    status: "reserved",
  },
];

// -----------------------------------------------------------------------------
// MOCK_CAMPAIGNS (6)
// -----------------------------------------------------------------------------

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "cmp_001",
    name: "Early Bird Launch Blast",
    description: "Massive email campaign to announce early bird ticket sales with 40% discount for the first 500 registrations.",
    channel: "email",
    status: "completed",
    sent: 45000,
    delivered: 43200,
    opened: 18500,
    clicked: 6200,
    conversions: 1850,
    revenue: 738150,
    cost: 2500,
    startDate: "2025-10-01T00:00:00Z",
    endDate: "2025-10-15T23:59:59Z",
    targetAudience: "Past attendees + Tech newsletter subscribers",
    content: "Early bird pricing now available! Save 40% on TechVision Summit 2026 tickets. Limited to the first 500 registrations.",
  },
  {
    id: "cmp_002",
    name: "Social Media Countdown",
    description: "30-day social media campaign across LinkedIn, Twitter, and Instagram with daily speaker reveals and countdown posts.",
    channel: "social",
    status: "completed",
    sent: 90,
    delivered: 88,
    opened: 45000,
    clicked: 8900,
    conversions: 320,
    revenue: 191680,
    cost: 15000,
    startDate: "2026-02-13T00:00:00Z",
    endDate: "2026-03-15T08:00:00Z",
    targetAudience: "Tech professionals, developers, and AI enthusiasts",
    content: "Speaker reveals, behind-the-scenes content, and daily countdown to TechVision Summit 2026.",
  },
  {
    id: "cmp_003",
    name: "Google Ads — Tech Professionals",
    description: "Targeted Google Ads campaign focused on developers, engineers, and tech managers searching for conferences.",
    channel: "paid",
    status: "completed",
    sent: 0,
    delivered: 0,
    opened: 285000,
    clicked: 12800,
    conversions: 640,
    revenue: 383360,
    cost: 28000,
    startDate: "2026-01-15T00:00:00Z",
    endDate: "2026-03-10T23:59:59Z",
    targetAudience: "Software engineers, tech leads, CTOs",
    content: "Search and display ads for 'tech conferences 2026', 'AI conference', 'developer summit'",
  },
  {
    id: "cmp_004",
    name: "VIP Early Access Invitations",
    description: "Exclusive email campaign to previous VIP ticket holders with early access to premium tickets and special perks.",
    channel: "email",
    status: "completed",
    sent: 1200,
    delivered: 1180,
    opened: 980,
    clicked: 720,
    conversions: 285,
    revenue: 342000,
    cost: 500,
    startDate: "2025-10-15T00:00:00Z",
    endDate: "2025-10-30T23:59:59Z",
    targetAudience: "Previous VIP attendees (2024 and 2025)",
    content: "You're invited! Exclusive early access to VIP tickets for TechVision Summit 2026. Be the first to secure your spot.",
  },
  {
    id: "cmp_005",
    name: "Partner Cross-Promotion",
    description: "Co-marketing campaign with sponsor companies promoting the event through their employee networks and channels.",
    channel: "direct",
    status: "in-progress",
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    conversions: 0,
    revenue: 0,
    cost: 5000,
    startDate: "2026-02-01T00:00:00Z",
    endDate: "2026-03-15T08:00:00Z",
    targetAudience: "Employees of sponsor companies",
    content: "Your company is a sponsor! Use your exclusive partner discount code for TechVision Summit tickets.",
  },
  {
    id: "cmp_006",
    name: "SMS Last-Minute Reminder",
    description: "SMS campaign to registered attendees with event logistics, schedule highlights, and last-minute information.",
    channel: "sms",
    status: "scheduled",
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    conversions: 0,
    revenue: 0,
    cost: 800,
    startDate: "2026-03-14T08:00:00Z",
    endDate: "2026-03-15T07:00:00Z",
    targetAudience: "All registered attendees",
    content: "TechVision Summit starts tomorrow! Check-in opens at 8 AM. Your schedule is ready at eventcraft.io/schedule",
  },
];

// -----------------------------------------------------------------------------
// MOCK_PROMOTIONS (6)
// -----------------------------------------------------------------------------

export const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: "promo_001",
    code: "EARLYBIRD40",
    name: "Early Bird 40% Off",
    description: "40% discount on General Admission tickets during early bird period.",
    discountType: "percentage",
    discountValue: 40,
    minPurchase: 0,
    maxUses: 500,
    usedCount: 500,
    startDate: "2025-10-01T00:00:00Z",
    endDate: "2025-12-31T23:59:59Z",
    status: "expired",
    applicableTickets: ["tkt_002"],
  },
  {
    id: "promo_002",
    code: "STUDENT50",
    name: "Student Discount",
    description: "50% off for verified students with valid student ID.",
    discountType: "percentage",
    discountValue: 50,
    minPurchase: 0,
    maxUses: 300,
    usedCount: 170,
    startDate: "2026-01-01T00:00:00Z",
    endDate: "2026-03-14T23:59:59Z",
    status: "active",
    applicableTickets: ["tkt_005"],
  },
  {
    id: "promo_003",
    code: "GROUP2026",
    name: "Group Discount",
    description: "20% off for groups of 5 or more tickets.",
    discountType: "percentage",
    discountValue: 20,
    minPurchase: 5,
    maxUses: 100,
    usedCount: 42,
    startDate: "2026-01-01T00:00:00Z",
    endDate: "2026-03-10T23:59:59Z",
    status: "active",
    applicableTickets: ["tkt_002", "tkt_006"],
  },
  {
    id: "promo_004",
    code: "SPONSOR100",
    name: "Sponsor Partner Discount",
    description: " off any ticket for employees of sponsor companies.",
    discountType: "fixed",
    discountValue: 100,
    minPurchase: 200,
    maxUses: 500,
    usedCount: 89,
    startDate: "2026-01-15T00:00:00Z",
    endDate: "2026-03-14T23:59:59Z",
    status: "active",
    applicableTickets: ["tkt_001", "tkt_002", "tkt_003"],
  },
  {
    id: "promo_005",
    code: "REFERAFRIEND",
    name: "Refer a Friend",
    description: "Buy one get one 50% off when you refer a colleague.",
    discountType: "bogo",
    discountValue: 50,
    minPurchase: 0,
    maxUses: 200,
    usedCount: 67,
    startDate: "2026-02-01T00:00:00Z",
    endDate: "2026-03-12T23:59:59Z",
    status: "active",
    applicableTickets: ["tkt_002", "tkt_003"],
  },
  {
    id: "promo_006",
    code: "LASTCHANCE",
    name: "Last Chance Offer",
    description: "15% off remaining tickets in the final week before the event.",
    discountType: "percentage",
    discountValue: 15,
    minPurchase: 0,
    maxUses: 200,
    usedCount: 0,
    startDate: "2026-03-08T00:00:00Z",
    endDate: "2026-03-14T23:59:59Z",
    status: "active",
    applicableTickets: ["tkt_002", "tkt_004", "tkt_007"],
  },
];

// -----------------------------------------------------------------------------
// MOCK_MERCHANDISE (8)
// -----------------------------------------------------------------------------

export const MOCK_MERCHANDISE: Merchandise[] = [
  {
    id: "mer_001",
    name: "TechVision Summit Hoodie",
    description: "Premium zip-up hoodie with embroidered TechVision logo and event branding. Available in multiple colors.",
    category: "Apparel",
    price: 65,
    stock: 500,
    sold: 342,
    revenue: 22230,
    image: "/images/merch/hoodie.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal", "Navy"],
    sku: "TV-HOODIE-2026",
    eventId: "evt_001",
  },
  {
    id: "mer_002",
    name: "EventCraft T-Shirt",
    description: "100% organic cotton t-shirt with minimalist TechVision design. Sustainable and comfortable.",
    category: "Apparel",
    price: 35,
    stock: 1000,
    sold: 567,
    revenue: 19845,
    image: "/images/merch/tshirt.jpg",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Rose", "Slate"],
    sku: "TV-TSHIRT-2026",
    eventId: "evt_001",
  },
  {
    id: "mer_003",
    name: "Conference Backpack",
    description: "Durable tech backpack with padded laptop compartment, USB charging port, and event branding.",
    category: "Accessories",
    price: 89,
    stock: 300,
    sold: 198,
    revenue: 17622,
    image: "/images/merch/backpack.jpg",
    sizes: ["One Size"],
    colors: ["Black", "Gray"],
    sku: "TV-BACKPACK-2026",
    eventId: "evt_001",
  },
  {
    id: "mer_004",
    name: "Enamel Pin Set",
    description: "Collectible set of 5 enamel pins featuring AI, cloud, code, circuit, and rocket motifs.",
    category: "Collectibles",
    price: 22,
    stock: 800,
    sold: 456,
    revenue: 10032,
    image: "/images/merch/pinset.jpg",
    sizes: ["One Size"],
    colors: ["Multi"],
    sku: "TV-PINS-2026",
    eventId: "evt_001",
  },
  {
    id: "mer_005",
    name: "Insulated Water Bottle",
    description: "Double-wall vacuum insulated water bottle. Keeps drinks cold 24h or hot 12h. Laser-etched logo.",
    category: "Drinkware",
    price: 28,
    stock: 600,
    sold: 312,
    revenue: 8736,
    image: "/images/merch/bottle.jpg",
    sizes: ["24oz", "32oz"],
    colors: ["Matte Black", "Stainless Steel", "Rose Gold"],
    sku: "TV-BOTTLE-2026",
    eventId: "evt_001",
  },
  {
    id: "mer_006",
    name: "Premium Notebook",
    description: "A5 hardcover notebook with dot grid pages, ribbon bookmark, and pen loop. Faux leather cover.",
    category: "Stationery",
    price: 18,
    stock: 500,
    sold: 289,
    revenue: 5202,
    image: "/images/merch/notebook.jpg",
    sizes: ["A5"],
    colors: ["Black", "Burgundy", "Forest Green"],
    sku: "TV-NOTEBOOK-2026",
    eventId: "evt_001",
  },
  {
    id: "mer_007",
    name: "Wireless Charging Pad",
    description: "Sleek Qi-certified wireless charging pad with event branding. Compatible with all Qi-enabled devices.",
    category: "Tech",
    price: 32,
    stock: 400,
    sold: 178,
    revenue: 5696,
    image: "/images/merch/charger.jpg",
    sizes: ["One Size"],
    colors: ["White", "Black"],
    sku: "TV-CHARGER-2026",
    eventId: "evt_001",
  },
  {
    id: "mer_008",
    name: "Sticker Pack",
    description: "Die-cut vinyl sticker pack with 12 unique designs. Waterproof and UV-resistant.",
    category: "Collectibles",
    price: 12,
    stock: 1500,
    sold: 834,
    revenue: 10008,
    image: "/images/merch/stickers.jpg",
    sizes: ["One Size"],
    colors: ["Multi"],
    sku: "TV-STICKERS-2026",
    eventId: "evt_001",
  },
];

// -----------------------------------------------------------------------------
// MOCK_FLOOR_PLANS (4)
// -----------------------------------------------------------------------------

export const MOCK_FLOOR_PLANS: FloorPlan[] = [
  {
    id: "fp_001",
    name: "Main Hall — Level 1",
    venueId: "ven_001",
    level: "Ground Floor",
    image: "/images/floorplans/main-hall-l1.svg",
    width: 1200,
    height: 800,
    zones: [
      { id: "zone_001", name: "Main Stage", type: "stage", x: 50, y: 50, width: 400, height: 200, capacity: 3000, currentOccupancy: 0 },
      { id: "zone_002", name: "Audience Area", type: "seating", x: 50, y: 270, width: 400, height: 480, capacity: 2800, currentOccupancy: 0 },
      { id: "zone_003", name: "Sponsor Village", type: "exhibition", x: 500, y: 50, width: 350, height: 350, capacity: 200, currentOccupancy: 0 },
      { id: "zone_004", name: "Food Court", type: "food", x: 500, y: 420, width: 350, height: 200, capacity: 300, currentOccupancy: 0 },
      { id: "zone_005", name: "Registration Desk", type: "service", x: 900, y: 50, width: 250, height: 120, capacity: 50, currentOccupancy: 0 },
      { id: "zone_006", name: "Lounge Area", type: "lounge", x: 900, y: 200, width: 250, height: 200, capacity: 80, currentOccupancy: 0 },
      { id: "zone_007", name: "Restrooms", type: "utility", x: 900, y: 650, width: 250, height: 100, capacity: 30, currentOccupancy: 0 },
      { id: "zone_008", name: "Emergency Exit", type: "exit", x: 1150, y: 400, width: 50, height: 80, capacity: 0, currentOccupancy: 0 },
    ],
  },
  {
    id: "fp_002",
    name: "Breakout Rooms — Level 2",
    venueId: "ven_001",
    level: "Second Floor",
    image: "/images/floorplans/breakout-l2.svg",
    width: 1000,
    height: 600,
    zones: [
      { id: "zone_009", name: "Room 201", type: "session", x: 50, y: 50, width: 280, height: 200, capacity: 300, currentOccupancy: 0 },
      { id: "zone_010", name: "Room 202", type: "session", x: 50, y: 280, width: 280, height: 200, capacity: 200, currentOccupancy: 0 },
      { id: "zone_011", name: "Room 301", type: "session", x: 370, y: 50, width: 280, height: 200, capacity: 250, currentOccupancy: 0 },
      { id: "zone_012", name: "Room 302", type: "session", x: 370, y: 280, width: 280, height: 200, capacity: 250, currentOccupancy: 0 },
      { id: "zone_013", name: "Workshop Lab 1", type: "workshop", x: 690, y: 50, width: 260, height: 200, capacity: 60, currentOccupancy: 0 },
      { id: "zone_014", name: "Workshop Lab 2", type: "workshop", x: 690, y: 280, width: 260, height: 200, capacity: 50, currentOccupancy: 0 },
      { id: "zone_015", name: "Speaker Green Room", type: "greenroom", x: 370, y: 510, width: 280, height: 80, capacity: 20, currentOccupancy: 0 },
      { id: "zone_016", name: "Hallway", type: "corridor", x: 50, y: 510, width: 280, height: 80, capacity: 100, currentOccupancy: 0 },
    ],
  },
  {
    id: "fp_003",
    name: "Expo Floor — Level 3",
    venueId: "ven_001",
    level: "Third Floor",
    image: "/images/floorplans/expo-l3.svg",
    width: 1100,
    height: 700,
    zones: [
      { id: "zone_017", name: "Google Cloud Pavilion", type: "booth", x: 50, y: 50, width: 300, height: 200, capacity: 100, currentOccupancy: 0 },
      { id: "zone_018", name: "Microsoft Azure Zone", type: "booth", x: 400, y: 50, width: 300, height: 200, capacity: 100, currentOccupancy: 0 },
      { id: "zone_019", name: "Startup Alley", type: "booth", x: 750, y: 50, width: 300, height: 200, capacity: 50, currentOccupancy: 0 },
      { id: "zone_020", name: "Demo Stage", type: "stage", x: 50, y: 280, width: 500, height: 150, capacity: 200, currentOccupancy: 0 },
      { id: "zone_021", name: "Networking Hub", type: "lounge", x: 600, y: 280, width: 450, height: 150, capacity: 150, currentOccupancy: 0 },
      { id: "zone_022", name: "Coffee Station", type: "food", x: 50, y: 460, width: 200, height: 100, capacity: 40, currentOccupancy: 0 },
      { id: "zone_023", name: "Charging Lounge", type: "service", x: 300, y: 460, width: 200, height: 100, capacity: 30, currentOccupancy: 0 },
    ],
  },
  {
    id: "fp_004",
    name: "Terrace & Outdoor — Level 4",
    venueId: "ven_001",
    level: "Rooftop",
    image: "/images/floorplans/terrace-l4.svg",
    width: 800,
    height: 500,
    zones: [
      { id: "zone_024", name: "Outdoor Stage", type: "stage", x: 50, y: 50, width: 300, height: 150, capacity: 500, currentOccupancy: 0 },
      { id: "zone_025", name: "Seating Area", type: "seating", x: 50, y: 220, width: 300, height: 200, capacity: 300, currentOccupancy: 0 },
      { id: "zone_026", name: "Sunset Bar", type: "food", x: 400, y: 50, width: 350, height: 150, capacity: 80, currentOccupancy: 0 },
      { id: "zone_027", name: "VIP Lounge", type: "lounge", x: 400, y: 220, width: 350, height: 200, capacity: 50, currentOccupancy: 0 },
      { id: "zone_028", name: "Photo Opportunity Wall", type: "photo", x: 50, y: 440, width: 700, height: 50, capacity: 20, currentOccupancy: 0 },
    ],
  },
];

// -----------------------------------------------------------------------------
// MOCK_CHECKINS (10)
// -----------------------------------------------------------------------------

export const MOCK_CHECKINS: CheckIn[] = [
  {
    id: "chk_001",
    attendeeId: "att_001",
    eventId: "evt_001",
    timestamp: "2026-03-15T08:42:15Z",
    method: "qr",
    stationId: "station_001",
    status: "success",
    checkedInBy: "Auto",
    notes: "VIP fast-track lane",
  },
  {
    id: "chk_002",
    attendeeId: "att_002",
    eventId: "evt_001",
    timestamp: "2026-03-15T08:55:30Z",
    method: "qr",
    stationId: "station_001",
    status: "success",
    checkedInBy: "Auto",
    notes: "",
  },
  {
    id: "chk_003",
    attendeeId: "att_003",
    eventId: "evt_001",
    timestamp: "2026-03-15T09:02:45Z",
    method: "qr",
    stationId: "station_002",
    status: "success",
    checkedInBy: "Auto",
    notes: "",
  },
  {
    id: "chk_004",
    attendeeId: "att_004",
    eventId: "evt_001",
    timestamp: "2026-03-15T08:30:05Z",
    method: "manual",
    stationId: "station_003",
    status: "success",
    checkedInBy: "Staff: Maria L.",
    notes: "VIP — early arrival",
  },
  {
    id: "chk_005",
    attendeeId: "att_006",
    eventId: "evt_001",
    timestamp: "2026-03-15T09:10:22Z",
    method: "nfc",
    stationId: "station_001",
    status: "success",
    checkedInBy: "Auto",
    notes: "",
  },
  {
    id: "chk_006",
    attendeeId: "att_007",
    eventId: "evt_001",
    timestamp: "2026-03-15T09:15:10Z",
    method: "qr",
    stationId: "station_002",
    status: "success",
    checkedInBy: "Auto",
    notes: "",
  },
  {
    id: "chk_007",
    attendeeId: "att_009",
    eventId: "evt_001",
    timestamp: "2026-03-15T08:50:40Z",
    method: "qr",
    stationId: "station_001",
    status: "success",
    checkedInBy: "Auto",
    notes: "Manager check-in for team of 8",
  },
  {
    id: "chk_008",
    attendeeId: "att_010",
    eventId: "evt_001",
    timestamp: "2026-03-15T09:20:18Z",
    method: "self",
    stationId: "station_004",
    status: "success",
    checkedInBy: "Self-Service Kiosk",
    notes: "",
  },
  {
    id: "chk_009",
    attendeeId: "att_012",
    eventId: "evt_001",
    timestamp: "2026-03-15T09:25:33Z",
    method: "qr",
    stationId: "station_002",
    status: "success",
    checkedInBy: "Auto",
    notes: "",
  },
  {
    id: "chk_010",
    attendeeId: "att_013",
    eventId: "evt_001",
    timestamp: "2026-03-15T08:35:55Z",
    method: "manual",
    stationId: "station_003",
    status: "success",
    checkedInBy: "Staff: James K.",
    notes: "VIP early check-in",
  },
];

// -----------------------------------------------------------------------------
// MOCK_FEEDBACK (8 surveys)
// -----------------------------------------------------------------------------

export const MOCK_FEEDBACK: Feedback[] = [
  {
    id: "fb_001",
    eventId: "evt_001",
    attendeeId: "att_001",
    overallRating: 5,
    contentRating: 5,
    venueRating: 4,
    speakerRating: 5,
    cateringRating: 4,
    organizationRating: 5,
    wouldRecommend: true,
    comments: "Absolutely fantastic event! The AI sessions were world-class. Dr. Okafor's keynote was inspiring.",
    improvementSuggestions: "Could use more charging stations in the main hall area.",
    submittedAt: "2026-03-17T14:30:00Z",
  },
  {
    id: "fb_002",
    eventId: "evt_001",
    attendeeId: "att_002",
    overallRating: 4,
    contentRating: 5,
    venueRating: 4,
    speakerRating: 4,
    cateringRating: 3,
    organizationRating: 4,
    wouldRecommend: true,
    comments: "Great technical content. The Kubernetes ML pipeline session was exactly what I needed. Good networking opportunities.",
    improvementSuggestions: "Lunch lines were too long. Could use more food stations or staggered lunch breaks.",
    submittedAt: "2026-03-17T16:45:00Z",
  },
  {
    id: "fb_003",
    eventId: "evt_001",
    attendeeId: "att_003",
    overallRating: 5,
    contentRating: 5,
    venueRating: 5,
    speakerRating: 5,
    cateringRating: 5,
    organizationRating: 5,
    wouldRecommend: true,
    comments: "Best conference I've attended in years. The workshop on React Server Components was hands-on and immediately applicable.",
    improvementSuggestions: "Honestly nothing major. Maybe a mobile app for the schedule?",
    submittedAt: "2026-03-17T18:20:00Z",
  },
  {
    id: "fb_004",
    eventId: "evt_001",
    attendeeId: "att_006",
    overallRating: 4,
    contentRating: 4,
    venueRating: 3,
    speakerRating: 5,
    cateringRating: 4,
    organizationRating: 4,
    wouldRecommend: true,
    comments: "Loved the WASM session by Yuki Tanaka. Very informative and well-presented. The venue was nice but got crowded during breaks.",
    improvementSuggestions: "Better signage for room navigation. Some sessions were hard to find.",
    submittedAt: "2026-03-17T15:10:00Z",
  },
  {
    id: "fb_005",
    eventId: "evt_001",
    attendeeId: "att_009",
    overallRating: 5,
    contentRating: 5,
    venueRating: 5,
    speakerRating: 5,
    cateringRating: 4,
    organizationRating: 5,
    wouldRecommend: true,
    comments: "Excellent event management. Brought my team of 8 and everyone found sessions relevant to their work. The VIP dinner was outstanding.",
    improvementSuggestions: "Group seating area would be nice for teams attending together.",
    submittedAt: "2026-03-17T17:00:00Z",
  },
  {
    id: "fb_006",
    eventId: "evt_001",
    attendeeId: "att_010",
    overallRating: 3,
    contentRating: 4,
    venueRating: 3,
    speakerRating: 3,
    cateringRating: 2,
    organizationRating: 3,
    wouldRecommend: true,
    comments: "Good content overall. The startup pitch session was entertaining. Some sessions felt more like product pitches than educational content.",
    improvementSuggestions: "Better vetting of session content to ensure educational value. More diverse speaker lineup in some tracks.",
    submittedAt: "2026-03-17T19:30:00Z",
  },
  {
    id: "fb_007",
    eventId: "evt_001",
    attendeeId: "att_013",
    overallRating: 5,
    contentRating: 5,
    venueRating: 4,
    speakerRating: 5,
    cateringRating: 5,
    organizationRating: 5,
    wouldRecommend: true,
    comments: "The networking opportunities were incredible. Met three potential collaborators for our next project. The fireside chat was very authentic.",
    improvementSuggestions: "The Wi-Fi was spotty during peak hours. Need more bandwidth for 3000 attendees.",
    submittedAt: "2026-03-17T20:15:00Z",
  },
  {
    id: "fb_008",
    eventId: "evt_001",
    attendeeId: "att_015",
    overallRating: 4,
    contentRating: 4,
    venueRating: 5,
    speakerRating: 4,
    cateringRating: 4,
    organizationRating: 4,
    wouldRecommend: true,
    comments: "Very well organized event. The design systems workshop was practical and engaging. Great venue choice.",
    improvementSuggestions: "Would love to see more design-focused tracks. The UX content was limited compared to engineering sessions.",
    submittedAt: "2026-03-17T13:45:00Z",
  },
];

// -----------------------------------------------------------------------------
// MOCK_BUDGET (10 line items)
// -----------------------------------------------------------------------------

export const MOCK_BUDGET: BudgetItem[] = [
  {
    id: "bud_001",
    eventId: "evt_001",
    category: "Venue",
    description: "Moscone Center West — 5-day rental (setup + event + teardown)",
    budgetedAmount: 180000,
    actualAmount: 185000,
    variance: 5000,
    status: "spent",
    vendor: "Moscone Center",
    dueDate: "2026-02-01",
    paidDate: "2026-02-05",
    notes: "Included overtime fee for extended setup on Day -2",
  },
  {
    id: "bud_002",
    eventId: "evt_001",
    category: "AV & Production",
    description: "Full AV production — sound, lighting, screens, live streaming",
    budgetedAmount: 85000,
    actualAmount: 82000,
    variance: -3000,
    status: "spent",
    vendor: "Apex AV Solutions",
    dueDate: "2026-03-20",
    paidDate: "2026-03-22",
    notes: "Under budget due to equipment reuse from previous event",
  },
  {
    id: "bud_003",
    eventId: "evt_001",
    category: "Catering",
    description: "All meals, snacks, and beverages for 3-day event (est. 2500 attendees)",
    budgetedAmount: 195000,
    actualAmount: 188500,
    variance: -6500,
    status: "spent",
    vendor: "In-House + Apex AV",
    dueDate: "2026-03-25",
    paidDate: "2026-03-28",
    notes: "Lower than expected due to 10% no-show rate",
  },
  {
    id: "bud_004",
    eventId: "evt_001",
    category: "Marketing",
    description: "Digital marketing, social media ads, Google Ads, email campaigns",
    budgetedAmount: 65000,
    actualAmount: 52000,
    variance: -13000,
    status: "spent",
    vendor: "Multiple (Google, LinkedIn, Meta)",
    dueDate: "2026-03-15",
    paidDate: "2026-03-15",
    notes: "Organic reach exceeded expectations reducing paid spend needed",
  },
  {
    id: "bud_005",
    eventId: "evt_001",
    category: "Speaker Fees",
    description: "Speaker honorariums, travel, and accommodation for 32 speakers",
    budgetedAmount: 120000,
    actualAmount: 115000,
    variance: -5000,
    status: "spent",
    vendor: "Various Speakers",
    dueDate: "2026-03-30",
    paidDate: "2026-04-01",
    notes: "Two speakers waived fees in exchange for sponsorship exposure",
  },
  {
    id: "bud_006",
    eventId: "evt_001",
    category: "Security",
    description: "Event security, bag checks, credentialing, and crowd management",
    budgetedAmount: 42000,
    actualAmount: 42000,
    variance: 0,
    status: "spent",
    vendor: "SecureAll Events",
    dueDate: "2026-03-25",
    paidDate: "2026-03-25",
    notes: "Fixed contract — no variance",
  },
  {
    id: "bud_007",
    eventId: "evt_001",
    category: "Technology",
    description: "Check-in system, event app, WiFi upgrade, equipment rental",
    budgetedAmount: 55000,
    actualAmount: 48000,
    variance: -7000,
    status: "spent",
    vendor: "TechRent Pro + Internal",
    dueDate: "2026-03-22",
    paidDate: "2026-03-22",
    notes: "Used existing check-in hardware reducing rental costs",
  },
  {
    id: "bud_008",
    eventId: "evt_001",
    category: "Décor & Signage",
    description: "Stage design, banners, directional signage, floral arrangements",
    budgetedAmount: 25000,
    actualAmount: 18000,
    variance: -7000,
    status: "spent",
    vendor: "Bloom Florals & Decor",
    dueDate: "2026-03-18",
    paidDate: "2026-03-18",
    notes: "Simplified design saved costs while maintaining quality",
  },
  {
    id: "bud_009",
    eventId: "evt_001",
    category: "Swag & Merchandise",
    description: "Conference swag bags, branded merchandise, speaker gifts",
    budgetedAmount: 45000,
    actualAmount: 41000,
    variance: -4000,
    status: "spent",
    vendor: "Various",
    dueDate: "2026-03-10",
    paidDate: "2026-03-10",
    notes: "Bulk ordering discount applied",
  },
  {
    id: "bud_010",
    eventId: "evt_001",
    category: "Contingency",
    description: "Emergency fund for unexpected costs and last-minute needs",
    budgetedAmount: 38000,
    actualAmount: 48500,
    variance: 10500,
    status: "over-budget",
    vendor: "Various",
    dueDate: "2026-03-31",
    paidDate: null,
    notes: "Over budget due to emergency WiFi bandwidth upgrade on Day 1 and additional security for VIP visit",
  },
];

// -----------------------------------------------------------------------------
// MOCK_REVENUE (9 months)
// -----------------------------------------------------------------------------

export const MOCK_REVENUE: RevenueRecord[] = [
  {
    month: "2025-07",
    tickets: 15000,
    sponsors: 0,
    merchandise: 2500,
    concessions: 0,
    other: 1200,
    total: 18700,
    expenses: 12000,
    profit: 6700,
  },
  {
    month: "2025-08",
    tickets: 42000,
    sponsors: 75000,
    merchandise: 8000,
    concessions: 0,
    other: 3500,
    total: 128500,
    expenses: 85000,
    profit: 43500,
  },
  {
    month: "2025-09",
    tickets: 68000,
    sponsors: 50000,
    merchandise: 12000,
    concessions: 0,
    other: 5000,
    total: 135000,
    expenses: 92000,
    profit: 43000,
  },
  {
    month: "2025-10",
    tickets: 199500,
    sponsors: 35000,
    merchandise: 18000,
    concessions: 0,
    other: 8000,
    total: 260500,
    expenses: 120000,
    profit: 140500,
  },
  {
    month: "2025-11",
    tickets: 85000,
    sponsors: 60000,
    merchandise: 22000,
    concessions: 4500,
    other: 6000,
    total: 177500,
    expenses: 98000,
    profit: 79500,
  },
  {
    month: "2025-12",
    tickets: 45000,
    sponsors: 25000,
    merchandise: 35000,
    concessions: 3000,
    other: 12000,
    total: 120000,
    expenses: 75000,
    profit: 45000,
  },
  {
    month: "2026-01",
    tickets: 310000,
    sponsors: 95000,
    merchandise: 28000,
    concessions: 0,
    other: 15000,
    total: 448000,
    expenses: 210000,
    profit: 238000,
  },
  {
    month: "2026-02",
    tickets: 180000,
    sponsors: 40000,
    merchandise: 32000,
    concessions: 12000,
    other: 8000,
    total: 272000,
    expenses: 165000,
    profit: 107000,
  },
  {
    month: "2026-03",
    tickets: 450000,
    sponsors: 180000,
    merchandise: 90000,
    concessions: 85000,
    other: 45000,
    total: 850000,
    expenses: 620000,
    profit: 230000,
  },
];

// -----------------------------------------------------------------------------
// MOCK_ACTIVITY (10)
// -----------------------------------------------------------------------------

export const MOCK_ACTIVITY: Activity[] = [
  {
    id: "act_001",
    type: "registration",
    title: "New Registration",
    description: "Emily Watson (Google) registered for VIP Pass",
    timestamp: "2026-03-15T08:42:00Z",
    user: "Emily Watson",
    avatar: "/images/avatars/emily.jpg",
    eventId: "evt_001",
    metadata: { ticketType: "VIP Pass", amount: ",200" },
  },
  {
    id: "act_002",
    type: "payment",
    title: "Payment Received",
    description: "Group payment of ,495 from Microsoft team (5 tickets)",
    timestamp: "2026-03-14T16:30:00Z",
    user: "David Nguyen",
    avatar: "/images/avatars/david.jpg",
    eventId: "evt_001",
    metadata: { amount: ",495", tickets: "5 General Admission" },
  },
  {
    id: "act_003",
    type: "checkin",
    title: "VIP Check-In",
    description: "Michael Brown checked in via VIP fast-track lane",
    timestamp: "2026-03-15T08:30:05Z",
    user: "Michael Brown",
    avatar: "/images/avatars/michael.jpg",
    eventId: "evt_001",
    metadata: { method: "Manual", station: "VIP Lane" },
  },
  {
    id: "act_004",
    type: "email",
    title: "Campaign Sent",
    description: "SMS Last-Minute Reminder campaign scheduled for 2,347 recipients",
    timestamp: "2026-03-14T10:00:00Z",
    user: "System",
    avatar: "/images/avatars/system.jpg",
    eventId: "evt_001",
    metadata: { campaign: "SMS Last-Minute Reminder", recipients: "2,347" },
  },
  {
    id: "act_005",
    type: "update",
    title: "Session Updated",
    description: "Room change: 'Zero Trust Architecture' moved to Room 302",
    timestamp: "2026-03-14T14:15:00Z",
    user: "Admin",
    avatar: "/images/avatars/admin.jpg",
    eventId: "evt_001",
    metadata: { session: "Zero Trust Architecture", oldRoom: "Room 201", newRoom: "Room 302" },
  },
  {
    id: "act_006",
    type: "sponsor",
    title: "Sponsor Confirmed",
    description: "DigitalOcean confirmed Silver sponsorship (,000)",
    timestamp: "2026-03-13T09:00:00Z",
    user: "Kevin Park",
    avatar: "/images/avatars/kevin_p.jpg",
    eventId: "evt_001",
    metadata: { sponsor: "DigitalOcean", tier: "Silver", amount: ",000" },
  },
  {
    id: "act_007",
    type: "comment",
    title: "Feedback Received",
    description: "5-star feedback from Emily Watson: 'Absolutely fantastic event!'",
    timestamp: "2026-03-17T14:30:00Z",
    user: "Emily Watson",
    avatar: "/images/avatars/emily.jpg",
    eventId: "evt_001",
    metadata: { rating: "5/5", comment: "Absolutely fantastic event!" },
  },
  {
    id: "act_008",
    type: "refund",
    title: "Refund Processed",
    description: "Kevin O'Brien — refund of  for cancelled registration",
    timestamp: "2026-03-12T11:00:00Z",
    user: "Kevin O'Brien",
    avatar: "/images/avatars/kevin.jpg",
    eventId: "evt_001",
    metadata: { amount: "", reason: "Schedule conflict" },
  },
  {
    id: "act_009",
    type: "registration",
    title: "Bulk Registration",
    description: "Atlassian team registered 8 members with Premium Passes",
    timestamp: "2026-03-11T08:00:00Z",
    user: "Priya Ramanathan",
    avatar: "/images/avatars/priya_r.jpg",
    eventId: "evt_001",
    metadata: { ticketType: "Premium Pass", count: "8", amount: ",992" },
  },
  {
    id: "act_010",
    type: "payment",
    title: "Sponsor Payment",
    description: "Google Cloud wire transfer of ,000 received",
    timestamp: "2026-03-10T15:45:00Z",
    user: "Rachel Adams",
    avatar: "/images/avatars/rachel_a.jpg",
    eventId: "evt_001",
    metadata: { sponsor: "Google Cloud", amount: ",000", method: "Wire Transfer" },
  },
];

// -----------------------------------------------------------------------------
// MOCK_NOTIFICATIONS (6)
// -----------------------------------------------------------------------------

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif_001",
    title: "Ticket Sales Milestone",
    message: "TechVision Summit 2026 has reached 2,000 ticket sales! Only 1,000 spots remaining.",
    type: "success",
    read: false,
    timestamp: "2026-03-15T10:00:00Z",
    action: { label: "View Sales", href: "/revenue/tickets" },
  },
  {
    id: "notif_002",
    title: "Sponsor Payment Pending",
    message: "MongoDB Silver sponsorship payment of ,000 is still pending. Due date: March 20.",
    type: "warning",
    read: false,
    timestamp: "2026-03-14T09:00:00Z",
    action: { label: "View Sponsors", href: "/revenue/sponsors" },
  },
  {
    id: "notif_003",
    title: "Low Stock Alert",
    message: "TechVision Summit Hoodies — only 158 units remaining in stock. Best seller!",
    type: "info",
    read: true,
    timestamp: "2026-03-13T14:00:00Z",
    action: { label: "View Merchandise", href: "/revenue/merchandise" },
  },
  {
    id: "notif_004",
    title: "New Feedback Received",
    message: "8 new feedback surveys submitted for TechVision Summit. Average rating: 4.6/5.",
    type: "info",
    read: true,
    timestamp: "2026-03-17T20:15:00Z",
    action: { label: "View Feedback", href: "/on-site/feedback" },
  },
  {
    id: "notif_005",
    title: "Vendor Contract Expiring",
    message: "Contract with SnapShot Photo Booth expires in 7 days. Renew or find alternative.",
    type: "warning",
    read: false,
    timestamp: "2026-03-14T11:00:00Z",
    action: { label: "View Vendors", href: "/operations/vendors" },
  },
  {
    id: "notif_006",
    title: "Event Check-In Started",
    message: "TechVision Summit check-in is now live. 127 attendees checked in so far.",
    type: "success",
    read: true,
    timestamp: "2026-03-15T09:00:00Z",
    action: { label: "Live Dashboard", href: "/on-site/check-in" },
  },
];

// -----------------------------------------------------------------------------
// MOCK_STAFF (8)
// -----------------------------------------------------------------------------

export const MOCK_STAFF: Staff[] = [
  {
    id: "stf_001",
    firstName: "Maria",
    lastName: "Lopez",
    email: "maria.lopez@eventcraft.io",
    phone: "+1 (415) 555-5001",
    role: "Event Director",
    department: "Leadership",
    avatar: "/images/staff/maria.jpg",
    shiftStart: "2026-03-15T06:00:00Z",
    shiftEnd: "2026-03-15T22:00:00Z",
    assignedArea: "All Areas",
    status: "on-duty",
    permissions: ["admin", "check-in", "vendors", "finance", "reports"],
  },
  {
    id: "stf_002",
    firstName: "James",
    lastName: "Kim",
    email: "james.kim@eventcraft.io",
    phone: "+1 (415) 555-5002",
    role: "Operations Manager",
    department: "Operations",
    avatar: "/images/staff/james_k.jpg",
    shiftStart: "2026-03-15T06:30:00Z",
    shiftEnd: "2026-03-15T21:00:00Z",
    assignedArea: "Venue & Logistics",
    status: "on-duty",
    permissions: ["check-in", "vendors", "reports"],
  },
  {
    id: "stf_003",
    firstName: "Sarah",
    lastName: "Chen",
    email: "sarah.chen@eventcraft.io",
    phone: "+1 (415) 555-5003",
    role: "Registration Lead",
    department: "Front Desk",
    avatar: "/images/staff/sarah_c.jpg",
    shiftStart: "2026-03-15T07:00:00Z",
    shiftEnd: "2026-03-15T18:00:00Z",
    assignedArea: "Registration & Check-In",
    status: "on-duty",
    permissions: ["check-in", "attendees"],
  },
  {
    id: "stf_004",
    firstName: "Tom",
    lastName: "Wilson",
    email: "tom.wilson@eventcraft.io",
    phone: "+1 (415) 555-5004",
    role: "AV Technician",
    department: "Technical",
    avatar: "/images/staff/tom_w.jpg",
    shiftStart: "2026-03-15T05:00:00Z",
    shiftEnd: "2026-03-15T20:00:00Z",
    assignedArea: "Stage & AV",
    status: "on-duty",
    permissions: ["av-control", "sessions"],
  },
  {
    id: "stf_005",
    firstName: "Lisa",
    lastName: "Park",
    email: "lisa.park@eventcraft.io",
    phone: "+1 (415) 555-5005",
    role: "Marketing Coordinator",
    department: "Marketing",
    avatar: "/images/staff/lisa_p.jpg",
    shiftStart: "2026-03-15T08:00:00Z",
    shiftEnd: "2026-03-15T19:00:00Z",
    assignedArea: "Social Media & Content",
    status: "on-duty",
    permissions: ["marketing", "reports"],
  },
  {
    id: "stf_006",
    firstName: "Derek",
    lastName: "Okafor",
    email: "derek.okafor@eventcraft.io",
    phone: "+1 (415) 555-5006",
    role: "Security Lead",
    department: "Security",
    avatar: "/images/staff/derek.jpg",
    shiftStart: "2026-03-15T05:30:00Z",
    shiftEnd: "2026-03-15T23:00:00Z",
    assignedArea: "All Entrances & VIP",
    status: "on-duty",
    permissions: ["security", "check-in", "reports"],
  },
  {
    id: "stf_007",
    firstName: "Amy",
    lastName: "Garcia",
    email: "amy.garcia@eventcraft.io",
    phone: "+1 (415) 555-5007",
    role: "Speaker Liaison",
    department: "Content",
    avatar: "/images/staff/amy.jpg",
    shiftStart: "2026-03-15T07:30:00Z",
    shiftEnd: "2026-03-15T19:30:00Z",
    assignedArea: "Green Room & Speaker Areas",
    status: "on-duty",
    permissions: ["speakers", "sessions"],
  },
  {
    id: "stf_008",
    firstName: "Carlos",
    lastName: "Rivera",
    email: "carlos.rivera@eventcraft.io",
    phone: "+1 (415) 555-5008",
    role: "Volunteer Coordinator",
    department: "Volunteers",
    avatar: "/images/staff/carlos.jpg",
    shiftStart: "2026-03-15T07:00:00Z",
    shiftEnd: "2026-03-15T18:00:00Z",
    assignedArea: "Volunteer Stations",
    status: "break",
    permissions: ["check-in", "attendees"],
  },
];

// -----------------------------------------------------------------------------
// MOCK_API_KEYS (3)
// -----------------------------------------------------------------------------

export const MOCK_API_KEYS: ApiKey[] = [
  {
    id: "key_001",
    name: "Production API Key",
    key: "evt_prod_sk_7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p",
    prefix: "evt_prod_sk_7a8b",
    permissions: ["events:read", "events:write", "attendees:read", "attendees:write", "tickets:read", "tickets:write"],
    createdAt: "2025-06-15T10:00:00Z",
    lastUsedAt: "2026-03-15T09:30:00Z",
    expiresAt: null,
    status: "active",
    requestsToday: 1247,
    rateLimit: 10000,
  },
  {
    id: "key_002",
    name: "Staging API Key",
    key: "evt_test_sk_x9y8z7w6v5u4t3s2r1q0p9o8n7m6l5k4",
    prefix: "evt_test_sk_x9y8",
    permissions: ["events:read", "attendees:read", "tickets:read"],
    createdAt: "2026-01-10T14:00:00Z",
    lastUsedAt: "2026-03-14T22:15:00Z",
    expiresAt: "2026-12-31T23:59:59Z",
    status: "active",
    requestsToday: 89,
    rateLimit: 1000,
  },
  {
    id: "key_003",
    name: "Deprecated Integration Key",
    key: "evt_old_sk_m4n3o2p1q0r9s8t7u6v5w4x3y2z1a0b",
    prefix: "evt_old_sk_m4n3",
    permissions: ["events:read"],
    createdAt: "2024-03-01T08:00:00Z",
    lastUsedAt: "2025-06-30T16:45:00Z",
    expiresAt: "2025-12-31T23:59:59Z",
    status: "revoked",
    requestsToday: 0,
    rateLimit: 500,
  },
];
