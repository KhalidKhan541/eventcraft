import Link from "next/link";
import {
  Calendar,
  Ticket,
  Users,
  Mic2,
  MapPin,
  Megaphone,
  Trophy,
  BarChart3,
  Star,
  Check,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Features                                                           */
/* ------------------------------------------------------------------ */
const features = [
  {
    icon: Calendar,
    title: "Events",
    desc: "Create, schedule, and manage events of any size with real-time collaboration.",
  },
  {
    icon: Ticket,
    title: "Tickets",
    desc: "Sell tickets with multiple tiers, discount codes, and automated confirmations.",
  },
  {
    icon: Users,
    title: "Attendees",
    desc: "Track registrations, preferences, and engagement across every event.",
  },
  {
    icon: Mic2,
    title: "Speakers",
    desc: "Manage speaker profiles, session assignments, and travel logistics.",
  },
  {
    icon: MapPin,
    title: "Venues",
    desc: "Floor plans, capacity tracking, and vendor coordination in one place.",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    desc: "Multi-channel campaigns — email, SMS, social — with conversion analytics.",
  },
  {
    icon: Trophy,
    title: "Sponsors",
    desc: "Tiered sponsorship packages with benefits tracking and ROI reports.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    desc: "Dashboards, exports, and real-time insights to drive data-backed decisions.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Pricing                                                            */
/* ------------------------------------------------------------------ */
const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    desc: "For small teams and community events.",
    features: [
      "Up to 200 attendees",
      "3 active events",
      "Basic ticketing",
      "Email support",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$149",
    period: "/mo",
    desc: "For growing organizations and conferences.",
    features: [
      "Up to 5 000 attendees",
      "Unlimited events",
      "Advanced ticketing & marketing",
      "Priority support",
      "Analytics dashboard",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large-scale productions and venues.",
    features: [
      "Unlimited everything",
      "White-label branding",
      "Dedicated account manager",
      "SSO & RBAC",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */
const testimonials = [
  {
    quote:
      "EventCraft cut our event setup time by 70 %. The analytics alone are worth the price.",
    name: "Sarah Chen",
    role: "VP Marketing, TechConf",
  },
  {
    quote:
      "We run 200 + events per year. Nothing else comes close to this level of control.",
    name: "Marcus Johnson",
    role: "Director of Events, GlobalFest",
  },
  {
    quote:
      "The sponsor management module saved our team hours every week during peak season.",
    name: "Priya Patel",
    role: "Operations Lead, StartupWeek",
  },
];

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* -------- Navbar -------- */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">⚡</span> EventCraft
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* -------- Hero -------- */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_50%,hsl(var(--primary)/0.15),transparent)]" />
          <div className="container mx-auto px-4 md:px-8 text-center">
            <span className="inline-block mb-4 px-3 py-1 text-xs font-medium rounded-full border border-border bg-muted/50 text-muted-foreground">
              Enterprise Event Management
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto">
              Create{" "}
              <span className="text-primary">unforgettable events</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              From intimate workshops to 50 000-person conferences — plan, promote,
              and measure every moment with one powerful platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Start Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
              >
                See Features
              </Link>
            </div>
          </div>
        </section>

        {/* -------- Features -------- */}
        <section id="features" className="py-20 border-t border-border/40">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold">
                Everything you need
              </h2>
              <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
                A complete toolkit covering every phase of the event lifecycle.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-border/60 bg-card p-6 hover:shadow-lg transition-shadow"
                >
                  <f.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------- Pricing -------- */}
        <section id="pricing" className="py-20 border-t border-border/40 bg-muted/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold">
                Simple, transparent pricing
              </h2>
              <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
                Start free, upgrade when you grow. No hidden fees.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {plans.map((p) => (
                <div
                  key={p.name}
                  className={`relative rounded-xl border p-8 flex flex-col ${
                    p.highlighted
                      ? "border-primary shadow-lg scale-[1.03]"
                      : "border-border/60"
                  } bg-card`}
                >
                  {p.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold">{p.price}</span>
                    <span className="text-muted-foreground">{p.period}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {p.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/register"
                    className={`mt-8 block text-center py-2.5 rounded-lg font-medium text-sm transition-colors ${
                      p.highlighted
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-border hover:bg-muted"
                    }`}
                  >
                    {p.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------- Testimonials -------- */}
        <section id="testimonials" className="py-20 border-t border-border/40">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold">
                Loved by event professionals
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-xl border border-border/60 bg-card p-6 flex flex-col"
                >
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 pt-4 border-t border-border/40">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* -------- Footer -------- */}
      <footer className="border-t border-border/40 py-10">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EventCraft. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
