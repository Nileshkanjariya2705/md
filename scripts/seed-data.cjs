const { initializeApp } = require('../node_modules/firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('../node_modules/firebase/auth');
const { getFirestore, doc, setDoc, getDocs, collection, serverTimestamp } = require('../node_modules/firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCNcxIlizm69QqDaJP1TdcSmo3cJVpbpkU",
  authDomain: "nilesh-practice.firebaseapp.com",
  projectId: "nilesh-practice",
  storageBucket: "nilesh-practice.firebasestorage.app",
  messagingSenderId: "423996845323",
  appId: "1:423996845323:web:492a5bfbf67772bb9f060e",
  measurementId: "G-0EFWK4DZ1J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const ADMIN_UID = "j4ml6gkyR2NGnQbwcqLubPPQ5HW2";

const PROJECTS = [
  {
    id: 'proj-1',
    title: 'Pulse Analytics Engine',
    slug: 'pulse-analytics-engine',
    shortDescription: 'Real-time telemetry and predictive business intelligence for hyper-growth enterprises.',
    description: 'Pulse Analytics is an enterprise-scale telemetry ingestion engine built for high-throughput data processing. Featuring sub-second aggregation over billions of data points, interactive drill-down dashboards, and automated anomaly detection powered by customized ML models.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    ],
    technologies: ['Next.js 16', 'TypeScript', 'ClickHouse', 'Tailwind CSS', 'Python FastApi', 'WebSockets'],
    category: 'Enterprise Software',
    projectUrl: 'https://example.com/pulse',
    githubUrl: 'https://github.com/example/pulse',
    featured: true,
    isPublished: true,
    sortOrder: 1,
  },
  {
    id: 'proj-2',
    title: 'Aegis Cloud Security Platform',
    slug: 'aegis-cloud-security',
    shortDescription: 'Zero-trust infrastructure access management and compliance automation for modern engineering teams.',
    description: 'A modern perimeter defense and identity governance suite. Engineered with instantaneous role-based posture evaluation, automated least-privilege auditing, and continuous SOC2 & ISO 27001 compliance tracking.',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
    ],
    technologies: ['React', 'Go', 'Kubernetes', 'gRPC', 'PostgreSQL', 'Tailwind CSS'],
    category: 'SaaS Platform',
    projectUrl: 'https://example.com/aegis',
    featured: true,
    isPublished: true,
    sortOrder: 2,
  },
  {
    id: 'proj-3',
    title: 'Nexus Autonomous Supply Chain',
    slug: 'nexus-autonomous-supply-chain',
    shortDescription: 'AI-guided logistics orchestration and dynamic route optimization saving millions in transit overhead.',
    description: 'Nexus brings end-to-end multi-modal freight transparency and real-time inventory re-routing algorithms. The platform integrates directly with IoT container sensors and ERP systems to minimize warehouse bottlenecks and demurrage costs.',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    ],
    technologies: ['Next.js', 'PyTorch', 'Kafka', 'Redis', 'Tailwind CSS', 'Docker'],
    category: 'AI / ML',
    projectUrl: 'https://example.com/nexus',
    featured: true,
    isPublished: true,
    sortOrder: 3,
  },
  {
    id: 'proj-4',
    title: 'Verve Mobile Health & Wellness',
    slug: 'verve-mobile-health',
    shortDescription: 'Cross-platform biometric tracking and personalized preventive health recommendations.',
    description: 'Verve connects medical telemetry wearables with dedicated health coaches. Users benefit from personalized circadian rhythm schedules, metabolic health scorecards, and encrypted clinician-patient messaging.',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    ],
    technologies: ['React Native', 'TypeScript', 'Node.js', 'Firebase', 'GraphQL'],
    category: 'Mobile App',
    featured: false,
    isPublished: true,
    sortOrder: 4,
  },
  {
    id: 'proj-5',
    title: 'Kinetix High-Frequency Commerce',
    slug: 'kinetix-hft-commerce',
    shortDescription: 'Sub-millisecond flash sale checkout infrastructure capable of handling 150k orders per second.',
    description: 'Architected for global apparel launches and drop culture events. Features distributed cart lockouts, fraud heuristics, and multi-region atomic inventory decrementing without database locking.',
    coverImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    ],
    technologies: ['Next.js 16', 'Rust', 'Redis Cluster', 'Stripe Payments', 'Tailwind CSS'],
    category: 'E-Commerce',
    projectUrl: 'https://example.com/kinetix',
    featured: false,
    isPublished: true,
    sortOrder: 5,
  },
  {
    id: 'proj-6',
    title: 'Cortex Copilot Studio',
    slug: 'cortex-copilot-studio',
    shortDescription: 'Enterprise fine-tuning studio and playground for custom LLMs and autonomous agents.',
    description: 'Cortex enables teams to fine-tune open-source LLMs against proprietary enterprise knowledge bases with strict zero-data-retention guarantees, automated RAG evaluation, and human-in-the-loop audit gates.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    ],
    technologies: ['Next.js', 'Python', 'LangChain', 'vLLM', 'FastAPI', 'Tailwind CSS'],
    category: 'AI / ML',
    featured: true,
    isPublished: true,
    sortOrder: 6,
  }
];

const TEAM = [
  {
    id: 'team-1',
    name: 'Alexander Chen',
    designation: 'Founder & Chief Technology Officer',
    department: 'Leadership',
    bio: 'Former distributed systems lead with 14+ years architecting high-scale infrastructure, resilient cloud systems, and real-time platforms.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    skills: ['Distributed Systems', 'Cloud Architecture', 'Go', 'Kubernetes'],
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'team-2',
    name: 'Elena Rostova',
    designation: 'Head of Product Design & Experience',
    department: 'Design',
    bio: 'Award-winning UX/UI strategist dedicated to human-centric interaction design, design systems, and converting complex workflows into intuitive software.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    skills: ['Design Systems', 'Figma', 'Micro-interactions', 'WCAG 2.1'],
    linkedinUrl: 'https://linkedin.com',
    websiteUrl: 'https://example.com',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'team-3',
    name: 'Marcus Vance',
    designation: 'Principal AI & Cloud Architect',
    department: 'AI & Data',
    bio: 'Specialist in generative AI orchestration, deep learning pipelines, and cloud native microservices spanning AWS, GCP, and Kubernetes.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    skills: ['LangChain', 'Python', 'Vector DBs', 'PyTorch', 'AWS'],
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 'team-4',
    name: 'Sophia Patel',
    designation: 'VP of Engineering & Client Solutions',
    department: 'Engineering',
    bio: 'Passionate about engineering excellence, team empowerment, and delivering enterprise software on time and beyond expectations.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    skills: ['Agile Engineering', 'React', 'Node.js', 'System Design'],
    linkedinUrl: 'https://linkedin.com',
    sortOrder: 4,
    isActive: true,
  },
  {
    id: 'team-5',
    name: 'Devrat Sharma',
    designation: 'Staff Full-Stack Architect',
    department: 'Engineering',
    bio: 'Specialized in high-concurrency Next.js platforms, WebSockets, and database optimization for million-user applications.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    skills: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Redis'],
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    sortOrder: 5,
    isActive: true,
  },
  {
    id: 'team-6',
    name: 'Claire Fontaine',
    designation: 'Lead DevOps & Security Specialist',
    department: 'Infrastructure',
    bio: 'Obsessed with automated zero-downtime CI/CD deployments, SOC2 compliance infrastructure, and multi-cloud resilience.',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    skills: ['Terraform', 'Docker', 'Kubernetes', 'Cybersecurity'],
    linkedinUrl: 'https://linkedin.com',
    sortOrder: 6,
    isActive: true,
  },
  {
    id: 'team-7',
    name: 'Liam O’Connor',
    designation: 'Senior Mobile Systems Engineer',
    department: 'Engineering',
    bio: 'Crafts 120Hz native-feel iOS and Android applications with offline-first synchronization and biometric security.',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    sortOrder: 7,
    isActive: true,
  },
  {
    id: 'team-8',
    name: 'Maya Lin',
    designation: 'Senior Generative AI Researcher',
    department: 'AI & Data',
    bio: 'Pioneering production RAG architectures, prompt evaluation suites, and open-weight LLM fine-tuning pipelines.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    skills: ['LlamaIndex', 'vLLM', 'HuggingFace', 'Fine-tuning'],
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    sortOrder: 8,
    isActive: true,
  }
];

const REVIEWS = [
  {
    id: 'rev-1',
    clientName: 'David Sterling',
    companyName: 'Apex Capital Partners',
    designation: 'Managing Director & CIO',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    review: 'Magnovaa transformed our entire financial operations platform. Their architectural mastery and execution speed were unlike anything we have seen from conventional agencies. Our processing throughput increased 4x while operational latency plummeted.',
    rating: 5,
    isPublished: true,
    sortOrder: 1,
  },
  {
    id: 'rev-2',
    clientName: 'Rachel Thorne',
    companyName: 'Lumina BioTech',
    designation: 'Co-Founder & Chief Executive Officer',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    review: 'Working with Magnovaa felt like an extension of our internal dream team. They took a nebulous clinical AI requirement and delivered a production-ready, compliant SaaS portal in record time. Truly world-class craftsmanship.',
    rating: 5,
    isPublished: true,
    sortOrder: 2,
  },
  {
    id: 'rev-3',
    clientName: 'Jonathan Meyer',
    companyName: 'Veloce Mobility',
    designation: 'Head of Digital Products',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    review: 'The attention to visual detail, micro-interactions, and accessibility that Magnovaa brought to our fleet management ecosystem was phenomenal. User satisfaction skyrocketed by 45% post-release.',
    rating: 5,
    isPublished: true,
    sortOrder: 3,
  },
  {
    id: 'rev-4',
    clientName: 'Elena Vasquez',
    companyName: 'HyperPay Global',
    designation: 'Chief Technology Officer',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    review: 'We contracted Magnovaa to overhaul our high-volume checkout microservices. Their zero-trust distributed architecture handled our Black Friday load of over 250k transactions per minute with zero downtime and sub-50ms latency.',
    rating: 5,
    isPublished: true,
    sortOrder: 4,
  },
  {
    id: 'rev-5',
    clientName: 'Marcus Lindqvist',
    companyName: 'Synthetix AI Labs',
    designation: 'VP of Product Engineering',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    review: 'The autonomous multi-agent pipelines Magnovaa developed unlocked capabilities our internal ML team had been struggling with for quarters. Their understanding of LangChain, vector retrieval, and model guardrails is second to none.',
    rating: 5,
    isPublished: true,
    sortOrder: 5,
  },
  {
    id: 'rev-6',
    clientName: 'Sarah Jenkins',
    companyName: 'Aegis Cloud Security',
    designation: 'Director of Platform Engineering',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    review: 'Magnovaa delivered a complete multi-cloud Kubernetes monitoring backbone ahead of schedule. Their automated Terraform modules and CI/CD pipelines saved us months of engineering time.',
    rating: 5,
    isPublished: true,
    sortOrder: 6,
  }
];

const PRICING = [
  {
    id: 'mvp-sprint',
    name: 'MVP Fast-Track',
    badge: 'Seed & Startups',
    tagline: 'High-speed production launch to validate market fit and win investors.',
    monthlyPrice: 4999,
    quarterlyPrice: 4999,
    billingPeriod: 'per project sprint',
    popular: false,
    idealFor: 'Early-stage founders, startup MVPs & rapid prototypes',
    deliveryTime: '3 – 4 Weeks to Launch',
    teamSetup: '1 Lead Full-Stack Dev + 1 UI/UX Designer',
    features: [
      'Interactive Figma UI/UX prototype & design system',
      'Production web app with React 19 & Next.js 15',
      'Relational PostgreSQL / Supabase database architecture',
      'Secure user authentication & role-based permissions',
      'Stripe payments & transactional email pipelines',
      'Automated CI/CD deployment on Vercel or AWS',
      '14-day post-launch bug warranty & hypercare',
      '100% intellectual property ownership & clean source code',
    ],
    technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Stripe'],
    ctaLabel: 'Launch Your MVP',
    ctaHref: '/contact?plan=mvp-sprint',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'dedicated-pod',
    name: 'Dedicated Engineering Pod',
    badge: 'Growth & Scale',
    tagline: 'Full-throttle cross-functional engineering team embedded directly into your sprint cycles.',
    monthlyPrice: 8999,
    quarterlyPrice: 7650,
    billingPeriod: 'per month',
    popular: true,
    idealFor: 'Funded startups, scale-ups & high-growth digital businesses',
    deliveryTime: 'Continuous Bi-Weekly Sprints',
    teamSetup: 'Senior Tech Lead + 2 Full-Stack Devs + UI/UX + QA Engineer',
    features: [
      'Dedicated senior engineers matched to your specific tech stack',
      'Autonomous feature development & agile sprint releases',
      'Generative AI / RAG pipelines & bespoke LLM integrations',
      'Automated test coverage & end-to-end regression QA',
      'DevOps orchestration (Docker, Kubernetes & AWS auto-scaling)',
      'Dedicated Slack/Discord channel with daily async standups',
      'Direct architect access & weekly roadmap syncs',
      'Zero recruitment lag — team kicks off within 48–72 hours',
      'Pause or scale team capacity anytime with 14-day notice',
    ],
    technologies: ['React/Node', 'Python AI', 'React Native', 'DevOps', 'AWS/GCP'],
    ctaLabel: 'Hire Your Dedicated Pod',
    ctaHref: '/contact?plan=dedicated-pod',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'enterprise-custom',
    name: 'Enterprise Architecture',
    badge: 'Bespoke Scale',
    tagline: 'Mission-critical distributed backends, compliance hardening, and global cloud resilience.',
    monthlyPrice: 'Custom',
    quarterlyPrice: 'Custom',
    billingPeriod: 'custom enterprise scope',
    popular: false,
    idealFor: 'Enterprises, fintech, healthcare & mission-critical distributed systems',
    deliveryTime: 'Multi-Quarter Strategic Scope',
    teamSetup: 'Principal Architect + Dedicated Squads + SRE & Security Leads',
    features: [
      'Bespoke distributed microservices (.NET 9, Java Spring Boot, Go)',
      'Custom enterprise LLM fine-tuning, private RAG & vector engines',
      'Rigorous compliance: SOC2, HIPAA, GDPR & ISO27001 hardening',
      'Sub-millisecond latency tuning & high-concurrency architectures',
      '99.99% uptime SLA with 24/7 dedicated incident response',
      'Multi-region failover, disaster recovery & cloud cost optimization',
      'Custom Master Services Agreement (MSA) & strict IP protections',
      'Dedicated Technical Account Manager & quarterly business reviews',
    ],
    technologies: ['Java/Spring', '.NET 9', 'Kubernetes', 'Apache Kafka', 'Azure/AWS'],
    ctaLabel: 'Talk to Principal Architect',
    ctaHref: '/contact?plan=enterprise-custom',
    sortOrder: 3,
    isActive: true,
  }
];

async function seed() {
  console.log("==> Signing in as primary administrator (mitali@gmail.com)...");
  const cred = await signInWithEmailAndPassword(auth, "mitali@gmail.com", "mitali@123");
  console.log(`[AUTH] Signed in successfully. UID: ${cred.user.uid}`);

  // 1. Seed admin profile in Firestore
  console.log("==> Ensuring admin document in 'admins' collection...");
  await setDoc(doc(db, 'admins', ADMIN_UID), {
    uid: ADMIN_UID,
    email: "mitali@gmail.com",
    name: "Mitali",
    role: "ADMIN",
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }, { merge: true });
  console.log(`[ADMIN] Saved admin document for UID: ${ADMIN_UID}`);

  // 2. Seed Projects
  console.log(`==> Seeding ${PROJECTS.length} projects...`);
  for (const item of PROJECTS) {
    const { id, ...data } = item;
    await setDoc(doc(db, 'projects', id), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });
    console.log(`  + Seeded project: [${id}] ${item.title}`);
  }

  // 3. Seed Team
  console.log(`==> Seeding ${TEAM.length} team members...`);
  for (const item of TEAM) {
    const { id, ...data } = item;
    await setDoc(doc(db, 'teamMembers', id), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });
    console.log(`  + Seeded team member: [${id}] ${item.name}`);
  }

  // 4. Seed Reviews
  console.log(`==> Seeding ${REVIEWS.length} client reviews...`);
  for (const item of REVIEWS) {
    const { id, ...data } = item;
    await setDoc(doc(db, 'clientReviews', id), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });
    console.log(`  + Seeded review: [${id}] ${item.clientName} (${item.companyName})`);
  }

  // 5. Seed Pricing Plans
  console.log(`==> Seeding ${PRICING.length} pricing plans...`);
  for (const item of PRICING) {
    const { id, ...data } = item;
    await setDoc(doc(db, 'pricing', id), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });
    console.log(`  + Seeded pricing plan: [${id}] ${item.name}`);
  }

  // 6. Verification
  console.log("\n==> Verifying live database counts...");
  const pSnap = await getDocs(collection(db, 'projects'));
  console.log(`[VERIFY] projects: ${pSnap.size} documents in Firestore`);

  const tSnap = await getDocs(collection(db, 'teamMembers'));
  console.log(`[VERIFY] teamMembers: ${tSnap.size} documents in Firestore`);

  const rSnap = await getDocs(collection(db, 'clientReviews'));
  console.log(`[VERIFY] clientReviews: ${rSnap.size} documents in Firestore`);

  const prSnap = await getDocs(collection(db, 'pricing'));
  console.log(`[VERIFY] pricing: ${prSnap.size} documents in Firestore`);

  console.log("\n>>> LIVE DATABASE POPULATION COMPLETE! <<<");
}

seed().then(() => {
  process.exit(0);
}).catch((err) => {
  console.error("Seeding failed:", err.code || err.message, err);
  process.exit(1);
});

