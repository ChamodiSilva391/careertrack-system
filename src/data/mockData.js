export const INITIAL_JOBS = [
  {
    id: "job-1",
    company: "Google",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop&crop=faces",
    role: "Associate Software Engineer",
    location: "Singapore (Remote)",
    type: "Full-Time",
    salary: "$85,000 - $110,000 / yr",
    status: "Interviewing",
    appliedDate: "2026-10-15",
    link: "https://careers.google.com/jobs/results/123456",
    contactPerson: "Sarah Jenkins (Senior Tech Recruiter)",
    contactEmail: "sjenkins-recruiting@google.com",
    notes: "Completed Technical Screening Round on LeetCode Medium/Hard DP. System Design scheduled next week.",
    tags: ["React", "Go", "Distributed Systems", "Cloud"],
    interviews: [
      {
        id: "int-1",
        date: "2026-11-10T14:30:00",
        round: "Technical Interview 2 (System Design)",
        interviewer: "Alex Chen (Staff Engineer)",
        meetLink: "https://meet.google.com/xyz-abcd-jkl",
        status: "Upcoming",
        prepNotes: "Revise caching strategies, Redis, and high-concurrency microservices design."
      }
    ]
  },
  {
    id: "job-2",
    company: "Stripe",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop",
    role: "Full Stack Engineer - Payments",
    location: "Remote",
    type: "Full-Time",
    salary: "$120,000 - $140,000 / yr",
    status: "Offered",
    appliedDate: "2026-09-28",
    link: "https://stripe.com/jobs/apply/78910",
    contactPerson: "David Miller (Talent Acquisition)",
    contactEmail: "dmiller@stripe.com",
    notes: "Received verbal offer! Written contract received via DocuSign. Negotiating stock options.",
    tags: ["React", "Ruby", "TypeScript", "Fintech"],
    interviews: []
  },
  {
    id: "job-3",
    company: "Microsoft",
    logo: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=100&h=100&fit=crop",
    role: "Cloud Solutions Architect Intern",
    location: "Colombo / Hybrid",
    type: "Internship",
    salary: "$1,200 / mo",
    status: "Interviewing",
    appliedDate: "2026-10-20",
    link: "https://careers.microsoft.com",
    contactPerson: "Kavindu Perera (University Relations)",
    contactEmail: "kavindu.p@microsoft.com",
    notes: "First stage passed. Next is technical presentation on Azure architecture.",
    tags: ["Azure", "Docker", "Kubernetes", "DevOps"],
    interviews: [
      {
        id: "int-3",
        date: "2026-11-12T11:00:00",
        round: "Technical Assessment Presentation",
        interviewer: "Harin Fernando (Principal Cloud Architect)",
        meetLink: "https://teams.microsoft.com/l/meetup-join/1234",
        status: "Upcoming",
        prepNotes: "Prepare 15-minute presentation on serverless event-driven architecture."
      }
    ]
  },
  {
    id: "job-4",
    company: "WSO2",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
    role: "Senior Frontend Engineer (React)",
    location: "Colombo, Sri Lanka",
    type: "Full-Time",
    salary: "LKR 450,000 - 600,000 / mo",
    status: "Applied",
    appliedDate: "2026-11-01",
    link: "https://wso2.com/careers",
    contactPerson: "Amali Fernando (HR Lead)",
    contactEmail: "careers@wso2.com",
    notes: "Applied via LinkedIn easy apply. Profile viewed by recruiter 2 days ago.",
    tags: ["React", "TypeScript", "TailwindCSS", "Next.js"],
    interviews: []
  },
  {
    id: "job-5",
    company: "Sysco LABS",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop",
    role: "Software Engineer - Enterprise Core",
    location: "Colombo / Remote",
    type: "Full-Time",
    salary: "LKR 380,000 / mo",
    status: "Interviewing",
    appliedDate: "2026-10-18",
    link: "https://syscolabs.lk/careers",
    contactPerson: "Dinesh Rathnayake",
    contactEmail: "drathnayake@syscolabs.com",
    notes: "Round 1 Coding test cleared. HR screening next.",
    tags: ["Java", "Spring Boot", "AWS", "Kafka"],
    interviews: [
      {
        id: "int-4",
        date: "2026-11-15T15:00:00",
        round: "HR & Culture Fit Call",
        interviewer: "Nimna Silva (HR Specialist)",
        meetLink: "https://meet.google.com/abc-efgh-ijk",
        status: "Upcoming",
        prepNotes: "Be ready to explain conflict resolution and leadership experiences."
      }
    ]
  },
  {
    id: "job-6",
    company: "PickMe (Digital Mobility)",
    logo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&h=100&fit=crop",
    role: "Backend Engineer (Go / Microservices)",
    location: "Colombo, Sri Lanka",
    type: "Full-Time",
    salary: "LKR 400,000 / mo",
    status: "Applied",
    appliedDate: "2026-11-03",
    link: "https://pickme.lk/careers",
    contactPerson: "Careers Team",
    contactEmail: "talent@pickme.lk",
    notes: "Submitted CV with recommendation from Senior Engineer.",
    tags: ["Go", "Kafka", "PostgreSQL", "Redis"],
    interviews: []
  },
  {
    id: "job-7",
    company: "Amazon Web Services (AWS)",
    logo: "https://images.unsplash.com/photo-1523474255658-4af61b168344?w=100&h=100&fit=crop",
    role: "Software Development Engineer I",
    location: "Sydney, Australia (Hybrid)",
    type: "Full-Time",
    salary: "AUD 115,000 / yr",
    status: "Rejected",
    appliedDate: "2026-09-10",
    link: "https://amazon.jobs",
    contactPerson: "James O'Connor",
    contactEmail: "joconnor@amazon.com",
    notes: "Completed Online Assessment (OA2). Got rejected at phone screen. Re-apply eligible in 6 months.",
    tags: ["Java", "AWS", "Algorithms", "OOP"],
    interviews: []
  },
  {
    id: "job-8",
    company: "Figma",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop",
    role: "Frontend Systems Engineer",
    location: "Remote (Global)",
    type: "Full-Time",
    salary: "$135,000 / yr",
    status: "Wishlist",
    appliedDate: "2026-11-05",
    link: "https://figma.com/careers",
    contactPerson: "Not yet contacted",
    contactEmail: "",
    notes: "Polishing portfolio website and WebGL / Canvas interactive demo before applying.",
    tags: ["WebAssembly", "TypeScript", "Canvas API", "WebGL"],
    interviews: []
  }
];

export const APPLICATION_STATUSES = [
  { id: "Wishlist", label: "Wishlist / Planned", color: "bg-slate-100 text-slate-700 border-slate-300" },
  { id: "Applied", label: "Applied", color: "bg-blue-100 text-blue-700 border-blue-300" },
  { id: "Interviewing", label: "Interviewing", color: "bg-amber-100 text-amber-700 border-amber-300" },
  { id: "Offered", label: "Offer Accepted", color: "bg-emerald-100 text-emerald-700 border-emerald-300" },
  { id: "Rejected", label: "Rejected", color: "bg-rose-100 text-rose-700 border-rose-300" },
];

export const JOB_TYPES = ["Full-Time", "Part-Time", "Internship", "Contract", "Remote"];
