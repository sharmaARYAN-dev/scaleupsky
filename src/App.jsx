import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import {
  Brain, Mail, Clock, Calendar, TrendingUp, MessageSquare,
  Bot, Phone, Target, Users, Settings, Moon, Sun,
  Stethoscope, Heart, Activity, ChevronDown, CheckCircle, Check,
  ArrowRight, Building2, Utensils, Briefcase, ShoppingCart,
  Menu, X, Loader, Shield,
  MessageCircle, Mic, Filter, Database,
  Sparkles, CalendarCheck, Hash, Zap, Cpu
} from 'lucide-react';

// Inline authentic brand SVGs
const _WhatsApp = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.14 0-.36.05-.54.25-.19.2-.71.69-.71 1.69 0 1 .73 1.96.83 2.1.1.13 1.41 2.21 3.47 3.05.49.2.87.33 1.17.42.5.15.95.13 1.31.08.4-.06 1.22-.5 1.39-.98.17-.49.17-.91.12-.99-.05-.09-.19-.14-.4-.25-.21-.1-.71-.35-1.41-.69-.19-.09-.33-.14-.47.07-.14.2-.54.69-.66.83-.12.14-.24.16-.45.05-.21-.1-.89-.33-1.69-1.05-.62-.56-1.04-1.25-1.16-1.46-.12-.21-.01-.33.09-.43.09-.09.21-.24.31-.36.1-.12.14-.21.21-.35.07-.14.03-.26-.02-.36-.05-.1-.47-1.14-.64-1.56-.17-.41-.35-.35-.48-.36-.12-.01-.26-.01-.4-.01" />
  </svg>
);

const _Instagram = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const _Linkedin = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const _Slack = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
  </svg>
);

const _Facebook = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// --- LUCIDE ICON COMPONENT WRAPPER ---
const ICON_MAP = {
  brain: Brain,
  mail: Mail,
  clock: Clock,
  calendar: Calendar,
  calendarcheck: CalendarCheck,
  trendingup: TrendingUp,
  messagesquare: MessageSquare,
  messagecircle: MessageCircle,
  whatsapp: _WhatsApp,
  instagram: _Instagram,
  linkedin: _Linkedin,
  slack: _Slack,
  hash: Hash,
  bot: Bot,
  phone: Phone,
  mic: Mic,
  target: Target,
  filter: Filter,
  users: Users,
  database: Database,
  settings: Settings,
  stethoscope: Stethoscope,
  steth: Stethoscope,
  heart: Heart,
  activity: Activity,
  chevrondown: ChevronDown,
  checkcircle: CheckCircle,
  check: Check,
  arrowright: ArrowRight,
  building: Building2,
  utensils: Utensils,
  briefcase: Briefcase,
  shoppingcart: ShoppingCart,
  menu: Menu,
  x: X,
  facebook: _Facebook,
  loader: Loader,
  shield: Shield,
  sparkles: Sparkles,
  zap: Zap,
  cpu: Cpu,
  moon: Moon,
  sun: Sun,
};

const Icon = ({ name, className = 'w-6 h-6' }) => {
  const LucideIcon = ICON_MAP[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={className} aria-hidden="true" />;
};

// --- DATA ARRAYS ---
const NAV_LINKS = ['Services', 'Solutions', 'Healthcare', 'Results', 'FAQ'];



const DIAGNOSTIC_POINTS = [
  {
    step: '01',
    icon: 'mail',
    title: 'Lead Response Lag',
    desc: 'Slow follow-ups cold-kill high-intent prospects.',
    metric: '6hr delay'
  },
  {
    step: '02',
    icon: 'clock',
    title: 'Repetitive Admin Drag',
    desc: 'Team hours wasted on manual copy-pasting.',
    metric: '15+ hrs/wk'
  },
  {
    step: '03',
    icon: 'calendar',
    title: 'Appointment No-Shows',
    desc: 'Empty clinic & agency calendar slots.',
    metric: '30% no-shows'
  },
  {
    step: '04',
    icon: 'trendingup',
    title: 'Revenue Leakage',
    desc: 'Operational bottlenecks capping scale.',
    metric: '-20% growth'
  }
];

const AUTOMATION_SERVICES = [
  { icon: 'whatsapp', title: 'WhatsApp Automation' },
  { icon: 'instagram', title: 'Instagram Automation' },
  { icon: 'linkedin', title: 'LinkedIn Automation' },
  { icon: 'bot', title: 'AI Chatbots' },
  { icon: 'mic', title: 'Voice AI Receptionists' },
  { icon: 'filter', title: 'Lead Qualification' },
  { icon: 'database', title: 'CRM Automation' },
  { icon: 'calendarcheck', title: 'Appointment Booking' },
  { icon: 'slack', title: 'Slack & Teams Automation' },
  { icon: 'mail', title: 'Email Automation' },
  { icon: 'settings', title: 'Internal Operations' },
  { icon: 'sparkles', title: 'Custom AI Agents' }
];

const SERVICE_CHAINS = {
  'WhatsApp Automation': {
    chain: ['WhatsApp Automation', 'Lead Qualification', 'CRM Automation', 'Appointment Booking'],
    timings: { 'WhatsApp Automation': '⚡ <2 sec', 'Lead Qualification': '⚡ Instant', 'CRM Automation': '⚡ Auto-sync', 'Appointment Booking': '⚡ Auto-booked' },
    summary: 'Customer sends a WhatsApp message → AI qualifies lead intent → CRM updates automatically → Appointment is booked.'
  },
  'Instagram Automation': {
    chain: ['Instagram Automation', 'Lead Qualification', 'CRM Automation', 'Appointment Booking'],
    timings: { 'Instagram Automation': '⚡ <3 sec', 'Lead Qualification': '⚡ Instant', 'CRM Automation': '⚡ Auto-sync', 'Appointment Booking': '⚡ Auto-booked' },
    summary: 'DM received on Instagram → AI bot qualifies buyer budget → Contact added to CRM → Sales call scheduled.'
  },
  'LinkedIn Automation': {
    chain: ['LinkedIn Automation', 'Lead Qualification', 'CRM Automation'],
    timings: { 'LinkedIn Automation': '⚡ Real-time', 'Lead Qualification': '⚡ Filtered', 'CRM Automation': '⚡ Logged' },
    summary: 'Inbound LinkedIn message → AI verifies prospect persona → Prospect details synced to sales CRM.'
  },
  'AI Chatbots': {
    chain: ['AI Chatbots', 'Lead Qualification', 'Appointment Booking'],
    timings: { 'AI Chatbots': '⚡ 0ms latency', 'Lead Qualification': '⚡ Instant', 'Appointment Booking': '⚡ Confirmed' },
    summary: 'Website visitor chats with AI → AI captures contact & intent → Calendar invite sent instantly.'
  },
  'Voice AI Receptionists': {
    chain: ['Voice AI Receptionists', 'Appointment Booking', 'CRM Automation'],
    timings: { 'Voice AI Receptionists': '⚡ Live call', 'Appointment Booking': '⚡ Reserved', 'CRM Automation': '⚡ Synced' },
    summary: 'AI receptionist handles phone inquiry → Checks live calendar → Books slot and logs call summary to CRM.'
  },
  'Lead Qualification': {
    chain: ['Lead Qualification', 'CRM Automation', 'Appointment Booking'],
    timings: { 'Lead Qualification': '⚡ Scored', 'CRM Automation': '⚡ Tagged', 'Appointment Booking': '⚡ Scheduled' },
    summary: 'Inbound lead submits data → AI scores purchase intent → High-value leads routed straight to calendar.'
  },
  'CRM Automation': {
    chain: ['CRM Automation', 'Email Automation', 'Internal Operations'],
    timings: { 'CRM Automation': '⚡ Triggered', 'Email Automation': '⚡ Sent', 'Internal Operations': '⚡ Notified' },
    summary: 'CRM status changes to Deal Won → Welcome email dispatched → Internal team notified on Slack.'
  },
  'Appointment Booking': {
    chain: ['Appointment Booking', 'Email Automation'],
    timings: { 'Appointment Booking': '⚡ Confirmed', 'Email Automation': '⚡ Calendar sent' },
    summary: 'Client books slot → Confirmation & calendar file sent automatically → 24h reminder queued.'
  },
  'Slack & Teams Automation': {
    chain: ['Slack & Teams Automation', 'Internal Operations'],
    timings: { 'Slack & Teams Automation': '⚡ Pushed', 'Internal Operations': '⚡ Updated' },
    summary: 'New enterprise lead arrives → Team channel alerted immediately with full contact intel.'
  },
  'Email Automation': {
    chain: ['Email Automation', 'CRM Automation'],
    timings: { 'Email Automation': '⚡ Delivered', 'CRM Automation': '⚡ Tracked' },
    summary: 'Automated email sequence engages prospect → Open & click engagement tracked directly in CRM.'
  },
  'Internal Operations': {
    chain: ['Internal Operations', 'CRM Automation'],
    timings: { 'Internal Operations': '⚡ Executed', 'CRM Automation': '⚡ Updated' },
    summary: 'Standard operating procedure automated → Internal handoffs completed without manual drag.'
  },
  'Custom AI Agents': {
    chain: ['Custom AI Agents', 'Internal Operations', 'CRM Automation'],
    timings: { 'Custom AI Agents': '⚡ Running', 'Internal Operations': '⚡ Autonomous', 'CRM Automation': '⚡ Synced' },
    summary: 'Custom AI agent performs complex multi-step data extraction → Updates internal systems and CRM.'
  }
};

const INDUSTRY_SOLUTIONS = [
  {
    id: 'healthcare',
    icon: 'steth',
    title: 'Healthcare',
    headline: 'Healthcare & clinic automation',
    desc: 'Automating patient pathways, scaling down clinic phone lines, and optimizing doctor calendars with precision integration.',
    metric: '30% fewer no-shows',
    badgeLabel: 'Solutions by Industry',
    features: [
      { icon: 'calendarcheck', title: 'Doctor Appointment Automation' },
      { icon: 'stethoscope', title: 'AI Medical Receptionist' },
      { icon: 'heart', title: 'Patient Follow-Up Automation' },
      { icon: 'activity', title: 'Clinic Workflow Automation' }
    ],
    flow: [
      { name: 'Patient Inquiry', icon: 'heart' },
      { name: 'AI Receptionist', icon: 'mic' },
      { name: 'Calendar Booking', icon: 'calendarcheck' },
      { name: 'WhatsApp Reminder', icon: 'whatsapp' }
    ]
  },
  {
    id: 'real-estate',
    icon: 'building',
    title: 'Real Estate',
    headline: 'Real estate & agency automation',
    desc: 'Instantly capturing web/social leads, qualifying buyer budget, and routing hot prospects to agent calendars 24/7.',
    metric: '2× faster lead response',
    badgeLabel: 'Solutions by Industry',
    features: [
      { icon: 'filter', title: 'Lead Capture & Scoring' },
      { icon: 'database', title: 'CRM Auto-Entry' },
      { icon: 'building', title: 'Property Matching AI' },
      { icon: 'mail', title: 'Follow-up Sequence' }
    ],
    flow: [
      { name: 'Instagram Lead', icon: 'instagram' },
      { name: 'AI Qualification', icon: 'filter' },
      { name: 'CRM Entry', icon: 'database' },
      { name: 'Agent Assignment', icon: 'phone' }
    ]
  },
  {
    id: 'restaurants',
    icon: 'utensils',
    title: 'Restaurants',
    headline: 'Restaurant & reservation automation',
    desc: 'Eliminating phone queues, automating table bookings over WhatsApp, and triggering automated customer review requests.',
    metric: '24/7 automated reservations',
    badgeLabel: 'Solutions by Industry',
    features: [
      { icon: 'calendarcheck', title: 'Table Reservations' },
      { icon: 'whatsapp', title: 'WhatsApp Orders' },
      { icon: 'heart', title: 'Automated Review Requests' },
      { icon: 'activity', title: 'Kitchen Notifications' }
    ],
    flow: [
      { name: 'Reservation Request', icon: 'calendarcheck' },
      { name: 'Table Availability', icon: 'filter' },
      { name: 'Booking Confirmed', icon: 'check' },
      { name: 'SMS Reminder', icon: 'clock' }
    ]
  },
  {
    id: 'agencies',
    icon: 'briefcase',
    title: 'Agencies',
    headline: 'Marketing & service agency automation',
    desc: 'Putting inbound lead audits, client onboarding sequences, and weekly performance reporting dashboards on 100% autopilot.',
    metric: '15+ hours saved/week',
    badgeLabel: 'Solutions by Industry',
    features: [
      { icon: 'filter', title: 'Inbound Lead Audit' },
      { icon: 'bot', title: 'AI Discovery Bot' },
      { icon: 'calendarcheck', title: 'Calendar Auto-Book' },
      { icon: 'database', title: 'Automated Reporting' }
    ],
    flow: [
      { name: 'Inbound Form', icon: 'mail' },
      { name: 'AI Discovery Audit', icon: 'bot' },
      { name: 'Auto-Book Call', icon: 'calendarcheck' },
      { name: 'Proposal Gen', icon: 'database' }
    ]
  },
  {
    id: 'coaches',
    icon: 'users',
    title: 'Coaches & Consultants',
    headline: 'Coaching & consulting automation',
    desc: 'Filtering out unqualified applicants, delivering VSLs automatically, and preparing clients for 1-on-1 strategy sessions.',
    metric: '3× higher qualified calls',
    badgeLabel: 'Solutions by Industry',
    features: [
      { icon: 'filter', title: 'Application Vetting' },
      { icon: 'sparkles', title: 'VSL & Lead Scoring' },
      { icon: 'calendarcheck', title: 'Strategy Call Booking' },
      { icon: 'database', title: 'Client Portal Onboarding' }
    ],
    flow: [
      { name: 'Application Form', icon: 'filter' },
      { name: 'Lead Scoring', icon: 'sparkles' },
      { name: 'Strategy Call Book', icon: 'calendarcheck' },
      { name: 'Portal Access', icon: 'database' }
    ]
  },
  {
    id: 'ecommerce',
    icon: 'shoppingcart',
    title: 'E-commerce',
    headline: 'E-commerce & retail automation',
    desc: 'Recovering abandoned carts via WhatsApp nudges, automating shipping updates, and collecting post-delivery reviews.',
    metric: '35% recovered carts',
    badgeLabel: 'Solutions by Industry',
    features: [
      { icon: 'shoppingcart', title: 'Abandoned Cart Recovery' },
      { icon: 'whatsapp', title: 'WhatsApp Order Updates' },
      { icon: 'bot', title: 'AI Customer Support' },
      { icon: 'heart', title: 'Post-Delivery Reviews' }
    ],
    flow: [
      { name: 'Abandoned Cart', icon: 'shoppingcart' },
      { name: 'WhatsApp Nudge', icon: 'whatsapp' },
      { name: 'Dynamic Discount', icon: 'sparkles' },
      { name: 'Order Confirmed', icon: 'check' }
    ]
  }
];

const TOOLS = ['OpenAI', 'Claude', 'WhatsApp', 'Instagram', 'Slack', 'MS Teams', 'HubSpot', 'Salesforce', 'Zapier', 'Make', 'Shopify', 'Notion', 'Google Sheets', 'Airtable', 'Stripe', 'Twilio', 'Zendesk'];

const PROCESS = [
  { step: '01', title: 'Discovery call', desc: 'We analyze your current bottlenecks.' },
  { step: '02', title: 'Process audit', desc: 'Mapping out exactly what can be automated.' },
  { step: '03', title: 'Automation strategy', desc: 'Designing the architecture of your AI systems.' },
  { step: '04', title: 'Build & integration', desc: 'Developing and connecting the tools.' },
  { step: '05', title: 'Launch', desc: 'Deploying the system with full testing.' },
  { step: '06', title: 'Optimization', desc: 'Continuous monitoring and improvement.' }
];

const FLOWS = [
  {
    title: 'Social sales pipeline',
    result: '+45% Lead conversion',
    steps: [
      { name: 'Instagram DM', icon: 'instagram', desc: 'Captures lead inquiry' },
      { name: 'Lead qualification', icon: 'filter', desc: 'Scores intent & budget' },
      { name: 'CRM auto-sync', icon: 'database', desc: 'Updates pipeline stage' },
      { name: 'Sales call booked', icon: 'calendarcheck', desc: 'Schedules calendar slot' }
    ]
  },
  {
    title: 'Inbound web pipeline',
    result: '18 Hours saved / week',
    steps: [
      { name: 'Website lead', icon: 'building', desc: 'Form submission received' },
      { name: 'AI qualification', icon: 'bot', desc: 'Instant AI response' },
      { name: 'Calendar booking', icon: 'calendarcheck', desc: 'Sends direct invite' }
    ]
  },
  {
    title: 'Healthcare clinic pipeline',
    result: 'No-shows reduced to 4%',
    steps: [
      { name: 'Patient inquiry', icon: 'heart', desc: 'Web or phone request' },
      { name: 'AI receptionist', icon: 'mic', desc: 'Validates availability' },
      { name: 'Appointment booked', icon: 'calendarcheck', desc: 'Confirms clinic slot' },
      { name: 'WhatsApp reminder', icon: 'whatsapp', desc: 'Auto-sends 24h prior' }
    ]
  }
];

const STATS = [
  { value: '70%', label: 'Less manual work' },
  { value: '5x', label: 'Faster response time' },
  { value: '24/7', label: 'Availability' },
  { value: '40+', label: 'Hours saved weekly' }
];

const CASE_STUDIES = [
  { industry: 'Real estate agency', before: '12 hrs/week on manual data entry.', after: 'Automated CRM lead routing.', impact: '+45% lead conversion rate.' },
  { industry: 'Healthcare clinic', before: '30% appointment no-show rate.', after: 'AI WhatsApp reminders.', impact: 'No-shows reduced to 4%.' },
  { industry: 'Marketing agency', before: 'Manual client reporting.', after: 'Automated weekly dashboards.', impact: '20 hours saved per week.' }
];

const FAQS = [
  { q: 'Do I need technical skills to manage this?', a: 'Not at all. We build the systems to run seamlessly in the background and provide a simple dashboard for oversight.' },
  { q: 'How long does deployment take?', a: 'Most core automations are deployed within 2-4 weeks, depending on complexity.' },
  { q: 'Is our data secure?', a: 'Yes, we use enterprise-grade encryption and comply with standard data protection regulations, especially for healthcare (HIPAA compliant architectures available).' }
];

// --- FORMSPREE ENDPOINT ---
// Set VITE_FORM_ENDPOINT in your .env file (see .env.example).
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || 'https://formspree.io/f/mbdenkjk';




const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const numericPart = parseInt(value, 10);
    if (isNaN(numericPart)) return;
    
    let startTimestamp = null;
    const duration = 1800; // ms

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * numericPart));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const suffix = value.replace(/[0-9]/g, '');

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

// --- REUSABLE SHELL COMPONENTS ---

const PipelineDivider = ({ nodeLabel = 'Node 00: Flow Pipeline' }) => {
  const ref = useRef(null);
  const activeRef = useRef(false);
  const [isActive, setIsActive] = useState(false);
  const [packetKey, setPacketKey] = useState(0);
  const { scrollYProgress } = useScroll();
  const cableId = `pipeline-cable-${nodeLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const glowId = `pipeline-glow-${nodeLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  const evaluateJunction = useCallback((progress) => {
    if (!ref.current || typeof window === 'undefined') return;

    const rect = ref.current.getBoundingClientRect();
    const spineNodeY = progress * window.innerHeight;
    const junctionY = rect.top + rect.height / 2;
    const nextIsActive = Math.abs(junctionY - spineNodeY) < 55;

    if (nextIsActive !== activeRef.current) {
      activeRef.current = nextIsActive;
      setIsActive(nextIsActive);
      if (nextIsActive) setPacketKey((key) => key + 1);
    }
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', evaluateJunction);

  useEffect(() => {
    const update = () => evaluateJunction(scrollYProgress.get());
    const frame = window.requestAnimationFrame(update);
    window.addEventListener('resize', update);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', update);
    };
  }, [evaluateJunction, scrollYProgress]);

  return (
    <div ref={ref} className="w-full flex justify-center py-4 md:py-6 relative pointer-events-none z-10" aria-hidden="true">
      <div className="w-full max-w-6xl px-6 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4">
        {/* Left Horizontal Track with Subtle Left-to-Right Pip */}
        <div className={`relative h-[1.5px] bg-gradient-to-r from-transparent via-[#06b6d4]/35 to-[#1a73e8] transition-opacity duration-300 overflow-hidden rounded-full ${isActive ? 'opacity-90' : 'opacity-30'}`}>
          <motion.div
            key={`left-pulse-${packetKey}`}
            initial={{ x: '-100%', opacity: 0 }}
            animate={
              isActive
                ? { x: ['-20%', '100%'], opacity: [0, 0.75, 0.3] }
                : { opacity: 0 }
            }
            transition={{ duration: 0.75, ease: 'easeInOut' }}
            className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-[#06b6d4] to-[#1a73e8] shadow-[0_0_6px_#06b6d4]"
          />
        </div>

        <div className="relative h-12 w-60 flex items-center justify-center">
          <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 240 48" role="presentation">
            <defs>
              <linearGradient id={cableId} x1="120" y1="0" x2="120" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1a73e8" stopOpacity="0.08" />
                <stop offset="35%" stopColor="#06b6d4" stopOpacity="0.7" />
                <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.08" />
              </linearGradient>
              <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <motion.path
              d="M120 0 C120 10 120 14 120 24 C120 34 120 38 120 48"
              fill="none"
              stroke={`url(#${cableId})`}
              strokeWidth="2"
              animate={{ opacity: isActive ? 0.9 : 0.35 }}
              transition={{ duration: 0.2 }}
            />
            {/* Traveling Node Packet with Multi-Chromatic Glow */}
            <motion.circle
              key={packetKey}
              cx="120"
              r="3.2"
              fill="#f97316"
              filter={`url(#${glowId})`}
              initial={{ cy: 0, opacity: 0, scale: 0.6 }}
              animate={
                isActive
                  ? {
                      cy: [0, 24, 48],
                      opacity: [0, 0.9, 0],
                      scale: [0.6, 2.0, 0.6]
                    }
                  : { opacity: 0 }
              }
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
          </svg>

          {/* Synaptic Fusion Shockwave */}
          {isActive && (
            <motion.div
              key={`fusion-shockwave-${packetKey}`}
              initial={{ opacity: 0.8, scale: 0.9 }}
              animate={{ opacity: [0.8, 0], scale: [0.9, 1.25] }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border border-[#06b6d4]/80 dark:border-[#f97316]/80 pointer-events-none"
            />
          )}

          <motion.div
            data-pipeline-node
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{
              scale: isActive ? [1, 1.03, 1] : 1,
              boxShadow: isActive
                ? '0 0 0 3px rgba(6,182,212,0.16), 0 0 16px rgba(249,115,22,0.32), 0 2px 10px rgba(15,23,42,0.07)'
                : '0 1px 3px rgba(15,23,42,0.05)'
            }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#f8fbff]/95 dark:bg-[#0a0a0a]/95 text-[10px] font-mono backdrop-blur overflow-hidden transition-all duration-300 ${
              isActive
                ? 'border-[#06b6d4]/90 dark:border-[#f97316]/90 text-[#0284c7] dark:text-[#fb923c]'
                : 'border-[#c7d7f5] dark:border-[#26384a] text-[#3f5f99] dark:text-[#93c5fd]/80'
            }`}
          >
            {/* Pulsing indicator dot */}
            <motion.span
              animate={
                isActive
                  ? {
                      scale: [1, 2.0, 1.3],
                      boxShadow: ['0 0 0px #06b6d4', '0 0 8px rgba(249,115,22,0.8)', '0 0 3px #06b6d4']
                    }
                  : { scale: 1, boxShadow: '0 0 0px transparent' }
              }
              transition={{ duration: 0.45 }}
              className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#06b6d4] to-[#f97316] shrink-0"
            />
            <span className="font-bold tracking-tight transition-colors duration-300">
              {nodeLabel}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f97316]/18 to-transparent"
              initial={false}
              animate={{ x: isActive ? ['-120%', '120%'] : '-120%', opacity: isActive ? [0, 0.9, 0] : 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            />
          </motion.div>
        </div>

        {/* Right Horizontal Track with Continuing Left-to-Right Pip */}
        <div className={`relative h-[1.5px] bg-gradient-to-l from-transparent via-[#f59e0b]/35 to-[#f97316] transition-opacity duration-300 overflow-hidden rounded-full ${isActive ? 'opacity-90' : 'opacity-30'}`}>
          <motion.div
            key={`right-pulse-${packetKey}`}
            initial={{ x: '-100%', opacity: 0 }}
            animate={
              isActive
                ? { x: ['-20%', '100%'], opacity: [0.3, 0.75, 0] }
                : { opacity: 0 }
            }
            transition={{ duration: 0.75, delay: 0.25, ease: 'easeInOut' }}
            className="absolute inset-y-0 w-16 bg-gradient-to-r from-[#f59e0b] via-[#f97316] to-transparent shadow-[0_0_6px_#f97316]"
          />
        </div>
      </div>
    </div>
  );
};

const SectionHeading = ({ title, subtitle }) => (
  <div className="text-center mb-14 md:mb-20">
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-[2.75rem] font-medium font-display tracking-tight text-[#171717] dark:text-[#ededed] mb-5 leading-[1.1]"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.08, duration: 0.5 }}
        className="text-[#666666] dark:text-[#888888] font-sans font-normal max-w-2xl mx-auto text-lg leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const Card = ({ children, className = '', ...props }) => (
  <div
    {...props}
    className={`bg-white dark:bg-[#0a0a0a] border border-[#e5e7eb] dark:border-[#333333] rounded-xl p-6 light-card-shadow hover-card-elevation hover:-translate-y-1 hover:border-[#1a73e8]/30 dark:hover:border-[#444444] transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

// --- INTERACTIVE ROI CALCULATOR COMPONENT ---
const RoiCalculator = ({ onApplyEstimate }) => {
  const [teamSize, setTeamSize] = useState(4);
  const [weeklyHours, setWeeklyHours] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(30);
  const [currency, setCurrency] = useState('$');

  const annualHoursWasted = teamSize * weeklyHours * 52;
  const annualCostWasted = annualHoursWasted * hourlyRate;
  const estimatedSavings = Math.round(annualCostWasted * 0.70); // 70% automation efficiency
  const weeklyHoursReclaimed = Math.round(teamSize * weeklyHours * 0.70);

  return (
    <div className="bg-white dark:bg-[#0a0a0a] border border-[#eaeaea] dark:border-[#333333] rounded-2xl p-6 md:p-10 light-card-shadow">
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left: Sliders */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1a73e8] dark:text-[#60a5fa] px-3 py-1 rounded-full bg-[#e8f0fe] dark:bg-[#3b82f6]/20 border border-[#d2e3fc] dark:border-[#3b82f6]/30">
              Interactive ROI Engine
            </span>
            <div className="flex items-center gap-1 bg-[#f3f4f6] dark:bg-[#1f1f1f] p-1 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => { setCurrency('$'); if (hourlyRate === 1500) setHourlyRate(30); }}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${currency === '$' ? 'bg-white dark:bg-[#0a0a0a] text-[#1a73e8] shadow-xs' : 'text-[#666666] dark:text-[#888888]'}`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => { setCurrency('₹'); if (hourlyRate === 30) setHourlyRate(1500); }}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${currency === '₹' ? 'bg-white dark:bg-[#0a0a0a] text-[#1a73e8] shadow-xs' : 'text-[#666666] dark:text-[#888888]'}`}
              >
                INR (₹)
              </button>
            </div>
          </div>

          {/* Slider 1: Team Size */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="team-slider" className="font-semibold font-display text-[#171717] dark:text-[#ededed]">
                Team members doing manual tasks
              </label>
              <span className="font-mono font-bold text-base text-[#1a73e8] dark:text-[#60a5fa]">
                {teamSize} {teamSize === 1 ? 'person' : 'people'}
              </span>
            </div>
            <input
              id="team-slider"
              type="range"
              min="1"
              max="25"
              step="1"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full accent-[#1a73e8] cursor-pointer h-2 bg-[#eaeaea] dark:bg-[#262626] rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-[#888888] font-sans">
              <span>1 person</span>
              <span>25 people</span>
            </div>
          </div>

          {/* Slider 2: Hours per Week */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="hours-slider" className="font-semibold font-display text-[#171717] dark:text-[#ededed]">
                Hours spent on repetitive work / week / person
              </label>
              <span className="font-mono font-bold text-base text-[#1a73e8] dark:text-[#60a5fa]">
                {weeklyHours} hrs/wk
              </span>
            </div>
            <input
              id="hours-slider"
              type="range"
              min="3"
              max="35"
              step="1"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full accent-[#1a73e8] cursor-pointer h-2 bg-[#eaeaea] dark:bg-[#262626] rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-[#888888] font-sans">
              <span>3 hrs (Light data entry)</span>
              <span>35 hrs (Heavy operations)</span>
            </div>
          </div>

          {/* Slider 3: Hourly Cost */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="rate-slider" className="font-semibold font-display text-[#171717] dark:text-[#ededed]">
                Average team hourly cost
              </label>
              <span className="font-mono font-bold text-base text-[#1a73e8] dark:text-[#60a5fa]">
                {currency}{hourlyRate}/hr
              </span>
            </div>
            <input
              id="rate-slider"
              type="range"
              min={currency === '$' ? 15 : 500}
              max={currency === '$' ? 120 : 5000}
              step={currency === '$' ? 5 : 100}
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full accent-[#1a73e8] cursor-pointer h-2 bg-[#eaeaea] dark:bg-[#262626] rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-[#888888] font-sans">
              <span>{currency === '$' ? '$15/hr' : '₹500/hr'}</span>
              <span>{currency === '$' ? '$120/hr' : '₹5,000/hr'}</span>
            </div>
          </div>
        </div>

        {/* Right: Output Summary Card */}
        <div className="lg:col-span-5 bg-[#fafafa] dark:bg-[#141414] border border-[#eaeaea] dark:border-[#262626] rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-semibold text-[#888888] dark:text-[#777777] uppercase tracking-wider font-sans block mb-1">
              Estimated Net Annual Savings
            </span>
            <div className="text-4xl md:text-5xl font-display font-extrabold text-[#059669] dark:text-[#34d399] tracking-tight">
              {currency}{estimatedSavings.toLocaleString()}
              <span className="text-xs md:text-sm font-sans font-normal text-[#666666] dark:text-[#888888] ml-2">/ year</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#eaeaea] dark:border-[#262626]">
            <div>
              <span className="text-[11px] text-[#888888] font-sans block mb-0.5">Time Reclaimed</span>
              <span className="text-lg font-bold font-display text-[#171717] dark:text-[#ededed]">
                {weeklyHoursReclaimed} hrs/wk
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#888888] font-sans block mb-0.5">Annual Hours Lost</span>
              <span className="text-lg font-bold font-display text-[#ef4444] dark:text-[#f87171]">
                {annualHoursWasted.toLocaleString()} hrs/yr
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onApplyEstimate({ teamSize, weeklyHours, estimatedSavings, currency })}
            className="w-full py-3.5 bg-[#1a73e8] hover:bg-[#1765cc] text-white font-semibold font-display rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Eliminate this bottleneck</span>
            <Icon name="arrowright" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- LIVE FLOATING WHATSAPP WIDGET ---
const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = '919371061901';
  const messageText = encodeURIComponent("Hi ScaleUpSky! I'd like to discuss automating our business workflows.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${messageText}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 w-72 bg-white dark:bg-[#141414] border border-[#eaeaea] dark:border-[#333333] rounded-2xl shadow-xl p-4 text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#eaeaea] dark:border-[#262626]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                  <Icon name="whatsapp" className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-display text-[#171717] dark:text-[#ededed]">ScaleUpSky Team</h4>
                  <div className="flex items-center gap-1 text-[10px] text-[#059669] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                    <span>Direct WhatsApp</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#999999] hover:text-[#171717] dark:hover:text-white cursor-pointer"
                aria-label="Close WhatsApp popover"
              >
                <Icon name="x" className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-[#666666] dark:text-[#888888] font-sans my-3 leading-relaxed">
              Chat directly with our automation engineers on WhatsApp. Typically responds within 15 minutes.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold font-display text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Icon name="whatsapp" className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group cursor-pointer"
        aria-label="Chat with us on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <Icon name="whatsapp" className="w-5 h-5 text-white" />
        <span className="text-xs font-bold font-display tracking-tight hidden sm:inline">Chat on WhatsApp</span>
      </button>
    </div>
  );
};

// --- MAIN APP PRODUCTION CODE ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeSection, setActiveSection] = useState('');

  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const mouseRafRef = useRef(null);
  const [activeServiceHover, setActiveServiceHover] = useState(null);
  const [activeFlowHover, setActiveFlowHover] = useState(null);
  const [activeIndustryTab, setActiveIndustryTab] = useState(0);
  const [hoveredTool, setHoveredTool] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Global 60fps cursor spotlight tracking across entire website
  useEffect(() => {
    const handleGlobalPointerMove = (e) => {
      if (mouseRafRef.current) return;
      mouseRafRef.current = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
        mouseRafRef.current = null;
      });
    };

    window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      if (mouseRafRef.current) cancelAnimationFrame(mouseRafRef.current);
    };
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  // On-page dark mode class toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Browser Tab Bar Favicon Matcher (Strictly matches Browser/OS Tab Color)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateFaviconForBrowserTheme = (e) => {
      const isBrowserDark = e.matches;
      const faviconSvg = document.querySelector('link[type="image/svg+xml"]');
      const faviconPng = document.querySelector('link[type="image/png"][sizes="48x48"]');

      if (isBrowserDark) {
        if (faviconSvg) faviconSvg.href = '/favicon-dark.svg';
        if (faviconPng) faviconPng.href = '/favicon-dark-48x48.png';
      } else {
        if (faviconSvg) faviconSvg.href = '/favicon.svg';
        if (faviconPng) faviconPng.href = '/favicon-48x48.png';
      }
    };

    updateFaviconForBrowserTheme(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateFaviconForBrowserTheme);
      return () => mediaQuery.removeEventListener('change', updateFaviconForBrowserTheme);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(updateFaviconForBrowserTheme);
      return () => mediaQuery.removeListener(updateFaviconForBrowserTheme);
    }
  }, []);



  // Scroll event & active section tracking — throttled via requestAnimationFrame for 60fps smoothness
  const rafRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollPos = window.scrollY;
        setIsScrolled(scrollPos > 20);

        // At top of page (hero), no navigation link is highlighted
        if (scrollPos < 250) {
          setActiveSection('');
        } else {
          const sectionIds = ['services', 'solutions', 'healthcare', 'results', 'faq', 'contact'];
          let current = '';
          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              // When section top is in upper half of viewport and bottom is still visible
              if (rect.top <= 220 && rect.bottom >= 120) {
                current = id;
                break;
              }
            }
          }
          if (current) {
            setActiveSection(current);
          }
        }
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();

    // Basic validation — phone is optional
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      return;
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus('error');
      return;
    }

    setFormStatus('submitting');

    try {
      // Send submission data to configured Formspree endpoint
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim()
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  }, [formData]);
  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const navigateToIndustry = useCallback((index) => {
    setActiveIndustryTab(index);
    document.getElementById('healthcare')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleApplyRoiEstimate = useCallback(({ teamSize, weeklyHours, estimatedSavings, currency }) => {
    setFormData(prev => ({
      ...prev,
      message: `Hi ScaleUpSky, I ran your ROI simulator: our team of ${teamSize} people spends ~${weeklyHours} hrs/week on repetitive manual tasks (est. ${currency}${estimatedSavings.toLocaleString()}/yr lost). I'd like to see how ScaleUpSky can automate our pipeline.`
    }));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      document.getElementById('contact-message')?.focus();
    }, 500);
  }, []);

  const wrapperClasses = 'min-h-screen bg-[#fafafa] dark:bg-black bg-grid-pattern text-[#171717] dark:text-[#ededed] selection:bg-[#1a73e8]/20 font-sans overflow-x-hidden relative';

  return (
    <div className={wrapperClasses} style={{ fontFamily: "'Geist', sans-serif" }}>
      {/* GLOBAL CURSOR AMBIENT SPOTLIGHT (REACTS TO POINTER ACROSS ENTIRE WEBSITE) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${
            isDarkMode ? 'rgba(96, 165, 250, 0.08)' : 'rgba(26, 115, 232, 0.07)'
          }, transparent 75%)`
        }}
        aria-hidden="true"
      />

      <style>{`
        .font-display { font-family: 'Geist', sans-serif; font-weight: 700; letter-spacing: -0.02em; }
        @keyframes dotpulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
      `}</style>



      {/* NAVBAR */}
      <header
        role="banner"
        className={`fixed top-0 inset-x-0 w-full z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#eaeaea] dark:border-[#262626] py-3 shadow-xs'
            : 'bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-transparent py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          {/* LEFT ZONE: BRAND LOGO */}
          <a href="#" aria-label="ScaleupSky – Go to top of page" className="flex items-center gap-2.5 group cursor-pointer">
            <img src="/web-app-manifest-512x512.png" alt="ScaleUpSky AI Automation Agency logo" className="h-7 w-auto dark:invert transition-transform group-hover:scale-105" />
            <span className="font-display font-bold text-lg tracking-tight text-[#171717] dark:text-[#ededed]">
              ScaleupSky
            </span>
          </a>

          {/* RIGHT ZONE: NAV LINKS + THEME TOGGLE + CTA */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
            <div className="flex items-center gap-1 mr-2">
              {NAV_LINKS.map(link => {
                const id = link.toLowerCase();
                const isActive = activeSection === id;
                return (
                  <a
                    key={link}
                    href={`#${id}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium font-sans transition-all duration-150 ${
                      isActive
                        ? 'text-[#1a73e8] dark:text-[#60a5fa] font-semibold bg-[#e8f0fe]/70 dark:bg-[#1a73e8]/10'
                        : 'text-[#555555] dark:text-[#999999] hover:text-[#171717] dark:hover:text-[#ededed] hover:bg-[#f4f4f5] dark:hover:bg-[#1a1a1a]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link}
                  </a>
                );
              })}
            </div>

            <div className="h-4 w-px bg-[#eaeaea] dark:bg-[#262626] mx-1" aria-hidden="true" />

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-[#666666] dark:text-[#888888] hover:text-[#171717] dark:hover:text-white hover:bg-[#f4f4f5] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Icon name="sun" className="w-4 h-4" /> : <Icon name="moon" className="w-4 h-4" />}
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="ml-2 px-4 py-2 bg-[#1a73e8] hover:bg-[#1765cc] text-white text-xs font-semibold font-display rounded-lg shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Book strategy call</span>
              <Icon name="arrowright" className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* MOBILE CONTROLS */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-[#666666] dark:text-[#888888] hover:bg-[#f4f4f5] dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Icon name="sun" className="w-4 h-4" /> : <Icon name="moon" className="w-4 h-4" />}
            </button>
            <button
              className="text-[#666666] dark:text-[#888888] hover:text-[#171717] dark:hover:text-[#ededed] transition-colors p-2 rounded-lg hover:bg-[#f4f4f5] dark:hover:bg-[#1a1a1a]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <Icon name="x" className="w-5 h-5" /> : <Icon name="menu" className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-[#0a0a0a] pt-24 px-6 md:hidden flex flex-col gap-6 text-xl font-display"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-[#eaeaea] dark:border-[#333333] pb-4 text-[#171717] dark:text-[#ededed] hover:text-[#1a73e8] dark:hover:text-[#60a5fa]"
              >
                {link}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <main id="main-content">
        {/* SECTION 1: HERO */}
        <section
          id="top"
          aria-labelledby="hero-heading"
          className="relative pt-40 pb-20 md:pt-48 md:pb-28 px-6 flex flex-col items-center text-center overflow-hidden scroll-mt-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] dark:bg-[#3b82f6]/20 border border-[#d2e3fc] text-xs font-semibold font-sans tracking-wide text-[#1a73e8] dark:text-[#60a5fa] mb-8 z-10"
          >
            <span className="w-2 h-2 rounded-full bg-[#1a73e8]" style={{ animation: 'dotpulse 2s ease-in-out infinite' }} aria-hidden="true" />
            Accepting new clients for 2026
          </motion.div>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-5xl md:text-7xl lg:text-[5.25rem] font-display font-extrabold tracking-tight mb-7 leading-[1.05] text-[#171717] dark:text-[#ededed]"
          >
            <span className="block text-2xl md:text-3xl lg:text-4xl text-[#666666] dark:text-[#888888] font-semibold mb-4 tracking-tight">AI Automation Agency</span>
            Stop doing <span className="text-[#1a73e8] dark:text-[#60a5fa]">repetitive work.</span><br />
            Let AI run it.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl text-[#666666] dark:text-[#888888] font-sans font-normal max-w-2xl mb-11 leading-relaxed"
          >
            We design and deploy AI agents and business automations that save time, increase revenue, and eliminate manual work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto z-10"
          >
            
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3.5 bg-[#1a73e8] text-white font-semibold font-display rounded-full hover:bg-[#1765cc] hover:shadow-lg dark:hover:shadow-none transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Book a strategy call <Icon name="arrowright" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="px-8 py-3.5 bg-white dark:bg-[#0a0a0a] text-[#444444] dark:text-[#cccccc] hover:text-[#171717] dark:hover:text-[#ffffff] font-semibold font-display rounded-full hover:bg-gray-50 dark:hover:bg-[#141414] transition-all duration-200 border border-[#d1d5db] dark:border-[#444444] shadow-xs"
            >
              See what we automate
            </button>
          </motion.div>
        </section>

        <PipelineDivider nodeLabel="Node 01: Inbound Capture" />

        {/* SECTION 2: MINIMAL WORKFLOW JOURNEY */}
        <section aria-labelledby="solutions-heading" className="py-20 px-6 scroll-mt-24" id="solutions">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              title="Business Process & Workflow Automation"
              subtitle="Eliminate manual bottlenecks with tailor-made automation pipelines."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DIAGNOSTIC_POINTS.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <div
                    onClick={() => scrollToSection('services')}
                    className="h-full bg-white dark:bg-[#0a0a0a] border border-[#eaeaea] dark:border-[#333333] hover:border-[#1a73e8]/40 dark:hover:border-[#60a5fa]/40 rounded-lg p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer group hover:-translate-y-0.5 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-8 h-8 rounded-lg bg-[#e8f0fe] dark:bg-[#3b82f6]/20 flex items-center justify-center text-[#1a73e8] dark:text-[#60a5fa] shrink-0" aria-hidden="true">
                          <Icon name={point.icon} className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#fef3c7] dark:bg-[#78350f]/30 text-[#d97706] dark:text-[#fbbf24] border border-[#fde68a] dark:border-[#92400e]/40">
                          {point.metric}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold font-display text-[#171717] dark:text-[#ededed] mb-1.5 group-hover:text-[#1a73e8] dark:group-hover:text-[#60a5fa] transition-colors">
                        {point.title}
                      </h3>
                      <p className="text-[#666666] dark:text-[#888888] font-sans text-xs leading-relaxed">
                        {point.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#eaeaea] dark:border-[#262626] flex items-center justify-between text-xs text-[#1a73e8] dark:text-[#60a5fa] font-semibold font-sans">
                      <span>See solution</span>
                      <Icon name="arrowright" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <PipelineDivider nodeLabel="Node 02: Bottleneck Audit" />

        {/* SECTION 3: WHAT WE AUTOMATE & HEALTHCARE */}
        <section aria-labelledby="services-heading" className="py-20 px-6 bg-[#fafafa] dark:bg-[#111111] scroll-mt-24" id="services">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="WhatsApp, CRM & Chatbot Automation Systems" subtitle="Tailor-made AI automation pipelines to put your standard operational workflows on autopilot." />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 mb-6">
              {AUTOMATION_SERVICES.map((service, i) => {
                const activeData = activeServiceHover ? SERVICE_CHAINS[activeServiceHover] : null;
                const activeChain = activeData ? activeData.chain : [];
                const activeTimings = activeData ? activeData.timings : {};
                const isInChain = activeServiceHover ? activeChain.includes(service.title) : false;
                const timingBadge = isInChain ? activeTimings[service.title] : null;
                const isHovered = activeServiceHover === service.title;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
                    onMouseEnter={() => setActiveServiceHover(service.title)}
                    onMouseLeave={() => setActiveServiceHover(null)}
                    className={`bg-white dark:bg-[#0a0a0a] border rounded-xl p-6 flex flex-col items-center text-center gap-3.5 relative transition-all duration-300 cursor-pointer ${
                      activeServiceHover
                        ? isInChain
                          ? 'opacity-100 border-t-2 border-t-[#1a73e8] dark:border-t-[#60a5fa] border-x-[#eaeaea] dark:border-x-[#333333] border-b-[#eaeaea] dark:border-b-[#333333] shadow-xs'
                          : 'opacity-45 border-[#eaeaea] dark:border-[#333333]'
                        : 'border-[#eaeaea] dark:border-[#333333] hover:border-[#1a73e8]/40 dark:hover:border-[#60a5fa]/40 hover:-translate-y-0.5'
                    }`}
                  >
                    {timingBadge && (
                      <span className="absolute top-2.5 right-2.5 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#e8f0fe] dark:bg-[#3b82f6]/20 text-[#1a73e8] dark:text-[#60a5fa]">
                        {timingBadge}
                      </span>
                    )}
                    <div className={`transition-all duration-200 ${isInChain || isHovered ? 'text-[#1a73e8] dark:text-[#60a5fa]' : 'text-[#666666] dark:text-[#888888]'}`} aria-hidden="true">
                      <Icon name={service.icon} className="w-6 h-6" />
                    </div>
                    <span className={`font-display font-medium text-sm tracking-tight transition-colors ${isInChain || isHovered ? 'text-[#171717] dark:text-[#ededed] font-semibold' : 'text-[#666666] dark:text-[#888888]'}`}>{service.title}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Workflow Preview 1-Sentence Caption */}
            <div className="min-h-[44px] mb-12 flex items-center justify-center">
              <AnimatePresence>
                {activeServiceHover && SERVICE_CHAINS[activeServiceHover] && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 2 }}
                    transition={{ duration: 0.15 }}
                    className="px-5 py-2.5 rounded-full bg-[#e8f0fe] dark:bg-[#3b82f6]/15 border border-[#1a73e8]/30 text-center font-sans text-xs md:text-sm text-[#171717] dark:text-[#ededed] flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span className="font-bold text-[#1a73e8] dark:text-[#60a5fa] font-mono">Workflow Preview:</span>
                    <span>{SERVICE_CHAINS[activeServiceHover].summary}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* UNIFIED ADAPTIVE INDUSTRY SOLUTIONS ENGINE */}
            <div className="mt-12 bg-white dark:bg-[#0a0a0a] rounded-xl p-6 md:p-12 border border-[#eaeaea] dark:border-[#333333] relative overflow-hidden light-card-shadow scroll-mt-28" id="healthcare">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f4ea] dark:bg-[#137333]/30 border border-[#a7f3d0] dark:border-[#059669]/30 text-[#059669] text-xs font-semibold font-sans mb-4">
                  <Icon name="activity" className="w-3.5 h-3.5" /> Solutions by Industry
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-[#171717] dark:text-[#ededed] mb-2 tracking-tight">
                  Built for your specific industry
                </h3>
                <p className="text-xs md:text-sm text-[#666666] dark:text-[#888888] font-sans max-w-xl mx-auto">
                  Select your industry below to explore tailored automation features and workflow architecture.
                </p>
              </div>

              {/* Apple-Style Industry Tab Controls */}
              <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Solutions by industry">
                {INDUSTRY_SOLUTIONS.map((ind, i) => {
                  const isActive = activeIndustryTab === i;
                  return (
                    <button
                      key={ind.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveIndustryTab(i)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-medium font-sans transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#1a73e8] text-white shadow-md border border-[#1a73e8]'
                          : 'bg-[#fafafa] dark:bg-[#111111] border border-[#eaeaea] dark:border-[#333333] text-[#4b5563] dark:text-[#cccccc] hover:border-[#1a73e8]/40 hover:text-[#171717] dark:hover:text-white'
                      }`}
                    >
                      <span className={isActive ? 'text-white' : 'text-[#1a73e8] dark:text-[#60a5fa]'}>
                        <Icon name={ind.icon} className="w-4 h-4" />
                      </span>
                      <span>{ind.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Adaptive Tab Panel (Apple Crossfade + Slide Animation) */}
              <AnimatePresence mode="wait">
                {(() => {
                  const currentSol = INDUSTRY_SOLUTIONS[activeIndustryTab] || INDUSTRY_SOLUTIONS[0];
                  return (
                    <motion.div
                      key={currentSol.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="grid lg:grid-cols-12 gap-8 items-center relative z-10"
                    >
                      {/* Left Column: Headline, Metric & 2x2 Feature Grid */}
                      <div className="lg:col-span-7">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8f0fe] dark:bg-[#3b82f6]/20 border border-[#d2e3fc] dark:border-[#3b82f6]/40 text-[#1a73e8] dark:text-[#60a5fa] text-xs font-semibold font-sans mb-4">
                          ⚡ Impact: {currentSol.metric}
                        </div>
                        <h4 className="text-2xl md:text-3xl font-display font-bold text-[#171717] dark:text-[#ededed] mb-3 tracking-tight">
                          {currentSol.headline}
                        </h4>
                        <p className="text-[#666666] dark:text-[#888888] font-sans text-sm leading-relaxed mb-6 max-w-xl">
                          {currentSol.desc}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-3">
                          {currentSol.features.map((feat, fIdx) => (
                            <motion.div
                              key={fIdx}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: fIdx * 0.04 }}
                              className="flex items-center gap-3 bg-[#fafafa] dark:bg-[#111111] p-3.5 rounded-xl border border-[#eaeaea] dark:border-[#333333] shadow-xs"
                            >
                              <div className="text-[#1a73e8] dark:text-[#60a5fa] shrink-0" aria-hidden="true">
                                <Icon name={feat.icon} className="w-4 h-4" />
                              </div>
                              <span className="font-display font-medium text-xs md:text-sm text-[#171717] dark:text-[#ededed]">{feat.title}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Right Column: Clean SVG Mini Flow Diagram */}
                      <div className="lg:col-span-5 bg-[#fafafa] dark:bg-[#111111] border border-[#eaeaea] dark:border-[#333333] rounded-lg p-5 relative overflow-hidden bg-grid-pattern">
                        <div className="text-[11px] font-mono font-semibold text-[#888888] mb-4 uppercase tracking-wider flex items-center justify-between">
                          <span>Workflow Pipeline</span>
                          <span className="text-[#059669] dark:text-[#34d399] flex items-center gap-1.5 text-[10px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                            Live Flow
                          </span>
                        </div>

                        <div className="flex flex-col gap-2 relative">
                          {currentSol.flow.map((node, nIdx) => (
                            <React.Fragment key={nIdx}>
                              <div className="bg-white dark:bg-[#0a0a0a] border border-[#eaeaea] dark:border-[#262626] px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-medium font-sans text-[#171717] dark:text-[#ededed] shadow-xs">
                                <div className="flex items-center gap-2.5">
                                  <span className="w-4 h-4 rounded-full bg-[#1a73e8]/10 text-[#1a73e8] dark:text-[#60a5fa] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                                    {nIdx + 1}
                                  </span>
                                  <span className="font-semibold text-xs">{node.name}</span>
                                </div>
                                <span className="text-[#1a73e8] dark:text-[#60a5fa]">
                                  <Icon name={node.icon} className="w-3.5 h-3.5" />
                                </span>
                              </div>
                              {nIdx < currentSol.flow.length - 1 && (
                                <div className="flex flex-col items-center justify-center py-0.5 relative" aria-hidden="true">
                                  <div className="w-0.5 h-3 bg-[#1a73e8]/20 dark:bg-[#60a5fa]/20 relative overflow-hidden rounded-full">
                                    <div className="w-full h-2 bg-[#1a73e8] dark:bg-[#60a5fa] animate-data-packet-once rounded-full" />
                                  </div>
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>

                        <div className="mt-5 pt-3 border-t border-[#eaeaea] dark:border-[#262626] flex justify-end">
                          <button
                            onClick={() => scrollToSection('contact')}
                            className="text-xs font-semibold text-[#1a73e8] dark:text-[#60a5fa] hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Book {currentSol.title} Call</span>
                            <Icon name="arrowright" className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <PipelineDivider nodeLabel="Node 03: Automation Engine" />

        {/* SECTION 4: TOOLS WE INTEGRATE (APPLE-STYLE FULL-WIDTH SINGLE LINE) */}
        <section aria-label="Tools and integrations" className="py-14 border-y border-[#eaeaea] dark:border-[#333333] bg-white dark:bg-[#0a0a0a] overflow-hidden w-full">
          <div className="w-full text-center">
            <p className="text-xs font-bold text-[#666666] dark:text-[#888888] font-sans tracking-widest uppercase mb-8 px-6">
              Seamless integration with your stack
            </p>

            <div className="w-full flex flex-nowrap items-center justify-between gap-6 md:gap-8 overflow-x-auto scrollbar-none whitespace-nowrap px-6 md:px-12 py-2">
              {TOOLS.map((tool) => {
                const isHovered = hoveredTool === tool;
                const isDimmed = hoveredTool !== null && !isHovered;

                return (
                  <div
                    key={tool}
                    onMouseEnter={() => setHoveredTool(tool)}
                    onMouseLeave={() => setHoveredTool(null)}
                    className="relative py-1.5 shrink-0 cursor-pointer group transition-all duration-200"
                  >
                    <span
                      className={`text-lg md:text-xl lg:text-2xl font-display font-bold tracking-tight transition-all duration-200 block ${
                        isHovered
                          ? 'opacity-100 text-[#171717] dark:text-white scale-105'
                          : isDimmed
                          ? 'opacity-30 text-[#888888] dark:text-[#555555]'
                          : 'opacity-70 text-[#666666] dark:text-[#888888] hover:opacity-100'
                      }`}
                    >
                      {tool}
                    </span>

                    {/* Tiny Blue Underline Accent (Only when hovered) */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          layoutId="toolUnderline"
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          exit={{ opacity: 0, scaleX: 0 }}
                          transition={{ duration: 0.15 }}
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1a73e8] dark:bg-[#60a5fa] rounded-full origin-center"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Screen-reader only list of tools */}
            <ul className="sr-only">
              {TOOLS.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </section>

        <PipelineDivider nodeLabel="Node 04: Stack Integration" />

        {/* SECTION 5: HOW IT WORKS */}
        <section aria-labelledby="process-heading" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeading title="The automation journey" subtitle="Our proven 6-step framework to transition your business from manual to automated." />
            <div className="relative border-l border-[#eaeaea] dark:border-[#333333] ml-4 md:ml-0 md:space-y-10">
              {PROCESS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4 }}
                  className="relative pl-8 md:pl-0 mb-10 md:mb-0 flex flex-col md:flex-row items-start gap-6 group"
                >
                  <div className="absolute left-[-5px] md:relative md:left-auto w-2.5 h-2.5 rounded-full bg-[#1a73e8] mt-2 ring-4 ring-white" aria-hidden="true" />
                  <Card className="w-full !p-5">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-[#1a73e8] dark:text-[#60a5fa] font-mono text-xs font-bold bg-[#e8f0fe] dark:bg-[#3b82f6]/20 px-2 py-0.5 rounded" aria-hidden="true">{step.step}</span>
                      <h4 className="text-lg font-semibold font-display text-[#171717] dark:text-[#ededed]">{step.title}</h4>
                    </div>
                    <p className="text-[#666666] dark:text-[#888888] font-sans text-sm leading-relaxed">{step.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <PipelineDivider nodeLabel="Node 05: Execution Framework" />

        {/* SECTION 6: AUTOMATION EXAMPLES */}
        <section aria-labelledby="flows-heading" className="py-20 px-6 bg-[#fafafa] dark:bg-[#111111] bg-grid-pattern relative">
          <div className="max-w-7xl mx-auto relative">
            <SectionHeading title="How data flows" subtitle="Watch how a customer inquiry moves through an automated workflow in real time." />
            
            {/* Desktop Engine Connection Line */}
            <div className="hidden md:block absolute top-[55%] left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#1a73e8]/20 dark:via-[#60a5fa]/20 to-transparent pointer-events-none z-0" aria-hidden="true" />

            <div className="grid md:grid-cols-3 gap-6 relative z-10">
              {FLOWS.map((flow, i) => {
                const isHovered = activeFlowHover === i;
                const isOtherHovered = activeFlowHover !== null && activeFlowHover !== i;

                return (
                  <Card
                    key={i}
                    onMouseEnter={() => setActiveFlowHover(i)}
                    onMouseLeave={() => setActiveFlowHover(null)}
                    className={`flex flex-col justify-between transition-all duration-300 ${
                      isOtherHovered ? 'opacity-30 scale-98' : 'opacity-100'
                    } ${isHovered ? 'border-[#1a73e8] dark:border-[#60a5fa] ring-2 ring-[#1a73e8]/20 dark:ring-[#60a5fa]/20' : ''}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#eaeaea] dark:border-[#333333]">
                        <h4 className="text-lg font-bold font-display text-[#171717] dark:text-[#ededed]">{flow.title}</h4>
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#e6f4ea] dark:bg-[#137333]/30 text-[#059669] dark:text-[#34d399] border border-[#a7f3d0] dark:border-[#059669]/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#34d399]" aria-hidden="true" />
                          Running
                        </span>
                      </div>
                      <div className="flex flex-col gap-2.5">
                        {flow.steps.map((step, j) => (
                          <React.Fragment key={j}>
                            <div className="bg-[#fafafa] dark:bg-[#111111] border border-[#eaeaea] dark:border-[#333333] p-3.5 rounded-xl flex items-center justify-between text-sm font-medium font-sans text-[#333333] dark:text-[#cccccc] shadow-xs group/step hover:border-[#1a73e8]/30 transition-colors">
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-lg bg-[#e8f0fe] dark:bg-[#3b82f6]/20 text-[#1a73e8] dark:text-[#60a5fa] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                                  {j + 1}
                                </span>
                                <div>
                                  <div className="font-semibold text-[#171717] dark:text-[#ededed] flex items-center gap-1.5">
                                    <span className="text-[#1a73e8] dark:text-[#60a5fa]"><Icon name={step.icon} className="w-3.5 h-3.5" /></span>
                                    <span>{step.name}</span>
                                  </div>
                                  <span className="text-[11px] text-[#666666] dark:text-[#888888] font-sans block">{step.desc}</span>
                                </div>
                              </div>
                            </div>
                            {j < flow.steps.length - 1 && (
                              <div className="flex flex-col items-center justify-center py-0.5 relative" aria-hidden="true">
                                <div className="w-0.5 h-5 bg-[#1a73e8]/20 dark:bg-[#60a5fa]/20 relative overflow-hidden rounded-full">
                                  <div className="w-full h-2 bg-[#1a73e8] dark:bg-[#60a5fa] animate-data-packet rounded-full" />
                                </div>
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Business Result Connection Node */}
                    <div className="mt-6 pt-4 border-t border-[#eaeaea] dark:border-[#333333] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-[#059669] dark:text-[#34d399] font-mono font-semibold">
                        <Icon name="arrowright" className="w-3.5 h-3.5" />
                        <span>Outcome</span>
                      </div>
                      <span className="text-xs font-bold font-display text-[#171717] dark:text-[#ededed] bg-[#e8f0fe] dark:bg-[#3b82f6]/20 px-3 py-1 rounded-full border border-[#d2e3fc] dark:border-[#3b82f6]/40">
                        {flow.result}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <PipelineDivider nodeLabel="Node 06: Quantified Impact" />

        {/* SECTION 7: RESULTS */}
        <section aria-labelledby="results-heading" className="py-20 px-6 scroll-mt-24" id="results">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-[#eaeaea] dark:border-[#333333] py-14">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-display font-extrabold text-[#1a73e8] dark:text-[#60a5fa] mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-xs md:text-sm text-[#666666] dark:text-[#888888] font-semibold font-sans uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 8: CASE STUDIES */}
        <section aria-labelledby="case-studies-heading" className="py-20 px-6 bg-grid-pattern relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="Real business impact" subtitle="Tangible outcomes delivered to clear engineering standards." />
            <div className="grid md:grid-cols-3 gap-6 relative">
              {CASE_STUDIES.map((study, i) => (
                <React.Fragment key={i}>
                  <Card className="flex flex-col relative overflow-hidden group">
                    <h4 className="text-xl font-semibold font-display text-[#171717] dark:text-[#ededed] mb-6">{study.industry}</h4>
                    <div className="space-y-4 mb-6 flex-grow">
                      <div>
                        <span className="text-xs text-[#ef4444] font-bold uppercase font-sans tracking-wide">Before ScaleupSky</span>
                        <p className="text-sm text-[#666666] dark:text-[#888888] mt-1 font-sans">{study.before}</p>
                      </div>
                      <div>
                        <span className="text-xs text-[#059669] font-bold uppercase font-sans tracking-wide">After automation</span>
                        <p className="text-sm text-[#666666] dark:text-[#888888] mt-1 font-sans">{study.after}</p>
                      </div>
                    </div>
                    <div className="bg-[#e8f0fe] dark:bg-[#3b82f6]/20 border border-[#d2e3fc] p-4 rounded-xl group-hover:-translate-y-0.5 transition-transform">
                      <span className="text-xs text-[#1a73e8] dark:text-[#60a5fa] font-bold uppercase font-sans tracking-wide block mb-1">Business impact</span>
                      <p className="font-semibold font-display text-[#171717] dark:text-[#ededed] text-base">{study.impact}</p>
                    </div>
                  </Card>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        <PipelineDivider nodeLabel="Node 07: Efficiency Simulation" />

        {/* SECTION 9: INTERACTIVE ROI SIMULATOR */}
        <section aria-labelledby="roi-heading" className="py-20 px-6 scroll-mt-24" id="calculator">
          <div className="max-w-5xl mx-auto">
            <SectionHeading
              title="Calculate your automation ROI"
              subtitle="See how much payroll and engineering hours your business reclaims by automating manual pipelines."
            />
            <RoiCalculator onApplyEstimate={handleApplyRoiEstimate} />
          </div>
        </section>

        <PipelineDivider nodeLabel="Node 08: Technical FAQ" />

        {/* SECTION 11: FAQ */}
        <section aria-labelledby="faq-heading" className="py-20 px-6 scroll-mt-24" id="faq">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="Frequently asked questions" />
            <div className="space-y-3" role="list">
              {FAQS.map((faq, i) => {
                const panelId = `faq-panel-${i}`;
                const buttonId = `faq-btn-${i}`;
                const isOpen = activeFaq === i;
                return (
                  <div key={i} className={`border-l-4 transition-all duration-200 rounded-xl overflow-hidden ${isOpen ? 'border-l-[#1a73e8] bg-[#e8f0fe]/20 dark:bg-[#1a73e8]/5 border-t border-b border-r border-[#eaeaea] dark:border-[#333333]' : 'border-l-transparent border border-[#eaeaea] dark:border-[#333333] bg-white dark:bg-[#0a0a0a]'}`} role="listitem">
                    <button
                      id={buttonId}
                      className="w-full px-6 py-4 flex justify-between items-center text-left font-semibold font-display text-[#171717] dark:text-[#ededed] hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors"
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      aria-expanded={activeFaq === i}
                      aria-controls={panelId}
                    >
                      {faq.q}
                      <Icon name="chevrondown" className={`w-4 h-4 text-[#1a73e8] dark:text-[#60a5fa] transition-transform duration-300 flex-shrink-0 ml-4 ${activeFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div
                          id={panelId}
                          key="faq-content"
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-6 pb-5 text-[#666666] dark:text-[#888888] font-sans text-sm leading-relaxed"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <PipelineDivider nodeLabel="Node 08: Deploy Autopilot" />

        {/* SECTION 12 & 13: FINAL CTA & CONTACT FORM */}
        <section aria-labelledby="contact-heading" className="py-20 px-6 bg-[#fafafa] dark:bg-[#111111] scroll-mt-24" id="contact">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
            <div>
              <h2 id="contact-heading" className="text-4xl md:text-5xl font-display font-extrabold text-[#171717] dark:text-[#ededed] mb-6 leading-tight tracking-tight">
                Your competitors are already automating.
              </h2>
              <p className="text-[#666666] dark:text-[#888888] font-sans text-base md:text-lg mb-8 leading-relaxed">
                Book a free architecture discovery call to see exactly how ScaleupSky designs, tests, and deploys high-yield AI pipelines.
              </p>

              <ul className="space-y-3.5 mb-8">
                {['Custom automation blueprint', 'Clear ROI projection', 'No technical overhead', 'Zero obligation call'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium font-sans text-[#666666] dark:text-[#888888]">
                    <Icon name="checkcircle" className="w-5 h-5 text-[#1a73e8] dark:text-[#60a5fa] flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-[#eaeaea] dark:border-[#262626] space-y-2 text-xs font-sans">
                <div className="flex flex-wrap items-center gap-2 font-medium text-[#171717] dark:text-[#ededed]">
                  <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
                  <a href="tel:+919371061901" className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors font-semibold">+91 93710 61901</a>
                  <span className="text-[#888888] dark:text-[#777777] font-normal">· Call / WhatsApp (responds &lt; 15m)</span>
                </div>
                <div className="text-[#888888] dark:text-[#777777]">
                  Email: <a href="mailto:scaleupsky@gmail.com" className="text-[#1a73e8] dark:text-[#60a5fa] hover:underline font-medium">scaleupsky@gmail.com</a>
                </div>
              </div>
            </div>

            <Card className="!p-7 relative overflow-hidden">
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-10"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="w-16 h-16 rounded-full bg-[#e6f4ea] dark:bg-[#137333]/30 flex items-center justify-center mb-5 ring-8 ring-[#e6f4ea]/50 dark:ring-[#137333]/10" aria-hidden="true">
                    <svg className="w-8 h-8 text-[#059669]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <motion.path
                        d="M20 6L9 17l-5-5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold font-display text-[#171717] dark:text-[#ededed] mb-2">Request sent successfully</h4>
                  <p className="text-sm text-[#666666] dark:text-[#888888] font-sans mb-6">We'll be in touch within one business day.</p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="text-sm font-semibold font-display text-[#1a73e8] dark:text-[#60a5fa] hover:underline"
                  >
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={handleFormSubmit}
                  noValidate
                  aria-label="Contact form — book a strategy call"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="sr-only">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        id="contact-name"
                        placeholder="Name"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-white dark:bg-[#0a0a0a] border border-[#eaeaea] dark:border-[#333333] rounded-xl px-4 py-3.5 text-sm font-sans text-[#171717] dark:text-[#ededed] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-colors w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="sr-only">Your Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        placeholder="Email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white dark:bg-[#0a0a0a] border border-[#eaeaea] dark:border-[#333333] rounded-xl px-4 py-3.5 text-sm font-sans text-[#171717] dark:text-[#ededed] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-colors w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="sr-only">Your Phone Number (optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      id="contact-phone"
                      placeholder="Contact number (optional)"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-white dark:bg-[#0a0a0a] border border-[#eaeaea] dark:border-[#333333] rounded-xl px-4 py-3.5 text-sm font-sans text-[#171717] dark:text-[#ededed] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-colors w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="sr-only">What would you like to automate?</label>
                    <textarea
                      name="message"
                      id="contact-message"
                      placeholder="What would you like to automate?"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-white dark:bg-[#0a0a0a] border border-[#eaeaea] dark:border-[#333333] rounded-xl px-4 py-3.5 text-sm font-sans text-[#171717] dark:text-[#ededed] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-colors w-full resize-none"
                    />
                  </div>
                  {formStatus === 'error' && (
                    <p className="text-sm text-[#ef4444] font-sans" role="alert" aria-live="assertive">
                      Please fill in all required fields with valid information, or email us directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full py-4 bg-[#1a73e8] text-white font-semibold font-display rounded-xl hover:bg-[#1765cc] disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-2 flex items-center justify-center gap-2"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <Icon name="loader" className="w-4 h-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      'Book my free strategy call'
                    )}
                  </button>

                  <div className="mt-3 pt-3 border-t border-[#eaeaea] dark:border-[#262626] flex items-center justify-between text-xs text-[#888888] dark:text-[#777777] font-sans">
                    <span>⚡ Typical response: &lt; 15 mins</span>
                    <span className="flex items-center gap-1"><Icon name="shield" className="w-3.5 h-3.5 text-[#059669]" /> NDA on request</span>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer role="contentinfo" className="border-t border-[#eaeaea] dark:border-[#333333] bg-white dark:bg-[#0a0a0a] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <a href="#" aria-label="ScaleupSky – Go to top of page" className="flex items-center gap-0.2 mb-6 cursor-pointer">
              <img src="/web-app-manifest-512x512.png" alt="ScaleUpSky AI Automation Agency footer logo" className="h-10 w-auto dark:invert" />
              <span className="font-display font-bold text-lg text-[#171717] dark:text-[#ededed]">
                ScaleupSky
              </span>
            </a>
            <p className="text-[#666666] dark:text-[#888888] font-sans text-sm mb-6 leading-relaxed">Custom AI agents & automation systems that run your business on autopilot.</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/scaleupsky/" target="_blank" rel="noopener noreferrer" aria-label="Follow ScaleupSky on Instagram">
                <Icon name="instagram" className="w-5 h-5 text-[#999999] dark:text-[#888888] hover:text-[#171717] dark:hover:text-[#ededed] cursor-pointer transition-colors" />
              </a>
              <a href="https://www.linkedin.com/company/scaleupsky/" target="_blank" rel="noopener noreferrer" aria-label="Connect with ScaleupSky on LinkedIn">
                <Icon name="linkedin" className="w-5 h-5 text-[#999999] dark:text-[#888888] hover:text-[#171717] dark:hover:text-[#ededed] cursor-pointer transition-colors" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61560493302864" target="_blank" rel="noopener noreferrer" aria-label="Follow ScaleupSky on Facebook">
                <Icon name="facebook" className="w-5 h-5 text-[#999999] dark:text-[#888888] hover:text-[#171717] dark:hover:text-[#ededed] cursor-pointer transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold font-display text-sm mb-4 text-[#171717] dark:text-[#ededed]">Services</h4>
            <ul className="space-y-2 text-sm text-[#666666] dark:text-[#888888] font-sans">
              <li><a href="#services" className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">AI chatbots</a></li>
              <li><a href="#services" className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">Voice AI receptionists</a></li>
              <li><a href="#services" className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">CRM automation</a></li>
              <li><a href="#services" className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">Custom AI agents</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-display text-sm mb-4 text-[#171717] dark:text-[#ededed]">Industries</h4>
            <ul className="space-y-2 text-sm text-[#666666] dark:text-[#888888] font-sans">
              <li><button onClick={() => navigateToIndustry(0)} className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors text-left">Healthcare</button></li>
              <li><button onClick={() => navigateToIndustry(1)} className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors text-left">Real estate</button></li>
              <li><button onClick={() => navigateToIndustry(3)} className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors text-left">Agencies</button></li>
              <li><button onClick={() => navigateToIndustry(5)} className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors text-left">E-commerce</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-display text-sm mb-4 text-[#171717] dark:text-[#ededed]">Company</h4>
            <ul className="space-y-2 text-sm text-[#666666] dark:text-[#888888] font-sans">
              <li><a href="#results" className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">About us</a></li>
              <li><a href="#results" className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">Case studies</a></li>
              <li><a href="#contact" className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">Contact</a></li>
              <li><button onClick={() => setShowPrivacy(true)} className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors text-left">Privacy & security</button></li>
              <li><button onClick={() => setShowTerms(true)} className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors text-left">Terms of service</button></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-[#eaeaea] dark:border-[#333333] text-center text-xs text-[#999999] font-sans flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>© {new Date().getFullYear()} ScaleupSky. All rights reserved.</span>
          <span className="hidden sm:inline">·</span>
          <button onClick={() => setShowPrivacy(true)} className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">Privacy Policy</button>
          <span className="hidden sm:inline">·</span>
          <button onClick={() => setShowTerms(true)} className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">Terms of Service</button>
        </div>
      </footer>

      {/* PRIVACY POLICY MODAL */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPrivacy(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Privacy Policy"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-[#0a0a0a] border border-[#eaeaea] dark:border-[#333333] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-[#0a0a0a] border-b border-[#eaeaea] dark:border-[#333333] px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <div className="flex items-center gap-2">
                  <Icon name="shield" className="w-5 h-5 text-[#1a73e8]" />
                  <h2 className="text-lg font-display font-bold text-[#171717] dark:text-[#ededed]">Privacy & Security Policy</h2>
                </div>
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f3f4f6] dark:hover:bg-[#1a1a1a] transition-colors"
                  aria-label="Close privacy policy"
                >
                  <Icon name="x" className="w-4 h-4 text-[#666666] dark:text-[#888888]" />
                </button>
              </div>

              <div className="px-6 py-6 space-y-6 text-sm text-[#444444] dark:text-[#bbbbbb] font-sans leading-relaxed">
                <p className="text-xs text-[#999999] dark:text-[#666666]">Last updated: August 16, 2026</p>

                <div>
                  <h3 className="text-base font-semibold font-display text-[#171717] dark:text-[#ededed] mb-2">Information We Collect</h3>
                  <p>When you submit our contact form, we collect the following information:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-[#555555] dark:text-[#aaaaaa]">
                    <li>Your name</li>
                    <li>Email address</li>
                    <li>Phone number (optional)</li>
                    <li>Your message describing what you'd like to automate</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-semibold font-display text-[#171717] dark:text-[#ededed] mb-2">How We Use Your Information</h3>
                  <p>We use the information you provide <strong>solely</strong> to:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-[#555555] dark:text-[#aaaaaa]">
                    <li>Respond to your inquiry and schedule a strategy call</li>
                    <li>Understand your automation needs before our conversation</li>
                    <li>Send relevant follow-up communications about our services</li>
                  </ul>
                  <p className="mt-2">We will <strong>never</strong> sell, rent, or share your personal data with third parties for marketing purposes.</p>
                </div>

                <div>
                  <h3 className="text-base font-semibold font-display text-[#171717] dark:text-[#ededed] mb-2">Third-Party Services</h3>
                  <p>Our contact form submissions are processed through <strong>Formspree</strong>, a secure form handling service. Formspree processes your data in accordance with their own privacy policy and does not use your data for any purpose other than delivering it to us.</p>
                  <p className="mt-2">We use <strong>Google Fonts</strong> for typography, which may collect anonymized usage data as described in Google's privacy policy.</p>
                </div>

                <div>
                  <h3 className="text-base font-semibold font-display text-[#171717] dark:text-[#ededed] mb-2">Data Security</h3>
                  <p>We take the security of your data seriously:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-[#555555] dark:text-[#aaaaaa]">
                    <li>Our website is served over <strong>HTTPS</strong> with TLS encryption</li>
                    <li>We enforce strict <strong>Content Security Policy</strong> headers</li>
                    <li>Form submissions are transmitted over encrypted channels</li>
                    <li>For healthcare clients, we offer <strong>HIPAA-compliant</strong> architecture options</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-semibold font-display text-[#171717] dark:text-[#ededed] mb-2">Cookies & Tracking</h3>
                  <p>We do <strong>not</strong> use cookies, analytics trackers, or any third-party tracking scripts on this website. We respect your privacy and believe in a clean browsing experience.</p>
                </div>

                <div>
                  <h3 className="text-base font-semibold font-display text-[#171717] dark:text-[#ededed] mb-2">Your Rights</h3>
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-[#555555] dark:text-[#aaaaaa]">
                    <li>Request access to any personal data we hold about you</li>
                    <li>Request deletion of your data at any time</li>
                    <li>Withdraw consent for future communications</li>
                  </ul>
                  <p className="mt-2">To exercise any of these rights, please email us directly at <a href="mailto:scaleupsky@gmail.com" className="text-[#1a73e8] dark:text-[#60a5fa] hover:underline font-medium">scaleupsky@gmail.com</a>.</p>
                </div>

                <div className="pt-4 border-t border-[#eaeaea] dark:border-[#333333]">
                  <p className="text-xs text-[#999999] dark:text-[#666666]">Questions? Email us at <a href="mailto:scaleupsky@gmail.com" className="text-[#1a73e8] dark:text-[#60a5fa] hover:underline font-medium">scaleupsky@gmail.com</a>.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TERMS OF SERVICE MODAL */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowTerms(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Terms of Service"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-[#0a0a0a] border border-[#eaeaea] dark:border-[#333333] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-[#0a0a0a] border-b border-[#eaeaea] dark:border-[#333333] px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <div className="flex items-center gap-2">
                  <Icon name="briefcase" className="w-5 h-5 text-[#1a73e8]" />
                  <h2 className="text-lg font-display font-bold text-[#171717] dark:text-[#ededed]">Terms of Service</h2>
                </div>
                <button
                  onClick={() => setShowTerms(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f3f4f6] dark:hover:bg-[#1a1a1a] transition-colors"
                  aria-label="Close terms of service"
                >
                  <Icon name="x" className="w-4 h-4 text-[#666666] dark:text-[#888888]" />
                </button>
              </div>

              <div className="px-6 py-6 space-y-6 text-sm text-[#444444] dark:text-[#bbbbbb] font-sans leading-relaxed">
                <p className="text-xs text-[#999999] dark:text-[#666666]">Last updated: August 16, 2026</p>

                <div>
                  <h3 className="text-base font-semibold font-display text-[#171717] dark:text-[#ededed] mb-2">1. Services & Scope</h3>
                  <p>ScaleUpSky provides custom AI agent development, workflow automations, CRM integrations, and AI system design. Specific deliverables, timelines, and milestones are outlined in individual project proposals and service agreements.</p>
                </div>

                <div>
                  <h3 className="text-base font-semibold font-display text-[#171717] dark:text-[#ededed] mb-2">2. 100% Client Intellectual Property Ownership</h3>
                  <p>Upon final project payment, you retain <strong>100% ownership</strong> of all custom workflows, automation scripts, prompt templates, and pipeline configurations created specifically for your business. We do not lock you into proprietary vendor ecosystems.</p>
                </div>

                <div>
                  <h3 className="text-base font-semibold font-display text-[#171717] dark:text-[#ededed] mb-2">3. Confidentiality & Non-Disclosure (NDA)</h3>
                  <p>We treat all client business data, customer lists, CRM records, credentials, and internal workflows with strict confidentiality. Mutual Non-Disclosure Agreements (NDAs) are available upon request prior to project kick-off.</p>
                </div>

                <div>
                  <h3 className="text-base font-semibold font-display text-[#171717] dark:text-[#ededed] mb-2">4. Third-Party Platforms & APIs</h3>
                  <p>Our automation solutions connect to third-party tools and APIs (such as OpenAI, Meta/WhatsApp Business API, Twilio, Make, Zapier, HubSpot, Salesforce). Clients maintain their own direct accounts and subscription costs with these providers.</p>
                </div>

                <div>
                  <h3 className="text-base font-semibold font-display text-[#171717] dark:text-[#ededed] mb-2">5. Testing, Deployment & Support</h3>
                  <p>Every automation pipeline undergoes rigorous quality assurance and testing prior to deployment. Post-launch support and optimization windows are included with every project to ensure smooth day-to-day operations.</p>
                </div>

                <div>
                  <h3 className="text-base font-semibold font-display text-[#171717] dark:text-[#ededed] mb-2">6. Limitation of Liability</h3>
                  <p>While we build robust, production-ready systems, ScaleUpSky is not liable for third-party API outages, upstream platform policy changes (e.g., Meta WhatsApp template rules), or unexpected third-party downtime.</p>
                </div>

                <div className="pt-4 border-t border-[#eaeaea] dark:border-[#333333]">
                  <p className="text-xs text-[#999999] dark:text-[#666666]">Questions about our terms? Reach out at <a href="mailto:scaleupsky@gmail.com" className="text-[#1a73e8] dark:text-[#60a5fa] hover:underline font-medium">scaleupsky@gmail.com</a>.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* MOBILE STICKY CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-[#eaeaea] dark:border-[#333333] z-50">
        <button
          onClick={() => scrollToSection('contact')}
          className="w-full py-3 bg-[#1a73e8] text-white font-semibold font-display rounded-xl"
        >
          Book strategy call
        </button>
      </div>

      {/* LIVE FLOATING WHATSAPP DEMO WIDGET */}
      <WhatsAppWidget />

    </div>
  );
}
