/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "..", ".env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const PROJECT_SLUGS = {
  immunify: "immunify",
  hearme: "hearme",
  eventpal: "eventpal",
  jw_talk: "jw-talk",
  gamevault: "gamevault",
  neuroclash: "neuroclash-gg",
  optifind: "optifind",
  lwu: "lwu",
  octosight: "octosight",
  sabi: "sabi",
  found_it: "found-it",
  eduearth: "eduearth",
  zenpilates: "zenpilates",
  raion_web: "raion-web",
  zelow: "zelow",
  swara_ibu: "swara-ibu",
};

async function getProjectId(slug) {
  const { data } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", slug)
    .single();
  if (!data) throw new Error(`Project not found: ${slug}`);
  return data.id;
}

const CASE_STUDIES = {
  hearme: {
    role: "Mobile Developer",
    startDate: "2025-09-01",
    endDate: "2025-09-28",
    overview:
      "HearMe is a mobile application designed to help students recognize early signs of stress and depression through voice-based analysis. Users record their voice while answering guided questions, and the system analyzes speech patterns to detect stress levels, then provides personalized activity recommendations and access to professional counseling services.",
    problems: [
      {
        icon: "😰",
        title: "Undiagnosed Student Stress",
        description:
          "Many students failed to recognize early signs of stress and depression, leading to deteriorating mental health.",
      },
      {
        icon: "🚫",
        title: "Limited Mental Health Resources",
        description:
          "Students lacked accessible, private tools to assess their mental well-being and find professional help.",
      },
      {
        icon: "🤐",
        title: "Stigma Around Seeking Help",
        description:
          "Social stigma prevented students from openly discussing mental health concerns or seeking counseling.",
      },
    ],
    solutions: [
      {
        icon: "🎙️",
        title: "Voice-Based Stress Analysis",
        description:
          "Built an AI-powered system analyzing voice recordings for speech patterns indicative of stress and emotional states.",
      },
      {
        icon: "📝",
        title: "Guided Assessment Questions",
        description:
          "Designed structured guided questions that help users articulate their feelings for more accurate analysis.",
      },
      {
        icon: "✨",
        title: "Personalized Recommendations",
        description:
          "Integrated Gemini API to generate tailored activity recommendations and coping strategies based on analysis results.",
      },
      {
        icon: "👨‍⚕️",
        title: "Professional Counseling Access",
        description:
          "Provided direct access to professional counseling services and resources for users needing additional support.",
      },
    ],
    features: [
      {
        icon: "🎙️",
        title: "Voice Analysis",
        description:
          "Record responses to guided questions and analyze speech patterns for stress and depression indicators.",
      },
      {
        icon: "✅",
        title: "Guided Assessment",
        description:
          "Structured questions designed to help users articulate feelings and enable accurate emotional analysis.",
      },
      {
        icon: "💡",
        title: "Personalized Recommendations",
        description:
          "AI-generated activity suggestions and coping strategies based on individual stress analysis results.",
      },
      {
        icon: "📞",
        title: "Counseling Access",
        description:
          "Direct access to professional mental health counseling services and support resources.",
      },
    ],
    contributions: [
      "Built the Android application using Jetpack Compose and Firebase with Clean Architecture",
      "Integrated Gemini API and FastAPI backend for stress analysis and recommendation processing",
      "Designed the guided assessment question flow for optimal voice analysis accuracy",
      "Implemented Firebase Authentication and Realtime Database for secure user data management",
      "Collaborated with team members during Raion Hackjam 2025 to deliver the complete solution",
    ],
    results: [
      {
        icon: "❤️",
        title: "Mental Health Impact",
        description:
          "Created an accessible tool for students to privately assess and understand their mental well-being.",
      },
      {
        icon: "⚡",
        title: "AI Integration",
        description:
          "Successfully integrated voice analysis, Gemini API, and FastAPI for comprehensive stress detection pipeline.",
      },
      {
        icon: "👥",
        title: "Hackjam Delivery",
        description:
          "Completed functional prototype within Raion Hackjam 2025 timeframe with cross-functional team collaboration.",
      },
    ],
    gallery: [],
  },

  found_it: {
    role: "Full-Stack Developer",
    startDate: "2025-05-01",
    endDate: "2025-05-28",
    overview:
      "Found It! is a web-based Lost and Found application designed to centralize reports of lost and found items within the campus environment at the Faculty of Computer Science, Universitas Brawijaya. The platform enables users to report items, search by category, location, and time, and directly contact reporters to speed up the recovery process.",
    problems: [
      {
        icon: "📍",
        title: "Decentralized Lost Reports",
        description:
          "Lost and found items were reported through scattered social media posts and bulletin boards with no central repository.",
      },
      {
        icon: "⏱️",
        title: "Inefficient Recovery Process",
        description:
          "Finding lost items required manually checking multiple sources with no structured search or filtering capabilities.",
      },
      {
        icon: "🔒",
        title: "No Contact Mechanism",
        description:
          "There was no direct way for finders to contact owners or vice versa without sharing personal information publicly.",
      },
    ],
    solutions: [
      {
        icon: "🏢",
        title: "Centralized Reporting Platform",
        description:
          "Built a single web platform serving as the authoritative source for all lost and found reports within the faculty.",
      },
      {
        icon: "🔍",
        title: "Structured Search & Filtering",
        description:
          "Implemented categorized search with filtering by item category, location, and date for efficient discovery.",
      },
      {
        icon: "💬",
        title: "In-App Contact System",
        description:
          "Enabled direct communication between reporters and finders through the platform without exposing personal details.",
      },
      {
        icon: "🔐",
        title: "Laravel Breeze Authentication",
        description:
          "Integrated Laravel Breeze for secure authentication and user management with role-based access.",
      },
    ],
    features: [
      {
        icon: "🔎",
        title: "Category-Based Search",
        description:
          "Search and filter lost and found items by category, location, and time for efficient discovery.",
      },
      {
        icon: "➕",
        title: "Report Submission",
        description:
          "Easy-to-use form for reporting lost or found items with relevant details and images.",
      },
      {
        icon: "💌",
        title: "Direct Contact",
        description:
          "Platform-mediated communication between finders and owners for safe item recovery.",
      },
      {
        icon: "🛡️",
        title: "User Authentication",
        description:
          "Secure authentication via Laravel Breeze with role-based access for trusted reporting.",
      },
    ],
    contributions: [
      "Developed the complete full-stack application using Laravel with MVC architecture and PHP",
      "Designed the database schema for efficient report storage, categorization, and search indexing",
      "Implemented authentication and authorization using Laravel Breeze for secure user management",
      "Built frontend views with structured data flow enabling categorized browsing and report management",
      "Handled backend logic for report CRUD operations, search filtering, and user communication features",
    ],
    results: [
      {
        icon: "✅",
        title: "Centralized Solution",
        description:
          "Created a single authoritative platform for all lost and found reports within the faculty environment.",
      },
      {
        icon: "⚡",
        title: "Efficient Recovery",
        description:
          "Structured search and direct communication reduced the time needed to reunite items with their owners.",
      },
      {
        icon: "💻",
        title: "Full-Stack Foundation",
        description:
          "Demonstrated end-to-end web development skills from database design to frontend implementation.",
      },
    ],
    gallery: [],
  },

  raion_web: {
    role: "Front-end Developer",
    startDate: "2025-01-01",
    endDate: "2026-06-28",
    overview:
      "Raion Web is the official website for Raion Community, a student organization at the Faculty of Computer Science, Brawijaya University. Built as a comprehensive full-stack platform, it serves as the community's digital face — managing events, forms, product catalog (Raion Craft), and administrative operations. The platform provides a Content Management System (CMS) for events and activities, a dynamic Form Management System (FMS) for registrations and surveys, an Order Raion Craft System for software house service bookings, and an integrated Administration System for internal member management.",
    problems: [
      {
        icon: "🌐",
        title: "No centralized digital presence for community operations",
        description:
          "Raion Community previously relied on scattered tools — Google Forms for registrations, Instagram for announcements, and manual spreadsheets for member management. There was no single platform unifying the community's brand, events, and administrative workflows.",
      },
      {
        icon: "📝",
        title: "Manual form and registration management is error-prone",
        description:
          "Managing event registrations, member recruitment forms, and survey responses manually led to data entry errors, missed responses, and difficulty tracking submission history across multiple form instances.",
      },
      {
        icon: "🛒",
        title: "Software house service ordering lacked a structured workflow",
        description:
          "Raion Craft, the community's software house, received project inquiries through informal channels. There was no standardized ordering system, project tracking, or client communication workflow.",
      },
      {
        icon: "🔐",
        title: "Role-based access for public vs. administrative content",
        description:
          "The platform needed to serve both public-facing content (events, products, member profiles) and internal administrative functions (member management, form submissions, content moderation) with appropriate access controls.",
      },
    ],
    solutions: [
      {
        icon: "🏢",
        title: "Unified platform with CMS, FMS, and admin system",
        description:
          "Architected a comprehensive platform integrating four major subsystems: CMS for events/products/testimonials, FMS for dynamic form definitions and submissions, Order Raion Craft for software house bookings, and Administration System for member and operational management.",
      },
      {
        icon: "📋",
        title: "Dynamic form builder with submission tracking and export",
        description:
          "Built a flexible Form Management System supporting customizable form fields, submission tracking, and CSV/XLSX data export. Each form instance maintains its own schema and response data, enabling multiple concurrent form campaigns.",
      },
      {
        icon: "⚙️",
        title: "Structured service ordering with booking workflow",
        description:
          "Designed Raion Craft order system with a structured booking workflow — from service selection and project requirements gathering to status tracking and handoff. Provides both client and admin views of the project pipeline.",
      },
      {
        icon: "🏗️",
        title: "Clean Architecture with four-layer feature modules",
        description:
          "Adopted a modular clean architecture pattern with four distinct layers per feature: Repository (database queries), Service (business logic), Storage (file operations), and Schema (Zod validation). Route handlers import from module barrels, keeping HTTP concerns separate from business logic.",
      },
    ],
    features: [
      {
        icon: "📝",
        title: "Content Management System",
        description:
          "Full CRUD management for events, activities, products, and testimonials with media upload, rich text, and SEO metadata",
      },
      {
        icon: "📋",
        title: "Form Management System",
        description:
          "Dynamic form builder with customizable fields, submission tracking, pagination, and CSV/XLSX data export",
      },
      {
        icon: "🛒",
        title: "Raion Craft Orders",
        description:
          "Software house service ordering system with structured booking workflow, project tracking, and client communication",
      },
      {
        icon: "⚙️",
        title: "Administration System",
        description:
          "Admin dashboard with member management, role-based access control, and operational tools for community management",
      },
      {
        icon: "👥",
        title: "Public Pages",
        description:
          "Home, About, Events, Products, Members, and Activity showcase with responsive design and dynamic SEO metadata",
      },
      {
        icon: "🔐",
        title: "Authentication & Authorization",
        description:
          "Secure login with role-based access (admin, member) via Supabase/Better Auth with session management",
      },
    ],
    contributions: [
      "Developed the entire frontend application using Next.js 16 App Router with route groups for public ((main)), admin ((admin)), auth ((auth)), and form ((forms)) sections",
      "Built the Content Management System frontend with CRUD interfaces for events, activities, products, and testimonials, including media upload and rich text editing",
      "Created the dynamic Form Management System frontend with customizable form field rendering, submission display, pagination, and CSV/XLSX export UI",
      "Implemented the Raion Craft ordering system frontend with step-by-step booking flow, service catalog browsing, and order status tracking",
      "Designed and built all public-facing pages — Home, About, Events, Products, Members, and Activity showcase with responsive design and dynamic SEO metadata",
      "Integrated with Supabase backend for authentication, data fetching via SWR and TanStack React Query, and real-time updates",
      "Developed reusable UI components following the project's design system — cards, modals, forms, tables, navigation, and layout components",
      "Implemented Framer Motion animations and transitions across page routes and interactive elements for a polished user experience",
    ],
    results: [
      {
        icon: "🏗️",
        title: "Complete Digital Platform",
        description:
          "Delivered a comprehensive full-stack platform unifying brand presence, event management, form handling, and administrative operations",
      },
      {
        icon: "🔧",
        title: "Clean Architecture",
        description:
          "Four-layer feature modules (Repository, Service, Storage, Schema) ensure maintainability, testability, and clear code ownership",
      },
      {
        icon: "⚡",
        title: "Modern Tech Stack",
        description:
          "Next.js 16, React 19, TypeScript, Tailwind CSS v4, Drizzle ORM, and Supabase delivering performant and scalable architecture",
      },
      {
        icon: "📤",
        title: "Data Export Capabilities",
        description:
          "Form submissions and event data exportable to CSV and XLSX formats for offline analysis and reporting",
      },
    ],
    gallery: [],
  },

  lwu: {
    role: "Front-end Developer",
    startDate: "2026-05-01",
    endDate: "2026-05-28",
    overview:
      "Learning With Us (LWU) is a leading online English education platform that evolved from a local private tutoring service in 2017 to a global digital learning hub with over 1,000+ students. This website serves as LWU's definitive digital presence, designed to showcase its dual-nature offerings: digital products (Ebooks and self-paced guides) and educational services (IELTS preparation, General English, and specialized coaching). The core challenge was to architect a high-performance, responsive, and SEO-ready platform within a 24-hour sprint, ensuring production-ready standards.",
    problems: [
      {
        icon: "⚡",
        title: "Tight 24-hour sprint to production-ready standard",
        description:
          "The entire website needed to be architected, designed, developed, and deployed within a single 24-hour period while maintaining production-quality code, responsive design, SEO optimization, and smooth animations.",
      },
      {
        icon: "📚",
        title: "Dual-content nature: digital products and educational services",
        description:
          "LWU offers both digital products (Ebooks and self-paced guides) and educational services (IELTS, General English, Webinars). The information architecture needed to present both content types clearly without confusing visitors.",
      },
      {
        icon: "🔍",
        title: "SEO and performance for organic growth",
        description:
          "As a growing educational platform, LWU needed strong SEO foundations — semantic HTML, metadata API, optimized images, and fast LCP — to attract organic traffic and establish credibility in the competitive online education market.",
      },
      {
        icon: "🎯",
        title: "Conversion-optimized UX flow",
        description:
          "The website needed to strategically guide visitors from initial interest to enrollment through clear call-to-actions, social proof (student success stories), and an intuitive navigation structure.",
      },
    ],
    solutions: [
      {
        icon: "🏗️",
        title: "Next.js App Router with production-ready architecture",
        description:
          "Chose Next.js 14 App Router for its SSR capabilities, dynamic routing, and built-in image optimization. Structured the codebase with clear separation of concerns — app router pages, reusable components, centralized data stores, and shared TypeScript interfaces.",
      },
      {
        icon: "🗺️",
        title: "Dual-navigation information architecture",
        description:
          "Designed a clear content hierarchy with separate navigation paths for Products (Ebooks catalog with filtering) and Services (IELTS, General English, Webinars). The Home page provides a strategic overview bridging both offerings with student success stories as social proof.",
      },
      {
        icon: "🚀",
        title: "Comprehensive SEO and performance optimization",
        description:
          "Implemented Next.js Metadata API for dynamic page titles, descriptions, and canonical URLs. Used next/image with priority loading for hero assets. Structured semantic HTML throughout. Achieved fast LCP through optimized image loading and minimal blocking resources.",
      },
      {
        icon: "🎞️",
        title: "Strategic UX with premium animations",
        description:
          "Designed a premium visual language inspired by world-class educational templates (HopEdu). Framer Motion powers scroll-triggered entrance animations and micro-interactions that guide attention to key conversion points — course enrollment CTAs, product purchase buttons, and contact forms.",
      },
    ],
    features: [
      {
        icon: "🎨",
        title: "Premium UI/UX Design",
        description:
          "High-end educational platform aesthetics inspired by world-class templates with consistent typography, spacing, and visual hierarchy",
      },
      {
        icon: "📄",
        title: "Product Catalog",
        description:
          "Dynamic list of ebooks and digital resources with advanced filtering, detailed product pages, and clear purchase CTAs",
      },
      {
        icon: "📚",
        title: "Service Offerings",
        description:
          "Detailed breakdown of course programs — IELTS preparation, General English classes, and educational webinars with enrollment information",
      },
      {
        icon: "🎞️",
        title: "Advanced Animations",
        description:
          "Smooth scroll-triggered entrance animations and interactive micro-interactions powered by Framer Motion for a polished user experience",
      },
      {
        icon: "📱",
        title: "Fully Responsive",
        description:
          "Mobile-first design supporting all screen sizes from 375px to 1440px+ with adaptive layouts, typography, and navigation",
      },
      {
        icon: "🔍",
        title: "SEO Optimized",
        description:
          "Metadata API for dynamic page metadata, semantic HTML, optimized images, and fast LCP for strong search engine visibility",
      },
    ],
    contributions: [
      "Architected and developed the complete Next.js 14 application from scratch within a 24-hour sprint, meeting production-ready standards",
      "Built a comprehensive multi-page site: Home, About (with Vision & Mission), Products (catalog with filtering), Services (IELTS, General English, Webinars), and Contact",
      "Implemented Framer Motion animations throughout — scroll-triggered entrance animations, hover effects, page transitions, and interactive micro-interactions",
      "Designed a mobile-first responsive layout supporting all screen sizes from 375px to 1440px+ with careful typography scaling and adaptive grid layouts",
      "Created a centralized data store architecture (data/ directory) for easy content management without a CMS backend, containing all product, service, and company information",
      "Optimized images using next/image with proper sizing, priority loading for LCP assets, and responsive srcset for different viewport sizes",
      "Implemented SEO best practices including Next.js Metadata API for dynamic metadata, semantic HTML structure, and canonical URLs for each page",
      "Built reusable UI components (ProductCard, SectionHeading, Buttons, Inputs, Cards) and layout components (Navbar, Footer) following consistent design patterns",
    ],
    results: [
      {
        icon: "⚡",
        title: "24-Hour Delivery",
        description:
          "Complete production-ready website architected, developed, and deployed within a single 24-hour sprint",
      },
      {
        icon: "📱",
        title: "Full Responsive Coverage",
        description:
          "Flawless rendering across all devices from 375px mobile to 1440px+ desktop with consistent user experience",
      },
      {
        icon: "🎯",
        title: "Premium Design Quality",
        description:
          "Visual design inspired by world-class educational templates with polished animations, transitions, and micro-interactions",
      },
      {
        icon: "🚀",
        title: "Vercel Deployment",
        description:
          "Live at lwu-id.vercel.app with automatic CI/CD, optimized builds, and global CDN distribution",
      },
    ],
    gallery: [],
  },

  optifind: {
    role: "Front-End Developer",
    startDate: "2025-09-01",
    endDate: "2025-11-28",
    overview:
      "OptiFind is a web-based Lost and Found platform rebuilt from Found It! using a modern tech stack for improved scalability, accessibility, and user experience. The platform introduces a public searchable system with verified user access, optimized indexing, and a user-friendly landing page ensuring reports remain discoverable and well-organized.",
    problems: [
      {
        icon: "👁️",
        title: "Limited Discoverability",
        description:
          "Lost and found reports were shared on social media and lost visibility quickly with no structured search system.",
      },
      {
        icon: "❓",
        title: "No User Verification",
        description:
          "Anyone could post claims without verification, leading to false claims and untrustworthy recoveries.",
      },
      {
        icon: "⚙️",
        title: "Outdated Technology",
        description:
          "The original Found It! platform used Laravel with limited scalability and a dated user experience.",
      },
    ],
    solutions: [
      {
        icon: "🔄",
        title: "Modern Tech Stack Migration",
        description:
          "Rebuilt the platform using Next.js, TypeScript, and Supabase for improved performance, scalability, and developer experience.",
      },
      {
        icon: "✓",
        title: "Verified User System",
        description:
          "Implemented authentication and verified user profiles to build trust in the recovery process.",
      },
      {
        icon: "🔎",
        title: "Optimized Search & Indexing",
        description:
          "Built a searchable system with optimized indexing and filtering by category, location, and time.",
      },
      {
        icon: "🎨",
        title: "Responsive Landing Page",
        description:
          "Designed an engaging landing page with clear call-to-actions and intuitive navigation for first-time users.",
      },
    ],
    features: [
      {
        icon: "🔍",
        title: "Searchable Reports",
        description:
          "Optimized search with filtering by category, location, and time for quick discovery of lost and found items.",
      },
      {
        icon: "🛡️",
        title: "Verified User Access",
        description:
          "Authenticated user profiles with verification to ensure trustworthy recovery claims and communications.",
      },
      {
        icon: "📊",
        title: "Category Organization",
        description:
          "Structured categorization of lost and found items for efficient browsing and report management.",
      },
      {
        icon: "💬",
        title: "Direct Contact",
        description:
          "In-platform communication between finders and owners for streamlined item recovery coordination.",
      },
      {
        icon: "✨",
        title: "Modern UI/UX",
        description:
          "Responsive, motion-enhanced interface with intuitive user flow and engaging landing page design.",
      },
    ],
    contributions: [
      "Built responsive and intuitive frontend interface using Next.js and TypeScript for optimal user experience",
      "Integrated Supabase as backend service for authentication, public access, and scalable data handling",
      "Implemented motion-based interactions and responsive design for cross-device compatibility",
      "Optimized user flow with clear navigation paths from landing page to report discovery and submission",
      "Collaborated with team to align frontend implementation with backend API contracts",
    ],
    results: [
      {
        icon: "🏆",
        title: "Top 5 Finalist",
        description:
          "Achieved Top 5 Finalist position at IT FEST UMK Web Development Competition 2025 at national level.",
      },
      {
        icon: "🚀",
        title: "Modern Architecture",
        description:
          "Successfully evolved from Laravel to modern Next.js stack with improved performance and developer experience.",
      },
      {
        icon: "⚡",
        title: "Enhanced Discoverability",
        description:
          "Built optimized search and indexing system for efficient lost and found item discovery.",
      },
    ],
    gallery: [],
  },

  jw_talk: {
    role: "Full-stack Developer",
    startDate: "2025-02-01",
    endDate: "2025-02-28",
    overview:
      "JW-Talk is a real-time, secure group chat web application built with a modern decoupled client-server architecture. It enables multiple users to communicate instantly across shared chat rooms with JWT-based authentication and WebSocket-powered messaging. The frontend, built with Next.js and deployed on Vercel, handles authentication context, chat logic via custom hooks, and Axios-based API communication with automatic JWT injection. The backend, built with Express.js and Socket.io, manages RESTful auth endpoints, room management, WebSocket broadcasting, and persistent message storage.",
    problems: [
      {
        icon: "🔄",
        title: "Real-time message synchronization across multiple clients",
        description:
          "Building a chat application requires reliable, low-latency bidirectional communication. Messages sent by one user must appear instantly on all connected clients in the same room, with chronological ordering and no message loss.",
      },
      {
        icon: "🔐",
        title: "Secure authentication for WebSocket connections",
        description:
          "JWT-based authentication in a decoupled architecture requires careful handshake validation for WebSocket connections. The socket must verify the user's identity before allowing them to join rooms or send messages, preventing unauthorized access.",
      },
      {
        icon: "🏎️",
        title: "Race conditions in room creation",
        description:
          "Multiple users creating rooms simultaneously could lead to duplicate room entries or inconsistent state. The frontend needed loading states and prevention mechanisms to avoid duplicate room creation submissions.",
      },
      {
        icon: "💾",
        title: "Persistent message history with real-time updates",
        description:
          "The chat must maintain message history in the database so users joining a room can see previous messages, while simultaneously pushing new messages in real-time to all connected clients in that room.",
      },
    ],
    solutions: [
      {
        icon: "🔌",
        title: "Socket.io with JWT handshake validation",
        description:
          "Implemented Socket.io for real-time bidirectional messaging with JWT validation during the connection handshake. Each socket connection is authenticated before allowing room joins or message sends, preventing unauthorized access to chat channels.",
      },
      {
        icon: "🏗️",
        title: "Decoupled REST + WebSocket architecture",
        description:
          "Separated concerns cleanly: REST API handles stateful operations (auth, room CRUD, message history) while WebSocket handles real-time events (send-message, receive-message, join-room, leave-room). This allows independent scaling and clear protocol boundaries.",
      },
      {
        icon: "🛡️",
        title: "Race condition prevention with loading states",
        description:
          "Implemented loading state management on room creation to prevent duplicate submissions. The create room button is disabled during the API request, and optimistic UI updates provide immediate feedback while the server processes the request.",
      },
      {
        icon: "📥",
        title: "Message persistence with auto-scroll",
        description:
          "Messages are stored in PostgreSQL via Prisma ORM with User, Room, and Message models. On room join, message history is fetched from the database and displayed chronologically. New messages are appended in real-time with auto-scroll to the latest message.",
      },
    ],
    features: [
      {
        icon: "🔐",
        title: "User Authentication",
        description:
          "Secure register, login, and logout with bcrypt-hashed passwords and JWT-based stateless session management",
      },
      {
        icon: "💬",
        title: "Real-Time Group Chat",
        description:
          "Instant bidirectional messaging via Socket.io WebSockets with support for multiple concurrent chat rooms",
      },
      {
        icon: "🏠",
        title: "Room Management",
        description:
          "Create new chat rooms or join existing ones by Room ID with loading state prevention for duplicate submissions",
      },
      {
        icon: "📜",
        title: "Chat History",
        description:
          "Persistent message history loaded from PostgreSQL database on room join, displayed in chronological order",
      },
      {
        icon: "🛡️",
        title: "JWT Session Management",
        description:
          "Stateless token-based auth with localStorage persistence, auto-injected via Axios interceptors on every request",
      },
      {
        icon: "🚫",
        title: "Route Protection",
        description:
          "Unauthenticated users are automatically redirected to the login page, preventing access to chat without valid credentials",
      },
    ],
    contributions: [
      "Architected the complete decoupled client-server application with independent Next.js frontend and Express.js backend deployments",
      "Designed and built the Express.js backend with RESTful API endpoints for authentication (register/login), room management (create/join), and message history retrieval",
      "Implemented JWT authentication with bcrypt password hashing, token generation, and middleware-based route protection on all protected endpoints",
      "Built the Socket.io WebSocket server for real-time bidirectional messaging with JWT handshake validation for connection security",
      "Developed the Next.js frontend with App Router, AuthContext for global session management, and custom useChat hook encapsulating Socket.io logic",
      "Implemented Axios interceptors for automatic JWT token injection on every API request and token cleanup on 401 responses",
      "Designed the PostgreSQL database schema with Prisma ORM — User, Room, and Message models with proper relations and indexes",
      "Created the chat UI with LeftPanel (room management) and RightPanel (message display) components, including auto-scroll to latest messages",
    ],
    results: [
      {
        icon: "🏗️",
        title: "Decoupled Architecture",
        description:
          "Independent frontend (Next.js/Vercel) and backend (Express.js) deployments communicating via REST + WebSocket protocols",
      },
      {
        icon: "⚡",
        title: "Real-Time Messaging",
        description:
          "Socket.io WebSockets deliver sub-second message delivery to all connected clients in the same room",
      },
      {
        icon: "🔒",
        title: "Secure by Design",
        description:
          "bcrypt password hashing, JWT authentication at REST and WebSocket layers, and automatic token management via Axios interceptors",
      },
      {
        icon: "🗄️",
        title: "Persistent Data",
        description:
          "PostgreSQL via Prisma ORM ensures message history persists across sessions and survives server restarts",
      },
    ],
    gallery: [],
  },

  eventpal: {
    role: "Mobile Developer",
    startDate: "2024-02-01",
    endDate: "2024-03-28",
    overview:
      "Eventpal is a mobile application that helps event organizers easily find and connect with reliable vendors for event needs such as equipment, decoration, and supporting services. The platform addresses common challenges including difficulty finding trusted vendors, limited information, and inefficient communication processes.",
    problems: [
      {
        icon: "🔍",
        title: "Difficulty Finding Trusted Vendors",
        description:
          "Event organizers struggled to find reliable vendors with verified reputations and quality service records.",
      },
      {
        icon: "📋",
        title: "Limited Vendor Information",
        description:
          "Available vendor listings lacked comprehensive information about services, pricing, and past client reviews.",
      },
      {
        icon: "🔗",
        title: "Inefficient Communication",
        description:
          "Coordinating with multiple vendors required scattered communication across different platforms and channels.",
      },
    ],
    solutions: [
      {
        icon: "📑",
        title: "Curated Vendor Directory",
        description:
          "Built a structured directory of verified vendors with comprehensive service information, portfolios, and client reviews.",
      },
      {
        icon: "💬",
        title: "In-App Communication",
        description:
          "Provided direct messaging between organizers and vendors for streamlined coordination and negotiation.",
      },
      {
        icon: "🏪",
        title: "Structured Service Listings",
        description:
          "Created detailed vendor profiles with service categories, pricing ranges, and availability information.",
      },
      {
        icon: "👤",
        title: "Authentication & Profiles",
        description:
          "Implemented user authentication with organizer and vendor profiles for role-specific functionality.",
      },
    ],
    features: [
      {
        icon: "🏪",
        title: "Vendor Discovery",
        description:
          "Browse and discover verified event vendors with comprehensive service listings and portfolios.",
      },
      {
        icon: "⭐",
        title: "Ratings & Reviews",
        description:
          "Transparent client reviews and ratings to help organizers make informed vendor selection decisions.",
      },
      {
        icon: "💬",
        title: "Direct Communication",
        description:
          "In-app messaging for streamlined coordination between organizers and vendors.",
      },
      {
        icon: "🔽",
        title: "Service Filtering",
        description:
          "Filter vendors by service type, pricing, location, and availability for targeted discovery.",
      },
    ],
    contributions: [
      "Built core application features including authentication flow and UI implementation using Kotlin and XML",
      "Implemented user registration and login with secure session management",
      "Developed vendor discovery and listing features with structured data display",
      "Created intuitive UI components for browsing vendor profiles and service information",
      "Collaborated with the team during RAION Internship 2024 to deliver the initial application prototype",
    ],
    results: [
      {
        icon: "✅",
        title: "Vendor Discovery Solution",
        description:
          "Created a centralized platform connecting event organizers with reliable vendors for streamlined planning.",
      },
      {
        icon: "👥",
        title: "Team Collaboration",
        description:
          "Successfully delivered initial prototype as part of RAION Internship 2024 team project.",
      },
      {
        icon: "💻",
        title: "Mobile Foundation",
        description:
          "Established foundational Android development skills in Kotlin and XML for future projects.",
      },
    ],
    gallery: [],
  },

  gamevault: {
    role: "Front-end Developer",
    startDate: "2026-05-01",
    endDate: "2026-05-28",
    overview:
      "GameVault is a modern, premium web-based game catalog platform designed for the Indonesian gamer community. Built as part of the Ariverse Studio Front End Developer Internship 2026 Technical Test, this MVP emphasizes a flawless, responsive frontend experience with fluid animations and a highly polished user interface. The platform serves as an interactive hub where users can discover new games, explore comprehensive game details with full metadata, curate a personal wishlist with local persistence, and enjoy premium gaming aesthetics with dark/light mode support.",
    problems: [
      {
        icon: "💎",
        title: "Building premium UI within an MVP scope",
        description:
          "The technical test required a game catalog platform that feels premium and polished despite being an MVP. Every interaction — from hover effects to page transitions — needed to convey a high-quality gaming experience without a backend or real data source.",
      },
      {
        icon: "💾",
        title: "No backend — managing state and data client-side",
        description:
          "Without a dedicated backend, all game data, wishlist state, and filtering logic had to be handled entirely on the client. This required careful architecture for data persistence (localStorage), search/filter performance, and state synchronization across routes.",
      },
      {
        icon: "🔗",
        title: "URL-synchronized filters with deep linking",
        description:
          "Filters and search state needed to synchronize with URL parameters so users could share specific filtered views and use browser back/forward navigation. This required bidirectional sync between URL search params and UI filter components.",
      },
      {
        icon: "♿",
        title: "Accessibility and theme support in a gaming context",
        description:
          "The platform needed dark/light mode, custom cursors, and gaming-themed aesthetics while maintaining keyboard navigation, ARIA labels, semantic HTML, and screen reader accessibility — balancing premium visuals with inclusive design.",
      },
    ],
    solutions: [
      {
        icon: "📦",
        title: "Static JSON datasource with localStorage persistence",
        description:
          "Used a static games.json file with 30+ entries as the data source for blazing-fast performance. Wishlist state is managed via React Context and synchronized with localStorage for persistence across sessions without a backend.",
      },
      {
        icon: "🔍",
        title: "URL-synchronized filtering with debounced search",
        description:
          "All filter, search, and sort states are managed via URL Search Parameters enabling deep linking and browser history navigation. Debounced search prevents excessive re-renders while maintaining instantaneous feedback for client-side filtering.",
      },
      {
        icon: "✨",
        title: "Polished UI with skeleton loaders and empty states",
        description:
          "Implemented detailed skeleton loaders for grid and detail views, high-quality empty states for zero search results and empty wishlists, and a custom 404 page — all themed to match the gaming aesthetic.",
      },
      {
        icon: "🌓",
        title: "Dark/light mode with accessible gaming aesthetics",
        description:
          "Full theme toggle with seamless CSS variable transitions. Custom cursor system enhances the gaming feel while ARIA labels, semantic HTML, keyboard navigation, and focus management ensure accessibility compliance.",
      },
    ],
    features: [
      {
        icon: "🎠",
        title: "Auto-Playing Hero Banner",
        description:
          "Dynamic homepage banner showcasing featured games with auto-play transitions and prominent call-to-action",
      },
      {
        icon: "🔍",
        title: "Advanced Filtering & Search",
        description:
          "Debounced search, multi-select filters (Genre, Platform, Price, Rating), and sorting — all URL-synchronized for sharing",
      },
      {
        icon: "🎮",
        title: "Game Detail Pages",
        description:
          "Comprehensive metadata display including descriptions, genres, platforms, developer info, release dates, and pricing",
      },
      {
        icon: "🖼️",
        title: "Interactive Lightbox Gallery",
        description:
          "Full-screen screenshot viewer with keyboard navigation, next/previous controls, and smooth transitions",
      },
      {
        icon: "❤️",
        title: "Persistent Wishlist",
        description:
          "Add/remove games with localStorage persistence across sessions via React Context state management",
      },
      {
        icon: "🌓",
        title: "Dark/Light Mode",
        description:
          "Full theme toggle seamlessly integrated with the design system and persisted user preference",
      },
    ],
    contributions: [
      "Developed the complete Next.js 15 application from scratch — Home, Discovery, Detail, Wishlist, and 404 pages with App Router architecture",
      "Built the dynamic Hero Banner with auto-playing featured game highlights and a responsive featured game grid on the homepage",
      "Implemented the advanced Discovery page with debounced search, multi-select category filters (Genre, Platform, Price, Rating), and sorting (Newest, Rating, Price) all synchronized with URL parameters",
      "Created the interactive Lightbox gallery for game screenshots with full-screen overlay, keyboard navigation, and touch/swipe support",
      "Built the Wishlist system with React Context + localStorage persistence, enabling add/remove operations and cross-session state retention",
      "Implemented dark/light mode theme toggle with seamless CSS transitions and persisted user preference",
      "Designed and built the custom cursor system for enhanced gaming aesthetics across the entire platform",
      "Added Framer Motion page transitions, hover effects, scale animations, and micro-interactions for a premium feel",
    ],
    results: [
      {
        icon: "✅",
        title: "100% Functional Requirements Met",
        description:
          "All required features implemented: hero banner, filtering, search, sorting, pagination, detail pages, wishlist, and 404 page",
      },
      {
        icon: "🏆",
        title: "All Bonus Features Delivered",
        description:
          "Dark/light mode, Framer Motion page transitions, hover effects, accessibility, and 12+ unit tests fully implemented",
      },
      {
        icon: "⚡",
        title: "Zero-Dependency Backend",
        description:
          "Static JSON datasource + localStorage persistence eliminates backend dependency while maintaining full functionality",
      },
      {
        icon: "📱",
        title: "True Mobile-First",
        description:
          "Seamless adaptation from 320px mobile to 1600px+ ultra-wide with responsive typography and adaptive grids",
      },
    ],
    gallery: [],
  },

  immunify: {
    role: "Mobile Developer",
    startDate: "2025-10-01",
    endDate: "2025-11-28",
    overview:
      "Immunify is a mobile application designed to help parents manage and monitor their children's vaccination schedules more effectively. The application provides structured vaccine information, immunization reminders, and access to nearby healthcare facilities, aiming to increase awareness and compliance with childhood vaccination programs.",
    problems: [
      {
        icon: "📅",
        title: "Missed Vaccination Schedules",
        description:
          "Parents often forgot or missed scheduled vaccinations due to busy lifestyles and lack of structured reminders.",
      },
      {
        icon: "📄",
        title: "Scattered Vaccine Information",
        description:
          "Vaccination records and schedules were kept on paper or scattered across multiple sources with no centralization.",
      },
      {
        icon: "🏥",
        title: "Limited Healthcare Facility Info",
        description:
          "Parents struggled to find nearby clinics and healthcare centers providing specific vaccinations.",
      },
    ],
    solutions: [
      {
        icon: "📊",
        title: "Structured Vaccination Schedule",
        description:
          "Built a comprehensive vaccine information system with age-based scheduling and milestone tracking.",
      },
      {
        icon: "🔔",
        title: "Smart Reminder System",
        description:
          "Implemented push notifications and reminders for upcoming vaccinations based on the child's age and vaccine type.",
      },
      {
        icon: "📍",
        title: "Location-Based Facility Finder",
        description:
          "Integrated Fused Location Provider and OpenStreetMap to help users locate nearby clinics and healthcare centers.",
      },
      {
        icon: "🗂️",
        title: "Digital Vaccination Records",
        description:
          "Created a centralized digital record system for tracking completed vaccinations and upcoming schedules.",
      },
    ],
    features: [
      {
        icon: "💉",
        title: "Vaccine Information",
        description:
          "Comprehensive vaccine database with age-appropriate scheduling, descriptions, and milestone tracking.",
      },
      {
        icon: "🔔",
        title: "Immunization Reminders",
        description:
          "Smart push notifications for upcoming vaccinations based on individual child schedules.",
      },
      {
        icon: "🗺️",
        title: "Healthcare Facility Locator",
        description:
          "Location-based clinic discovery using Fused Location Provider and OpenStreetMap integration.",
      },
      {
        icon: "📋",
        title: "Digital Records",
        description:
          "Centralized digital vaccination records with completion tracking and history export.",
      },
    ],
    contributions: [
      "Built the complete Android application using Jetpack Compose following MVVM architecture patterns",
      "Implemented Fused Location Provider and OSMDroid for location-based healthcare facility discovery",
      "Integrated Firebase services for authentication, data storage, and push notification delivery",
      "Transformed UI/UX designs from BNCC HMM team into fully functional application screens",
      "Designed the vaccination schedule data model with age-based milestone calculations",
    ],
    results: [
      {
        icon: "✅",
        title: "Vaccination Compliance",
        description:
          "Created a tool that helps parents track and complete their children's vaccination schedules on time.",
      },
      {
        icon: "📍",
        title: "Location Integration",
        description:
          "Successfully integrated real-time location services for nearby healthcare facility discovery.",
      },
      {
        icon: "⭐",
        title: "Academic Excellence",
        description:
          "Delivered as a final project for the Mobile Application Development course with strong execution.",
      },
    ],
    gallery: [],
  },

  zenpilates: {
    role: "Full-stack Developer",
    startDate: "2026-01-01",
    endDate: "2026-01-28",
    overview:
      "ZenPilates is a full-stack web application that simulates an end-to-end Pilates studio reservation system, developed as part of the DIRO Technical Test. Unlike simple CRUD demos, ZenPilates implements a realistic business flow with complex state management — users browse Pilates classes, select available dates and timeslots, choose an available court, complete payment via Midtrans Snap, and manage their reservation history. The frontend uses Next.js App Router with progressive booking state management, while the backend is built with Golang following Clean Architecture principles.",
    problems: [
      {
        icon: "🔄",
        title: "Complex booking state transitions",
        description:
          "The reservation flow involves multiple sequential steps — class selection → date pick → timeslot pick → court selection → booking summary → payment → confirmation. Each step depends on the previous, and invalid state transitions must be prevented to maintain data integrity.",
      },
      {
        icon: "🚫",
        title: "Double booking prevention across three dimensions",
        description:
          "Availability must be validated across three interdependent dimensions: date, timeslot, and court. A court might be available on a given date but booked for a specific timeslot. The system must prevent any combination that results in double booking.",
      },
      {
        icon: "💳",
        title: "Payment-first booking confirmation flow",
        description:
          "Unlike simple reservations that confirm immediately, ZenPilates requires successful payment (via Midtrans Snap) before a booking is confirmed. This introduces a pending payment state and requires synchronizing payment status with reservation confirmation.",
      },
      {
        icon: "🏗️",
        title: "Cross-platform architecture: Next.js + Golang backend",
        description:
          "The frontend and backend use different technologies and run independently. Coordinating API contracts, JWT authentication, error handling, and CORS configuration between Next.js and a Golang net/http server required careful planning.",
      },
    ],
    solutions: [
      {
        icon: "🗺️",
        title: "Progressive booking state management",
        description:
          "Designed a step-by-step booking flow where each step validates the previous before proceeding. State is managed on the frontend using progressive state machine patterns, ensuring users cannot skip steps or submit invalid combinations.",
      },
      {
        icon: "🛡️",
        title: "Multi-dimensional availability validation",
        description:
          "Implemented backend validation logic that checks availability across three dimensions — date, timeslot, and court — before allowing any booking to proceed. The validation uses explicit database queries to verify no conflicting reservations exist, preventing double bookings at the data layer.",
      },
      {
        icon: "⚖️",
        title: "Midtrans Snap payment integration with status sync",
        description:
          "Integrated Midtrans Snap payment gateway for real payment processing simulation. The booking transitions through states: Pending Payment → Payment Confirmed → Confirmed. Backend webhook handling synchronizes payment status with reservation status, ensuring atomic booking confirmation.",
      },
      {
        icon: "🏗️",
        title: "Clean Architecture with explicit API contracts",
        description:
          "Golang backend follows Clean Architecture (Domain → Usecase → Repository → Delivery) with explicit separation of concerns. RESTful API design with versioned endpoints, JWT auth middleware, and CORS configuration ensures clean communication with the Next.js frontend.",
      },
    ],
    features: [
      {
        icon: "🧘",
        title: "Class Browsing",
        description:
          "Browse available Pilates classes with descriptions, schedules, and pricing information",
      },
      {
        icon: "📅",
        title: "Dynamic Availability",
        description:
          "Real-time availability checking across dates, timeslots, and courts with visual indicators of open/closed slots",
      },
      {
        icon: "🚫",
        title: "Double Booking Prevention",
        description:
          "Strict backend validation ensures no court can be double-booked across any date-timeslot combination",
      },
      {
        icon: "💳",
        title: "Midtrans Payment",
        description:
          "Secure payment processing via Midtrans Snap with sandbox integration and automatic booking confirmation on success",
      },
      {
        icon: "📋",
        title: "Booking History",
        description:
          "Complete reservation history with status tracking (Pending, Confirmed, Cancelled) and detailed booking information",
      },
      {
        icon: "🔐",
        title: "JWT Authentication",
        description:
          "Secure login/signup with JWT-based authentication protecting all booking, payment, and history operations",
      },
    ],
    contributions: [
      "Architected the full-stack application with Next.js frontend and Golang backend following Clean Architecture principles",
      "Designed and built the Golang backend with net/http server, implementing Domain, Usecase, Repository, and Delivery layers for maintainability and testability",
      "Implemented the progressive booking flow with multi-step state management — class selection, date/timeslot/court availability, booking summary, payment, and confirmation",
      "Built availability validation logic that prevents double booking across date, timeslot, and court dimensions with explicit database queries",
      "Integrated Midtrans Snap payment gateway with webhook-based payment status synchronization for booking confirmation",
      "Developed the JWT authentication middleware for route protection, ensuring booking, payment, and history pages require authentication",
      "Created the responsive Next.js frontend with feature-based folder structure, reusable UI components, and centralized design tokens",
      "Implemented booking history page with reservation status display (Pending, Confirmed, Cancelled) and filtering capabilities",
    ],
    results: [
      {
        icon: "✅",
        title: "Real-World Booking Flow",
        description:
          "Complete end-to-end reservation system with class selection, availability checking, payment, and confirmation — not a simple CRUD",
      },
      {
        icon: "🔒",
        title: "Double Booking Prevention",
        description:
          "Three-dimensional validation (date × timeslot × court) ensures data integrity and prevents reservation conflicts",
      },
      {
        icon: "💳",
        title: "Payment Integration",
        description:
          "Midtrans Snap payment gateway integration with webhook-based status synchronization for production-ready payment flow",
      },
      {
        icon: "🏗️",
        title: "Clean Architecture",
        description:
          "Golang Clean Architecture with 4 layers ensures maintainability, testability, and separation of business logic from infrastructure",
      },
    ],
    gallery: [],
  },

  swara_ibu: {
    role: "Mobile Developer",
    startDate: "2025-07-01",
    endDate: "2025-07-28",
    overview:
      "SwaraIbu is an AI-powered mobile application designed to support postpartum mothers by analyzing voice input to detect emotional distress and provide early mental health support. The app was built as part of the Slashcom Android Hackathon organized by UPN Veteran Jakarta, where it won 1st place. Mothers can express their feelings via voice recordings, which are then processed through a multi-stage AI pipeline — speech-to-text via OpenAI Whisper, audio feature extraction via Librosa, emotion and stress classification, and semantic crisis detection via Sentence-BERT.",
    problems: [
      {
        icon: "😔",
        title: "Postpartum depression often goes undetected",
        description:
          "Postpartum depression affects many new mothers but frequently goes undiagnosed due to limited emotional support, low awareness of early symptoms, and the absence of accessible mental health screening tools. Many mothers suffer in silence without timely intervention.",
      },
      {
        icon: "🎙️",
        title: "No accessible voice-based mental health tool for mothers",
        description:
          "Existing mental health tools require typing, questionnaires, or clinical visits — barriers for exhausted new mothers. There was no tool allowing mothers to simply speak their feelings and receive AI-powered emotional analysis.",
      },
      {
        icon: "🚨",
        title: "Emergency detection and family notification gap",
        description:
          "When a mother experiences a mental health crisis, family members are often unaware until it's too late. The app needed to detect crisis indicators from voice and automatically alert designated companions.",
      },
      {
        icon: "⏳",
        title: "Building AI-powered mobile app within hackathon timeline",
        description:
          "Integrating multiple AI models (Whisper, Librosa, Sentence-BERT, emotion classification) into a mobile application and deploying backend APIs within a hackathon's tight timeline presented significant technical and coordination challenges.",
      },
    ],
    solutions: [
      {
        icon: "🧠",
        title: "Voice-based emotional analysis pipeline",
        description:
          "Built a comprehensive AI pipeline: voice recording → OpenAI Whisper for speech-to-text → Librosa for audio feature extraction (MFCC, spectrogram) → emotion and stress classification model → semantic crisis detection via Sentence-BERT. Each stage processes the data and passes results to the next for holistic analysis.",
      },
      {
        icon: "🔔",
        title: "Emergency alert system with companion notification",
        description:
          "When the crisis detection model identifies high-risk emotional states from voice analysis, the app automatically triggers an emergency alert. The alert is sent to the mother's designated companion (family member) with relevant context about the detected condition.",
      },
      {
        icon: "📈",
        title: "Mood tracking and companion access mode",
        description:
          "Implemented mood tracking that records emotional states over time, helping mothers and their companions understand mental health patterns. Companion Access Mode allows trusted family members to view summarized emotional insights while maintaining privacy controls.",
      },
      {
        icon: "🏗️",
        title: "Modular AI architecture with FastAPI backend",
        description:
          "Each AI component (speech-to-text, emotion classification, crisis detection) is deployed as separate Python-based services communicating via FastAPI. This modular approach allowed parallel development during the hackathon and enables independent model updates.",
      },
    ],
    features: [
      {
        icon: "🎙️",
        title: "Voice Recognition & Analysis",
        description:
          "Analyzes voice input using Whisper STT and Librosa audio extraction to detect emotional stress and mental health risks in postpartum mothers",
      },
      {
        icon: "🚨",
        title: "Emergency Alert",
        description:
          "Triggers automatic alerts and critical warnings to designated companions when high-risk emotional states are detected from voice analysis",
      },
      {
        icon: "📈",
        title: "Mood Tracking",
        description:
          "Tracks emotional changes over time with visual charts to help users and companions understand mental health patterns and trends",
      },
      {
        icon: "🫂",
        title: "Companion Access Mode",
        description:
          "Allows trusted family members to view summarized emotional conditions with secure verification and privacy controls",
      },
      {
        icon: "🤖",
        title: "AI-Powered Analysis",
        description:
          "Multi-stage AI pipeline combining Whisper, Librosa, Sentence-BERT, and emotion classification for comprehensive voice-based mental health assessment",
      },
    ],
    contributions: [
      "Developed the entire Android frontend application using Kotlin and Jetpack Compose with Clean Architecture principles",
      "Implemented voice recording UI with real-time audio visualization and recording controls for user-friendly interaction",
      "Built the authentication flow with Firebase Authentication, including login, registration, and session persistence",
      "Integrated the FastAPI backend endpoints for voice upload, emotion analysis, and crisis detection within the mobile app",
      "Designed and implemented the companion access mode UI — allowing family members to view summarized emotional conditions after verification",
      "Created the mood tracking dashboard with graphical visualization of emotional patterns over time using Jetpack Compose charts",
      "Implemented push notification integration for emergency alerts triggered by crisis detection",
      "Collaborated with the backend team to coordinate API contracts, data flow, and real-time communication between app and AI services",
    ],
    results: [
      {
        icon: "🥇",
        title: "1st Place at SLASHCOM Hackathon",
        description:
          "Awarded first place at the Slashcom Android Hackathon organized by UPN Veteran Jakarta for innovation in mental health technology",
      },
      {
        icon: "🎤",
        title: "Functional Voice-Based AI Prototype",
        description:
          "Delivered a working mobile application integrating speech recognition, emotion analysis, and crisis detection within hackathon timeline",
      },
      {
        icon: "🤖",
        title: "Multi-Model AI Integration",
        description:
          "Successfully integrated OpenAI Whisper, Librosa, Sentence-BERT, and custom emotion classification models into a single mobile application",
      },
      {
        icon: "🔗",
        title: "End-to-End Mobile + AI Pipeline",
        description:
          "Demonstrated complete flow from voice recording on Android → API upload → AI processing → result display and emergency alerting",
      },
    ],
    gallery: [],
  },

  sabi: {
    role: "Mobile Developer",
    startDate: "2025-02-01",
    endDate: "2025-03-28",
    overview:
      "SABI (Sampah Bisa Jadi Berarti) is a mobile-based waste management application that encourages recycling through point rewards, marketplace transactions, and community-driven sustainability in Malang City. Developed as part of Internship Raion 2025, the app empowers users to turn everyday waste into meaningful contributions through recycling incentives, donations, and local UMKM support. Users can donate waste to earn reward points, exchange points for money, purchase recycled UMKM products, or donate to orphanages. The app also includes scheduled waste pickup requests, daily collection route visualization, educational content, and gamified eco-challenges. Built using Kotlin and Jetpack Compose with Clean Architecture and powered by Firebase services for real-time synchronization.",
    problems: [
      {
        icon: "🗑️",
        title: "Ineffective waste management in Malang City",
        description:
          "Waste management in Malang remained inefficient due to low public awareness, manual collection processes, and the absence of an integrated digital platform connecting citizens, recycling communities, and UMKM businesses.",
      },
      {
        icon: "💰",
        title: "No incentive system to encourage recycling behavior",
        description:
          "Residents lacked a digital platform that rewarded recycling efforts. Without clear incentives such as points, money, or redeemable products, participation in waste sorting and recycling stayed low.",
      },
      {
        icon: "⏳",
        title: "Delivering a production-ready app within 3 weeks",
        description:
          "The team had a very limited development timeline to build a complete Android application with multiple interconnected features while maintaining production-quality architecture and user experience.",
      },
      {
        icon: "🤝",
        title: "Serving multiple stakeholders in one platform",
        description:
          "The application needed to support different user groups — citizens, waste collection communities, orphanages, and UMKM businesses — each with unique workflows and system requirements.",
      },
    ],
    solutions: [
      {
        icon: "💎",
        title: "Waste-to-point reward ecosystem",
        description:
          "Designed a circular reward system where users earn points from waste donations, then redeem them as cash, use them for marketplace purchases, or donate them to orphanages to encourage sustainable recycling behavior.",
      },
      {
        icon: "🚚",
        title: "Waste pickup scheduling with route visualization",
        description:
          "Implemented a scheduled pickup request feature for large waste donations above 5kg, combined with daily route visualization to connect citizens directly with waste collection communities.",
      },
      {
        icon: "🏗️",
        title: "Clean Architecture for scalable development",
        description:
          "Applied Clean Architecture with presentation, domain, and data layers to maintain scalability and code maintainability during rapid feature development under a tight timeline.",
      },
      {
        icon: "🔥",
        title: "Firebase-powered real-time infrastructure",
        description:
          "Integrated Firebase Authentication and Firebase Realtime Database to handle user management, point balances, waste records, marketplace listings, and real-time synchronization without building a custom backend.",
      },
    ],
    features: [
      {
        icon: "♻️",
        title: "Waste to Point System",
        description:
          "Users can exchange sorted waste into reward points that can later be redeemed as cash, marketplace products, or charitable donations.",
      },
      {
        icon: "🛍️",
        title: "Recycled Product Marketplace",
        description:
          "Marketplace feature for purchasing recycled UMKM products using points or direct payment while supporting local sustainable businesses.",
      },
      {
        icon: "🚚",
        title: "Waste Pickup Scheduling",
        description:
          "Allows users to request scheduled waste pickup for large donations with route visualization and collection tracking.",
      },
      {
        icon: "🎯",
        title: "Gamification & Eco Challenges",
        description:
          "Daily eco-challenges and reward systems designed to increase user engagement and encourage consistent recycling habits.",
      },
      {
        icon: "📚",
        title: "Environmental Education",
        description:
          "Educational content and external learning resources about recycling practices, waste management, and environmental sustainability.",
      },
      {
        icon: "❤️",
        title: "Donation to Orphanages",
        description:
          "Feature allowing users to donate points or monetary contributions directly to orphanages and social causes.",
      },
    ],
    contributions: [
      "Implemented the entire mobile application business logic and data flow using Kotlin following Clean Architecture principles",
      "Integrated Firebase Authentication for user registration, login, and session management across the application",
      "Connected Firebase Realtime Database with Jetpack Compose UI components for real-time synchronization of points, waste records, and marketplace data",
      "Handled application state management including loading, success, empty, and error states across multiple features",
      "Implemented core workflows such as waste donation submission, point calculation, marketplace transactions, donation requests, and eco-challenge tracking",
      "Integrated Uploadcare for image upload and storage in waste donation and marketplace flows",
    ],
    results: [
      {
        icon: "🚀",
        title: "90% MVP Completion in 3 Weeks",
        description:
          "Successfully delivered around 90% of planned MVP features within the internship timeline while meeting sprint objectives and maintaining production quality.",
      },
      {
        icon: "📱",
        title: "Production-Ready Android Application",
        description:
          "Built a functional Android application using Kotlin, Jetpack Compose, Clean Architecture, and Firebase integration with multiple interconnected modules.",
      },
      {
        icon: "🤝",
        title: "Accepted as App Programmer at Raion",
        description:
          "Project contribution and technical performance led to acceptance as an App Programmer Member at Raion Community, Faculty of Computer Science, Universitas Brawijaya.",
      },
      {
        icon: "♻️",
        title: "Sustainability-Focused Community Platform",
        description:
          "Delivered a platform connecting citizens, UMKM businesses, and waste collection communities to encourage sustainable waste management in Malang City.",
      },
    ],
    gallery: [],
  },

  zelow: {
    role: "Mobile Developer",
    startDate: "2025-05-01",
    endDate: "2025-08-28",
    overview:
      "ZELOW (Zero Leftovers Waste App) is a mobile application that helps reduce food waste by connecting UMKM culinary businesses with consumers through discounted surplus food, flash sales, and surprise boxes. The app tackles the critical issue where food waste contributes more than 50% of total waste in Malang, while many UMKM suffer losses from unsold surplus food. Zelow enables UMKM to sell surplus food at discounted prices before it becomes waste, offers mystery surprise boxes at lower prices to reduce food stigma, features location-based nearby UMKM discovery, and includes a rating and review system for transparency.",
    problems: [
      {
        icon: "🍎",
        title: "Food waste exceeds 50% of total waste in Malang",
        description:
          "Food waste is the largest component of Malang's waste stream, yet most surplus food from UMKM culinary businesses goes unsold and becomes waste due to lack of efficient digital distribution channels.",
      },
      {
        icon: "📉",
        title: "UMKM suffer losses from unsold surplus food",
        description:
          "Small culinary businesses lack the tools and reach to sell surplus food before it spoils. Without a digital platform, discounted surplus food cannot find consumers in time, leading to financial losses and food waste.",
      },
      {
        icon: "🧩",
        title: "Continuing an unfinished project from a previous team",
        description:
          "The project was inherited with no documentation, an unfamiliar codebase (Flutter), and incomplete features. Understanding the existing architecture, reverse-engineering the application flow, and making independent architectural decisions was a significant challenge.",
      },
      {
        icon: "👥",
        title: "Leading a programmer-only team without a product role",
        description:
          "The team consisted entirely of programmers without a dedicated product manager. Balancing technical execution with product-level decision making, prioritization, and team coordination required wearing multiple hats.",
      },
    ],
    solutions: [
      {
        icon: "⚡",
        title: "Flash sale and surprise box model for surplus food",
        description:
          "Designed a dual sales model: Flash Sales allow UMKM to list surplus food at discounted prices with time-limited availability, while Surprise Boxes offer mystery food packages at lower prices to reduce food stigma and move inventory efficiently.",
      },
      {
        icon: "📍",
        title: "Location-based UMKM discovery with reviews",
        description:
          "Implemented nearby UMKM discovery using location services, enabling users to find discounted surplus food in their vicinity. Rating and review system builds trust and transparency between consumers and UMKM.",
      },
      {
        icon: "🏗️",
        title: "Codebase restructuring and architectural recovery",
        description:
          "Reverse-engineered the existing application flow, documented the architecture, and restructured the codebase for maintainability. Refactored core features while preserving existing functionality, then iteratively added new capabilities.",
      },
      {
        icon: "👨‍💻",
        title: "Technical leadership in a flat team structure",
        description:
          "Established technical direction, coding standards, and task prioritization. Bridged the gap between product goals and technical implementation, making architectural decisions while actively contributing code alongside the team.",
      },
    ],
    features: [
      {
        icon: "⚡",
        title: "Flash Sale Surplus Food",
        description:
          "Allows UMKM to sell surplus food at discounted prices with time-limited flash sales before it becomes waste",
      },
      {
        icon: "🎁",
        title: "Surprise Box",
        description:
          "Mystery food packages offered at lower prices to reduce food stigma and increase sales efficiency for UMKM",
      },
      {
        icon: "📍",
        title: "Nearby UMKM Discovery",
        description:
          "Location-based feature to help users find nearby UMKM offering discounted surplus food and surprise boxes",
      },
      {
        icon: "⭐",
        title: "Rating & Review System",
        description:
          "Builds trust and transparency by allowing users to rate and review UMKM, food quality, and pickup experience",
      },
      {
        icon: "💬",
        title: "Chat with Seller",
        description:
          "Direct communication between consumers and UMKM for pickup coordination, special requests, and inquiries",
      },
    ],
    contributions: [
      "Led the continuation of an unfinished mobile application project from a previous team, taking full ownership of technical direction",
      "Acted as technical leader in a programmer-only team while maintaining active coding responsibilities — balancing leadership with hands-on development",
      "Understood and restructured existing application flow, architecture, and codebase with no prior documentation from the previous team",
      "Implemented and refined core mobile features using Flutter and Dart, including the flash sale system, product listing, and cart management",
      "Integrated Firebase Cloud Functions for backend services — authentication, data storage, and real-time updates",
      "Collaborated with team members to align technical execution with product goals, translating business requirements into implementable features",
      "Bridged product-level decision making and technical implementation in the absence of a dedicated product manager role",
      "Implemented chat with seller feature for direct communication between consumers and UMKM for pickup coordination",
    ],
    results: [
      {
        icon: "♻️",
        title: "Food Waste Reduction Platform",
        description:
          "Contributed to reducing food waste in Malang through digital surplus food distribution, connecting UMKM with price-conscious consumers",
      },
      {
        icon: "🏪",
        title: "UMKM Economic Empowerment",
        description:
          "Empowered local culinary businesses to minimize financial losses from unsold food inventory through digital distribution channels",
      },
      {
        icon: "📱",
        title: "Functional Flutter Application",
        description:
          "Successfully rescued and completed an unfinished Flutter project, delivering a functional mobile app concept ready for further development",
      },
      {
        icon: "👨‍💻",
        title: "Technical Leadership",
        description:
          "Demonstrated leadership, codebase recovery, and team coordination skills in a challenging project continuation scenario",
      },
    ],
    gallery: [],
  },

  neuroclash: {
    role: "Full-stack Developer",
    startDate: "2026-02-01",
    endDate: "2026-03-28",
    overview:
      "NeuroClash GG is a web-based gamified educational quiz platform that combines the accessibility of modern quiz applications with the competitive mechanics of an auto-battler game. Created by Team Ditolak Magang, it transforms traditional quiz-taking into an engaging multiplayer experience with real-time 1v1 battles, HP systems, damage calculations, and comeback mechanics. The platform leverages AI via the Gemini API to automatically generate structured multiple-choice questions from user-uploaded PDF materials or system templates, making it both a practical study tool and an exciting competitive game.",
    problems: [
      {
        icon: "📉",
        title: "Low student engagement with traditional quiz platforms",
        description:
          "Conventional online quiz platforms lack the excitement and competitive elements needed to sustain student motivation. Without engaging game mechanics, students often treat quizzes as chores rather than learning opportunities.",
      },
      {
        icon: "✍️",
        title: "Manual question creation is time-consuming for educators",
        description:
          "Teachers and content creators spend significant time writing quiz questions. There is no efficient way to automatically generate structured, difficulty-calibrated questions from existing learning materials like PDF documents.",
      },
      {
        icon: "🔄",
        title: "No comeback mechanics in educational games",
        description:
          "Educational games typically lack comeback mechanics, causing losing players to feel hopeless and disengage. A fair system that gives trailing players a chance to recover was needed to maintain engagement throughout the game.",
      },
      {
        icon: "🌐",
        title: "Synchronizing real-time game state across multiple players",
        description:
          "Building a real-time multiplayer quiz game with synchronized timers, simultaneous answer submissions, and live damage calculations presented significant technical challenges in state management and WebSocket coordination.",
      },
    ],
    solutions: [
      {
        icon: "🎮",
        title: "Auto-battler game loop with competitive mechanics",
        description:
          "Designed a complete game loop inspired by auto-battler games: Warm-up Phase → 1v1 Battle Phase (real-time matchmaking, speed-based damage) → StarBox Comeback Phase (lowest HP gets priority on power-ups). Features Solo mode against an adaptive AI bot (Prof. Bubu) and Multiplayer mode supporting 1v1 and 1v1v1 matches.",
      },
      {
        icon: "🤖",
        title: "AI-powered question generation from PDFs",
        description:
          "Integrated Google Gemini API to automatically process uploaded PDF documents or system templates, extracting key concepts and generating structured multiple-choice questions in JSON format complete with answer keys, distractors, and difficulty levels.",
      },
      {
        icon: "🎁",
        title: "StarBox comeback mechanic for fair play",
        description:
          "Implemented the StarBox system that appears at specific intervals (every 5 rounds). The player with the lowest HP gets priority to choose powerful game-changing items — Knowledge Book (damage boost), Healing Potion (HP recovery), or Strong Shield (damage reduction) — enabling dramatic comebacks.",
      },
      {
        icon: "🏗️",
        title: "Route-Repository-Service architecture with real-time sync",
        description:
          "Adopted RRS Clean Architecture pattern separating API routes, business logic (services), and data access (repositories). Used Supabase Realtime/WebSockets for timer synchronization, 1v1 damage broadcasting, and live leaderboard updates across all connected clients.",
      },
    ],
    features: [
      {
        icon: "🤖",
        title: "AI Question Generator",
        description:
          "Automatically generates structured multiple-choice questions from uploaded PDFs or system templates using Google Gemini API",
      },
      {
        icon: "⚔️",
        title: "1v1 Battle Mode",
        description:
          "Real-time multiplayer battles where speed and accuracy determine damage — fastest correct answer deals damage to opponents",
      },
      {
        icon: "🤖",
        title: "Solo vs Prof. Bubu",
        description:
          "Practice offline against an adaptive AI bot with adjustable difficulty for independent skill development",
      },
      {
        icon: "📦",
        title: "StarBox Comeback",
        description:
          "Every 5 rounds, trailing players get priority to pick power-ups: Knowledge Book, Healing Potion, or Strong Shield",
      },
      {
        icon: "📚",
        title: "Material Customization",
        description:
          "Hosts choose from default system materials (e.g., Basic Programming) or upload custom PDF documents for question generation",
      },
      {
        icon: "🎨",
        title: "Avatar Selection",
        description:
          "2D avatar selection screen before matches for personalization and player identity",
      },
    ],
    contributions: [
      "Architected the full application following Route-Repository-Service (RRS) Clean Architecture pattern across the Next.js codebase",
      "Developed the multiplayer game engine with real-time 1v1 and 1v1v1 matchmaking, synchronized timers, and live damage calculation via Supabase Realtime WebSockets",
      "Built the AI question generation pipeline integrated with Google Gemini API — processing PDF uploads and system templates into structured multiple-choice questions",
      "Implemented the StarBox comeback mechanic with power-up items (Knowledge Book, Healing Potion, Strong Shield) that give trailing players competitive advantages",
      "Designed and built the Solo mode with an adaptive AI opponent (Prof. Bubu) for offline practice and skill development",
      "Created the arena management system for hosts — material selection, room configuration (15/20/40 max players), question count, and room code generation",
      "Built the real-time dashboard with live leaderboard, HP tracking, 2D avatar selection, and round-by-round game state visualization",
      "Implemented Zustand stores for client-side state management, handling session data and real-time UI synchronization",
    ],
    results: [
      {
        icon: "🎮",
        title: "Multiplayer Game Engine",
        description:
          "Successfully delivered a real-time multiplayer auto-battler quiz platform with synchronized game state across all connected players",
      },
      {
        icon: "🤖",
        title: "AI-Powered Question Generation",
        description:
          "Gemini API integration enables automatic question generation from PDF materials, eliminating manual question creation",
      },
      {
        icon: "🏗️",
        title: "Clean RRS Architecture",
        description:
          "Route-Repository-Service pattern ensures maintainable, testable, and well-separated code with clear ownership across layers",
      },
      {
        icon: "⚡",
        title: "Real-Time Synchronization",
        description:
          "Supabase Realtime WebSockets deliver sub-second game state updates for timers, damage, and leaderboard changes",
      },
    ],
    gallery: [],
  },

  octosight: {
    role: "Full-stack Developer",
    startDate: "2026-03-01",
    endDate: "2026-06-28",
    overview:
      "OctoSight is an end-to-end anti-phishing and fraud detection prototype developed as a capstone project for the Faculty of Computer Science, Universitas Brawijaya. Built with CIMB Niaga digital banking as the case study context, the platform combines a rule-based engine (35%) with machine learning (65%) to deliver a hybrid risk analysis system. It provides a streamlined reporting portal for banking customers, a full admin triage workflow with analytics dashboards, role-based access control, SLA monitoring, and preventive education modules. The system processes phishing reports across multiple channels — SMS, WhatsApp, Email, Website, and Transaction — with automatic ticket generation, evidence OCR, and real-time notifications.",
    problems: [
      {
        icon: "🎣",
        title: "Rising phishing attacks targeting digital banking users",
        description:
          "Digital banking users in Indonesia face increasing phishing and fraud attempts across SMS, WhatsApp, email, and fake websites. Existing reporting mechanisms are fragmented and lack automated triage, leaving users vulnerable and overwhelmed.",
      },
      {
        icon: "⏳",
        title: "Manual triage and investigation bottlenecks",
        description:
          "Security teams process phishing reports manually, leading to slow response times, inconsistent prioritization, and difficulty tracking case histories. No unified dashboard exists for monitoring incident trends or SLA compliance.",
      },
      {
        icon: "🧩",
        title: "No hybrid detection combining rule heuristics with ML",
        description:
          "Most available solutions rely either purely on rule-based detection (brittle against novel attacks) or pure ML (black-box, hard to explain). Combining both with transparent scoring was a key design challenge.",
      },
      {
        icon: "👥",
        title: "Complex RBAC requirements across 7 user roles",
        description:
          "The system serves end users, customer service, investigators, analysts, moderators, admins, and viewers — each with distinct permissions. Enforcing 37+ granular permissions at both API and frontend layers required careful architecture.",
      },
    ],
    solutions: [
      {
        icon: "⚖️",
        title: "Hybrid detection engine with transparent scoring",
        description:
          "Built a two-stage detection pipeline: 40+ rule-based heuristics (typosquatting, punycode, brand impersonation, URL shorteners, phishing keywords, scam scenarios) weighted at 35%, combined with a TF-IDF + Logistic Regression ML model (87% accuracy) weighted at 65%. The hybrid score (0–100) is fully explainable with per-rule and per-ML breakdowns.",
      },
      {
        icon: "📱",
        title: "Multi-channel reporting with automatic ticket generation",
        description:
          "Designed a unified incident reporting form supporting 5 report types (SMS, WhatsApp, Email, Website, Transaction) with evidence screenshot upload. Each submission auto-generates a unique ticket ID, runs the detection pipeline, and assigns priority (High ≥75, Medium ≥35, Low <35).",
      },
      {
        icon: "📊",
        title: "Full admin triage pipeline with Kanban and analytics",
        description:
          "Implemented a 7-column Kanban board with drag-and-drop transitions (Submitted → In Review → Confirmed/False Positive/Need More Info → Mitigated → Closed). Includes a paginated triage list with filters (status, priority, date range), CSV export, investigation workspace with OCR evidence viewer, ML feedback loop, and AI-generated notes via Gemini.",
      },
      {
        icon: "🔐",
        title: "Multi-layer RBAC with 37+ granular permissions",
        description:
          "Architected role-based access with 7 roles (admin, moderator, investigator, analyst, cs, viewer, user) and 37+ granular permissions. Enforced via require_permission() decorators on all API endpoints and a PermissionGate component + can() hook across 18+ frontend components. Admin role bypasses at DB query level.",
      },
    ],
    features: [
      {
        icon: "🔍",
        title: "Hybrid Risk Analysis",
        description:
          "Real-time preview of phishing risk score combining rule heuristics (35%) and ML prediction (65%) with full explainability",
      },
      {
        icon: "📋",
        title: "Multi-Channel Reporting",
        description:
          "Submit phishing/fraud reports across SMS, WhatsApp, Email, Website, and Transaction channels with evidence screenshots",
      },
      {
        icon: "📊",
        title: "Analytics Dashboard",
        description:
          "Chart.js widgets tracking incident trends, dominant modus, channel distribution, risk segmentation, and SLA compliance metrics",
      },
      {
        icon: "📌",
        title: "Kanban Board",
        description:
          "Drag-and-drop ticket workflow across 7 columns with bulk operations, inline assignment, and real-time status updates",
      },
      {
        icon: "🛡️",
        title: "Blacklist Management",
        description:
          "CRUD operations for blacklisted URLs, bank accounts, phone numbers, and emails — 4 types with automatic duplicate checking",
      },
      {
        icon: "📚",
        title: "Education Modules",
        description:
          "8 microlearning modules, 10+ articles, and quizzes across 4 difficulty levels with personalized Gemini AI recommendations",
      },
    ],
    contributions: [
      "Architected and developed the entire frontend application using Next.js 15 App Router with 98+ component files across user, admin, auth, and education routes",
      "Designed and implemented the hybrid detection pipeline integration — connecting rule engine, ML inference, OCR processing, and Gemini AI recommendations into a single coordinated workflow",
      "Built the full admin dashboard with Chart.js widgets for incident trends, modus distribution, channel breakdown, risk segmentation, and SLA monitoring",
      "Developed the Kanban board ticket management system with drag-and-drop, bulk operations, CSV export, and paginated triage list with real-time filtering",
      "Implemented RBAC across both frontend (PermissionGate, can() hook) and backend (require_permission()) with 7 roles and 37+ granular permissions",
      "Designed and built the education module with 8 microlearning modules, 10+ articles, quizzes across 4 difficulty levels, and personalized Gemini AI recommendations per report type and risk level",
      "Built the gamification system with points, streaks, badges, and 14 achievement types to drive user engagement and security awareness",
      "Integrated Google OAuth, forgot/reset password flow, real-time in-app notifications via polling, and Gmail SMTP email notifications for status changes",
    ],
    results: [
      {
        icon: "🎯",
        title: "87% ML Accuracy",
        description:
          "Logistic Regression + TF-IDF model trained on 2,000+ labeled samples achieved 87% accuracy with 0.87 precision and 0.84 recall",
      },
      {
        icon: "⚡",
        title: "Sub-5 Second Processing",
        description:
          "Full detection pipeline — report submission, rule analysis, ML inference, and scoring — completes in under 5 seconds",
      },
      {
        icon: "🧩",
        title: "40+ Detection Rules",
        description:
          "Comprehensive rule engine covering typosquatting, punycode, brand impersonation, URL shorteners, phishing keywords, and 4 scam scenarios",
      },
      {
        icon: "🔧",
        title: "8 Docker Services",
        description:
          "Production-ready infrastructure with Docker Compose orchestration: Caddy, Next.js, FastAPI, MySQL, Redis, Celery, and phpMyAdmin",
      },
    ],
    gallery: [],
  },

  eduearth: {
    role: "Front-End Developer",
    startDate: "2025-11-01",
    endDate: "2025-11-28",
    overview:
      "EduEarth is an interactive 3D Earth Layer Visualization built with Three.js that enables users to explore the Earth's internal structure through an immersive, educational 3D experience. Users can rotate, zoom, and interact with different geological layers to learn about the Earth's composition in an engaging visual format.",
    problems: [
      {
        icon: "📚",
        title: "Abstract Geological Concepts",
        description:
          "Students struggled to visualize and understand the Earth's internal layered structure from traditional 2D diagrams.",
      },
      {
        icon: "🎓",
        title: "Limited Interactive Learning Tools",
        description:
          "Educational resources for geology were primarily static images with no hands-on exploration capabilities.",
      },
      {
        icon: "😴",
        title: "Low Engagement in Earth Science",
        description:
          "Traditional teaching methods failed to capture student interest in earth science and geology topics.",
      },
    ],
    solutions: [
      {
        icon: "🎥",
        title: "3D Interactive Visualization",
        description:
          "Built an immersive Three.js-based 3D model of Earth's layers with rotation, zoom, and interactive exploration.",
      },
      {
        icon: "🧬",
        title: "Layer-by-Layer Exploration",
        description:
          "Enabled users to peel back and examine each geological layer individually with detailed information popups.",
      },
      {
        icon: "📖",
        title: "Educational Annotations",
        description:
          "Added informative labels and descriptions for each layer to combine visual learning with educational content.",
      },
    ],
    features: [
      {
        icon: "🌍",
        title: "3D Earth Visualization",
        description:
          "Interactive Three.js-powered 3D model of Earth with full rotation and zoom capabilities.",
      },
      {
        icon: "📊",
        title: "Layer Exploration",
        description:
          "Peel back and examine each geological layer from crust to core with detailed information.",
      },
      {
        icon: "ℹ️",
        title: "Educational Annotations",
        description:
          "Informative labels and descriptions for each layer combining visual and textual learning.",
      },
      {
        icon: "🔄",
        title: "Free Rotation",
        description:
          "Users can freely rotate and examine the Earth model from any angle for complete understanding.",
      },
    ],
    contributions: [
      "Built the complete 3D visualization application using Three.js and JavaScript",
      "Implemented 3D modeling of Earth's geological layers with accurate relative proportions and colors",
      "Developed interactive controls for rotation, zoom, and layer-by-layer exploration",
      "Created educational annotation system with layer descriptions integrated into the 3D experience",
      "Optimized 3D rendering performance for smooth interaction across different devices",
    ],
    results: [
      {
        icon: "⭐",
        title: "Interactive Education",
        description:
          "Transformed abstract geological concepts into an engaging, hands-on 3D learning experience.",
      },
      {
        icon: "⚡",
        title: "3D Performance",
        description:
          "Achieved smooth 60fps rendering of complex 3D geometry across modern browsers and devices.",
      },
      {
        icon: "💻",
        title: "Three.js Mastery",
        description:
          "Demonstrated proficiency in 3D web development using Three.js for educational visualization.",
      },
    ],
    gallery: [],
  },
};

async function seed() {
  console.log("Clearing all case studies...");

  // delete ALL rows safely
  const { error: deleteError } = await supabase
    .from("case_studies")
    .delete()
    .not("id", "is", null);

  if (deleteError) {
    console.error("Failed to clear case_studies table:");
    console.error(deleteError.message);
    process.exit(1);
  }

  console.log("✓ All case studies deleted\n");


  console.log("PROJECT_SLUGS COUNT:", Object.keys(PROJECT_SLUGS).length);
  console.log("CASE_STUDIES COUNT:", Object.keys(CASE_STUDIES).length);

  console.log("\nPROJECT_SLUGS:");
  console.log(Object.keys(PROJECT_SLUGS));

  console.log("\nCASE_STUDIES:");
  console.log(Object.keys(CASE_STUDIES));
  console.log("");

  // LOOP THROUGH ALL SLUGS
  for (const [key, slug] of Object.entries(PROJECT_SLUGS)) {
    const study = CASE_STUDIES[key];

    if (!study) {
      console.error(`✗ Missing CASE_STUDIES.${key}\n`);
      continue;
    }

    console.log(`Seeding ${key} -> ${slug}`);

    try {
      const projectId = await getProjectId(slug);

      const { error } = await supabase.from("case_studies").insert({
        project_id: projectId,
        role: study.role,
        start_date: study.startDate,
        end_date: study.endDate,
        overview: study.overview,
        problems: study.problems,
        solutions: study.solutions,
        contributions: study.contributions,
        features: study.features,
        results: study.results,
        gallery: study.gallery ?? [],
      });

      if (error) {
        console.error(`✗ Error inserting ${key}`);
        console.error(error.message);
        console.log("");
      } else {
        console.log(`✓ ${slug} (${study.role})\n`);
      }
    } catch (err) {
      console.error(`✗ Error with ${key}`);
      console.error(err.message);
      console.log("");
    }
  }
}

seed().then(() => console.log("✓ Seed complete!"));