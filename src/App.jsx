import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Mail, Clock, Calendar, TrendingUp, MessageSquare,
  Bot, Phone, Target, Users, Settings,
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
  instagram: _Instagram,
  linkedin: _Linkedin,
  twitter: _Twitter,
  facebook: _Facebook,
  github: _Github,
  loader: Loader,
  shield: Shield,
  calendarcheck: CalendarCheck,
  hash: Hash,
  sparkles: Sparkles,
};

const Icon = ({ name, className = 'w-6 h-6' }) => {
  const LucideIcon = ICON_MAP[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={className} aria-hidden="true" />;
};

// --- DATA ARRAYS ---
const NAV_LINKS = ['Services', 'Solutions', 'Healthcare', 'Results', 'FAQ'];



const PAIN_POINTS = [
  { icon: 'mail', title: 'Leads falling through cracks', desc: 'Losing potential clients due to slow follow-ups.' },
  { icon: 'clock', title: 'Repetitive admin work', desc: 'Spending hours on tasks software should do.' },
  { icon: 'calendar', title: 'Missed appointments', desc: 'No automated reminders leading to no-shows.' },
  { icon: 'trendingup', title: 'Lost revenue', desc: 'Inefficiencies directly impacting your bottom line.' }
];

const AUTOMATION_SERVICES = [
  { icon: 'messagecircle', title: 'WhatsApp Automation' },      // round speech bubble
  { icon: 'instagram',     title: 'Instagram Automation' },
  { icon: 'linkedin',      title: 'LinkedIn Automation' },
  { icon: 'bot',           title: 'AI Chatbots' },
  { icon: 'mic',           title: 'Voice AI Receptionists' },   // microphone
  { icon: 'filter',        title: 'Lead Qualification' },       // funnel
  { icon: 'database',      title: 'CRM Automation' },           // database stack
  { icon: 'calendarcheck', title: 'Appointment Booking' },      // calendar + checkmark
  { icon: 'hash',          title: 'Slack & Teams Automation' }, // # channel icon
  { icon: 'mail',          title: 'Email Automation' },
  { icon: 'settings',      title: 'Internal Operations' },
  { icon: 'sparkles',      title: 'Custom AI Agents' }          // AI sparkles
];

const HEALTHCARE_SERVICES = [
  { icon: 'calendarcheck', title: 'Doctor Appointment Automation' },
  { icon: 'stethoscope',   title: 'AI Medical Receptionist' },
  { icon: 'heart',         title: 'Patient Follow-Up Automation' },
  { icon: 'activity',      title: 'Clinic Workflow Automation' }
];

const TOOLS = ['OpenAI', 'Claude', 'WhatsApp', 'Instagram', 'Slack', 'MS Teams', 'HubSpot', 'Salesforce', 'Zapier', 'Make', 'Shopify', 'Notion', 'Google Sheets'];

const PROCESS = [
  { step: '01', title: 'Discovery call', desc: 'We analyze your current bottlenecks.' },
  { step: '02', title: 'Process audit', desc: 'Mapping out exactly what can be automated.' },
  { step: '03', title: 'Automation strategy', desc: 'Designing the architecture of your AI systems.' },
  { step: '04', title: 'Build & integration', desc: 'Developing and connecting the tools.' },
  { step: '05', title: 'Launch', desc: 'Deploying the system with full testing.' },
  { step: '06', title: 'Optimization', desc: 'Continuous monitoring and improvement.' }
];

const FLOWS = [
  { title: 'Social sales', steps: ['Instagram DM', 'Lead capture', 'CRM', 'Sales call'] },
  { title: 'Inbound web', steps: ['Website lead', 'AI qualification', 'Calendar booking'] },
  { title: 'Healthcare', steps: ['Patient inquiry', 'AI receptionist', 'Appointment booking', 'Reminder'] }
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

const INDUSTRIES = [
  { icon: 'building', title: 'Real Estate' },
  { icon: 'utensils', title: 'Restaurants' },
  { icon: 'briefcase', title: 'Agencies' },
  { icon: 'steth', title: 'Healthcare' },
  { icon: 'users', title: 'Coaches & Consultants' },
  { icon: 'shoppingcart', title: 'E-commerce' }
];

const FAQS = [
  { q: 'Do I need technical skills to manage this?', a: 'Not at all. We build the systems to run seamlessly in the background and provide a simple dashboard for oversight.' },
  { q: 'How long does deployment take?', a: 'Most core automations are deployed within 2-4 weeks, depending on complexity.' },
  { q: 'Is our data secure?', a: 'Yes, we use enterprise-grade encryption and comply with standard data protection regulations, especially for healthcare (HIPAA compliant architectures available).' }
];

// --- FORMSPREE ENDPOINT ---
// Set VITE_FORM_ENDPOINT in your .env file (see .env.example).
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || 'https://formspree.io/f/mbdenkjk';

// --- REUSABLE SHELL COMPONENTS ---
const SectionHeading = ({ title, subtitle }) => (
  <div className="text-center mb-14 md:mb-20">
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-[2.75rem] font-medium font-display tracking-tight text-[#1f1f1f] mb-5 leading-[1.1]"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.08, duration: 0.5 }}
        className="text-[#5f6368] font-sans font-normal max-w-2xl mx-auto text-lg leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const Card = ({ children, className = '' }) => (
  <div className={`bg-white border border-[#dadce0] rounded-2xl p-6 hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_2px_6px_2px_rgba(60,64,67,0.15)] hover:border-[#dadce0] transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

// --- MAIN APP PRODUCTION CODE ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [a11yContrast, setA11yContrast] = useState(false);
  const [a11yTextSize, setA11yTextSize] = useState('normal'); // 'normal' | 'large'
  const [a11ySpacing, setA11ySpacing] = useState('normal'); // 'normal' | 'wide'
  const [a11yHighlightLinks, setA11yHighlightLinks] = useState(false);
  const [a11yWidgetOpen, setA11yWidgetOpen] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error

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
    const sectionIds = ['solutions', 'services', 'healthcare', 'security', 'results', 'faq', 'contact'];
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

  const wrapperClasses = [
    'min-h-screen bg-white text-[#1f1f1f] selection:bg-[#1a73e8]/20 font-sans overflow-x-hidden',
    a11yContrast ? 'theme-high-contrast' : '',
    a11yTextSize === 'large' ? 'a11y-text-large' : '',
    a11ySpacing === 'wide' ? 'a11y-spacing-wide' : '',
    a11yHighlightLinks ? 'a11y-highlight-links' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses} style={{ fontFamily: "'Inter', Arial, sans-serif" }}>

      <style>{`
        .font-display { font-family: 'Inter', Arial, sans-serif; font-weight: 700; letter-spacing: -0.02em; }
        @keyframes dotpulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
      `}</style>

      {/* WAI SKIP NAVIGATION LINK */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#1a73e8] focus:text-white focus:rounded-lg focus:font-semibold focus:outline-none focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* NAVBAR */}
      <header
        role="banner"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-[#dadce0] py-3 shadow-[0_1px_2px_0_rgba(60,64,67,0.15)]' : 'bg-white/0 py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" aria-label="ScaleUpSky – Go to top of page" className="flex items-center gap-0 group cursor-pointer">
            <img
              src="/logo.png"
              alt="ScaleUpSky Logo"
              className="h-20 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
            <span className="font-display font-bold text-xl tracking-tight text-[#1f1f1f]">
              ScaleUpSky
            </span>
          </a>

          <nav aria-label="Main navigation" className="hidden md:flex gap-8 items-center text-sm font-medium text-[#3c4043] font-sans">
            {NAV_LINKS.map(link => {
              const id = link.toLowerCase();
              const isActive = activeSection === id || (id === 'solutions' && activeSection === '');
              return (
                <a
                  key={link}
                  href={`#${id}`}
                  className={`hover:text-[#1a73e8] transition-colors duration-200 ${isActive ? 'text-[#1a73e8] font-semibold' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link}
                </a>
              );
            })}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 bg-[#1a73e8] text-white font-semibold rounded-full hover:bg-[#1765cc] hover:shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] transition-all duration-200"
            >
              Book strategy call
            </button>
          </nav>

          <button
            className="md:hidden text-[#3c4043] hover:text-[#1f1f1f] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <Icon name="x" /> : <Icon name="menu" />}
          </button>
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
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden flex flex-col gap-6 text-xl font-display"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-[#dadce0] pb-4 text-[#1f1f1f] hover:text-[#1a73e8]"
              >
                {link}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <main id="main-content">
        {/* SECTION 1: HERO */}
        <section aria-labelledby="hero-heading" className="relative pt-40 pb-20 md:pt-48 md:pb-28 px-6 flex flex-col items-center text-center bg-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f0fe] border border-[#d2e3fc] text-xs font-semibold font-sans tracking-wide text-[#1a73e8] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#1a73e8]" style={{ animation: 'dotpulse 2s ease-in-out infinite' }} aria-hidden="true" />
            Accepting enterprise clients for 2026
          </motion.div>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-5xl md:text-7xl lg:text-[5.25rem] font-display font-extrabold tracking-tight mb-7 leading-[1.05] text-[#1f1f1f]"
          >
            <span className="block text-2xl md:text-3xl lg:text-4xl text-[#5f6368] font-semibold mb-4 tracking-tight">AI Automation Agency</span>
            Stop doing <span className="text-[#1a73e8]">repetitive work.</span><br />
            Let AI run it.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl text-[#5f6368] font-sans font-normal max-w-2xl mb-11 leading-relaxed"
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
              className="px-8 py-3.5 bg-[#1a73e8] text-white font-semibold font-display rounded-full hover:bg-[#1765cc] hover:shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Book a strategy call <Icon name="arrowright" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="px-8 py-3.5 bg-white text-[#3c4043] font-semibold font-display rounded-full hover:bg-[#f8f9fa] transition-all duration-200 border border-[#dadce0]"
            >
              See what we automate
            </button>
          </motion.div>
        </section>

        {/* SECTION 2: PROBLEMS */}
        <section aria-labelledby="solutions-heading" className="py-20 px-6 border-t border-[#dadce0]" id="solutions">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              title="Business Process & Workflow Automation"
              subtitle="The cost of outdated manual processes isn't just time — it's lost clients, team burnout, and capped scaling. We automate your repetitive workflows."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {PAIN_POINTS.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                >
                  <Card className="h-full">
                    <div className="w-11 h-11 rounded-xl bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8] mb-5" aria-hidden="true">
                      <Icon name={point.icon} className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold font-display text-[#1f1f1f] mb-2.5">{point.title}</h3>
                    <p className="text-[#5f6368] font-sans text-sm leading-relaxed">{point.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: WHAT WE AUTOMATE & HEALTHCARE */}
        <section aria-labelledby="services-heading" className="py-20 px-6 bg-[#f8f9fa]" id="services">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="WhatsApp, CRM & Chatbot Automation Systems" subtitle="Tailor-made AI automation pipelines to put your standard operational workflows on autopilot." />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 mb-16">
              {AUTOMATION_SERVICES.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  className="bg-white border border-[#dadce0] rounded-xl p-6 flex flex-col items-center text-center gap-3.5 hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_2px_6px_2px_rgba(60,64,67,0.15)] transition-shadow duration-300 cursor-default group"
                >
                  <div className="text-[#5f6368] group-hover:text-[#1a73e8] transition-colors duration-200" aria-hidden="true">
                    <Icon name={service.icon} className="w-6 h-6" />
                  </div>
                  <span className="font-display font-medium text-sm tracking-tight text-[#3c4043] group-hover:text-[#1f1f1f] transition-colors">{service.title}</span>
                </motion.div>
              ))}
            </div>

            {/* Healthcare Highlight */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#dadce0] relative overflow-hidden" id="healthcare">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f4ea] border border-[#ceead6] text-[#137333] text-xs font-semibold font-sans mb-6">
                  <Icon name="activity" className="w-3.5 h-3.5" /> Specialized industry focus
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-[#1f1f1f] mb-4">Healthcare & clinic automation</h3>
                <p className="text-[#5f6368] font-sans max-w-xl mb-8 text-sm md:text-base leading-relaxed">Automating patient pathways, scaling down clinic phone lines, and optimizing doctor calendars with precision integration.</p>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  {HEALTHCARE_SERVICES.map((service, i) => (
                    <div key={i} className="flex items-center gap-4 bg-[#f8f9fa] p-4 rounded-xl border border-[#dadce0]">
                      <div className="text-[#1a73e8]" aria-hidden="true"><Icon name={service.icon} className="w-5 h-5" /></div>
                      <span className="font-display font-medium text-sm text-[#3c4043]">{service.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: TOOLS WE INTEGRATE (CONTINUOUS AUTOMATED HORIZONTAL TICKER) */}
        <section aria-label="Tools and integrations" className="py-16 border-y border-[#dadce0] overflow-hidden relative bg-white">
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" aria-hidden="true" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" aria-hidden="true" />

          <div className="w-full flex flex-col items-center">
            <p className="text-xs font-bold text-[#5f6368] font-sans tracking-widest uppercase mb-9">Seamless integration with your stack</p>

            <div className="w-full relative flex items-center overflow-x-hidden" aria-hidden="true">
              <motion.div
                className="flex gap-16 items-center whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  ease: "linear",
                  duration: 30,
                  repeat: Infinity,
                }}
              >
                {[...TOOLS, ...TOOLS].map((tool, i) => (
                  <span key={i} className="text-2xl md:text-3xl font-display font-bold tracking-tight text-[#9aa0a6] hover:text-[#1a73e8] transition-colors duration-300 cursor-default">
                    {tool}
                  </span>
                ))}
              </motion.div>
            </div>
            {/* Screen-reader only list of tools */}
            <ul className="sr-only">
              {TOOLS.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </section>

        {/* SECTION 5: HOW IT WORKS */}
        <section aria-labelledby="process-heading" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <SectionHeading title="The automation journey" subtitle="Our proven 6-step framework to transition your business from manual to automated." />
            <div className="relative border-l border-[#dadce0] ml-4 md:ml-0 md:space-y-10">
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
                      <span className="text-[#1a73e8] font-mono text-xs font-bold bg-[#e8f0fe] px-2 py-0.5 rounded" aria-hidden="true">{step.step}</span>
                      <h4 className="text-lg font-semibold font-display text-[#1f1f1f]">{step.title}</h4>
                    </div>
                    <p className="text-[#5f6368] font-sans text-sm leading-relaxed">{step.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: AUTOMATION EXAMPLES */}
        <section aria-labelledby="flows-heading" className="py-20 px-6 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="How data flows" subtitle="Real architectural examples of automated pipelines built by ScaleUpSky." />
            <div className="grid md:grid-cols-3 gap-6">
              {FLOWS.map((flow, i) => (
                <Card key={i} className="flex flex-col">
                  <h4 className="text-lg font-semibold font-display mb-6 text-[#1a73e8]">{flow.title}</h4>
                  <div className="flex flex-col gap-3">
                    {flow.steps.map((step, j) => (
                      <React.Fragment key={j}>
                        <div className="bg-[#f8f9fa] border border-[#dadce0] p-4 rounded-xl text-center text-sm font-medium font-sans text-[#3c4043]">
                          {step}
                        </div>
                        {j < flow.steps.length - 1 && (
                          <div className="flex justify-center text-[#1a73e8] text-lg font-bold" aria-hidden="true">
                            ↓
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: RESULTS */}
        <section aria-labelledby="results-heading" className="py-20 px-6" id="results">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-[#dadce0] py-14">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-display font-extrabold text-[#1a73e8] mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-[#5f6368] font-semibold font-sans uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 8: CASE STUDIES */}
        <section aria-labelledby="case-studies-heading" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <SectionHeading title="Real business impact" subtitle="Tangible outcomes delivered to clear engineering standards." />
            <div className="grid md:grid-cols-3 gap-6">
              {CASE_STUDIES.map((study, i) => (
                <Card key={i} className="flex flex-col relative overflow-hidden">
                  <h4 className="text-xl font-semibold font-display text-[#1f1f1f] mb-6">{study.industry}</h4>
                  <div className="space-y-4 mb-6 flex-grow">
                    <div>
                      <span className="text-xs text-[#d93025] font-bold uppercase font-sans tracking-wide">Before ScaleUpSky</span>
                      <p className="text-sm text-[#5f6368] mt-1 font-sans">{study.before}</p>
                    </div>
                    <div>
                      <span className="text-xs text-[#137333] font-bold uppercase font-sans tracking-wide">After automation</span>
                      <p className="text-sm text-[#3c4043] mt-1 font-sans">{study.after}</p>
                    </div>
                  </div>
                  <div className="bg-[#e8f0fe] border border-[#d2e3fc] p-4 rounded-xl">
                    <span className="text-xs text-[#1a73e8] font-bold uppercase font-sans tracking-wide block mb-1">Business impact</span>
                    <p className="font-semibold font-display text-[#1f1f1f] text-base">{study.impact}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: INDUSTRIES */}
        <section aria-labelledby="industries-heading" className="py-20 px-6 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 id="industries-heading" className="text-2xl font-semibold font-display mb-10 text-[#1f1f1f] tracking-tight">Industries we specialize in</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {INDUSTRIES.map((ind, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-white border border-[#dadce0] px-6 py-3.5 rounded-full text-sm font-medium font-sans hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_2px_6px_2px_rgba(60,64,67,0.15)] text-[#3c4043] transition-shadow duration-300 cursor-default">
                  <span className="text-[#1a73e8]" aria-hidden="true"><Icon name={ind.icon} className="w-4 h-4" /></span> {ind.title}
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* SECTION 11: FAQ */}
        <section aria-labelledby="faq-heading" className="py-20 px-6" id="faq">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="Frequently asked questions" />
            <div className="space-y-3" role="list">
              {FAQS.map((faq, i) => {
                const panelId = `faq-panel-${i}`;
                const buttonId = `faq-btn-${i}`;
                return (
                  <div key={i} className="border border-[#dadce0] rounded-xl bg-white overflow-hidden" role="listitem">
                    <button
                      id={buttonId}
                      className="w-full px-6 py-4 flex justify-between items-center text-left font-semibold font-display text-[#1f1f1f] hover:text-[#1a73e8] transition-colors"
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      aria-expanded={activeFaq === i}
                      aria-controls={panelId}
                    >
                      {faq.q}
                      <Icon name="chevrondown" className={`w-4 h-4 text-[#1a73e8] transition-transform duration-300 flex-shrink-0 ml-4 ${activeFaq === i ? 'rotate-180' : ''}`} />
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
                          className="px-6 pb-5 text-[#5f6368] font-sans text-sm leading-relaxed"
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

        {/* SECTION 12 & 13: FINAL CTA & CONTACT FORM */}
        <section aria-labelledby="contact-heading" className="py-20 px-6 bg-[#f8f9fa]" id="contact">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
            <div>
              <h2 id="contact-heading" className="text-4xl md:text-5xl font-display font-extrabold text-[#1f1f1f] mb-6 leading-tight tracking-tight">
                Your competitors are already automating.
              </h2>
              <p className="text-[#5f6368] font-sans text-base md:text-lg mb-8 leading-relaxed">
                Book a free architecture discovery call to see exactly how ScaleUpSky designs, tests, and deploys high-yield AI pipelines.
              </p>
              <ul className="space-y-3.5 mb-8">
                {['Custom automation blueprint', 'Clear ROI projection', 'No technical overhead', 'Zero obligation call'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium font-sans text-[#3c4043]">
                    <Icon name="checkcircle" className="w-5 h-5 text-[#1a73e8] flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <Card className="!p-7">
              {formStatus === 'success' ? (
                <div className="flex flex-col items-center text-center py-10" role="alert" aria-live="polite">
                  <div className="w-14 h-14 rounded-full bg-[#e6f4ea] flex items-center justify-center mb-5" aria-hidden="true">
                    <Icon name="checkcircle" className="w-7 h-7 text-[#137333]" />
                  </div>
                  <h4 className="text-lg font-semibold font-display text-[#1f1f1f] mb-2">Request sent</h4>
                  <p className="text-sm text-[#5f6368] font-sans mb-6">We'll be in touch within one business day.</p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="text-sm font-semibold font-display text-[#1a73e8] hover:underline"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={handleFormSubmit}
                  noValidate
                  aria-label="Contact form — book a strategy call"
                >
                  <div className="grid grid-cols-2 gap-4">
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
                        className="bg-white border border-[#dadce0] rounded-xl px-4 py-3.5 text-sm font-sans text-[#1f1f1f] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-colors w-full"
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
                        className="bg-white border border-[#dadce0] rounded-xl px-4 py-3.5 text-sm font-sans text-[#1f1f1f] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-colors w-full"
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
                      className="bg-white border border-[#dadce0] rounded-xl px-4 py-3.5 text-sm font-sans text-[#1f1f1f] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-colors w-full"
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
                      className="bg-white border border-[#dadce0] rounded-xl px-4 py-3.5 text-sm font-sans text-[#1f1f1f] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-colors w-full resize-none"
                    />
                  </div>
                  {formStatus === 'error' && (
                    <p className="text-sm text-[#d93025] font-sans" role="alert" aria-live="assertive">
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
      <footer role="contentinfo" className="border-t border-[#dadce0] bg-white pt-14 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <a href="#" aria-label="ScaleUpSky – Go to top of page" className="flex items-center gap-0.2 mb-6 cursor-pointer">
              <img
                src="/logo.png"
                alt="ScaleUpSky Logo"
                className="h-20 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
              <span className="font-display font-bold text-lg text-[#1f1f1f]">
                ScaleUpSky
              </span>
            </a>
            <p className="text-[#5f6368] font-sans text-sm mb-6 leading-relaxed">Building enterprise production-ready AI automation ecosystems.</p>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Follow ScaleUpSky on Twitter">
                <Icon name="twitter" className="w-5 h-5 text-[#9aa0a6] hover:text-[#1f1f1f] cursor-pointer transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Connect with ScaleUpSky on LinkedIn">
                <Icon name="linkedin" className="w-5 h-5 text-[#9aa0a6] hover:text-[#1f1f1f] cursor-pointer transition-colors" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow ScaleUpSky on Facebook">
                <Icon name="facebook" className="w-5 h-5 text-[#9aa0a6] hover:text-[#1f1f1f] cursor-pointer transition-colors" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="View ScaleUpSky on GitHub">
                <Icon name="github" className="w-5 h-5 text-[#9aa0a6] hover:text-[#1f1f1f] cursor-pointer transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold font-display text-sm mb-4 text-[#1f1f1f]">Services</h4>
            <ul className="space-y-2 text-sm text-[#5f6368] font-sans">
              <li><a href="#services" className="hover:text-[#1a73e8] transition-colors">AI chatbots</a></li>
              <li><a href="#services" className="hover:text-[#1a73e8] transition-colors">Voice AI receptionists</a></li>
              <li><a href="#services" className="hover:text-[#1a73e8] transition-colors">CRM automation</a></li>
              <li><a href="#services" className="hover:text-[#1a73e8] transition-colors">Custom AI agents</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-display text-sm mb-4 text-[#1f1f1f]">Industries</h4>
            <ul className="space-y-2 text-sm text-[#5f6368] font-sans">
              <li><a href="#healthcare" className="hover:text-[#1a73e8] transition-colors">Healthcare</a></li>
              <li><a href="#services" className="hover:text-[#1a73e8] transition-colors">Real estate</a></li>
              <li><a href="#services" className="hover:text-[#1a73e8] transition-colors">Agencies</a></li>
              <li><a href="#services" className="hover:text-[#1a73e8] transition-colors">E-commerce</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-display text-sm mb-4 text-[#1f1f1f]">Company</h4>
            <ul className="space-y-2 text-sm text-[#5f6368] font-sans">
              <li><a href="#results" className="hover:text-[#1a73e8] transition-colors">About us</a></li>
              <li><a href="#results" className="hover:text-[#1a73e8] transition-colors">Case studies</a></li>
              <li><a href="#contact" className="hover:text-[#1a73e8] transition-colors">Contact</a></li>
              <li><a href="#contact" className="hover:text-[#1a73e8] transition-colors">Privacy & security</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-[#dadce0] text-center text-xs text-[#9aa0a6] font-sans">
          © {new Date().getFullYear()} ScaleUpSky. All rights reserved.
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-white/95 backdrop-blur-md border-t border-[#dadce0] z-50">
        <button
          onClick={() => scrollToSection('contact')}
          className="w-full py-3 bg-[#1a73e8] text-white font-semibold font-display rounded-xl"
        >
          Book strategy call
        </button>
      </div>

      {/* FLOATING WAI ACCESSIBILITY WIDGET */}
      <div className="fixed bottom-6 left-6 z-50 font-sans">
        <button
          onClick={() => setA11yWidgetOpen(!a11yWidgetOpen)}
          className="w-14 h-14 bg-[#1a73e8] hover:bg-[#1765cc] text-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(26,115,232,0.3)] transition-transform hover:scale-105"
          aria-label="Open Accessibility Settings Panel"
          aria-expanded={a11yWidgetOpen}
          aria-controls="a11y-panel"
        >
          {/* A11y symbol: stylized human figure */}
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
          </svg>
        </button>

        <AnimatePresence>
          {a11yWidgetOpen && (
            <motion.div
              id="a11y-panel"
              key="a11y-widget"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute bottom-16 left-0 bg-white border border-[#dadce0] rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.15)] w-72"
              role="dialog"
              aria-modal="true"
              aria-label="Accessibility Options"
            >
              <div className="flex justify-between items-center mb-4 border-b border-[#dadce0] pb-3">
                <span className="font-display font-bold text-sm text-[#1f1f1f]">Accessibility Options (WAI)</span>
                <button
                  onClick={() => setA11yWidgetOpen(false)}
                  className="text-[#5f6368] hover:text-[#1f1f1f] text-xs font-semibold"
                  aria-label="Close Accessibility Panel"
                >
                  Close
                </button>
              </div>

              <div className="space-y-4">
                {/* Contrast Toggle */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-[#3c4043]" id="a11y-contrast-label">High Contrast Mode</span>
                  <button
                    onClick={() => setA11yContrast(!a11yContrast)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                      a11yContrast ? 'bg-[#1a73e8] text-white border-transparent' : 'bg-white text-[#3c4043] border-[#dadce0]'
                    }`}
                    aria-pressed={a11yContrast}
                    aria-labelledby="a11y-contrast-label"
                  >
                    {a11yContrast ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                {/* Text Size Toggle */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-[#3c4043]" id="a11y-textsize-label">Enlarged Text</span>
                  <button
                    onClick={() => setA11yTextSize(a11yTextSize === 'large' ? 'normal' : 'large')}
                    className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                      a11yTextSize === 'large' ? 'bg-[#1a73e8] text-white border-transparent' : 'bg-white text-[#3c4043] border-[#dadce0]'
                    }`}
                    aria-pressed={a11yTextSize === 'large'}
                    aria-labelledby="a11y-textsize-label"
                  >
                    {a11yTextSize === 'large' ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                {/* Text Spacing Toggle */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-[#3c4043]" id="a11y-spacing-label">Text Spacing</span>
                  <button
                    onClick={() => setA11ySpacing(a11ySpacing === 'wide' ? 'normal' : 'wide')}
                    className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                      a11ySpacing === 'wide' ? 'bg-[#1a73e8] text-white border-transparent' : 'bg-white text-[#3c4043] border-[#dadce0]'
                    }`}
                    aria-pressed={a11ySpacing === 'wide'}
                    aria-labelledby="a11y-spacing-label"
                  >
                    {a11ySpacing === 'wide' ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                {/* Highlight Links Toggle */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-[#3c4043]" id="a11y-links-label">Highlight Links</span>
                  <button
                    onClick={() => setA11yHighlightLinks(!a11yHighlightLinks)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                      a11yHighlightLinks ? 'bg-[#1a73e8] text-white border-transparent' : 'bg-white text-[#3c4043] border-[#dadce0]'
                    }`}
                    aria-pressed={a11yHighlightLinks}
                    aria-labelledby="a11y-links-label"
                  >
                    {a11yHighlightLinks ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </div>

              {/* Reset Controls Button */}
              <button
                onClick={() => {
                  setA11yContrast(false);
                  setA11yTextSize('normal');
                  setA11ySpacing('normal');
                  setA11yHighlightLinks(false);
                }}
                className="w-full mt-4 py-2 border border-[#dadce0] rounded-xl text-xs font-semibold text-[#5f6368] hover:bg-[#f8f9fa] hover:text-[#1f1f1f] transition-colors"
              >
                Reset Settings
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
