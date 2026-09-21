// ─── Events ───────────────────────────────────────────────────────────────────
export interface MockEvent {
  id: string;
  name: string;
  date: string;
  endDate: string;
  time: string;
  venue: string;
  venueId: string;
  status: 'draft' | 'published' | 'live' | 'completed' | 'cancelled';
  category: string;
  budget: number;
  revenue: number;
  attendance: number;
  maxCapacity: number;
  ticketsSold: number;
  tags: string[];
}

export const MOCK_EVENTS: MockEvent[] = [
  {
    id: 'evt-001',
    name: 'AI & Machine Learning Summit 2026',
    date: '2026-03-15',
    endDate: '2026-03-17',
    time: '09:00 AM – 6:00 PM',
    venue: 'Grand Horizon Convention Center',
    venueId: 'ven-001',
    status: 'live',
    category: 'Technology',
    budget: 12000000,
    revenue: 18950000,
    attendance: 545,
    maxCapacity: 800,
    ticketsSold: 545,
    tags: ['AI', 'Machine Learning', 'Keynote'],
  },
  {
    id: 'evt-002',
    name: 'CloudNative Conference',
    date: '2026-04-22',
    endDate: '2026-04-22',
    time: '10:00 AM – 5:00 PM',
    venue: 'Skyline Auditorium',
    venueId: 'ven-002',
    status: 'published',
    category: 'Technology',
    budget: 5500000,
    revenue: 3200000,
    attendance: 0,
    maxCapacity: 300,
    ticketsSold: 120,
    tags: ['Cloud', 'DevOps', 'Containers'],
  },
  {
    id: 'evt-003',
    name: 'UX Design Workshop',
    date: '2026-02-28',
    endDate: '2026-02-28',
    time: '2:00 PM – 6:00 PM',
    venue: 'Design Hub Studio',
    venueId: 'ven-003',
    status: 'completed',
    category: 'Design',
    budget: 1800000,
    revenue: 6650000,
    attendance: 75,
    maxCapacity: 100,
    ticketsSold: 75,
    tags: ['UX', 'Design', 'Workshop'],
  },
  {
    id: 'evt-004',
    name: 'Blockchain & Web3 Expo',
    date: '2026-05-10',
    endDate: '2026-05-11',
    time: '11:00 AM – 7:00 PM',
    venue: 'Metaverse Pavilion',
    venueId: 'ven-004',
    status: 'published',
    category: 'Technology',
    budget: 8000000,
    revenue: 5000000,
    attendance: 0,
    maxCapacity: 550,
    ticketsSold: 260,
    tags: ['Blockchain', 'Web3', 'NFT'],
  },
  {
    id: 'evt-005',
    name: 'Startup Pitch Night',
    date: '2026-03-01',
    endDate: '2026-03-01',
    time: '6:00 PM – 10:00 PM',
    venue: 'Innovation Center',
    venueId: 'ven-005',
    status: 'cancelled',
    category: 'Business',
    budget: 2500000,
    revenue: 0,
    attendance: 0,
    maxCapacity: 200,
    ticketsSold: 0,
    tags: ['Startup', 'Pitch', 'Networking'],
  },
  {
    id: 'evt-006',
    name: 'Data Science Bootcamp',
    date: '2026-06-15',
    endDate: '2026-06-16',
    time: '09:00 AM – 5:00 PM',
    venue: 'Tech Campus B',
    venueId: 'ven-001',
    status: 'draft',
    category: 'Education',
    budget: 3200000,
    revenue: 0,
    attendance: 0,
    maxCapacity: 50,
    ticketsSold: 0,
    tags: ['Data Science', 'Python', 'Bootcamp'],
  },
  {
    id: 'evt-007',
    name: 'Digital Marketing Masterclass',
    date: '2026-07-20',
    endDate: '2026-07-20',
    time: '1:00 PM – 5:00 PM',
    venue: 'Skyline Auditorium',
    venueId: 'ven-002',
    status: 'published',
    category: 'Marketing',
    budget: 2000000,
    revenue: 1500000,
    attendance: 0,
    maxCapacity: 150,
    ticketsSold: 85,
    tags: ['Marketing', 'SEO', 'Social Media'],
  },
  {
    id: 'evt-008',
    name: 'Creative Writing Retreat',
    date: '2026-08-05',
    endDate: '2026-08-07',
    time: '10:00 AM – 4:00 PM',
    venue: 'Lakeside Lodge',
    venueId: 'ven-006',
    status: 'draft',
    category: 'Arts',
    budget: 4500000,
    revenue: 0,
    attendance: 0,
    maxCapacity: 30,
    ticketsSold: 0,
    tags: ['Writing', 'Creative', 'Retreat'],
  },
];

// ─── Venues ───────────────────────────────────────────────────────────────────
export interface MockVenue {
  id: string;
  name: string;
  address: string;
  city: string;
  capacity: number;
  costPerDay: number;
  rating: number;
  totalReviews: number;
  amenities: string[];
  availability: Record<string, 'available' | 'booked' | 'partial'>;
  imageUrl?: string;
}

export const MOCK_VENUES: MockVenue[] = [
  {
    id: 'ven-001',
    name: 'Grand Horizon Convention Center',
    address: '1200 Convention Way',
    city: 'San Francisco, CA',
    capacity: 2500,
    costPerDay: 15000000,
    rating: 4.8,
    totalReviews: 342,
    amenities: ['WiFi', 'AV Equipment', 'Catering', 'Parking', 'Stage', 'Green Room'],
    availability: {
      '2026-09-01': 'available',
      '2026-09-02': 'booked',
      '2026-09-03': 'available',
      '2026-09-04': 'available',
      '2026-09-05': 'booked',
      '2026-09-06': 'partial',
      '2026-09-07': 'available',
      '2026-09-08': 'available',
      '2026-09-09': 'booked',
      '2026-09-10': 'available',
      '2026-09-11': 'available',
      '2026-09-12': 'partial',
      '2026-09-13': 'available',
      '2026-09-14': 'booked',
      '2026-09-15': 'available',
      '2026-09-16': 'available',
      '2026-09-17': 'booked',
      '2026-09-18': 'available',
      '2026-09-19': 'available',
      '2026-09-20': 'available',
      '2026-09-21': 'available',
      '2026-09-22': 'booked',
      '2026-09-23': 'available',
      '2026-09-24': 'available',
      '2026-09-25': 'partial',
      '2026-09-26': 'available',
      '2026-09-27': 'available',
      '2026-09-28': 'booked',
      '2026-09-29': 'available',
      '2026-09-30': 'available',
    },
  },
  {
    id: 'ven-002',
    name: 'Skyline Auditorium',
    address: '450 Skyline Blvd',
    city: 'New York, NY',
    capacity: 800,
    costPerDay: 8000000,
    rating: 4.5,
    totalReviews: 189,
    amenities: ['WiFi', 'AV Equipment', 'Parking', 'Accessibility'],
    availability: {
      '2026-09-01': 'available',
      '2026-09-02': 'available',
      '2026-09-03': 'booked',
      '2026-09-04': 'available',
      '2026-09-05': 'available',
      '2026-09-06': 'available',
      '2026-09-07': 'partial',
      '2026-09-08': 'available',
      '2026-09-09': 'available',
      '2026-09-10': 'booked',
      '2026-09-11': 'available',
      '2026-09-12': 'available',
      '2026-09-13': 'booked',
      '2026-09-14': 'available',
      '2026-09-15': 'available',
      '2026-09-16': 'partial',
      '2026-09-17': 'available',
      '2026-09-18': 'booked',
      '2026-09-19': 'available',
      '2026-09-20': 'available',
      '2026-09-21': 'available',
      '2026-09-22': 'available',
      '2026-09-23': 'booked',
      '2026-09-24': 'available',
      '2026-09-25': 'available',
      '2026-09-26': 'available',
      '2026-09-27': 'partial',
      '2026-09-28': 'available',
      '2026-09-29': 'booked',
      '2026-09-30': 'available',
    },
  },
  {
    id: 'ven-003',
    name: 'Design Hub Studio',
    address: '88 Creative Lane',
    city: 'Austin, TX',
    capacity: 120,
    costPerDay: 3000000,
    rating: 4.9,
    totalReviews: 97,
    amenities: ['WiFi', 'AV Equipment', 'Whiteboard', 'Coffee Bar', 'Natural Light'],
    availability: {
      '2026-09-01': 'available',
      '2026-09-02': 'available',
      '2026-09-03': 'available',
      '2026-09-04': 'booked',
      '2026-09-05': 'available',
      '2026-09-06': 'available',
      '2026-09-07': 'available',
      '2026-09-08': 'booked',
      '2026-09-09': 'available',
      '2026-09-10': 'available',
      '2026-09-11': 'booked',
      '2026-09-12': 'available',
      '2026-09-13': 'available',
      '2026-09-14': 'available',
      '2026-09-15': 'available',
      '2026-09-16': 'booked',
      '2026-09-17': 'available',
      '2026-09-18': 'available',
      '2026-09-19': 'available',
      '2026-09-20': 'booked',
      '2026-09-21': 'available',
      '2026-09-22': 'available',
      '2026-09-23': 'available',
      '2026-09-24': 'booked',
      '2026-09-25': 'available',
      '2026-09-26': 'available',
      '2026-09-27': 'available',
      '2026-09-28': 'available',
      '2026-09-29': 'booked',
      '2026-09-30': 'available',
    },
  },
  {
    id: 'ven-004',
    name: 'Metaverse Pavilion',
    address: '1 Innovation Drive',
    city: 'Miami, FL',
    capacity: 1200,
    costPerDay: 10000000,
    rating: 4.3,
    totalReviews: 156,
    amenities: ['WiFi', 'AV Equipment', 'Catering', 'Parking', 'Outdoor Space', 'VR Stations'],
    availability: {
      '2026-09-01': 'booked',
      '2026-09-02': 'available',
      '2026-09-03': 'available',
      '2026-09-04': 'booked',
      '2026-09-05': 'available',
      '2026-09-06': 'available',
      '2026-09-07': 'booked',
      '2026-09-08': 'available',
      '2026-09-09': 'partial',
      '2026-09-10': 'available',
      '2026-09-11': 'booked',
      '2026-09-12': 'available',
      '2026-09-13': 'available',
      '2026-09-14': 'booked',
      '2026-09-15': 'available',
      '2026-09-16': 'available',
      '2026-09-17': 'available',
      '2026-09-18': 'booked',
      '2026-09-19': 'available',
      '2026-09-20': 'booked',
      '2026-09-21': 'available',
      '2026-09-22': 'available',
      '2026-09-23': 'available',
      '2026-09-24': 'booked',
      '2026-09-25': 'available',
      '2026-09-26': 'available',
      '2026-09-27': 'booked',
      '2026-09-28': 'available',
      '2026-09-29': 'available',
      '2026-09-30': 'available',
    },
  },
  {
    id: 'ven-005',
    name: 'Innovation Center',
    address: '77 Startup Way',
    city: 'San Francisco, CA',
    capacity: 250,
    costPerDay: 5000000,
    rating: 4.6,
    totalReviews: 213,
    amenities: ['WiFi', 'AV Equipment', 'Co-working Space', 'Coffee Bar', 'Meeting Rooms'],
    availability: {
      '2026-09-01': 'available',
      '2026-09-02': 'booked',
      '2026-09-03': 'booked',
      '2026-09-04': 'available',
      '2026-09-05': 'available',
      '2026-09-06': 'booked',
      '2026-09-07': 'available',
      '2026-09-08': 'available',
      '2026-09-09': 'available',
      '2026-09-10': 'booked',
      '2026-09-11': 'available',
      '2026-09-12': 'available',
      '2026-09-13': 'booked',
      '2026-09-14': 'available',
      '2026-09-15': 'available',
      '2026-09-16': 'available',
      '2026-09-17': 'booked',
      '2026-09-18': 'available',
      '2026-09-19': 'booked',
      '2026-09-20': 'available',
      '2026-09-21': 'available',
      '2026-09-22': 'available',
      '2026-09-23': 'booked',
      '2026-09-24': 'available',
      '2026-09-25': 'booked',
      '2026-09-26': 'available',
      '2026-09-27': 'available',
      '2026-09-28': 'available',
      '2026-09-29': 'booked',
      '2026-09-30': 'available',
    },
  },
  {
    id: 'ven-006',
    name: 'Lakeside Lodge',
    address: '200 Lakeview Trail',
    city: 'Lake Tahoe, NV',
    capacity: 40,
    costPerDay: 6000000,
    rating: 4.9,
    totalReviews: 64,
    amenities: ['WiFi', 'Catering', 'Outdoor Space', 'Fireplace', 'Kitchen', 'Parking'],
    availability: {
      '2026-09-01': 'available',
      '2026-09-02': 'available',
      '2026-09-03': 'available',
      '2026-09-04': 'available',
      '2026-09-05': 'booked',
      '2026-09-06': 'booked',
      '2026-09-07': 'available',
      '2026-09-08': 'available',
      '2026-09-09': 'available',
      '2026-09-10': 'available',
      '2026-09-11': 'available',
      '2026-09-12': 'available',
      '2026-09-13': 'booked',
      '2026-09-14': 'booked',
      '2026-09-15': 'available',
      '2026-09-16': 'available',
      '2026-09-17': 'available',
      '2026-09-18': 'available',
      '2026-09-19': 'available',
      '2026-09-20': 'available',
      '2026-09-21': 'booked',
      '2026-09-22': 'booked',
      '2026-09-23': 'available',
      '2026-09-24': 'available',
      '2026-09-25': 'available',
      '2026-09-26': 'available',
      '2026-09-27': 'available',
      '2026-09-28': 'booked',
      '2026-09-29': 'available',
      '2026-09-30': 'available',
    },
  },
];

// ─── Sessions ─────────────────────────────────────────────────────────────────
export type TrackColor = 'rose' | 'violet' | 'teal' | 'amber' | 'sky' | 'emerald';

export interface MockSession {
  id: string;
  title: string;
  description: string;
  speaker: string;
  speakerId: string;
  eventId: string;
  eventName: string;
  track: string;
  trackColor: TrackColor;
  room: string;
  startTime: string;
  endTime: string;
  date: string;
  attendeeCount: number;
  maxAttendees: number;
  status: 'draft' | 'scheduled' | 'live' | 'completed' | 'cancelled';
}

export const MOCK_SESSIONS: MockSession[] = [
  {
    id: 'ses-001',
    title: 'Keynote: The Future of AI in Everyday Life',
    description: 'An inspiring look at how artificial intelligence is transforming daily experiences.',
    speaker: 'Dr. Sarah Chen',
    speakerId: 'spk-001',
    eventId: 'evt-001',
    eventName: 'AI & ML Summit 2026',
    track: 'Keynote',
    trackColor: 'rose',
    room: 'Main Hall A',
    startTime: '09:00',
    endTime: '10:00',
    date: '2026-03-15',
    attendeeCount: 520,
    maxAttendees: 800,
    status: 'completed',
  },
  {
    id: 'ses-002',
    title: 'Building Scalable ML Pipelines',
    description: 'Deep dive into production-grade machine learning infrastructure.',
    speaker: 'James Rodriguez',
    speakerId: 'spk-002',
    eventId: 'evt-001',
    eventName: 'AI & ML Summit 2026',
    track: 'Engineering',
    trackColor: 'violet',
    room: 'Room B2',
    startTime: '10:30',
    endTime: '11:30',
    date: '2026-03-15',
    attendeeCount: 185,
    maxAttendees: 200,
    status: 'completed',
  },
  {
    id: 'ses-003',
    title: 'Ethics in Artificial Intelligence',
    description: 'Exploring the moral implications of AI deployment in society.',
    speaker: 'Prof. Amira Osei',
    speakerId: 'spk-003',
    eventId: 'evt-001',
    eventName: 'AI & ML Summit 2026',
    track: 'Ethics',
    trackColor: 'teal',
    room: 'Room C1',
    startTime: '10:30',
    endTime: '12:00',
    date: '2026-03-15',
    attendeeCount: 130,
    maxAttendees: 150,
    status: 'completed',
  },
  {
    id: 'ses-004',
    title: 'Hands-on: Fine-tuning LLMs',
    description: 'Workshop on customizing large language models for domain-specific tasks.',
    speaker: 'James Rodriguez',
    speakerId: 'spk-002',
    eventId: 'evt-001',
    eventName: 'AI & ML Summit 2026',
    track: 'Workshop',
    trackColor: 'amber',
    room: 'Lab 1',
    startTime: '14:00',
    endTime: '16:00',
    date: '2026-03-15',
    attendeeCount: 48,
    maxAttendees: 50,
    status: 'completed',
  },
  {
    id: 'ses-005',
    title: 'Kubernetes at Scale',
    description: 'Managing container orchestration at enterprise scale.',
    speaker: 'Mike Chang',
    speakerId: 'spk-004',
    eventId: 'evt-002',
    eventName: 'CloudNative Conference',
    track: 'Infrastructure',
    trackColor: 'sky',
    room: 'Auditorium',
    startTime: '10:00',
    endTime: '11:00',
    date: '2026-04-22',
    attendeeCount: 0,
    maxAttendees: 300,
    status: 'scheduled',
  },
  {
    id: 'ses-006',
    title: 'GitOps in Practice',
    description: 'Implementing GitOps workflows for continuous deployment.',
    speaker: 'Lisa Park',
    speakerId: 'spk-005',
    eventId: 'evt-002',
    eventName: 'CloudNative Conference',
    track: 'DevOps',
    trackColor: 'emerald',
    room: 'Room 2',
    startTime: '11:30',
    endTime: '12:30',
    date: '2026-04-22',
    attendeeCount: 0,
    maxAttendees: 120,
    status: 'scheduled',
  },
  {
    id: 'ses-007',
    title: 'Design Systems That Scale',
    description: 'Building and maintaining design systems across large organizations.',
    speaker: 'Emily Nakamura',
    speakerId: 'spk-006',
    eventId: 'evt-003',
    eventName: 'UX Design Workshop',
    track: 'Design',
    trackColor: 'rose',
    room: 'Studio A',
    startTime: '14:00',
    endTime: '15:30',
    date: '2026-02-28',
    attendeeCount: 72,
    maxAttendees: 75,
    status: 'completed',
  },
  {
    id: 'ses-008',
    title: 'Zero Knowledge Proofs Explained',
    description: 'Understanding ZK-proofs and their applications in blockchain.',
    speaker: 'Dr. Sarah Chen',
    speakerId: 'spk-001',
    eventId: 'evt-004',
    eventName: 'Blockchain & Web3 Expo',
    track: 'Blockchain',
    trackColor: 'violet',
    room: 'Stage 1',
    startTime: '11:00',
    endTime: '12:30',
    date: '2026-05-10',
    attendeeCount: 0,
    maxAttendees: 400,
    status: 'scheduled',
  },
  {
    id: 'ses-009',
    title: 'Intro to Data Pipelines with Python',
    description: 'Building robust ETL pipelines using pandas and Apache Airflow.',
    speaker: 'Lisa Park',
    speakerId: 'spk-005',
    eventId: 'evt-006',
    eventName: 'Data Science Bootcamp',
    track: 'Data',
    trackColor: 'teal',
    room: 'Classroom 1',
    startTime: '09:00',
    endTime: '12:00',
    date: '2026-06-15',
    attendeeCount: 0,
    maxAttendees: 50,
    status: 'draft',
  },
  {
    id: 'ses-010',
    title: 'SEO Strategies for 2026',
    description: 'Emerging SEO techniques and algorithm updates to watch.',
    speaker: 'Emily Nakamura',
    speakerId: 'spk-006',
    eventId: 'evt-007',
    eventName: 'Digital Marketing Masterclass',
    track: 'Marketing',
    trackColor: 'amber',
    room: 'Main Room',
    startTime: '13:00',
    endTime: '14:30',
    date: '2026-07-20',
    attendeeCount: 0,
    maxAttendees: 150,
    status: 'scheduled',
  },
];

// ─── Speakers ─────────────────────────────────────────────────────────────────
export interface MockSpeaker {
  id: string;
  name: string;
  email: string;
  title: string;
  company: string;
  bio: string;
  avatarColor: string;
  initials: string;
  sessionsCount: number;
  rating: number;
  totalReviews: number;
  fee: number;
  topics: string[];
  socialLinks?: { platform: string; url: string }[];
}

export const MOCK_SPEAKERS: MockSpeaker[] = [
  {
    id: 'spk-001',
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@example.com',
    title: 'Chief AI Scientist',
    company: 'NeuralForge Labs',
    bio: 'Leading researcher in artificial intelligence with over 15 years of experience in machine learning and neural networks. Published 50+ papers in top-tier conferences.',
    avatarColor: '#e11d48',
    initials: 'SC',
    sessionsCount: 3,
    rating: 4.9,
    totalReviews: 287,
    fee: 1500000,
    topics: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks', 'Ethics in AI'],
  },
  {
    id: 'spk-002',
    name: 'James Rodriguez',
    email: 'james.r@example.com',
    title: 'Principal ML Engineer',
    company: 'CloudScale Inc.',
    bio: 'Expert in building production ML systems that serve millions of predictions per second. Former tech lead at Google Brain and Meta AI.',
    avatarColor: '#7c3aed',
    initials: 'JR',
    sessionsCount: 4,
    rating: 4.7,
    totalReviews: 198,
    fee: 1200000,
    topics: ['Machine Learning', 'MLOps', 'Distributed Systems', 'Python'],
  },
  {
    id: 'spk-003',
    name: 'Prof. Amira Osei',
    email: 'amira.o@example.com',
    title: 'Professor of AI Ethics',
    company: 'Stanford University',
    bio: 'Award-winning professor specializing in the intersection of technology and ethics. Author of "Responsible AI: A Practical Guide."',
    avatarColor: '#0891b2',
    initials: 'AO',
    sessionsCount: 2,
    rating: 4.8,
    totalReviews: 156,
    fee: 800000,
    topics: ['AI Ethics', 'Technology Policy', 'Responsible AI', 'Social Impact'],
  },
  {
    id: 'spk-004',
    name: 'Mike Chang',
    email: 'mike.c@example.com',
    title: 'Cloud Architect',
    company: 'Kubernetes Core',
    bio: 'Infrastructure expert with deep knowledge of Kubernetes, service meshes, and cloud-native architecture. CNCF Ambassador.',
    avatarColor: '#d97706',
    initials: 'MC',
    sessionsCount: 5,
    rating: 4.6,
    totalReviews: 234,
    fee: 900000,
    topics: ['Kubernetes', 'Cloud Architecture', 'DevOps', 'Infrastructure'],
  },
  {
    id: 'spk-005',
    name: 'Lisa Park',
    email: 'lisa.p@example.com',
    title: 'Senior Data Engineer',
    company: 'DataStream Co.',
    bio: 'Passionate about data engineering and open-source tools. Core contributor to Apache Airflow and dbt.',
    avatarColor: '#059669',
    initials: 'LP',
    sessionsCount: 3,
    rating: 4.5,
    totalReviews: 142,
    fee: 700000,
    topics: ['Data Engineering', 'Python', 'Apache Airflow', 'ETL'],
  },
  {
    id: 'spk-006',
    name: 'Emily Nakamura',
    email: 'emily.n@example.com',
    title: 'Head of Design',
    company: 'PixelPerfect Agency',
    bio: 'Design leader with experience building design systems used by thousands of designers worldwide. Speaker at Config, Figma Community leader.',
    avatarColor: '#db2777',
    initials: 'EN',
    sessionsCount: 2,
    rating: 4.9,
    totalReviews: 312,
    fee: 1000000,
    topics: ['Design Systems', 'UX Research', 'Figma', 'Accessibility'],
  },
  {
    id: 'spk-007',
    name: 'Dr. Raj Patel',
    email: 'raj.p@example.com',
    title: 'Blockchain Researcher',
    company: 'CryptoLedger Foundation',
    bio: 'Pioneer in zero-knowledge proofs and decentralized applications. PhD from MIT in cryptography.',
    avatarColor: '#4f46e5',
    initials: 'RP',
    sessionsCount: 2,
    rating: 4.7,
    totalReviews: 98,
    fee: 1100000,
    topics: ['Blockchain', 'Cryptography', 'Zero-Knowledge Proofs', 'Web3'],
  },
  {
    id: 'spk-008',
    name: 'Olivia Martinez',
    email: 'olivia.m@example.com',
    title: 'Marketing Director',
    company: 'GrowthHack Digital',
    bio: 'Digital marketing strategist who has helped 200+ startups scale their online presence. Google & Meta certified.',
    avatarColor: '#ea580c',
    initials: 'OM',
    sessionsCount: 3,
    rating: 4.4,
    totalReviews: 176,
    fee: 600000,
    topics: ['Digital Marketing', 'SEO', 'Social Media', 'Content Strategy'],
  },
];

// ─── Attendees ────────────────────────────────────────────────────────────────
export type TicketType = 'General' | 'VIP' | 'Student' | 'Speaker' | 'Sponsor';

export interface MockAttendee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ticketType: TicketType;
  checkedIn: boolean;
  checkInTime?: string;
  sessionsRegistered: string[];
  dietaryRestrictions: string;
  registrationDate: string;
  eventId: string;
  eventName: string;
  company: string;
}

export const MOCK_ATTENDEES: MockAttendee[] = [
  {
    id: 'att-001',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@gmail.com',
    phone: '+1 (415) 555-0101',
    ticketType: 'VIP',
    checkedIn: true,
    checkInTime: '2026-03-15T08:42:00',
    sessionsRegistered: ['ses-001', 'ses-002', 'ses-004'],
    dietaryRestrictions: 'Vegetarian',
    registrationDate: '2026-01-10',
    eventId: 'evt-001',
    eventName: 'AI & ML Summit 2026',
    company: 'TechCorp',
  },
  {
    id: 'att-002',
    firstName: 'Bob',
    lastName: 'Williams',
    email: 'bob.williams@outlook.com',
    phone: '+1 (212) 555-0202',
    ticketType: 'General',
    checkedIn: true,
    checkInTime: '2026-03-15T08:55:00',
    sessionsRegistered: ['ses-001', 'ses-003'],
    dietaryRestrictions: 'None',
    registrationDate: '2026-01-22',
    eventId: 'evt-001',
    eventName: 'AI & ML Summit 2026',
    company: 'DataFlow Inc.',
  },
  {
    id: 'att-003',
    firstName: 'Carla',
    lastName: 'Diaz',
    email: 'carla.diaz@company.com',
    phone: '+1 (512) 555-0303',
    ticketType: 'Student',
    checkedIn: true,
    checkInTime: '2026-03-15T09:10:00',
    sessionsRegistered: ['ses-001', 'ses-002', 'ses-003', 'ses-004'],
    dietaryRestrictions: 'Gluten-free',
    registrationDate: '2026-02-05',
    eventId: 'evt-001',
    eventName: 'AI & ML Summit 2026',
    company: 'UT Austin',
  },
  {
    id: 'att-004',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@startup.io',
    phone: '+1 (310) 555-0404',
    ticketType: 'General',
    checkedIn: false,
    sessionsRegistered: ['ses-001', 'ses-002'],
    dietaryRestrictions: 'Vegan',
    registrationDate: '2026-02-14',
    eventId: 'evt-001',
    eventName: 'AI & ML Summit 2026',
    company: 'Neural Startup',
  },
  {
    id: 'att-005',
    firstName: 'Elena',
    lastName: 'Petrova',
    email: 'elena.p@corp.com',
    phone: '+1 (650) 555-0505',
    ticketType: 'VIP',
    checkedIn: true,
    checkInTime: '2026-03-15T08:30:00',
    sessionsRegistered: ['ses-001', 'ses-002', 'ses-003', 'ses-004'],
    dietaryRestrictions: 'None',
    registrationDate: '2026-01-05',
    eventId: 'evt-001',
    eventName: 'AI & ML Summit 2026',
    company: 'MegaSoft',
  },
  {
    id: 'att-006',
    firstName: 'Frank',
    lastName: 'O\'Brien',
    email: 'frank.obrien@uni.edu',
    phone: '+1 (773) 555-0606',
    ticketType: 'Student',
    checkedIn: false,
    sessionsRegistered: ['ses-001'],
    dietaryRestrictions: 'Nut allergy',
    registrationDate: '2026-02-28',
    eventId: 'evt-001',
    eventName: 'AI & ML Summit 2026',
    company: 'University of Chicago',
  },
  {
    id: 'att-007',
    firstName: 'Grace',
    lastName: 'Tanaka',
    email: 'grace.t@design.co',
    phone: '+1 (512) 555-0707',
    ticketType: 'Speaker',
    checkedIn: true,
    checkInTime: '2026-02-28T13:15:00',
    sessionsRegistered: ['ses-007'],
    dietaryRestrictions: 'Pescatarian',
    registrationDate: '2026-01-15',
    eventId: 'evt-003',
    eventName: 'UX Design Workshop',
    company: 'PixelPerfect Agency',
  },
  {
    id: 'att-008',
    firstName: 'Henry',
    lastName: 'Larson',
    email: 'henry.l@cloud.dev',
    phone: '+1 (206) 555-0808',
    ticketType: 'General',
    checkedIn: false,
    sessionsRegistered: ['ses-005', 'ses-006'],
    dietaryRestrictions: 'None',
    registrationDate: '2026-03-01',
    eventId: 'evt-002',
    eventName: 'CloudNative Conference',
    company: 'CloudScale Inc.',
  },
  {
    id: 'att-009',
    firstName: 'Isabelle',
    lastName: 'Moreau',
    email: 'isabelle.m@blockchain.org',
    phone: '+1 (305) 555-0909',
    ticketType: 'Sponsor',
    checkedIn: false,
    sessionsRegistered: ['ses-008'],
    dietaryRestrictions: 'Halal',
    registrationDate: '2026-02-20',
    eventId: 'evt-004',
    eventName: 'Blockchain & Web3 Expo',
    company: 'CryptoLedger',
  },
  {
    id: 'att-010',
    firstName: 'Jake',
    lastName: 'Thompson',
    email: 'jake.t@market.io',
    phone: '+1 (415) 555-1010',
    ticketType: 'General',
    checkedIn: false,
    sessionsRegistered: ['ses-010'],
    dietaryRestrictions: 'None',
    registrationDate: '2026-04-10',
    eventId: 'evt-007',
    eventName: 'Digital Marketing Masterclass',
    company: 'GrowthHack Digital',
  },
  {
    id: 'att-011',
    firstName: 'Karen',
    lastName: 'Lee',
    email: 'karen.lee@data.com',
    phone: '+1 (628) 555-1111',
    ticketType: 'VIP',
    checkedIn: true,
    checkInTime: '2026-03-15T08:20:00',
    sessionsRegistered: ['ses-001', 'ses-002', 'ses-003'],
    dietaryRestrictions: 'Dairy-free',
    registrationDate: '2026-01-02',
    eventId: 'evt-001',
    eventName: 'AI & ML Summit 2026',
    company: 'DataStream Co.',
  },
  {
    id: 'att-012',
    firstName: 'Leo',
    lastName: 'Fernandez',
    email: 'leo.f@innovate.co',
    phone: '+1 (408) 555-1212',
    ticketType: 'General',
    checkedIn: false,
    sessionsRegistered: [],
    dietaryRestrictions: 'None',
    registrationDate: '2026-03-18',
    eventId: 'evt-002',
    eventName: 'CloudNative Conference',
    company: 'Innovate Co.',
  },
];

// ─── Dashboard & Analytics ──────────────────────────────────────────────────

export const MOCK_DASHBOARD_METRICS = {
  totalEvents: MOCK_EVENTS.length,
  totalAttendees: MOCK_EVENTS.reduce((sum, e) => sum + e.attendance, 0),
  revenue: MOCK_EVENTS.reduce((sum, e) => sum + e.revenue, 0),
  conversionRate: 4.2,
  totalEventsChange: 12.5,
  totalAttendeesChange: 18.3,
  revenueChange: 24.7,
  conversionRateChange: 0.8,
};

export const MOCK_REVENUE_BY_MONTH = [
  { month: 'Jan', revenue: 5200000, attendees: 1200, events: 4 },
  { month: 'Feb', revenue: 5800000, attendees: 1380, events: 5 },
  { month: 'Mar', revenue: 7500000, attendees: 1820, events: 6 },
  { month: 'Apr', revenue: 8200000, attendees: 2100, events: 5 },
  { month: 'May', revenue: 6800000, attendees: 1640, events: 4 },
  { month: 'Jun', revenue: 9200000, attendees: 2480, events: 7 },
  { month: 'Jul', revenue: 10500000, attendees: 2840, events: 6 },
  { month: 'Aug', revenue: 9800000, attendees: 2620, events: 5 },
  { month: 'Sep', revenue: 11200000, attendees: 3040, events: 8 },
];

export const MOCK_TICKET_SALES_BY_TYPE = [
  { type: 'VIP', sold: 3200, revenue: 32000000, percentage: 17.4 },
  { type: 'Regular', sold: 8900, revenue: 44500000, percentage: 48.3 },
  { type: 'Early Bird', sold: 4100, revenue: 12300000, percentage: 22.3 },
  { type: 'Group', sold: 2220, revenue: 0, percentage: 12.0 },
];

export const MOCK_ATTENDEE_DEMOGRAPHICS = {
  byAge: [
    { range: '18-24', count: 3200, percentage: 17.4 },
    { range: '25-34', count: 6100, percentage: 33.1 },
    { range: '35-44', count: 4800, percentage: 26.1 },
    { range: '45-54', count: 2600, percentage: 14.1 },
    { range: '55+', count: 1720, percentage: 9.3 },
  ],
  byGender: [
    { label: 'Male', value: 9200, color: '#e11d48' },
    { label: 'Female', value: 7800, color: '#f43f5e' },
    { label: 'Non-binary', value: 820, color: '#fda4af' },
    { label: 'Undisclosed', value: 600, color: '#fecdd3' },
  ],
  byLocation: [
    { city: 'San Francisco', count: 4200, percentage: 22.8 },
    { city: 'New York', count: 3600, percentage: 19.5 },
    { city: 'Los Angeles', count: 2800, percentage: 15.2 },
    { city: 'Austin', count: 2100, percentage: 11.4 },
    { city: 'Chicago', count: 1800, percentage: 9.8 },
    { city: 'Seattle', count: 1500, percentage: 8.1 },
    { city: 'Other', count: 2420, percentage: 13.1 },
  ],
  bySource: [
    { label: 'Organic Search', value: 5800, color: '#e11d48' },
    { label: 'Social Media', value: 4200, color: '#f43f5e' },
    { label: 'Email Campaign', value: 3600, color: '#fb7185' },
    { label: 'Direct', value: 2800, color: '#fda4af' },
    { label: 'Referral', value: 2020, color: '#fecdd3' },
  ],
};

export const MOCK_MARKETING_CHANNELS = [
  { channel: 'Email Marketing', sent: 45000, opened: 22500, clicked: 6750, conversions: 1350, revenue: 13500000, roi: 8.2 },
  { channel: 'Social Media Ads', sent: 120000, opened: 48000, clicked: 9600, conversions: 1440, revenue: 14400000, roi: 5.4 },
  { channel: 'Google Ads', sent: 85000, opened: 34000, clicked: 8500, conversions: 1275, revenue: 12750000, roi: 4.8 },
  { channel: 'Influencer Partnerships', sent: 30000, opened: 18000, clicked: 5400, conversions: 810, revenue: 8100000, roi: 12.1 },
  { channel: 'Content Marketing', sent: 25000, opened: 15000, clicked: 4500, conversions: 675, revenue: 6750000, roi: 15.6 },
];

export const MOCK_ACTIVITY = [
  { id: '1', user: 'System', action: 'New ticket purchase: AI & ML Summit (VIP × 2)', type: 'ticket', time: '5 min ago' },
  { id: '2', user: 'Khalid Khan', action: 'Published CloudNative Conference event page', type: 'event', time: '22 min ago' },
  { id: '3', user: 'System', action: 'UX Design Workshop reached 75% capacity', type: 'alert', time: '1 hr ago' },
  { id: '4', user: 'Sarah Chen', action: 'Created new event: Data Science Bootcamp', type: 'event', time: '2 hr ago' },
  { id: '5', user: 'System', action: 'Payment processed: AI & ML Summit ($189,500)', type: 'payment', time: '3 hr ago' },
  { id: '6', user: 'Emily Nakamura', action: 'Launched email campaign for Blockchain Expo', type: 'marketing', time: '4 hr ago' },
  { id: '7', user: 'System', action: '12 new registrations for CloudNative Conference', type: 'ticket', time: '5 hr ago' },
  { id: '8', user: 'Marcus Johnson', action: 'Refunded ticket #att-006 (Startup Pitch Night)', type: 'refund', time: '6 hr ago' },
  { id: '9', user: 'System', action: 'Monthly analytics report generated', type: 'system', time: '1 day ago' },
  { id: '10', user: 'Lisa Park', action: 'Published Digital Marketing Masterclass event', type: 'event', time: '1 day ago' },
];

export const MOCK_UPCOMING_EVENTS = [
  { id: 'evt-002', name: 'CloudNative Conference', date: '2026-04-22', venue: 'Skyline Auditorium', ticketsSold: 120, maxCapacity: 300 },
  { id: 'evt-004', name: 'Blockchain & Web3 Expo', date: '2026-05-10', venue: 'Metaverse Pavilion', ticketsSold: 260, maxCapacity: 550 },
  { id: 'evt-007', name: 'Digital Marketing Masterclass', date: '2026-07-20', venue: 'Skyline Auditorium', ticketsSold: 85, maxCapacity: 150 },
  { id: 'evt-008', name: 'Creative Writing Retreat', date: '2026-08-05', venue: 'Lakeside Lodge', ticketsSold: 0, maxCapacity: 30 },
];

export const MOCK_REVENUE_BY_EVENT = [
  { event: 'AI & ML Summit', revenue: 18950000, percentage: 39.3 },
  { event: 'UX Design Workshop', revenue: 6650000, percentage: 13.8 },
  { event: 'CloudNative Conf', revenue: 3200000, percentage: 6.6 },
  { event: 'Blockchain Expo', revenue: 5000000, percentage: 10.4 },
  { event: 'Marketing Masterclass', revenue: 1500000, percentage: 3.1 },
  { event: 'Other', revenue: 12850000, percentage: 26.7 },
];

export const MOCK_TICKET_SALES_TREND = [
  { week: 'Week 1', vip: 120, regular: 340, earlyBird: 180 },
  { week: 'Week 2', vip: 145, regular: 420, earlyBird: 210 },
  { week: 'Week 3', vip: 180, regular: 510, earlyBird: 260 },
  { week: 'Week 4', vip: 160, regular: 480, earlyBird: 230 },
  { week: 'Week 5', vip: 210, regular: 580, earlyBird: 290 },
  { week: 'Week 6', vip: 195, regular: 620, earlyBird: 310 },
  { week: 'Week 7', vip: 240, regular: 710, earlyBird: 350 },
  { week: 'Week 8', vip: 280, regular: 780, earlyBird: 380 },
  { week: 'Week 9', vip: 310, regular: 840, earlyBird: 410 },
  { week: 'Week 10', vip: 290, regular: 860, earlyBird: 420 },
  { week: 'Week 11', vip: 340, regular: 920, earlyBird: 450 },
  { week: 'Week 12', vip: 360, regular: 980, earlyBird: 480 },
];

export const MOCK_SATISFACTION = [
  { month: 'Jan', score: 4.3, responses: 240 },
  { month: 'Feb', score: 4.4, responses: 280 },
  { month: 'Mar', score: 4.5, responses: 360 },
  { month: 'Apr', score: 4.3, responses: 420 },
  { month: 'May', score: 4.6, responses: 320 },
  { month: 'Jun', score: 4.5, responses: 490 },
  { month: 'Jul', score: 4.7, responses: 560 },
  { month: 'Aug', score: 4.6, responses: 520 },
  { month: 'Sep', score: 4.7, responses: 610 },
];

export const MOCK_CONVERSION_FUNNEL = [
  { stage: 'Page Views', count: 124000, percentage: 100 },
  { stage: 'Event Browsed', count: 68000, percentage: 54.8 },
  { stage: 'Ticket Selected', count: 28000, percentage: 22.6 },
  { stage: 'Checkout Started', count: 12000, percentage: 9.7 },
  { stage: 'Payment Completed', count: 8200, percentage: 6.6 },
  { stage: 'Registration Confirmed', count: 7600, percentage: 6.1 },
];

export const MOCK_EVENT_PERFORMANCE = [
  { event: 'AI & ML Summit', revenue: 18950000, attendees: 545, satisfaction: 4.7, roi: 6.8 },
  { event: 'UX Design Workshop', revenue: 6650000, attendees: 75, satisfaction: 4.9, roi: 9.4 },
  { event: 'CloudNative Conference', revenue: 3200000, attendees: 0, satisfaction: 0, roi: 5.2 },
  { event: 'Blockchain & Web3 Expo', revenue: 5000000, attendees: 0, satisfaction: 0, roi: 4.6 },
  { event: 'Digital Marketing Masterclass', revenue: 1500000, attendees: 0, satisfaction: 0, roi: 3.6 },
  { event: 'Startup Pitch Night', revenue: 0, attendees: 0, satisfaction: 0, roi: 0 },
];

// ─── Budget ───────────────────────────────────────────────────────────────────
// All monetary values are in CENTS (÷ 100 when displayed via formatCurrency).

export interface BudgetLineItem {
  id: string;
  category: string;
  description: string;
  allocated: number;   // cents
  spent: number;       // cents
  status: 'under' | 'on-track' | 'over';
}

export interface BudgetEvent {
  id: string;
  eventName: string;
  date: string;
  totalBudget: number;  // cents
  totalSpent: number;   // cents
  status: 'draft' | 'active' | 'review' | 'closed';
  lineItems: BudgetLineItem[];
  forecast: number;     // cents
}

export const MOCK_BUDGET: BudgetEvent[] = [
  {
    id: 'b1',
    eventName: 'Annual Tech Conference 2026',
    date: '2026-10-15',
    totalBudget: 12500000,
    totalSpent: 9875000,
    status: 'active',
    forecast: 12200000,
    lineItems: [
      { id: 'l1', category: 'Venue', description: 'Convention center rental', allocated: 4000000, spent: 3850000, status: 'on-track' },
      { id: 'l2', category: 'Catering', description: 'Meals & refreshments', allocated: 2500000, spent: 2210000, status: 'on-track' },
      { id: 'l3', category: 'Marketing', description: 'Digital campaigns & ads', allocated: 1800000, spent: 2120000, status: 'over' },
      { id: 'l4', category: 'AV & Tech', description: 'Sound, lighting, streaming', allocated: 2000000, spent: 1430000, status: 'under' },
      { id: 'l5', category: 'Staff', description: 'Event crew & coordinators', allocated: 1200000, spent: 1080000, status: 'on-track' },
      { id: 'l6', category: 'Decor', description: 'Stage design & branding', allocated: 1000000, spent: 1185000, status: 'over' },
    ],
  },
  {
    id: 'b2',
    eventName: 'Charity Gala Night',
    date: '2026-11-20',
    totalBudget: 8500000,
    totalSpent: 3240000,
    status: 'active',
    forecast: 7800000,
    lineItems: [
      { id: 'l7', category: 'Venue', description: 'Grand ballroom', allocated: 3000000, spent: 1200000, status: 'under' },
      { id: 'l8', category: 'Catering', description: 'Formal dinner service', allocated: 2200000, spent: 840000, status: 'under' },
      { id: 'l9', category: 'Entertainment', description: 'Live band & DJ', allocated: 1500000, spent: 600000, status: 'under' },
      { id: 'l10', category: 'Marketing', description: 'Invitations & PR', allocated: 1000000, spent: 420000, status: 'under' },
      { id: 'l11', category: 'Auction', description: 'Auction items & display', allocated: 800000, spent: 180000, status: 'under' },
    ],
  },
  {
    id: 'b3',
    eventName: 'Product Launch – Nova',
    date: '2026-09-05',
    totalBudget: 6500000,
    totalSpent: 6720000,
    status: 'review',
    forecast: 6720000,
    lineItems: [
      { id: 'l12', category: 'Venue', description: 'Showroom space', allocated: 1800000, spent: 1800000, status: 'on-track' },
      { id: 'l13', category: 'AV & Tech', description: 'Demo stations & screens', allocated: 1500000, spent: 1680000, status: 'over' },
      { id: 'l14', category: 'Catering', description: 'Cocktail reception', allocated: 1200000, spent: 1140000, status: 'on-track' },
      { id: 'l15', category: 'Marketing', description: 'Press kits & swag', allocated: 1000000, spent: 1100000, status: 'over' },
      { id: 'l16', category: 'Logistics', description: 'Transport & shipping', allocated: 1000000, spent: 1000000, status: 'on-track' },
    ],
  },
  {
    id: 'b4',
    eventName: 'Summer Music Festival',
    date: '2026-07-20',
    totalBudget: 20000000,
    totalSpent: 20000000,
    status: 'closed',
    forecast: 20000000,
    lineItems: [
      { id: 'l17', category: 'Talent', description: 'Artist fees & travel', allocated: 9000000, spent: 8850000, status: 'under' },
      { id: 'l18', category: 'Venue', description: 'Outdoor amphitheater', allocated: 4500000, spent: 4500000, status: 'on-track' },
      { id: 'l19', category: 'Security', description: 'Guards & barriers', allocated: 2500000, spent: 2620000, status: 'over' },
      { id: 'l20', category: 'Catering', description: 'Food trucks & bars', allocated: 2000000, spent: 1980000, status: 'on-track' },
      { id: 'l21', category: 'Marketing', description: 'Posters, social, radio', allocated: 2000000, spent: 2050000, status: 'on-track' },
    ],
  },
];

// ─── Revenue ──────────────────────────────────────────────────────────────────
// All monetary values are in CENTS (÷ 100 when displayed via formatCurrency).

export interface RevenueItem {
  month: string;
  ticketSales: number;
  sponsorships: number;
  merchandise: number;
  foodBeverage: number;
  other: number;
}

export interface RevenueReport {
  totalRevenue: number;     // cents
  totalExpenses: number;    // cents
  netProfit: number;        // cents
  eventsCompleted: number;
  avgTicketPrice: number;   // cents
  totalAttendees: number;
  monthlyData: RevenueItem[];
  topEvents: { name: string; revenue: number; profit: number }[];
  revenueBySource: { source: string; value: number }[];
}

export const MOCK_REVENUE: RevenueReport = {
  totalRevenue: 68450000,
  totalExpenses: 42760000,
  netProfit: 25690000,
  eventsCompleted: 12,
  avgTicketPrice: 12700,
  totalAttendees: 4820,
  monthlyData: [
    { month: 'Jan', ticketSales: 3200000, sponsorships: 1800000, merchandise: 420000, foodBeverage: 610000, other: 280000 },
    { month: 'Feb', ticketSales: 2800000, sponsorships: 1500000, merchandise: 380000, foodBeverage: 550000, other: 220000 },
    { month: 'Mar', ticketSales: 4100000, sponsorships: 2200000, merchandise: 560000, foodBeverage: 780000, other: 310000 },
    { month: 'Apr', ticketSales: 3500000, sponsorships: 1900000, merchandise: 490000, foodBeverage: 690000, other: 260000 },
    { month: 'May', ticketSales: 5200000, sponsorships: 2800000, merchandise: 720000, foodBeverage: 940000, other: 410000 },
    { month: 'Jun', ticketSales: 4800000, sponsorships: 2500000, merchandise: 680000, foodBeverage: 880000, other: 370000 },
    { month: 'Jul', ticketSales: 6200000, sponsorships: 3200000, merchandise: 850000, foodBeverage: 1120000, other: 500000 },
    { month: 'Aug', ticketSales: 5800000, sponsorships: 3000000, merchandise: 790000, foodBeverage: 1050000, other: 440000 },
    { month: 'Sep', ticketSales: 4500000, sponsorships: 2400000, merchandise: 620000, foodBeverage: 820000, other: 350000 },
    { month: 'Oct', ticketSales: 5500000, sponsorships: 2900000, merchandise: 760000, foodBeverage: 1000000, other: 420000 },
    { month: 'Nov', ticketSales: 4200000, sponsorships: 2100000, merchandise: 580000, foodBeverage: 760000, other: 330000 },
    { month: 'Dec', ticketSales: 3800000, sponsorships: 2000000, merchandise: 540000, foodBeverage: 700000, other: 300000 },
  ],
  topEvents: [
    { name: 'Summer Music Festival', revenue: 18600000, profit: 8200000 },
    { name: 'Annual Tech Conference', revenue: 15400000, profit: 6700000 },
    { name: 'Charity Gala Night', revenue: 11200000, profit: 4800000 },
    { name: 'Product Launch – Nova', revenue: 8900000, profit: 2180000 },
    { name: 'Winter Networking Mixer', revenue: 6800000, profit: 3200000 },
  ],
  revenueBySource: [
    { source: 'Ticket Sales', value: 29800000 },
    { source: 'Sponsorships', value: 18300000 },
    { source: 'Food & Beverage', value: 8900000 },
    { source: 'Merchandise', value: 6150000 },
    { source: 'Other', value: 5300000 },
  ],
};

// ─── Staff ────────────────────────────────────────────────────────────────────

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'on-leave';
  assignedEvents: string[];
  permissions: string[];
  joinDate: string;
}

export const MOCK_STAFF: StaffMember[] = [
  {
    id: 's1',
    name: 'Sarah Mitchell',
    email: 'sarah.m@eventcraft.io',
    role: 'Event Director',
    department: 'Management',
    status: 'active',
    assignedEvents: ['Annual Tech Conference 2026', 'Charity Gala Night'],
    permissions: ['manage_events', 'manage_budget', 'manage_staff', 'view_reports'],
    joinDate: '2022-03-15',
  },
  {
    id: 's2',
    name: 'James Cooper',
    email: 'james.c@eventcraft.io',
    role: 'Marketing Lead',
    department: 'Marketing',
    status: 'active',
    assignedEvents: ['Annual Tech Conference 2026', 'Product Launch – Nova'],
    permissions: ['manage_marketing', 'view_reports', 'manage_content'],
    joinDate: '2023-01-10',
  },
  {
    id: 's3',
    name: 'Emily Chen',
    email: 'emily.c@eventcraft.io',
    role: 'Budget Analyst',
    department: 'Finance',
    status: 'active',
    assignedEvents: ['Annual Tech Conference 2026', 'Charity Gala Night', 'Product Launch – Nova'],
    permissions: ['manage_budget', 'view_reports', 'view_financials'],
    joinDate: '2023-06-22',
  },
  {
    id: 's4',
    name: 'Marcus Johnson',
    email: 'marcus.j@eventcraft.io',
    role: 'Venue Coordinator',
    department: 'Operations',
    status: 'active',
    assignedEvents: ['Annual Tech Conference 2026'],
    permissions: ['manage_venues', 'view_events', 'manage_vendors'],
    joinDate: '2023-09-01',
  },
  {
    id: 's5',
    name: 'Olivia Torres',
    email: 'olivia.t@eventcraft.io',
    role: 'Sponsorship Manager',
    department: 'Business Development',
    status: 'on-leave',
    assignedEvents: ['Charity Gala Night', 'Summer Music Festival'],
    permissions: ['manage_sponsors', 'view_reports', 'manage_contracts'],
    joinDate: '2022-11-18',
  },
  {
    id: 's6',
    name: 'David Kim',
    email: 'david.k@eventcraft.io',
    role: 'Tech Lead',
    department: 'Technology',
    status: 'active',
    assignedEvents: ['Annual Tech Conference 2026', 'Product Launch – Nova'],
    permissions: ['manage_tech', 'manage_av', 'view_reports'],
    joinDate: '2023-04-05',
  },
  {
    id: 's7',
    name: 'Rachel Adams',
    email: 'rachel.a@eventcraft.io',
    role: 'Catering Coordinator',
    department: 'Operations',
    status: 'active',
    assignedEvents: ['Annual Tech Conference 2026', 'Charity Gala Night'],
    permissions: ['manage_catering', 'view_events', 'manage_vendors'],
    joinDate: '2023-08-12',
  },
  {
    id: 's8',
    name: 'Alex Rivera',
    email: 'alex.r@eventcraft.io',
    role: 'Social Media Specialist',
    department: 'Marketing',
    status: 'inactive',
    assignedEvents: [],
    permissions: ['manage_content', 'view_reports'],
    joinDate: '2024-01-20',
  },
  {
    id: 's9',
    name: 'Nina Patel',
    email: 'nina.p@eventcraft.io',
    role: 'Security Coordinator',
    department: 'Operations',
    status: 'active',
    assignedEvents: ['Summer Music Festival', 'Annual Tech Conference 2026'],
    permissions: ['manage_security', 'view_events', 'manage_emergency'],
    joinDate: '2023-05-30',
  },
  {
    id: 's10',
    name: 'Carlos Mendez',
    email: 'carlos.m@eventcraft.io',
    role: 'Graphic Designer',
    department: 'Marketing',
    status: 'active',
    assignedEvents: ['Annual Tech Conference 2026', 'Product Launch – Nova', 'Charity Gala Night'],
    permissions: ['manage_design', 'view_events', 'manage_content'],
    joinDate: '2024-02-14',
  },
  {
    id: 's11',
    name: 'Laura Bennett',
    email: 'laura.b@eventcraft.io',
    role: 'Registration Manager',
    department: 'Operations',
    status: 'active',
    assignedEvents: ['Annual Tech Conference 2026'],
    permissions: ['manage_registrations', 'view_reports', 'view_events'],
    joinDate: '2023-10-08',
  },
  {
    id: 's12',
    name: 'Tom Harrison',
    email: 'tom.h@eventcraft.io',
    role: 'AV Technician',
    department: 'Technology',
    status: 'active',
    assignedEvents: ['Annual Tech Conference 2026', 'Summer Music Festival'],
    permissions: ['manage_av', 'view_events'],
    joinDate: '2024-03-01',
  },
];

// ─── Check-In Stats ──────────────────────────────────────────────────────────
export interface MockCheckinStat {
  hour: string;
  count: number;
}

export interface MockRecentCheckin {
  id: string;
  name: string;
  type: 'qr' | 'manual' | 'walk-in';
  time: string;
  ticketType: string;
}

export const MOCK_CHECKINS = {
  totalRegistered: 545,
  checkedIn: 387,
  walkIns: 23,
  qrScans: 412,
  byHour: [
    { hour: '8 AM', count: 18 },
    { hour: '9 AM', count: 89 },
    { hour: '10 AM', count: 142 },
    { hour: '11 AM', count: 78 },
    { hour: '12 PM', count: 24 },
    { hour: '1 PM', count: 21 },
    { hour: '2 PM', count: 12 },
    { hour: '3 PM', count: 3 },
  ] as MockCheckinStat[],
  recentCheckins: [
    { id: 'c1', name: 'Sarah Chen', type: 'qr' as const, time: '2026-03-15T11:42:00', ticketType: 'VIP' },
    { id: 'c2', name: 'Marcus Johnson', type: 'manual' as const, time: '2026-03-15T11:41:00', ticketType: 'General' },
    { id: 'c3', name: 'Aisha Patel', type: 'walk-in' as const, time: '2026-03-15T11:40:00', ticketType: 'General' },
    { id: 'c4', name: 'Tomoko Saito', type: 'qr' as const, time: '2026-03-15T11:39:00', ticketType: 'Speaker' },
    { id: 'c5', name: 'Liam O\'Brien', type: 'qr' as const, time: '2026-03-15T11:38:00', ticketType: 'VIP' },
    { id: 'c6', name: 'Elena Vasquez', type: 'manual' as const, time: '2026-03-15T11:37:00', ticketType: 'General' },
    { id: 'c7', name: 'David Kim', type: 'qr' as const, time: '2026-03-15T11:36:00', ticketType: 'VIP' },
    { id: 'c8', name: 'Fatima Al-Hassan', type: 'walk-in' as const, time: '2026-03-15T11:35:00', ticketType: 'General' },
  ] as MockRecentCheckin[],
};

// ─── Live Event Data ─────────────────────────────────────────────────────────
export interface MockLiveSession {
  id: string;
  title: string;
  speaker: string;
  attendance: number;
  capacity: number;
  status: 'live' | 'upcoming';
  scheduledFor?: string;
  engagement: number;
}

export interface MockEngagementPoint {
  time: string;
  score: number;
}

export interface MockQaItem {
  id: string;
  attendee: string;
  question: string;
  votes: number;
  status: 'pending' | 'answered';
}

export interface MockPollOption {
  label: string;
  votes: number;
  percentage: number;
}

export interface MockPoll {
  id: string;
  question: string;
  options: MockPollOption[];
  totalVotes: number;
  status: 'active' | 'closed';
}

export const MOCK_LIVE = {
  event: 'AI & Machine Learning Summit 2026',
  status: 'live' as const,
  startedAt: '2026-03-15T09:00:00',
  currentSession: 'Keynote: The Future of AI in Everyday Life',
  totalAttendees: 387,
  onlineViewers: 156,
  sessions: [
    {
      id: 's1',
      title: 'Keynote: The Future of AI in Everyday Life',
      speaker: 'Dr. Sarah Chen',
      attendance: 387,
      capacity: 800,
      status: 'live' as const,
      engagement: 87,
    },
    {
      id: 's2',
      title: 'Building Scalable ML Pipelines',
      speaker: 'James Rodriguez',
      attendance: 0,
      capacity: 200,
      status: 'upcoming' as const,
      scheduledFor: '2026-03-15T11:00:00',
      engagement: 0,
    },
    {
      id: 's3',
      title: 'Ethics in Artificial Intelligence',
      speaker: 'Prof. Amira Osei',
      attendance: 0,
      capacity: 150,
      status: 'upcoming' as const,
      scheduledFor: '2026-03-15T13:00:00',
      engagement: 0,
    },
    {
      id: 's4',
      title: 'Hands-on: Fine-tuning LLMs',
      speaker: 'James Rodriguez',
      attendance: 0,
      capacity: 50,
      status: 'upcoming' as const,
      scheduledFor: '2026-03-15T14:30:00',
      engagement: 0,
    },
  ] as MockLiveSession[],
  engagementScore: 87,
  engagementTrend: [
    { time: '9:00', score: 72 },
    { time: '9:15', score: 78 },
    { time: '9:30', score: 81 },
    { time: '9:45', score: 85 },
    { time: '10:00', score: 83 },
    { time: '10:15', score: 87 },
  ] as MockEngagementPoint[],
  qaQueue: [
    { id: 'q1', attendee: 'Rachel Wu', question: 'How do you see LLMs changing the developer experience in 2027?', votes: 142, status: 'pending' as const },
    { id: 'q2', attendee: 'Ben Fischer', question: 'What\'s your take on open-source vs proprietary foundation models?', votes: 98, status: 'pending' as const },
    { id: 'q3', attendee: 'Sofia Andersson', question: 'Can you share more about the latency benchmarks you mentioned?', votes: 76, status: 'answered' as const },
    { id: 'q4', attendee: 'Wei Zhang', question: 'Will the framework be open-sourced?', votes: 61, status: 'answered' as const },
  ] as MockQaItem[],
  polls: [
    {
      id: 'p1',
      question: 'Which topic interests you most?',
      options: [
        { label: 'AI / ML', votes: 142, percentage: 41 },
        { label: 'Web Dev', votes: 89, percentage: 26 },
        { label: 'DevOps', votes: 68, percentage: 20 },
        { label: 'Design', votes: 46, percentage: 13 },
      ],
      totalVotes: 345,
      status: 'active' as const,
    },
  ] as MockPoll[],
};

// ─── Feedback / Survey Data ──────────────────────────────────────────────────
export interface MockSessionRating {
  id: string;
  title: string;
  speaker: string;
  rating: number;
  responses: number;
}

export interface MockSpeakerRating {
  id: string;
  name: string;
  role: string;
  rating: number;
  responses: number;
}

export interface MockSentimentTopic {
  topic: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  mentions: number;
}

export interface MockRatingRow {
  stars: number;
  count: number;
  percentage: number;
}

export const MOCK_FEEDBACK = {
  eventId: 'evt-001',
  eventName: 'AI & Machine Learning Summit 2026',
  overallRating: 4.6,
  totalResponses: 374,
  responseRate: 68.6,
  npsScore: 72,
  npsBreakdown: { promoters: 64, passives: 24, detractors: 12 },
  sessionRatings: [
    { id: 's1', title: 'Keynote: The Future of AI in Everyday Life', speaker: 'Dr. Sarah Chen', rating: 4.8, responses: 352 },
    { id: 's2', title: 'Building Scalable ML Pipelines', speaker: 'James Rodriguez', rating: 4.4, responses: 176 },
    { id: 's3', title: 'Ethics in Artificial Intelligence', speaker: 'Prof. Amira Osei', rating: 4.7, responses: 118 },
    { id: 's4', title: 'Hands-on: Fine-tuning LLMs', speaker: 'James Rodriguez', rating: 4.9, responses: 46 },
  ] as MockSessionRating[],
  speakerRatings: [
    { id: 'sp1', name: 'Dr. Sarah Chen', role: 'Chief AI Scientist, NeuralForge Labs', rating: 4.8, responses: 352 },
    { id: 'sp2', name: 'James Rodriguez', role: 'Principal ML Engineer, CloudScale Inc.', rating: 4.4, responses: 176 },
    { id: 'sp3', name: 'Prof. Amira Osei', role: 'Professor of AI Ethics, Stanford University', rating: 4.7, responses: 118 },
    { id: 'sp4', name: 'Emily Nakamura', role: 'Head of Design, PixelPerfect Agency', rating: 4.9, responses: 46 },
  ] as MockSpeakerRating[],
  venueRating: {
    overall: 4.2,
    cleanliness: 4.5,
    signage: 3.8,
    foodQuality: 3.9,
    wifi: 3.2,
    comfort: 4.3,
  },
  sentiment: { positive: 72, neutral: 21, negative: 7 },
  sentimentTopics: [
    { topic: 'Content Quality', sentiment: 'positive' as const, mentions: 186 },
    { topic: 'Networking', sentiment: 'positive' as const, mentions: 134 },
    { topic: 'Food & Drinks', sentiment: 'neutral' as const, mentions: 84 },
    { topic: 'Wi-Fi Issues', sentiment: 'negative' as const, mentions: 71 },
    { topic: 'Venue Layout', sentiment: 'neutral' as const, mentions: 60 },
    { topic: 'Session Length', sentiment: 'positive' as const, mentions: 54 },
  ] as MockSentimentTopic[],
  ratingDistribution: [
    { stars: 5, count: 178, percentage: 47 },
    { stars: 4, count: 120, percentage: 32 },
    { stars: 3, count: 45, percentage: 12 },
    { stars: 2, count: 22, percentage: 6 },
    { stars: 1, count: 9, percentage: 3 },
  ] as MockRatingRow[],
};

// ─── Vendors ────────────────────────────────────────────────────────────────
export type VendorServiceType =
  | "Photography"
  | "Videography"
  | "Florals"
  | "Entertainment"
  | "Lighting"
  | "AV Production"
  | "Transportation"
  | "Decor"
  | "Security"
  | "Printing";

export type VendorStatus = "Active" | "Pending" | "Inactive" | "On Hold";

export interface Vendor {
  id: string;
  name: string;
  serviceType: VendorServiceType;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  costPerEvent: number;
  rating: number;
  status: VendorStatus;
  contractStart: string;
  contractEnd: string;
  assignedEvents: string[];
  location: string;
  notes: string;
}

export const MOCK_VENDORS: Vendor[] = [
  {
    id: "VND-001",
    name: "Lux Lens Studios",
    serviceType: "Photography",
    contactPerson: "Emma Richardson",
    email: "emma@luxlens.com",
    phone: "(555) 201-4400",
    website: "https://luxlens.com",
    costPerEvent: 3500,
    rating: 4.9,
    status: "Active",
    contractStart: "2026-01-01",
    contractEnd: "2026-12-31",
    assignedEvents: ["Tech Summit 2026", "Gala Night"],
    location: "New York, NY",
    notes: "Preferred photographer for VIP events",
  },
  {
    id: "VND-002",
    name: "BeatSync Entertainment",
    serviceType: "Entertainment",
    contactPerson: "Marcus Lee",
    email: "marcus@beatsync.com",
    phone: "(555) 302-7800",
    website: "https://beatsync.com",
    costPerEvent: 5000,
    rating: 4.7,
    status: "Active",
    contractStart: "2026-03-01",
    contractEnd: "2026-11-30",
    assignedEvents: ["Gala Night", "Summer Festival"],
    location: "Los Angeles, CA",
    notes: "Full band and DJ available",
  },
  {
    id: "VND-003",
    name: "Bloom & Petal Florals",
    serviceType: "Florals",
    contactPerson: "Sofia Nguyen",
    email: "sofia@bloomandpetal.com",
    phone: "(555) 403-5500",
    website: "https://bloomandpetal.com",
    costPerEvent: 2800,
    rating: 4.8,
    status: "Active",
    contractStart: "2026-02-15",
    contractEnd: "2026-12-15",
    assignedEvents: ["Tech Summit 2026", "Wedding Showcase"],
    location: "Chicago, IL",
    notes: "Sustainable and locally sourced flowers",
  },
  {
    id: "VND-004",
    name: "BrightStage AV",
    serviceType: "AV Production",
    contactPerson: "James Hartley",
    email: "james@brightstage.com",
    phone: "(555) 504-9100",
    website: "https://brightstage.com",
    costPerEvent: 8500,
    rating: 4.6,
    status: "Active",
    contractStart: "2026-01-01",
    contractEnd: "2027-06-30",
    assignedEvents: ["Tech Summit 2026"],
    location: "San Francisco, CA",
    notes: "Full-scale LED walls and projection mapping",
  },
  {
    id: "VND-005",
    name: "FlashFrame Media",
    serviceType: "Videography",
    contactPerson: "Priya Kapoor",
    email: "priya@flashframe.com",
    phone: "(555) 605-3200",
    website: "https://flashframe.com",
    costPerEvent: 4200,
    rating: 4.5,
    status: "Pending",
    contractStart: "2026-06-01",
    contractEnd: "2026-12-31",
    assignedEvents: [],
    location: "Austin, TX",
    notes: "Cinematic event highlight reels",
  },
  {
    id: "VND-006",
    name: "LuxeRide Transportation",
    serviceType: "Transportation",
    contactPerson: "Carlos Mendez",
    email: "carlos@luxeride.com",
    phone: "(555) 706-8800",
    website: "https://luxeride.com",
    costPerEvent: 1800,
    rating: 4.3,
    status: "Active",
    contractStart: "2026-04-01",
    contractEnd: "2026-10-31",
    assignedEvents: ["Gala Night"],
    location: "Miami, FL",
    notes: "Fleet includes luxury sedans and sprinter vans",
  },
  {
    id: "VND-007",
    name: "Glow Works Lighting",
    serviceType: "Lighting",
    contactPerson: "Aisha Johnson",
    email: "aisha@glowworks.com",
    phone: "(555) 807-2100",
    website: "https://glowworks.com",
    costPerEvent: 3200,
    rating: 4.7,
    status: "On Hold",
    contractStart: "2026-02-01",
    contractEnd: "2026-08-31",
    assignedEvents: [],
    location: "Denver, CO",
    notes: "Specializing in ambient and dramatic lighting",
  },
  {
    id: "VND-008",
    name: "EventGuard Security",
    serviceType: "Security",
    contactPerson: "Tom Bradley",
    email: "tom@eventguard.com",
    phone: "(555) 908-6400",
    website: "https://eventguard.com",
    costPerEvent: 2500,
    rating: 4.4,
    status: "Active",
    contractStart: "2026-01-01",
    contractEnd: "2027-12-31",
    assignedEvents: ["Tech Summit 2026", "Gala Night", "Summer Festival"],
    location: "Dallas, TX",
    notes: "Licensed and bonded, crowd management specialists",
  },
  {
    id: "VND-009",
    name: "Inkwell Print Co.",
    serviceType: "Printing",
    contactPerson: "Rachel Kim",
    email: "rachel@inkwell.com",
    phone: "(555) 109-7700",
    website: "https://inkwell.com",
    costPerEvent: 800,
    rating: 4.2,
    status: "Inactive",
    contractStart: "2025-06-01",
    contractEnd: "2025-12-31",
    assignedEvents: [],
    location: "Portland, OR",
    notes: "Premium paper and eco-friendly inks",
  },
  {
    id: "VND-010",
    name: "Drape & Dazzle Decor",
    serviceType: "Decor",
    contactPerson: "Nadia Petrova",
    email: "nadia@drapedazzle.com",
    phone: "(555) 210-3300",
    website: "https://drapedazzle.com",
    costPerEvent: 4500,
    rating: 4.8,
    status: "Active",
    contractStart: "2026-03-01",
    contractEnd: "2026-12-31",
    assignedEvents: ["Gala Night", "Wedding Showcase"],
    location: "Las Vegas, NV",
    notes: "Luxury draping and custom installations",
  },
];

// ─── Catering ───────────────────────────────────────────────────────────────
export type DietaryOption =
  | "Vegetarian"
  | "Vegan"
  | "Gluten-Free"
  | "Halal"
  | "Kosher"
  | "Dairy-Free"
  | "Nut-Free";

export type CateringStatus =
  | "Confirmed"
  | "Pending"
  | "Tasting Scheduled"
  | "Cancelled";

export interface CateringMenu {
  id: string;
  menuName: string;
  vendor: string;
  cuisine: string;
  pricePerHead: number;
  headcount: number;
  totalCost: number;
  dietaryOptions: DietaryOption[];
  event: string;
  eventDate: string;
  status: CateringStatus;
  courses: string[];
  notes: string;
}

export const MOCK_CATERING: CateringMenu[] = [
  {
    id: "CAT-001",
    menuName: "Grand Gala Dinner",
    vendor: "Bistro Luxe Catering",
    cuisine: "French-Italian Fusion",
    pricePerHead: 125,
    headcount: 350,
    totalCost: 43750,
    dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free", "Nut-Free"],
    event: "Gala Night",
    eventDate: "2026-09-20",
    status: "Confirmed",
    courses: ["Amuse-bouche", "Caesar Salad", "Pan-Seared Salmon", "Wagyu Beef", "Crème Brûlée"],
    notes: "Wine pairing included for first two courses",
  },
  {
    id: "CAT-002",
    menuName: "Innovator's Buffet",
    vendor: "Green Plate Kitchen",
    cuisine: "Modern American",
    pricePerHead: 85,
    headcount: 500,
    totalCost: 42500,
    dietaryOptions: ["Vegetarian", "Vegan", "Halal", "Dairy-Free"],
    event: "Tech Summit 2026",
    eventDate: "2026-10-15",
    status: "Pending",
    courses: ["Soup Bar", "Salad Station", "Grilled Proteins", "Pasta Station", "Dessert Bar"],
    notes: "Coffee and juice bar throughout the day",
  },
  {
    id: "CAT-003",
    menuName: "Sunset Cocktail Reception",
    vendor: "Fork & Flame",
    cuisine: "Mediterranean",
    pricePerHead: 65,
    headcount: 200,
    totalCost: 13000,
    dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free", "Kosher"],
    event: "Summer Festival",
    eventDate: "2026-07-04",
    status: "Tasting Scheduled",
    courses: ["Mezze Platters", "Grilled Skewers", "Seafood Display", "Pastry Assortment"],
    notes: "Tasting scheduled for June 1st",
  },
  {
    id: "CAT-004",
    menuName: "Bridal Brunch",
    vendor: "Sweet Harmony Café",
    cuisine: "Brunch & Patisserie",
    pricePerHead: 55,
    headcount: 80,
    totalCost: 4400,
    dietaryOptions: ["Vegetarian", "Gluten-Free", "Nut-Free"],
    event: "Wedding Showcase",
    eventDate: "2026-11-10",
    status: "Confirmed",
    courses: ["Fresh Pastries", "Eggs Benedict", "Avocado Toast", "Fruit Parfait", "Mimosa Bar"],
    notes: "Champagne toast for bridal party",
  },
  {
    id: "CAT-005",
    menuName: "VIP Executive Lunch",
    vendor: "Bistro Luxe Catering",
    cuisine: "Continental",
    pricePerHead: 95,
    headcount: 50,
    totalCost: 4750,
    dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free", "Halal", "Dairy-Free"],
    event: "Tech Summit 2026",
    eventDate: "2026-10-16",
    status: "Confirmed",
    courses: ["Garden Salad", "Grilled Chicken or Salmon", "Roasted Vegetables", "Tiramisu"],
    notes: "Private dining room setup",
  },
  {
    id: "CAT-006",
    menuName: "Late Night Snack Bar",
    vendor: "Street Bites Co.",
    cuisine: "Fusion Street Food",
    pricePerHead: 35,
    headcount: 400,
    totalCost: 14000,
    dietaryOptions: ["Vegetarian", "Vegan", "Gluten-Free"],
    event: "Gala Night",
    eventDate: "2026-09-20",
    status: "Pending",
    courses: ["Slider Station", "Taco Bar", "Dumpling Station", "Dessert Shooters"],
    notes: "Available from 10 PM to midnight",
  },
];

// ─── Accommodation ──────────────────────────────────────────────────────────
export type AccommodationStatus =
  | "Active"
  | "Booking Open"
  | "Almost Full"
  | "Sold Out"
  | "Expired";

export interface RoomType {
  type: string;
  total: number;
  booked: number;
  rate: number;
}

export interface HotelBlock {
  id: string;
  propertyName: string;
  hotelGroup: string;
  starRating: number;
  address: string;
  city: string;
  roomTypes: RoomType[];
  totalRooms: number;
  totalBooked: number;
  blockRate: number;
  cutoffDate: string;
  event: string;
  status: AccommodationStatus;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  notes: string;
}

export const MOCK_ACCOMMODATION: HotelBlock[] = [
  {
    id: "ACC-001",
    propertyName: "The Grand Meridian",
    hotelGroup: "Marriott Bonvoy",
    starRating: 5,
    address: "1200 Convention Center Blvd",
    city: "New York, NY",
    roomTypes: [
      { type: "Standard King", total: 60, booked: 48, rate: 289 },
      { type: "Deluxe Double", total: 30, booked: 25, rate: 349 },
      { type: "Suite", total: 10, booked: 7, rate: 599 },
    ],
    totalRooms: 100,
    totalBooked: 80,
    blockRate: 289,
    cutoffDate: "2026-09-01",
    event: "Tech Summit 2026",
    status: "Almost Full",
    contactPerson: "Linda Chen",
    contactEmail: "groups@grandmeridian.com",
    contactPhone: "(212) 555-0100",
    notes: "Complimentary breakfast included. Shuttle to venue.",
  },
  {
    id: "ACC-002",
    propertyName: "Seaside Resort & Spa",
    hotelGroup: "Hilton Hotels",
    starRating: 4,
    address: "800 Ocean Drive",
    city: "Miami, FL",
    roomTypes: [
      { type: "Ocean View King", total: 45, booked: 30, rate: 219 },
      { type: "Poolside Double", total: 25, booked: 18, rate: 189 },
      { type: "Penthouse Suite", total: 5, booked: 3, rate: 499 },
    ],
    totalRooms: 75,
    totalBooked: 51,
    blockRate: 189,
    cutoffDate: "2026-08-15",
    event: "Summer Festival",
    status: "Booking Open",
    contactPerson: "David Morales",
    contactEmail: "reservations@seasideresort.com",
    contactPhone: "(305) 555-0200",
    notes: "Beach access, spa discounts for guests.",
  },
  {
    id: "ACC-003",
    propertyName: "The Wynn Convention Hotel",
    hotelGroup: "IHG Hotels",
    starRating: 5,
    address: "3500 Las Vegas Blvd",
    city: "Las Vegas, NV",
    roomTypes: [
      { type: "Standard Room", total: 80, booked: 80, rate: 249 },
      { type: "Executive King", total: 40, booked: 40, rate: 329 },
      { type: "Presidential Suite", total: 4, booked: 4, rate: 899 },
    ],
    totalRooms: 124,
    totalBooked: 124,
    blockRate: 249,
    cutoffDate: "2026-06-30",
    event: "Gala Night",
    status: "Sold Out",
    contactPerson: "Angela Torres",
    contactEmail: "groups@wynnconvention.com",
    contactPhone: "(702) 555-0300",
    notes: "No availability. Waitlist available.",
  },
  {
    id: "ACC-004",
    propertyName: "Downtown Boutique Inn",
    hotelGroup: "Independent",
    starRating: 3,
    address: "425 Market Street",
    city: "San Francisco, CA",
    roomTypes: [
      { type: "Cozy Queen", total: 20, booked: 12, rate: 179 },
      { type: "City View King", total: 15, booked: 8, rate: 229 },
    ],
    totalRooms: 35,
    totalBooked: 20,
    blockRate: 179,
    cutoffDate: "2026-10-01",
    event: "Tech Summit 2026",
    status: "Booking Open",
    contactPerson: "Kevin Park",
    contactEmail: "events@downtownboutique.com",
    contactPhone: "(415) 555-0400",
    notes: "Walking distance to venue. Complimentary Wi-Fi.",
  },
  {
    id: "ACC-005",
    propertyName: "Riverside Grand Hotel",
    hotelGroup: "Hyatt Hotels",
    starRating: 4,
    address: "500 River Walk",
    city: "Chicago, IL",
    roomTypes: [
      { type: "Standard King", total: 40, booked: 22, rate: 199 },
      { type: "River View Suite", total: 10, booked: 4, rate: 399 },
    ],
    totalRooms: 50,
    totalBooked: 26,
    blockRate: 199,
    cutoffDate: "2026-10-15",
    event: "Wedding Showcase",
    status: "Active",
    contactPerson: "Maria Santos",
    contactEmail: "groups@riversidegrand.com",
    contactPhone: "(312) 555-0500",
    notes: "Discounted parking for block guests.",
  },
];

// ─── Floor Plans ────────────────────────────────────────────────────────────
export type LayoutType = "Theater" | "Classroom" | "Banquet" | "U-Shape" | "Cocktail" | "Boardroom";
export type SetupStatus = "Not Started" | "In Progress" | "Ready" | "Needs Revision";

export interface FloorPlanZone {
  name: string;
  capacity: number;
  purpose: string;
}

export interface FloorPlan {
  id: string;
  venue: string;
  eventName: string;
  layoutType: LayoutType;
  capacity: number;
  zones: FloorPlanZone[];
  setupStatus: SetupStatus;
  setupDate: string;
  notes: string;
  sqft: number;
  assignedTeam: string;
}

export const MOCK_FLOOR_PLANS: FloorPlan[] = [
  {
    id: "FP-001",
    venue: "Metro Convention Center — Hall A",
    eventName: "Tech Summit 2026",
    layoutType: "Theater",
    capacity: 1200,
    zones: [
      { name: "Main Stage", capacity: 0, purpose: "Keynotes and panels" },
      { name: "Seating Section A", capacity: 400, purpose: "General seating" },
      { name: "Seating Section B", capacity: 400, purpose: "General seating" },
      { name: "VIP Lounge", capacity: 50, purpose: "VIP guests and speakers" },
      { name: "Expo Hall", capacity: 350, purpose: "Sponsor booths and demos" },
    ],
    setupStatus: "In Progress",
    setupDate: "2026-10-14",
    notes: "Stage requires 40ft LED wall. AV team arrives at 6 AM.",
    sqft: 25000,
    assignedTeam: "Alpha Setup Crew",
  },
  {
    id: "FP-002",
    venue: "Grand Ballroom — Marriott",
    eventName: "Gala Night",
    layoutType: "Banquet",
    capacity: 400,
    zones: [
      { name: "Dance Floor", capacity: 0, purpose: "Center stage dancing" },
      { name: "Dining Tables", capacity: 320, purpose: "Seated dinner (40 tables × 8)" },
      { name: "DJ Booth", capacity: 0, purpose: "Music and lighting control" },
      { name: "Bar Area", capacity: 0, purpose: "Cocktail service" },
      { name: "Photo Booth", capacity: 0, purpose: "Guest photos" },
    ],
    setupStatus: "Ready",
    setupDate: "2026-09-19",
    notes: "Floral centerpieces delivered day-of. Uplighting on pillars.",
    sqft: 12000,
    assignedTeam: "Beta Decor Team",
  },
  {
    id: "FP-003",
    venue: "Beachfront Pavilion",
    eventName: "Summer Festival",
    layoutType: "Cocktail",
    capacity: 600,
    zones: [
      { name: "Main Stage", capacity: 0, purpose: "Live performances" },
      { name: "Food Court", capacity: 150, purpose: "Food vendor area" },
      { name: "Lounge Zone", capacity: 100, purpose: "Casual seating and networking" },
      { name: "Activity Area", capacity: 200, purpose: "Games and activities" },
      { name: "Kids Zone", capacity: 100, purpose: "Children's activities" },
    ],
    setupStatus: "Not Started",
    setupDate: "2026-07-03",
    notes: "Outdoor event — rain contingency plan in place.",
    sqft: 35000,
    assignedTeam: "Gamma Outdoor Crew",
  },
  {
    id: "FP-004",
    venue: "Riverside Conference Room 3",
    eventName: "Wedding Showcase",
    layoutType: "Classroom",
    capacity: 120,
    zones: [
      { name: "Presentation Area", capacity: 0, purpose: "Vendor presentations" },
      { name: "Seating Rows", capacity: 80, purpose: "Audience seating" },
      { name: "Display Booths", capacity: 40, purpose: "Vendor showcase tables" },
      { name: "Refreshment Station", capacity: 0, purpose: "Coffee and snacks" },
    ],
    setupStatus: "Needs Revision",
    setupDate: "2026-11-09",
    notes: "Fire marshal requires updated exit signage. Need 2 more display tables.",
    sqft: 5000,
    assignedTeam: "Alpha Setup Crew",
  },
  {
    id: "FP-005",
    venue: "Metro Convention Center — Hall B",
    eventName: "Tech Summit 2026",
    layoutType: "Classroom",
    capacity: 300,
    zones: [
      { name: "Workshop Zone A", capacity: 75, purpose: "Breakout workshop sessions" },
      { name: "Workshop Zone B", capacity: 75, purpose: "Breakout workshop sessions" },
      { name: "Hackathon Area", capacity: 100, purpose: "Team coding challenge" },
      { name: "Charging Lounge", capacity: 50, purpose: "Device charging and refreshments" },
    ],
    setupStatus: "Not Started",
    setupDate: "2026-10-14",
    notes: "Wi-Fi bandwidth needs to support 300 concurrent devices.",
    sqft: 15000,
    assignedTeam: "Alpha Setup Crew",
  },
];

// ─── Merchandise ────────────────────────────────────────────────────────────
export type MerchCategory =
  | "Apparel"
  | "Accessories"
  | "Tech"
  | "Drinkware"
  | "Stationery"
  | "Bags";

export type MerchStatus = "In Stock" | "Low Stock" | "Pre-Order" | "Out of Stock";

export interface MerchItem {
  id: string;
  name: string;
  category: MerchCategory;
  price: number;
  stock: number;
  sold: number;
  revenue: number;
  event: string;
  status: MerchStatus;
  sku: string;
  notes: string;
}

export const MOCK_MERCHANDISE: MerchItem[] = [
  {
    id: "MER-001",
    name: "Tech Summit 2026 — Premium Hoodie",
    category: "Apparel",
    price: 59.99,
    stock: 120,
    sold: 230,
    revenue: 13797.70,
    event: "Tech Summit 2026",
    status: "Low Stock",
    sku: "TS26-HOODIE-001",
    notes: "Unisex, available in S/M/L/XL/XXL. Best seller.",
  },
  {
    id: "MER-002",
    name: "Tech Summit 2026 — Enamel Pin Set",
    category: "Accessories",
    price: 12.99,
    stock: 500,
    sold: 180,
    revenue: 2338.20,
    event: "Tech Summit 2026",
    status: "In Stock",
    sku: "TS26-PIN-001",
    notes: "Set of 3 pins: circuit board, robot, and cloud motifs.",
  },
  {
    id: "MER-003",
    name: "Gala Night — Velvet Tote Bag",
    category: "Bags",
    price: 34.99,
    stock: 80,
    sold: 110,
    revenue: 3848.90,
    event: "Gala Night",
    status: "Out of Stock",
    sku: "GN26-TOTE-001",
    notes: "Gold foil logo. Sold out at last event — reorder placed.",
  },
  {
    id: "MER-004",
    name: "EventCraft Stainless Tumbler",
    category: "Drinkware",
    price: 24.99,
    stock: 300,
    sold: 95,
    revenue: 2374.05,
    event: "All Events",
    status: "In Stock",
    sku: "EC-TUMB-001",
    notes: "20oz double-wall vacuum insulated. Keeps drinks hot 8hrs.",
  },
  {
    id: "MER-005",
    name: "Summer Festival — Graphic Tee",
    category: "Apparel",
    price: 29.99,
    stock: 40,
    sold: 160,
    revenue: 4798.40,
    event: "Summer Festival",
    status: "Low Stock",
    sku: "SF26-TEE-001",
    notes: "Limited edition summer design. 100% organic cotton.",
  },
  {
    id: "MER-006",
    name: "Tech Summit — Power Bank 10000mAh",
    category: "Tech",
    price: 39.99,
    stock: 200,
    sold: 145,
    revenue: 5798.55,
    event: "Tech Summit 2026",
    status: "In Stock",
    sku: "TS26-PWR-001",
    notes: "Dual USB-C, laser-engraved EventCraft logo.",
  },
  {
    id: "MER-007",
    name: "EventCraft Moleskine Notebook",
    category: "Stationery",
    price: 18.99,
    stock: 250,
    sold: 88,
    revenue: 1671.12,
    event: "All Events",
    status: "In Stock",
    sku: "EC-NOTE-001",
    notes: "Hardcover, 240 lined pages, ribbon bookmark.",
  },
  {
    id: "MER-008",
    name: "Gala Night — Crystal Whiskey Glass Set",
    category: "Drinkware",
    price: 49.99,
    stock: 60,
    sold: 45,
    revenue: 2249.55,
    event: "Gala Night",
    status: "In Stock",
    sku: "GN26-GLASS-001",
    notes: "Set of 2 engraved glasses in velvet gift box.",
  },
  {
    id: "MER-009",
    name: "Tech Summit — Wireless Charging Pad",
    category: "Tech",
    price: 29.99,
    stock: 0,
    sold: 200,
    revenue: 5998.00,
    event: "Tech Summit 2026",
    status: "Out of Stock",
    sku: "TS26-CHRG-001",
    notes: "Qi-certified, 10W fast charge. Pre-order for next batch.",
  },
  {
    id: "MER-010",
    name: "Wedding Showcase — Silk Scarf",
    category: "Accessories",
    price: 44.99,
    stock: 75,
    sold: 20,
    revenue: 899.80,
    event: "Wedding Showcase",
    status: "Pre-Order",
    sku: "WS26-SCARF-001",
    notes: "Hand-printed floral design. Made in Italy.",
  },
];

// ─── API Keys ───────────────────────────────────────────────────────────────

export interface ApiKey {
  id: string;
  name: string;
  service: string;
  prefix: string;
  created: string;
  lastUsed: string;
  requests: number;
  status: 'active' | 'inactive';
  scopes: string[];
  description: string;
}

export const MOCK_API_KEYS: ApiKey[] = [
  {
    id: 'k1',
    name: 'Eventbrite Integration',
    service: 'eventbrite',
    prefix: 'evt_prod_...x8k2',
    created: '2026-03-15',
    lastUsed: '2 min ago',
    requests: 2450000,
    status: 'active',
    scopes: ['events.read', 'events.write', 'attendees.read'],
    description: 'Syncs events and attendee data with Eventbrite',
  },
  {
    id: 'k2',
    name: 'Splash API',
    service: 'splash',
    prefix: 'evt_spl_...m3j9',
    created: '2026-06-01',
    lastUsed: '1 hr ago',
    requests: 890000,
    status: 'active',
    scopes: ['events.read', 'pages.read', 'analytics.read'],
    description: 'Powers Splash event landing pages and check-in',
  },
  {
    id: 'k3',
    name: 'Cvent Sync',
    service: 'cvent',
    prefix: 'evt_cvt_...p5w2',
    created: '2026-07-15',
    lastUsed: '30 min ago',
    requests: 1200000,
    status: 'active',
    scopes: ['events.read', 'registrations.read', 'venues.read'],
    description: 'Bi-directional sync with Cvent for enterprise events',
  },
  {
    id: 'k4',
    name: 'Stripe Payments',
    service: 'stripe',
    prefix: 'evt_str_...q1r7',
    created: '2026-01-20',
    lastUsed: '5 min ago',
    requests: 3400000,
    status: 'active',
    scopes: ['payments', 'refunds', 'disputes.read'],
    description: 'Processes ticket sales and refund transactions',
  },
  {
    id: 'k5',
    name: 'Mailchimp Marketing',
    service: 'mailchimp',
    prefix: 'evt_mc_...t8n4',
    created: '2026-04-10',
    lastUsed: '3 hr ago',
    requests: 670000,
    status: 'active',
    scopes: ['lists.read', 'campaigns.write', 'members.write'],
    description: 'Automated email campaigns for event promotions',
  },
  {
    id: 'k6',
    name: 'Legacy Integrations',
    service: 'legacy',
    prefix: 'evt_leg_...z2k5',
    created: '2025-11-05',
    lastUsed: '90 days ago',
    requests: 12000,
    status: 'inactive',
    scopes: ['events.read'],
    description: 'Deprecated integration — no longer in use',
  },
];

// ─── Integrations ───────────────────────────────────────────────────────────

export interface Integration {
  id: string;
  name: string;
  icon: string;
  status: 'connected' | 'available';
  category: string;
  lastSync: string;
  eventsSynced: number;
}

export const MOCK_INTEGRATIONS: Integration[] = [
  { id: 'int1', name: 'Eventbrite', icon: '🎟️', status: 'connected', category: 'Ticketing', lastSync: '2 min ago', eventsSynced: 1240 },
  { id: 'int2', name: 'Splash', icon: '✨', status: 'connected', category: 'Landing Pages', lastSync: '1 hr ago', eventsSynced: 340 },
  { id: 'int3', name: 'Cvent', icon: '🏢', status: 'connected', category: 'Enterprise Events', lastSync: '30 min ago', eventsSynced: 890 },
  { id: 'int4', name: 'Stripe', icon: '💳', status: 'connected', category: 'Payments', lastSync: '5 min ago', eventsSynced: 0 },
  { id: 'int5', name: 'Mailchimp', icon: '📧', status: 'connected', category: 'Email Marketing', lastSync: '3 hr ago', eventsSynced: 0 },
  { id: 'int6', name: 'Zapier', icon: '⚡', status: 'available', category: 'Automation', lastSync: '-', eventsSynced: 0 },
  { id: 'int7', name: 'HubSpot', icon: '🟠', status: 'available', category: 'CRM', lastSync: '-', eventsSynced: 0 },
  { id: 'int8', name: 'Salesforce', icon: '☁️', status: 'available', category: 'CRM', lastSync: '-', eventsSynced: 0 },
];

// ─── Webhooks ───────────────────────────────────────────────────────────────

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  status: 'active' | 'paused';
  lastFired: string;
  successRate: number;
  failures: number;
}

export const MOCK_WEBHOOKS: Webhook[] = [
  { id: 'wh1', url: 'https://hooks.eventcraft.io/order-created', events: ['order.created', 'order.paid'], status: 'active', lastFired: '5 min ago', successRate: 99.8, failures: 3 },
  { id: 'wh2', url: 'https://api.eventcraft.io/sync/attendees', events: ['registration.created', 'registration.cancelled'], status: 'active', lastFired: '12 min ago', successRate: 100, failures: 0 },
  { id: 'wh3', url: 'https://slack.com/api/webhook/T04...', events: ['event.published', 'event.updated'], status: 'active', lastFired: '1 hr ago', successRate: 99.9, failures: 1 },
  { id: 'wh4', url: 'https://legacy.eventcraft.io/hooks/v1', events: ['*'], status: 'paused', lastFired: '15 days ago', successRate: 94.2, failures: 28 },
];

// ─── Rate Limits ────────────────────────────────────────────────────────────

export interface RateLimits {
  plan: string;
  requestsPerMinute: number;
  requestsPerDay: number;
  requestsUsedToday: number;
  burstLimit: number;
  concurrentConnections: number;
  currentUsage: { minute: string; requests: number }[];
  tiers: { name: string; requestsPerMinute: number; requestsPerDay: number; price: string }[];
}

export const MOCK_RATE_LIMITS: RateLimits = {
  plan: 'Professional',
  requestsPerMinute: 5000,
  requestsPerDay: 500000,
  requestsUsedToday: 342000,
  burstLimit: 10000,
  concurrentConnections: 50,
  currentUsage: [
    { minute: '14:55', requests: 4120 },
    { minute: '14:56', requests: 3890 },
    { minute: '14:57', requests: 4340 },
    { minute: '14:58', requests: 4680 },
    { minute: '14:59', requests: 4920 },
    { minute: '15:00', requests: 3750 },
    { minute: '15:01', requests: 4100 },
    { minute: '15:02', requests: 4280 },
    { minute: '15:03', requests: 3960 },
    { minute: '15:04', requests: 4120 },
  ],
  tiers: [
    { name: 'Starter', requestsPerMinute: 1000, requestsPerDay: 100000, price: 'Free' },
    { name: 'Professional', requestsPerMinute: 5000, requestsPerDay: 500000, price: '$49/mo' },
    { name: 'Enterprise', requestsPerMinute: 25000, requestsPerDay: 5000000, price: '$199/mo' },
  ],
};

// ─── Code Snippets ──────────────────────────────────────────────────────────

export interface CodeSnippet {
  language: string;
  title: string;
  description: string;
  code: string;
}

export const MOCK_CODE_SNIPPETS: CodeSnippet[] = [
  {
    language: 'bash',
    title: 'List Events',
    description: 'Fetch all events with pagination',
    code: `curl -X GET https://api.eventcraft.io/v2/events \\
  -H "Authorization: Bearer evt_prod_...x8k2" \\
  -H "Content-Type: application/json" \\
  -G --data-urlencode "limit=25" --data-urlencode "offset=0"`,
  },
  {
    language: 'javascript',
    title: 'Create Registration',
    description: 'Register an attendee for an event',
    code: `const response = await fetch('https://api.eventcraft.io/v2/events/evt_123/registrations', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer evt_prod_...x8k2',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Jane Smith',
    email: 'jane@example.com',
    ticketType: 'vip',
    customFields: { company: 'Acme Corp' }
  })
});`,
  },
  {
    language: 'python',
    title: 'Event Analytics',
    description: 'Pull analytics for a specific event',
    code: `import requests

response = requests.get(
    'https://api.eventcraft.io/v2/events/evt_123/analytics',
    headers={
        'Authorization': 'Bearer evt_prod_...x8k2',
        'Content-Type': 'application/json'
    },
    params={'period': 'last_30_days'}
)
analytics = response.json()`,
  },
];

// ─── API Activity Log ───────────────────────────────────────────────────────

export interface ApiActivityLog {
  id: string;
  action: string;
  status: number;
  latency: string;
  time: string;
  key: string;
}

export const MOCK_API_ACTIVITY: ApiActivityLog[] = [
  { id: 'a1', action: 'GET /v2/events', status: 200, latency: '142ms', time: '2 min ago', key: 'evt_prod_...x8k2' },
  { id: 'a2', action: 'POST /v2/events/evt_123/registrations', status: 201, latency: '89ms', time: '3 min ago', key: 'evt_prod_...x8k2' },
  { id: 'a3', action: 'GET /v2/events/evt_456/analytics', status: 200, latency: '234ms', time: '5 min ago', key: 'evt_cvt_...p5w2' },
  { id: 'a4', action: 'PUT /v2/events/evt_789', status: 200, latency: '67ms', time: '8 min ago', key: 'evt_spl_...m3j9' },
  { id: 'a5', action: 'GET /v2/events?limit=25', status: 200, latency: '312ms', time: '10 min ago', key: 'evt_prod_...x8k2' },
  { id: 'a6', action: 'POST /v2/webhooks/test', status: 422, latency: '45ms', time: '12 min ago', key: 'evt_prod_...x8k2' },
  { id: 'a7', action: 'DELETE /v2/registrations/reg_456', status: 204, latency: '56ms', time: '15 min ago', key: 'evt_str_...q1r7' },
  { id: 'a8', action: 'GET /v2/venues', status: 200, latency: '178ms', time: '18 min ago', key: 'evt_cvt_...p5w2' },
];

// ─── Billing ────────────────────────────────────────────────────────────────

export interface BillingInfo {
  currentPlan: { name: string; price: number; renewal: string; features: string[] };
  usage: { events: number; registrations: number; apiCalls: number; storage: number; emails: number };
  invoices: { id: string; amount: number; status: string; date: string }[];
}

export const MOCK_BILLING: BillingInfo = {
  currentPlan: { name: 'Professional', price: 149, renewal: '2026-10-01', features: ['5,000 API req/min', 'Unlimited events', 'Priority support', 'Advanced analytics'] },
  usage: { events: 48, registrations: 32400, apiCalls: 3420000, storage: 12.4, emails: 185000 },
  invoices: [
    { id: 'INV-2026-009', amount: 892, status: 'paid', date: '2026-09-01' },
    { id: 'INV-2026-008', amount: 856, status: 'paid', date: '2026-08-01' },
    { id: 'INV-2026-007', amount: 745, status: 'paid', date: '2026-07-01' },
    { id: 'INV-2026-006', amount: 680, status: 'paid', date: '2026-06-01' },
    { id: 'INV-2026-005', amount: 620, status: 'paid', date: '2026-05-01' },
    { id: 'INV-2026-004', amount: 580, status: 'paid', date: '2026-04-01' },
  ],
};
