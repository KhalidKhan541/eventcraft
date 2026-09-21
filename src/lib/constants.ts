export const APP_NAME = "EventCraft";
export const APP_DESCRIPTION =
  "All-in-one event management platform for planning, managing, and executing unforgettable events.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const SIDEBAR_NAV = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
      { label: "Analytics", href: "/analytics", icon: "BarChart3" },
    ],
  },
  {
    title: "Events",
    items: [
      { label: "Events", href: "/events", icon: "Calendar" },
      { label: "Venues", href: "/venues", icon: "MapPin" },
      { label: "Sessions", href: "/sessions", icon: "Clock" },
      { label: "Speakers", href: "/speakers", icon: "Mic2" },
      { label: "Attendees", href: "/attendees", icon: "Users" },
    ],
  },
  {
    title: "Marketing",
    items: [
      { label: "Campaigns", href: "/marketing/campaigns", icon: "Megaphone" },
      { label: "Email", href: "/marketing/email", icon: "Mail" },
      { label: "Promotions", href: "/marketing/promotions", icon: "Tag" },
      { label: "Waitlist", href: "/marketing/waitlist", icon: "ListOrdered" },
    ],
  },
  {
    title: "Revenue",
    items: [
      { label: "Tickets", href: "/revenue/tickets", icon: "Ticket" },
      { label: "Sponsors", href: "/revenue/sponsors", icon: "Handshake" },
      { label: "Merchandise", href: "/revenue/merchandise", icon: "ShoppingBag" },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Vendors", href: "/operations/vendors", icon: "Truck" },
      { label: "Catering", href: "/operations/catering", icon: "UtensilsCrossed" },
      { label: "Accommodation", href: "/operations/accommodation", icon: "Hotel" },
      { label: "Floor Plans", href: "/operations/floor-plans", icon: "LayoutGrid" },
    ],
  },
  {
    title: "On-Site",
    items: [
      { label: "Check-In", href: "/on-site/check-in", icon: "QrCode" },
      { label: "Live", href: "/on-site/live", icon: "Radio" },
      { label: "Feedback", href: "/on-site/feedback", icon: "MessageSquare" },
    ],
  },
  {
    title: "Platform",
    items: [
      { label: "Team", href: "/platform/team", icon: "UsersRound" },
      { label: "Reports", href: "/platform/reports", icon: "FileBarChart" },
      { label: "API", href: "/platform/api", icon: "Code2" },
      { label: "Settings", href: "/platform/settings", icon: "Settings" },
    ],
  },
] as const;

export type NavItem = (typeof SIDEBAR_NAV)[number]["items"][number];
export type NavSection = (typeof SIDEBAR_NAV)[number];

export const EVENT_STATUSES = [
  "draft",
  "published",
  "on-sale",
  "sold-out",
  "cancelled",
  "completed",
] as const;

export const TICKET_TYPES = [
  "early-bird",
  "general",
  "vip",
  "premium",
  "student",
  "group",
  "speaker",
  "sponsor",
] as const;

export const SPONSOR_TIERS = ["platinum", "gold", "silver", "bronze", "community"] as const;

export const CAMPAIGN_STATUSES = [
  "draft",
  "scheduled",
  "sending",
  "sent",
  "paused",
  "completed",
] as const;

export const VENDOR_STATUSES = [
  "pending",
  "confirmed",
  "in-progress",
  "completed",
  "cancelled",
] as const;

export const CHECKIN_STATUSES = ["checked-in", "no-show", "cancelled"] as const;

export const SESSION_TRACKS = [
  "Keynote",
  "Technical",
  "Workshop",
  "Panel",
  "Networking",
  "Break",
  "Social",
] as const;

export const CHART_COLORS = {
  primary: "#e11d48",
  secondary: "#ec4899",
  tertiary: "#f472b6",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#3b82f6",
  muted: "#94a3b8",
  grid: "#e2e8f0",
  darkGrid: "#334155",
} as const;

export const ACTIVITY_ICONS: Record<string, string> = {
  registration: "UserPlus",
  payment: "CreditCard",
  checkin: "CheckCircle",
  email: "Mail",
  update: "Edit",
  comment: "MessageCircle",
  refund: "RotateCcw",
  sponsor: "Handshake",
};

export const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
] as const;

export const DIETARY_OPTIONS = [
  "none",
  "vegetarian",
  "vegan",
  "gluten-free",
  "halal",
  "kosher",
  "dairy-free",
  "nut-free",
] as const;

export const PAGINATION_SIZES = [10, 25, 50, 100] as const;
