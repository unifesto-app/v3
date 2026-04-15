export type EventStatus = "trending" | "upcoming" | "featured" | "past" | "completed";
export type EventCategory =
  | "Hackathon"
  | "Cultural"
  | "MUN"
  | "Film & Arts"
  | "Entrepreneurship"
  | "Science & Tech"
  | "Workshop"
  | "Sports"
  | "Ideathon";

export interface Org {
  id: string;
  name: string;
  type: "university" | "college" | "department" | "club" | "cell" | "community" | "individual";
  description: string;
  parentOrgId?: string;
  image: string;
  website?: string;
}

export interface OrgRef {
  id: string;
  name: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  speaker?: string;
}

export interface MockEvent {
  id: string;
  title: string;
  org: OrgRef;
  organizer: string;  // kept for backwards compat display
  college: string;
  date: string;
  dateISO: string;
  time: string;
  category: EventCategory;
  eventType: "inPerson" | "online" | "hybrid";
  status: EventStatus[];
  tags: string[];
  description: string;
  price: number;
  spotsLeft: number;
  totalSpots: number;
  registrationDeadline: string;
  location: string;
  attendees: number;
  schedule: ScheduleItem[];
  posterGradient: string;
}

// ─── Org Data ────────────────────────────────────────────────────────────────

export const orgs: Org[] = [
  {
    id: "mruh",
    name: "Malla Reddy University",
    type: "university",
    description: "Malla Reddy University (MRUH) is one of the leading private universities in Hyderabad, Telangana. Home to diverse clubs, cells, and departments that host 25+ events every academic year.",
    image: "/orgs/mruh.png",
  },
  {
    id: "ie-cell",
    name: "Innovation & Entrepreneurship Cell",
    type: "cell",
    description: "The IE Cell at MRUH is the driving force behind the campus startup ecosystem. From ideathons to summits, we build tomorrow's founders today.",
    parentOrgId: "mruh",
    image: "/orgs/tech.png",
  },
  {
    id: "gdg-mruh",
    name: "GDGon Campus MRUH",
    type: "club",
    description: "Google Developer Groups on Campus at MRUH — a community of developers building with Google technologies. We run hackathons, workshops, and open source sprints.",
    parentOrgId: "mruh",
    image: "/orgs/tech.png",
  },
  {
    id: "marquee",
    name: "Marquee Film Club",
    type: "club",
    description: "Marquee is MRUH's official film and arts collective. We celebrate student creativity through screenings, cultural festivals, open mics, and film competitions.",
    parentOrgId: "mruh",
    image: "/orgs/arts.png",
  },
  {
    id: "mun-mruh",
    name: "MUN Club MRUH",
    type: "club",
    description: "The MUN Club organises Model United Nations conferences and debate summits, training students in diplomacy, public speaking, and global affairs.",
    parentOrgId: "mruh",
    image: "/orgs/event.png",
  },
  {
    id: "linkedinspire",
    name: "LinkedInspire Club",
    type: "club",
    description: "LinkedInspire helps students build their professional brand, master LinkedIn, and connect with industry — from freshers to final years.",
    parentOrgId: "mruh",
    image: "/orgs/tech.png",
  },
  {
    id: "bos-rd",
    name: "BOS & R&D Dept. MRUH",
    type: "department",
    description: "The Board of Studies and Research & Development Department drives academic innovation at MRUH, organising Science Day, research expos, and faculty-led seminars.",
    parentOrgId: "mruh",
    image: "/orgs/tech.png",
  },
  {
    id: "sports-committee",
    name: "Sports Committee MRUH",
    type: "club",
    description: "The Sports Committee manages all inter-departmental and university-level sporting events — from cricket and football to basketball and athletics.",
    parentOrgId: "mruh",
    image: "/orgs/event.png",
  },
  {
    id: "soe",
    name: "School of Engineering",
    type: "department",
    description: "The School of Engineering at MRUH houses departments across CSE, ECE, Mechanical, Civil and more — and is home to several active technical clubs and cells.",
    parentOrgId: "mruh",
    image: "/orgs/mruh.png",
  },
  {
    id: "tedx-mruh",
    name: "TEDx Malla Reddy University",
    type: "community",
    description: "TEDx MRUH is an independently organised TED event that brings together ideas worth spreading — student talks, workshops, and community conversations.",
    image: "/orgs/event.png",
  },
  {
    id: "abhinav-tej",
    name: "Abhinav Tej",
    type: "individual",
    description: "Student developer & event organiser at Malla Reddy University.",
    parentOrgId: "mruh",
    image: "/orgs/tech.png",
  },
];

const mockEvents: MockEvent[] = [
  {
    id: "nav-nirman-3",
    title: "Nav Nirman 3.0",
    org: { id: "ie-cell", name: "Innovation & Entrepreneurship Cell" },
    organizer: "Innovation & Entrepreneurship Club",
    college: "Malla Reddy University",
    date: "Saturday, August 23, 2025",
    dateISO: "2025-08-23",
    time: "09:00 AM – 04:00 PM",
    category: "Ideathon",
    eventType: "inPerson",
    status: ["past", "completed"],
    tags: ["Completed", "Ideathon"],
    description:
      "Nav-Nirman is the flagship innovation initiative of the Innovation & Entrepreneurship Cell, Malla Reddy University – a space where creativity meets action. In its 3rd edition, Nav-Nirman evolves beyond a traditional ideathon, now blending ideation with a high-energy pitching competition.\n\nStudents will not only brainstorm bold solutions to real-world challenges but also refine, validate, and present them to a panel of experts – simulating the real startup pitch experience. With an open innovation theme, mentorship support, and exciting incentives, this is where tomorrow's changemakers begin their journey.\n\nWhether you arrive with just an idea or a fully formed concept, Nav-Nirman 3.0 is your launchpad to turn thought into tangible impact.",
    price: 0,
    spotsLeft: 0,
    totalSpots: 300,
    registrationDeadline: "August 20, 2025",
    location: "School of Engineering Block-2, Malla Reddy University",
    attendees: 280,
    schedule: [
      { time: "09:00 AM", title: "Registration & Welcome" },
      { time: "09:30 AM", title: "Keynote: Innovation at Scale", speaker: "Guest Speaker" },
      { time: "10:00 AM", title: "Ideation Round Begins" },
      { time: "01:00 PM", title: "Lunch Break" },
      { time: "02:00 PM", title: "Pitching Competition" },
      { time: "03:30 PM", title: "Results & Awards" },
      { time: "04:00 PM", title: "Closing Ceremony" },
    ],
    posterGradient: "linear-gradient(135deg, #1e3a5f 0%, #0d2137 60%, #091929 100%)",
  },
  {
    id: "esummit26",
    title: "ESummit'26",
    org: { id: "ie-cell", name: "Innovation & Entrepreneurship Cell" },
    organizer: "Innovation & Entrepreneurship Cell",
    college: "Malla Reddy University",
    date: "Monday, March 16, 2026",
    dateISO: "2026-03-16",
    time: "10:00 AM – 06:00 PM",
    category: "Entrepreneurship",
    eventType: "inPerson",
    status: ["featured", "trending"],
    tags: ["Trending", "Featured", "Free"],
    description:
      "The flagship entrepreneurship summit — startup pitches, VC talks, panel discussions & networking. ESummit'26 brings together the brightest student founders, mentors, and investors for a full day of action-packed programming.",
    price: 0,
    spotsLeft: 180,
    totalSpots: 1200,
    registrationDeadline: "March 14, 2026",
    location: "Auditorium, Block 3, Malla Reddy University",
    attendees: 1020,
    schedule: [
      { time: "10:00 AM", title: "Inauguration & Opening Keynote" },
      { time: "11:30 AM", title: "Startup Pitch Round 1" },
      { time: "01:00 PM", title: "Lunch & Networking" },
      { time: "02:30 PM", title: "Panel: Future of Student Entrepreneurship" },
      { time: "04:00 PM", title: "Startup Pitch Finals" },
      { time: "05:30 PM", title: "Awards & Closing" },
    ],
    posterGradient: "linear-gradient(135deg, #0f2744 0%, #1a3a6e 50%, #1e4080 100%)",
  },
  {
    id: "hack-league",
    title: "Hack League",
    org: { id: "gdg-mruh", name: "GDGon Campus MRUH" },
    organizer: "GDGon Campus MRUH",
    college: "Malla Reddy University",
    date: "Saturday, March 8, 2026",
    dateISO: "2026-03-08",
    time: "10:00 AM (36 hrs)",
    category: "Hackathon",
    eventType: "inPerson",
    status: ["past", "featured"],
    tags: ["Featured", "Completed"],
    description:
      "36-hour hackathon — build fast, break things, win big. Teams of 2–4 compete across tracks: AI/ML, Web3, Social Impact, and Open Innovation. Mentors, snacks, and ₹50,000 in prizes await.",
    price: 0,
    spotsLeft: 0,
    totalSpots: 320,
    registrationDeadline: "March 5, 2026",
    location: "Innovation Lab, R&D Center, Malla Reddy University",
    attendees: 310,
    schedule: [
      { time: "10:00 AM", title: "Check-in & Opening" },
      { time: "11:00 AM", title: "Hacking Begins" },
      { time: "Next Day 10:00 AM", title: "Submission Deadline" },
      { time: "11:00 AM", title: "Demo Day" },
      { time: "02:00 PM", title: "Results & Prizes" },
    ],
    posterGradient: "linear-gradient(135deg, #0a1f3d 0%, #0d3060 50%, #0f3d7a 100%)",
  },
  {
    id: "wds2026",
    title: "WDS 2026",
    org: { id: "mun-mruh", name: "MUN Club MRUH" },
    organizer: "MUN Club MRUH",
    college: "Malla Reddy University",
    date: "Saturday, April 4, 2026",
    dateISO: "2026-04-04",
    time: "09:00 AM – 05:00 PM",
    category: "MUN",
    eventType: "inPerson",
    status: ["upcoming"],
    tags: ["Upcoming"],
    description:
      "World Debate Summit — Model UN committees, crisis simulations & public speaking championships. Delegates from across campus debate pressing global issues in a structured parliamentary format.",
    price: 150,
    spotsLeft: 62,
    totalSpots: 400,
    registrationDeadline: "April 1, 2026",
    location: "Conference Hall, Block 7, Malla Reddy University",
    attendees: 338,
    schedule: [
      { time: "09:00 AM", title: "Delegate Registration" },
      { time: "09:30 AM", title: "Opening Ceremony" },
      { time: "10:00 AM", title: "Committee Sessions Begin" },
      { time: "01:00 PM", title: "Lunch" },
      { time: "02:00 PM", title: "Crisis Simulation Round" },
      { time: "04:00 PM", title: "Closing Debate" },
      { time: "05:00 PM", title: "Awards Night" },
    ],
    posterGradient: "linear-gradient(135deg, #0e1f3d 0%, #1a2f5a 50%, #1e3870 100%)",
  },
  {
    id: "devsprints",
    title: "DevSprints",
    org: { id: "gdg-mruh", name: "GDGon Campus MRUH" },
    organizer: "GDGon Campus MRUH",
    college: "Malla Reddy University",
    date: "Friday, April 18, 2026",
    dateISO: "2026-04-18",
    time: "10:00 AM – 05:00 PM",
    category: "Workshop",
    eventType: "inPerson",
    status: ["upcoming"],
    tags: ["Upcoming", "Free"],
    description:
      "A hands-on 1-day sprint series covering: AI/ML fundamentals, Web Dev with Next.js, Cloud & DevOps, and Open Source contribution. Each track is beginner-friendly with side missions for advanced learners.",
    price: 0,
    spotsLeft: 45,
    totalSpots: 180,
    registrationDeadline: "April 15, 2026",
    location: "Lab Complex, Block 2, Malla Reddy University",
    attendees: 135,
    schedule: [
      { time: "10:00 AM", title: "Introduction & Setup" },
      { time: "10:30 AM", title: "Track 1: AI/ML Fundamentals" },
      { time: "12:00 PM", title: "Track 2: Web Dev with Next.js" },
      { time: "01:30 PM", title: "Lunch" },
      { time: "02:30 PM", title: "Track 3: Cloud & DevOps" },
      { time: "04:00 PM", title: "Track 4: Open Source Sprint" },
      { time: "05:00 PM", title: "Project Showcase & Close" },
    ],
    posterGradient: "linear-gradient(135deg, #0a2010 0%, #0f3018 50%, #0d3a1a 100%)",
  },
  {
    id: "pitch-perfect",
    title: "Pitch Perfect",
    org: { id: "ie-cell", name: "Innovation & Entrepreneurship Cell" },
    organizer: "Innovation & Entrepreneurship Cell",
    college: "Malla Reddy University",
    date: "Wednesday, April 22, 2026",
    dateISO: "2026-04-22",
    time: "11:00 AM – 03:00 PM",
    category: "Entrepreneurship",
    eventType: "inPerson",
    status: ["upcoming", "trending"],
    tags: ["Trending", "Free", "New"],
    description:
      "Student startup pitching competition. Present your idea, get mentored live, and compete for seed funding & incubation support. The best idea wins ₹25,000 in prizes and a fast-track to the campus incubator.",
    price: 0,
    spotsLeft: 28,
    totalSpots: 200,
    registrationDeadline: "April 19, 2026",
    location: "Seminar Hall, Block 5, Malla Reddy University",
    attendees: 172,
    schedule: [
      { time: "11:00 AM", title: "Welcome & Briefing" },
      { time: "11:30 AM", title: "Pitch Round 1 (Top 10 Teams)" },
      { time: "01:00 PM", title: "Mentorship Break" },
      { time: "02:00 PM", title: "Grand Finale (Top 3)" },
      { time: "02:45 PM", title: "Judging & Results" },
      { time: "03:00 PM", title: "Prize Distribution" },
    ],
    posterGradient: "linear-gradient(135deg, #1e1000 0%, #3d2000 50%, #4a2800 100%)",
  },
  {
    id: "unite",
    title: "UNITE",
    org: { id: "marquee", name: "Marquee Film Club" },
    organizer: "Marquee Film Club",
    college: "Malla Reddy University",
    date: "Monday, April 13, 2026",
    dateISO: "2026-04-13",
    time: "06:00 PM – 09:00 PM",
    category: "Film & Arts",
    eventType: "inPerson",
    status: ["upcoming", "trending"],
    tags: ["Trending", "Free"],
    description:
      "A celebration of student cinema — short film screenings, photography exhibitions, competitions & awards night. UNITE is Marquee's annual showcase of creative talent across campus.",
    price: 0,
    spotsLeft: 230,
    totalSpots: 650,
    registrationDeadline: "April 11, 2026",
    location: "Open Air Theatre, Malla Reddy University",
    attendees: 420,
    schedule: [
      { time: "06:00 PM", title: "Red Carpet & Registration" },
      { time: "06:30 PM", title: "Short Film Screenings" },
      { time: "07:30 PM", title: "Photography Exhibition" },
      { time: "08:00 PM", title: "Awards Ceremony" },
      { time: "08:45 PM", title: "Closing Performance" },
    ],
    posterGradient: "linear-gradient(135deg, #2d0a3a 0%, #3d0f4f 50%, #4a1260 100%)",
  },
  {
    id: "geetotsav",
    title: "Geetotsav",
    org: { id: "marquee", name: "Marquee Film Club" },
    organizer: "Marquee Film Club",
    college: "Malla Reddy University",
    date: "Thursday, March 12, 2026",
    dateISO: "2026-03-12",
    time: "05:00 PM – 10:00 PM",
    category: "Cultural",
    eventType: "inPerson",
    status: ["past", "featured"],
    tags: ["Featured", "Completed"],
    description:
      "Annual cultural fest with live music, classical & contemporary dance, art installations & open mics. Geetotsav is the biggest cultural night of the academic year.",
    price: 0,
    spotsLeft: 0,
    totalSpots: 2100,
    registrationDeadline: "March 10, 2026",
    location: "Main Campus Grounds, Malla Reddy University",
    attendees: 2050,
    schedule: [
      { time: "05:00 PM", title: "Entry & Art Exhibition" },
      { time: "06:00 PM", title: "Live Music Performances" },
      { time: "07:00 PM", title: "Dance Competition Finals" },
      { time: "08:30 PM", title: "Open Mic" },
      { time: "09:30 PM", title: "Closing Act" },
    ],
    posterGradient: "linear-gradient(135deg, #1a0a2e 0%, #2d1060 50%, #1a0a2e 100%)",
  },
  {
    id: "linkedinspire-summit",
    title: "LinkedInspire Summit",
    org: { id: "linkedinspire", name: "LinkedInspire Club" },
    organizer: "LinkedInspire Club",
    college: "Malla Reddy University",
    date: "Monday, May 5, 2026",
    dateISO: "2026-05-05",
    time: "10:00 AM – 02:00 PM",
    category: "Workshop",
    eventType: "inPerson",
    status: ["upcoming", "featured"],
    tags: ["Featured", "Free", "New"],
    description:
      "Professional networking & LinkedIn masterclass — build your personal brand, craft a standout profile, and land your dream internship or job. Featuring industry professionals as guest speakers.",
    price: 0,
    spotsLeft: 120,
    totalSpots: 500,
    registrationDeadline: "May 2, 2026",
    location: "Auditorium, Block 3, Malla Reddy University",
    attendees: 380,
    schedule: [
      { time: "10:00 AM", title: "Welcome & Intro", speaker: "Club President" },
      { time: "10:30 AM", title: "LinkedIn Profile Masterclass", speaker: "Guest Speaker" },
      { time: "12:00 PM", title: "Networking Lunch" },
      { time: "01:00 PM", title: "Personal Branding Workshop" },
      { time: "01:45 PM", title: "Q&A & Close" },
    ],
    posterGradient: "linear-gradient(135deg, #0a1628 0%, #0d2040 50%, #0f2a52 100%)",
  },
  {
    id: "research-expo",
    title: "Research Expo",
    org: { id: "bos-rd", name: "BOS & R&D Dept. MRUH" },
    organizer: "BOS & R&D Dept. MRUH",
    college: "Malla Reddy University",
    date: "Friday, May 1, 2026",
    dateISO: "2026-05-01",
    time: "10:00 AM – 04:00 PM",
    category: "Science & Tech",
    eventType: "inPerson",
    status: ["upcoming", "featured"],
    tags: ["Featured", "Free"],
    description:
      "Student research showcase — present your paper, project, or prototype to a panel of industry experts and faculty. Open to all departments. Certificate of participation for all presenters.",
    price: 0,
    spotsLeft: 85,
    totalSpots: 350,
    registrationDeadline: "April 27, 2026",
    location: "R&D Center, 2nd Floor, Malla Reddy University",
    attendees: 265,
    schedule: [
      { time: "10:00 AM", title: "Registration & Setup" },
      { time: "10:30 AM", title: "Opening Address" },
      { time: "11:00 AM", title: "Paper Presentations – Round 1" },
      { time: "01:00 PM", title: "Lunch" },
      { time: "02:00 PM", title: "Project/Prototype Showcase" },
      { time: "03:30 PM", title: "Expert Feedback & Awards" },
    ],
    posterGradient: "linear-gradient(135deg, #001a2e 0%, #00264a 50%, #003366 100%)",
  },
  {
    id: "frames-fest",
    title: "Frames Fest",
    org: { id: "marquee", name: "Marquee Film Club" },
    organizer: "Marquee Film Club",
    college: "Malla Reddy University",
    date: "Saturday, May 2, 2026",
    dateISO: "2026-05-02",
    time: "04:00 PM – 08:00 PM",
    category: "Film & Arts",
    eventType: "inPerson",
    status: ["upcoming"],
    tags: ["Upcoming", "Free"],
    description:
      "Short film festival — submit your film, screen it live, and compete for the Best Director award. Open to all students. All genres welcome.",
    price: 0,
    spotsLeft: 200,
    totalSpots: 450,
    registrationDeadline: "April 28, 2026",
    location: "Mini Theatre, Malla Reddy University",
    attendees: 250,
    schedule: [
      { time: "04:00 PM", title: "Registration" },
      { time: "04:30 PM", title: "Screening Block 1" },
      { time: "06:00 PM", title: "Intermission" },
      { time: "06:30 PM", title: "Screening Block 2" },
      { time: "07:30 PM", title: "Jury Discussion & Awards" },
    ],
    posterGradient: "linear-gradient(135deg, #1a0020 0%, #2d003d 50%, #3d0050 100%)",
  },
  {
    id: "science-day",
    title: "National Science Day",
    org: { id: "bos-rd", name: "BOS & R&D Dept. MRUH" },
    organizer: "BOS & R&D Dept. MRUH",
    college: "Malla Reddy University",
    date: "Saturday, February 28, 2026",
    dateISO: "2026-02-28",
    time: "09:00 AM – 05:00 PM",
    category: "Science & Tech",
    eventType: "inPerson",
    status: ["past"],
    tags: ["Completed"],
    description:
      "National Science Day celebrations with exhibitions, quizzes, lab demos & talks. Marking Raman Effect Day with science all day.",
    price: 0,
    spotsLeft: 0,
    totalSpots: 900,
    registrationDeadline: "February 25, 2026",
    location: "Science Block, Malla Reddy University",
    attendees: 870,
    schedule: [
      { time: "09:00 AM", title: "Inauguration" },
      { time: "09:30 AM", title: "Science Quiz" },
      { time: "11:00 AM", title: "Lab Demonstrations" },
      { time: "01:00 PM", title: "Lunch" },
      { time: "02:00 PM", title: "Guest Talk: History of Science" },
      { time: "04:00 PM", title: "Science Exhibition" },
    ],
    posterGradient: "linear-gradient(135deg, #001833 0%, #002244 50%, #002f5c 100%)",
  },
];

// ─── Mock API ────────────────────────────────────────────────────────────────

export function getAllEvents(): MockEvent[] {
  return mockEvents;
}

export function getEventById(id: string): MockEvent | undefined {
  return mockEvents.find((e) => e.id === id);
}

export function filterEvents({
  query = "",
  category = "All",
  status = "all",
  price = "all",
  dateRange = "all",
}: {
  query?: string;
  category?: string;
  status?: string;
  price?: "all" | "free" | "paid";
  dateRange?: "all" | "today" | "week" | "upcoming";
}): MockEvent[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 7);

  return mockEvents.filter((e) => {
    const matchesQuery =
      !query ||
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.organizer.toLowerCase().includes(query.toLowerCase()) ||
      e.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || e.category === category;
    const matchesStatus = status === "all" || e.status.includes(status as EventStatus);
    const matchesPrice =
      price === "all" ||
      (price === "free" && e.price === 0) ||
      (price === "paid" && e.price > 0);
    const eventDate = new Date(e.dateISO);
    const matchesDate =
      dateRange === "all" ||
      (dateRange === "today" && eventDate.toDateString() === today.toDateString()) ||
      (dateRange === "week" && eventDate >= today && eventDate <= weekEnd) ||
      (dateRange === "upcoming" && eventDate >= today);
    return matchesQuery && matchesCategory && matchesStatus && matchesPrice && matchesDate;
  });
}

export const ALL_CATEGORIES: string[] = [
  "All",
  "Hackathon",
  "Ideathon",
  "Cultural",
  "MUN",
  "Film & Arts",
  "Entrepreneurship",
  "Science & Tech",
  "Workshop",
  "Sports",
];

export const STATUS_TABS = [
  { key: "all", label: "All Events" },
  { key: "trending", label: "Trending" },
  { key: "upcoming", label: "Upcoming" },
  { key: "featured", label: "Featured" },
];

export const DATE_FILTERS = [
  { key: "all", label: "Any time" },
  { key: "today", label: "Today" },
  { key: "week", label: "This week" },
  { key: "upcoming", label: "Upcoming" },
];

export const PRICE_FILTERS = [
  { key: "all", label: "All" },
  { key: "free", label: "Free" },
  { key: "paid", label: "Paid" },
];

// ─── Org API ─────────────────────────────────────────────────────────────────

export function getAllOrgs(): Org[] {
  return orgs;
}

export function getOrgById(id: string): Org | undefined {
  return orgs.find((o) => o.id === id);
}

export function getEventsByOrg(orgId: string): MockEvent[] {
  return mockEvents.filter((e) => e.org.id === orgId);
}

export function getSubOrgs(parentOrgId: string): Org[] {
  return orgs.filter((o) => o.parentOrgId === parentOrgId);
}

/** Returns all org IDs in the subtree rooted at orgId (inclusive). */
export function getAllOrgIdsInTree(orgId: string): string[] {
  const children = orgs.filter((o) => o.parentOrgId === orgId);
  return [orgId, ...children.flatMap((c) => getAllOrgIdsInTree(c.id))];
}

/** Events by org + all sub-orgs (recursive). */
export function getEventsByOrgTree(orgId: string): MockEvent[] {
  const ids = new Set(getAllOrgIdsInTree(orgId));
  return mockEvents.filter((e) => ids.has(e.org.id));
}

export function getOrgsByType(type: Org["type"]): Org[] {
  return orgs.filter((o) => o.type === type);
}

export function getParentChain(orgId: string): Org[] {
  const chain: Org[] = [];
  let current = getOrgById(orgId);
  while (current?.parentOrgId) {
    const parent = getOrgById(current.parentOrgId);
    if (parent) chain.unshift(parent);
    current = parent;
  }
  return chain;
}

export const ORG_TYPE_LABELS: Record<Org["type"], string> = {
  university: "University",
  college: "College",
  department: "Department",
  club: "Club",
  cell: "Cell",
  community: "Community",
  individual: "Individual",
};
