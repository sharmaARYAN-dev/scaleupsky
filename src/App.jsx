import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import {
  Brain, Mail, Clock, Calendar, TrendingUp, MessageSquare,
  Bot, Phone, Target, Users, Settings, Moon, Sun,
  Stethoscope, Heart, Activity, ChevronDown, CheckCircle,
  ArrowRight, Building2, Utensils, Briefcase, ShoppingCart,
  Menu, X, Loader, Shield,
  MessageCircle, Mic, Filter, Database, CalendarCheck,
  Hash, Sparkles
} from 'lucide-react';

// Inline SVG fallbacks for brand icons not in this lucide-react version
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
const _Twitter = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const _Facebook = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const _Github = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// --- LUCIDE ICON COMPONENT WRAPPER ---
const ICON_MAP = {
  brain: Brain,
  mail: Mail,
  clock: Clock,
  calendar: Calendar,
  trendingup: TrendingUp,
  messagesquare: MessageSquare,
  messagecircle: MessageCircle,
  instagram: _Instagram,
  linkedin: _Linkedin,
  bot: Bot,
  phone: Phone,
  mic: Mic,
  target: Target,
  filter: Filter,
  users: Users,
  database: Database,
  settings: Settings,
  stethoscope: Stethoscope,
  heart: Heart,
  activity: Activity,
  chevrondown: ChevronDown,
  checkcircle: CheckCircle,
  arrowright: ArrowRight,
  building: Building2,
  utensils: Utensils,
  briefcase: Briefcase,
  shoppingcart: ShoppingCart,
  menu: Menu,
  x: X,
  twitter: _Twitter,
  facebook: _Facebook,
  github: _Github,
  loader: Loader,
  shield: Shield,
  calendarcheck: CalendarCheck,
  hash: Hash,
  sparkles: Sparkles,
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
  { icon: 'messagecircle', title: 'WhatsApp Automation' },      // round speech bubble
  { icon: 'instagram', title: 'Instagram Automation' },
  { icon: 'linkedin', title: 'LinkedIn Automation' },
  { icon: 'bot', title: 'AI Chatbots' },
  { icon: 'mic', title: 'Voice AI Receptionists' },   // microphone
  { icon: 'filter', title: 'Lead Qualification' },       // funnel
  { icon: 'database', title: 'CRM Automation' },           // database stack
  { icon: 'calendarcheck', title: 'Appointment Booking' },      // calendar + checkmark
  { icon: 'hash', title: 'Slack & Teams Automation' }, // # channel icon
  { icon: 'mail', title: 'Email Automation' },
  { icon: 'settings', title: 'Internal Operations' },
  { icon: 'sparkles', title: 'Custom AI Agents' }          // AI sparkles
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
      { name: 'WhatsApp Reminder', icon: 'clock' }
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
      { name: 'Instagram Lead', icon: 'messagecircle' },
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
      { icon: 'messagecircle', title: 'WhatsApp Orders' },
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
      { icon: 'messagecircle', title: 'WhatsApp Order Updates' },
      { icon: 'bot', title: 'AI Customer Support' },
      { icon: 'heart', title: 'Post-Delivery Reviews' }
    ],
    flow: [
      { name: 'Abandoned Cart', icon: 'shoppingcart' },
      { name: 'WhatsApp Nudge', icon: 'messagecircle' },
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
      { name: 'Instagram DM', icon: 'messagecircle', desc: 'Captures lead inquiry' },
      { name: 'Lead qualification', icon: 'filter', desc: 'Scores intent & budget' },
      { name: 'CRM auto-sync', icon: 'database', desc: 'Updates pipeline stage' },
      { name: 'Sales call booked', icon: 'phone', desc: 'Schedules calendar slot' }
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
      { name: 'WhatsApp reminder', icon: 'clock', desc: 'Auto-sends 24h prior' }
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
const CentralPipelineSpine = () => {
  const pathRef = useRef(null);
  const rafRef = useRef(null);
  const [geometry, setGeometry] = useState({ path: '', height: 0, packet: null });
  const { scrollYProgress } = useScroll();

  const buildRoute = useCallback(() => {
    if (typeof window === 'undefined') return;

    const nodes = Array.from(document.querySelectorAll('[data-pipeline-node]'));
    const height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );

    if (nodes.length < 2) {
      setGeometry((current) => ({ ...current, height, path: '' }));
      return;
    }

    const width = window.innerWidth;
    const edgeLane = Math.min(Math.max(width * 0.012, 10), 18);
    const lanes = [edgeLane, width - edgeLane];
    const points = nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 + window.scrollX,
        y: rect.top + rect.height / 2 + window.scrollY
      };
    });

    const route = points.slice(1).reduce((d, point, index) => {
      const prev = points[index];
      const laneX = lanes[index % 2];
      const corner = 18;
      const prevTurnX = prev.x < laneX ? laneX - corner : laneX + corner;
      const nextTurnX = point.x < laneX ? laneX - corner : laneX + corner;
      const verticalStartY = prev.y + corner;
      const verticalEndY = point.y - corner;

      return `${d} L ${prevTurnX} ${prev.y} Q ${laneX} ${prev.y} ${laneX} ${verticalStartY} L ${laneX} ${verticalEndY} Q ${laneX} ${point.y} ${nextTurnX} ${point.y} L ${point.x} ${point.y}`;
    }, `M ${points[0].x} ${points[0].y}`);

    setGeometry((current) => ({ ...current, path: route, height }));
  }, []);

  useEffect(() => {
    const initialFrame = window.requestAnimationFrame(buildRoute);
    window.addEventListener('resize', buildRoute);
    window.addEventListener('load', buildRoute);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener('resize', buildRoute);
      window.removeEventListener('load', buildRoute);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [buildRoute]);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (rafRef.current) return;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const path = pathRef.current;
      if (!path) return;

      const totalLength = path.getTotalLength();
      if (!totalLength) return;

      const point = path.getPointAtLength(totalLength * progress);
      setGeometry((current) => ({
        ...current,
        packet: { x: point.x, y: point.y }
      }));
    });
  });

  return (
    <svg
      className="hidden lg:block absolute inset-x-0 top-0 w-full pointer-events-none z-[6] overflow-visible"
      width="100%"
      height={geometry.height}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="site-pipeline-route" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a73e8" stopOpacity="0" />
          <stop offset="12%" stopColor="#1a73e8" stopOpacity="0.16" />
          <stop offset="52%" stopColor="#2563eb" stopOpacity="0.24" />
          <stop offset="88%" stopColor="#1a73e8" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </linearGradient>
        <filter id="site-pipeline-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {geometry.path && (
        <>
          <path
            d={geometry.path}
            fill="none"
            stroke="#1a73e8"
            strokeOpacity="0.04"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#site-pipeline-glow)"
          />
          <motion.path
            ref={pathRef}
            d={geometry.path}
            fill="none"
            stroke="url(#site-pipeline-route)"
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            style={{ pathLength: scrollYProgress }}
          />
          {geometry.packet && (
            <g transform={`translate(${geometry.packet.x} ${geometry.packet.y})`}>
              <circle r="5.5" fill="#1a73e8" opacity="0.08" />
              <circle r="2.5" fill="#2563eb" filter="url(#site-pipeline-glow)" />
            </g>
          )}
        </>
      )}
    </svg>
  );
};

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
    const nextIsActive = Math.abs(junctionY - spineNodeY) < 46;

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
    <div ref={ref} className="w-full flex justify-center py-4 md:py-5 relative pointer-events-none z-10" aria-hidden="true">
      <div className="w-full max-w-7xl px-6 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4">
        <div className={`h-[1px] bg-gradient-to-r from-transparent to-[#b9cdf5] dark:to-[#1e3a5f] transition-opacity duration-300 ${isActive ? 'opacity-80' : 'opacity-45'}`} />

        <div className="relative h-12 w-52 flex items-center justify-center">
          <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 208 48" role="presentation">
            <defs>
              <linearGradient id={cableId} x1="104" y1="0" x2="104" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1a73e8" stopOpacity="0" />
                <stop offset="45%" stopColor="#2563eb" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
              </linearGradient>
              <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <motion.path
              d="M104 0 C104 10 104 14 104 24 C104 34 104 38 104 48"
              fill="none"
              stroke={`url(#${cableId})`}
              strokeWidth="1"
              animate={{ opacity: isActive ? 0.75 : 0.38 }}
              transition={{ duration: 0.2 }}
            />
            <motion.circle
              key={packetKey}
              cx="104"
              r="2.4"
              fill="#2563eb"
              filter={`url(#${glowId})`}
              initial={{ cy: 7, opacity: 0 }}
              animate={isActive ? { cy: [7, 41], opacity: [0, 0.8, 0.8, 0] } : { opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
          </svg>

          <motion.div
            data-pipeline-node
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{
              boxShadow: isActive ? '0 0 0 3px rgba(26,115,232,0.08), 0 2px 8px rgba(15,23,42,0.06)' : '0 1px 3px rgba(15,23,42,0.05)'
            }}
            transition={{ duration: 0.25 }}
            className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border bg-[#f8fbff]/95 dark:bg-[#0a0a0a]/95 text-[10px] font-mono backdrop-blur overflow-hidden transition-colors duration-300 ${isActive ? 'border-[#1a73e8]/45 dark:border-[#60a5fa]/55' : 'border-[#c7d7f5] dark:border-[#26384a]'}`}
          >
            <motion.span
              animate={{ scale: isActive ? 1.18 : 1, opacity: isActive ? 1 : 0.72 }}
              transition={{ duration: 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-[#2563eb] dark:bg-[#60a5fa]"
            />
            <span className={`font-bold transition-colors duration-300 ${isActive ? 'text-[#174ea6] dark:text-[#60a5fa]' : 'text-[#3f5f99] dark:text-[#93c5fd]/80'}`}>
              {nodeLabel}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#60a5fa]/12 to-transparent"
              initial={false}
              animate={{ x: isActive ? ['-120%', '120%'] : '-120%', opacity: isActive ? [0, 0.75, 0] : 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            />
          </motion.div>
        </div>

        <div className={`h-[1px] bg-gradient-to-l from-transparent to-[#b9cdf5] dark:to-[#1e3a5f] transition-opacity duration-300 ${isActive ? 'opacity-80' : 'opacity-45'}`} />
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
  <div {...props} className={`bg-white dark:bg-[#0a0a0a] border border-[#e5e7eb] dark:border-[#333333] rounded-lg p-6 light-card-shadow hover-card-elevation hover:-translate-y-1 hover:border-[#1a73e8]/30 dark:hover:border-[#444444] transition-all duration-300 ${className}`}>
    {children}
  </div>
);

// --- MAIN APP PRODUCTION CODE ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeSection, setActiveSection] = useState('');

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeServiceHover, setActiveServiceHover] = useState(null);
  const [activeFlowHover, setActiveFlowHover] = useState(null);
  const [activeIndustryTab, setActiveIndustryTab] = useState(0);
  const [hoveredTool, setHoveredTool] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error

  const handleHeroMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);


  // Scroll event — throttled via requestAnimationFrame for performance
  const rafRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 24);
        rafRef.current = null;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['solutions', 'services', 'healthcare', 'results', 'faq', 'contact'];
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(obs => obs.disconnect());
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

  const wrapperClasses = 'min-h-screen bg-[#fafafa] dark:bg-black text-[#171717] dark:text-[#ededed] selection:bg-[#1a73e8]/20 font-sans overflow-x-hidden';

  return (
    <div className={wrapperClasses} style={{ fontFamily: "'Geist', sans-serif" }}>
      {/* WHOLE-SITE CONTINUOUS PIPELINE SPINE */}
      <CentralPipelineSpine />

      <style>{`
        .font-display { font-family: 'Geist', sans-serif; font-weight: 700; letter-spacing: -0.02em; }
        @keyframes dotpulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
      `}</style>



      {/* NAVBAR */}
      <header
        role="banner"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-[#eaeaea] dark:border-[#333333] py-3 shadow-sm dark:shadow-none' : 'bg-white/0 dark:bg-transparent py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" aria-label="ScaleupSky – Go to top of page" className="flex items-center gap-3 group cursor-pointer">
            <img src="/favicon.svg" alt="ScaleupSky logo" className="h-8 md:h-9 w-auto dark:invert" />
            <span className="font-display font-bold text-xl md:text-2xl tracking-tight text-[#171717] dark:text-[#ededed] mt-1.5 md:mt-2">
              ScaleupSky
            </span>
          </a>

          <nav aria-label="Main navigation" className="hidden md:flex gap-8 items-center text-sm font-medium text-[#4b5563] dark:text-[#888888] font-sans">
            {NAV_LINKS.map(link => {
              const id = link.toLowerCase();
              const isActive = activeSection === id || (id === 'solutions' && activeSection === '');
              return (
                <a
                  key={link}
                  href={`#${id}`}
                  className={`hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors duration-200 ${isActive ? 'text-[#1a73e8] dark:text-[#60a5fa] font-semibold' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link}
                </a>
              );
            })}
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 mr-1 rounded-full text-[#666666] dark:text-[#888888] hover:bg-gray-100 dark:hover:bg-[#0a0a0a] transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Icon name="sun" className="w-4 h-4" /> : <Icon name="moon" className="w-4 h-4" />}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 bg-[#1a73e8] text-white font-semibold rounded-full hover:bg-[#1765cc] hover:shadow-lg dark:hover:shadow-none transition-all duration-200"
            >
              Book strategy call
            </button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded-full text-[#666666] dark:text-[#888888] hover:bg-gray-100 dark:hover:bg-[#0a0a0a] transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Icon name="sun" className="w-5 h-5" /> : <Icon name="moon" className="w-5 h-5" />}
            </button>
            <button
              className="text-[#666666] dark:text-[#888888] hover:text-[#171717] dark:hover:text-[#ededed] transition-colors p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <Icon name="x" /> : <Icon name="menu" />}
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
          aria-labelledby="hero-heading"
          onMouseMove={handleHeroMouseMove}
          className="relative pt-40 pb-20 md:pt-48 md:pb-28 px-6 flex flex-col items-center text-center bg-white dark:bg-[#0a0a0a] overflow-hidden bg-grid-pattern"
        >
          {/* Ambient Cursor Spotlight Glow */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(26, 115, 232, 0.09), transparent 80%)`
            }}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] dark:bg-[#3b82f6]/20 border border-[#d2e3fc] text-xs font-semibold font-sans tracking-wide text-[#1a73e8] dark:text-[#60a5fa] mb-8 z-10"
          >
            <span className="w-2 h-2 rounded-full bg-[#1a73e8]" style={{ animation: 'dotpulse 2s ease-in-out infinite' }} aria-hidden="true" />
            Accepting enterprise clients for 2026
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

            <div className="w-full flex flex-nowrap items-center justify-between gap-6 md:gap-8 overflow-x-auto whitespace-nowrap px-6 md:px-12 py-2">
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

        <PipelineDivider nodeLabel="Node 07: Technical FAQ" />

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
                </form>
              )}
            </Card>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer role="contentinfo" className="border-t border-[#eaeaea] dark:border-[#333333] bg-white dark:bg-[#0a0a0a] pt-14 pb-28 md:pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <a href="#" aria-label="ScaleupSky – Go to top of page" className="flex items-center gap-0.2 mb-6 cursor-pointer">
              <img src="/favicon.svg" alt="ScaleupSky logo" className="h-10 w-auto dark:invert" />
              <span className="font-display font-bold text-lg text-[#171717] dark:text-[#ededed]">
                ScaleupSky
              </span>
            </a>
            <p className="text-[#666666] dark:text-[#888888] font-sans text-sm mb-6 leading-relaxed">Building enterprise production-ready AI automation ecosystems.</p>
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
              <li><a href="#healthcare" className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">Healthcare</a></li>
              <li><a href="#services" className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">Real estate</a></li>
              <li><a href="#services" className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">Agencies</a></li>
              <li><a href="#services" className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">E-commerce</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-display text-sm mb-4 text-[#171717] dark:text-[#ededed]">Company</h4>
            <ul className="space-y-2 text-sm text-[#666666] dark:text-[#888888] font-sans">
              <li><a href="#results" className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">About us</a></li>
              <li><a href="#results" className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">Case studies</a></li>
              <li><a href="#contact" className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">Contact</a></li>
              <li><a href="#contact" className="hover:text-[#1a73e8] dark:hover:text-[#60a5fa] transition-colors">Privacy & security</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-[#eaeaea] dark:border-[#333333] text-center text-xs text-[#999999] font-sans">
          © {new Date().getFullYear()} ScaleupSky. All rights reserved.
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-[#eaeaea] dark:border-[#333333] z-50">
        <button
          onClick={() => scrollToSection('contact')}
          className="w-full py-3 bg-[#1a73e8] text-white font-semibold font-display rounded-xl"
        >
          Book strategy call
        </button>
      </div>

    </div>
  );
}
