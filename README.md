# ⚡ EventCraft

**Enterprise Event Management & Ticketing Platform**

EventCraft is a full-stack, production-ready event management platform built with Next.js 14, TypeScript, and Tailwind CSS. It provides 30+ dashboard pages covering every aspect of the event lifecycle — from creation and ticketing to live monitoring and post-event analytics.

---

## 🚀 Features

| Module | Capabilities |
|---|---|
| **Events** | Create, schedule, clone, and manage events with real-time status tracking |
| **Tickets** | Multi-tier ticketing, discount codes, waitlists, automated confirmations |
| **Attendees** | Registration tracking, preferences, dietary requirements, engagement scoring |
| **Speakers** | Speaker profiles, session assignments, travel logistics, availability calendars |
| **Venues** | Venue management, floor plans, capacity tracking, room assignments |
| **Marketing** | Multi-channel campaigns (email, SMS, social), A/B testing, conversion analytics |
| **Sponsors** | Tiered sponsorship packages, benefits tracking, ROI reports |
| **Analytics** | Real-time dashboards, custom reports, data exports |
| **Budget** | Budget tracking with variance analysis and cost projections |
| **Check-In** | On-site QR code scanning, badge printing, real-time check-in stats |
| **Live Events** | Live monitoring, audience engagement, polling, Q&A |
| **Feedback** | Post-event surveys, NPS scoring, sentiment analysis |
| **Vendors** | Vendor management, contracts, payment tracking |
| **Sessions** | Session scheduling, room assignments, attendee capacity |
| **Floor Plans** | Interactive floor plan builder and management |

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** Custom component library with shadcn/ui patterns
- **Dark/Light Mode:** Next-themes with system preference detection
- **Icons:** Lucide React
- **White-label Ready:** Easily customizable themes and branding

## 📁 Project Structure

```
eventcraft/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Landing page
│   │   ├── not-found.tsx       # 404 page
│   │   └── api/
│   │       └── health/
│   │           └── route.ts    # Health check endpoint
│   ├── components/
│   │   ├── theme-provider.tsx
│   │   ├── notification-provider.tsx
│   │   └── ui/                 # Reusable UI components
│   └── lib/
│       └── utils.ts
├── public/
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── LICENSE
└── README.md
```

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/KhalidKhan541/eventcraft.git
cd eventcraft

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check with uptime and timestamp |

## 🎨 Customization

### Theming

EventCraft ships with a dark mode default and supports light mode via system preference or manual toggle. Customize colors in `tailwind.config.ts` or CSS variables in `globals.css`.

### White-Label

Swap the branding (logo, colors, typography) by editing the theme provider and layout components. The architecture is designed for easy rebranding.

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 👤 Author

**KhalidKhan541** — [GitHub](https://github.com/KhalidKhan541)

---

Built with ❤️ for the events industry.
