/**
 * CourseHub University Mock Data
 * Comprehensive catalog of courses, learning paths, student reviews, departments, timetable, transactions, and notifications.
 */

const INITIAL_STUDENT = {
  id: "STU-2024-8842",
  rollNo: "CS24B1042",
  name: "Alex Vance",
  email: "alex.vance@university.edu",
  phone: "+91 98765 43210",
  department: "Computer Science & Engineering",
  deptCode: "CSE",
  year: "3rd Year",
  semester: "5th Semester",
  cgpa: "8.92",
  college: "Institute of Technology & Advanced Science",
  advisor: "Dr. Arvind Subramanian",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  attendance: "92%",
  totalCreditsTarget: 160,
  completedCredits: 72,
  joinedDate: "August 2022"
};

const DEPARTMENTS = [
  { id: "all", name: "All Departments" },
  { id: "CSE", name: "Computer Science & Eng" },
  { id: "AIML", name: "AI & Data Science" },
  { id: "IT", name: "Information Technology" },
  { id: "ECE", name: "Electronics & Communication" }
];

// --- Academic Learning Paths / Career Tracks ---
const LEARNING_PATHS = [
  {
    id: "path-ai-ml",
    title: "Artificial Intelligence & Data Engineering",
    slug: "ai-data-engineering",
    badge: "Most Popular",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    icon: "brain-circuit",
    leadFaculty: "Dr. Priya Sharma (AI Lab Director)",
    careerOutcomes: ["AI Research Scientist", "Machine Learning Engineer", "NLP Specialist", "Data Architect"],
    description: "Progressive specialization from algorithmic foundations to generative AI architectures, distributed model training, and computer vision deployment.",
    totalCredits: 22,
    completedCredits: 12,
    progressPercentage: 55,
    milestones: [
      {
        step: 1,
        code: "CS101",
        title: "Programming Foundations with Python",
        credits: 4,
        semester: "Semester 1",
        status: "Completed",
        grade: "A+"
      },
      {
        step: 2,
        code: "CS201",
        title: "Advanced Data Structures & Algorithms",
        credits: 4,
        semester: "Semester 3",
        status: "Completed",
        grade: "A"
      },
      {
        step: 3,
        code: "AIML301",
        title: "AI & Machine Learning Paradigms",
        credits: 4,
        semester: "Semester 5",
        status: "Enrolled",
        grade: "In Progress"
      },
      {
        step: 4,
        code: "AIML310",
        title: "Big Data & Distributed Systems",
        credits: 3,
        semester: "Semester 5",
        status: "Recommended",
        grade: "-"
      },
      {
        step: 5,
        code: "CS401",
        title: "Generative AI & Transformer Models",
        credits: 4,
        semester: "Semester 7",
        status: "Locked",
        grade: "-"
      },
      {
        step: 6,
        code: "AI499",
        title: "AI Capstone Industry Practicum",
        credits: 3,
        semester: "Semester 8",
        status: "Locked",
        grade: "-"
      }
    ]
  },
  {
    id: "path-cloud-devops",
    title: "Cloud Architecture & Full-Stack Systems",
    slug: "cloud-fullstack",
    badge: "Industry High-Demand",
    color: "#0891b2",
    gradient: "linear-gradient(135deg, #0891b2 0%, #2563eb 100%)",
    icon: "cloud",
    leadFaculty: "Prof. Sarah Jenkins (AWS Certified Fellow)",
    careerOutcomes: ["Cloud Solutions Architect", "DevOps Engineer", "Full-Stack Tech Lead", "Site Reliability Engineer"],
    description: "Comprehensive pathway covering reactive frontend frameworks, microservices backends, container orchestration with Kubernetes, and enterprise CI/CD automation.",
    totalCredits: 20,
    completedCredits: 8,
    progressPercentage: 40,
    milestones: [
      {
        step: 1,
        code: "CS102",
        title: "Object-Oriented Programming (Java/C++)",
        credits: 4,
        semester: "Semester 2",
        status: "Completed",
        grade: "A"
      },
      {
        step: 2,
        code: "CS202",
        title: "Database Management & Distributed SQL",
        credits: 4,
        semester: "Semester 4",
        status: "Completed",
        grade: "A-"
      },
      {
        step: 3,
        code: "IT308",
        title: "Full-Stack Web Engineering",
        credits: 3,
        semester: "Semester 5",
        status: "Enrolled",
        grade: "In Progress"
      },
      {
        step: 4,
        code: "CS304",
        title: "Cloud Computing & DevOps",
        credits: 3,
        semester: "Semester 5",
        status: "Available",
        grade: "-"
      },
      {
        step: 5,
        code: "CS415",
        title: "Kubernetes Cluster Architecture",
        credits: 3,
        semester: "Semester 6",
        status: "Locked",
        grade: "-"
      },
      {
        step: 6,
        code: "CS498",
        title: "Distributed Cloud Capstone",
        credits: 3,
        semester: "Semester 8",
        status: "Locked",
        grade: "-"
      }
    ]
  },
  {
    id: "path-cyber-security",
    title: "Cyber Defense & Applied Cryptography",
    slug: "cyber-security",
    badge: "Critical Tech",
    color: "#dc2626",
    gradient: "linear-gradient(135deg, #991b1b 0%, #f43f5e 100%)",
    icon: "shield-check",
    leadFaculty: "Dr. Vikram Malhotra (Cyber Defense Chair)",
    careerOutcomes: ["Information Security Analyst", "Penetration Tester", "Cryptographic Engineer", "SOC Lead"],
    description: "Deep-dive specialization in vulnerability assessment, zero-trust network architectures, post-quantum cryptographic primitives, and threat intelligence forensics.",
    totalCredits: 21,
    completedCredits: 8,
    progressPercentage: 38,
    milestones: [
      {
        step: 1,
        code: "CS203",
        title: "Operating Systems & Kernels",
        credits: 4,
        semester: "Semester 3",
        status: "Completed",
        grade: "A"
      },
      {
        step: 2,
        code: "CS204",
        title: "Computer Communication Networks",
        credits: 4,
        semester: "Semester 4",
        status: "Completed",
        grade: "A"
      },
      {
        step: 3,
        code: "CS306",
        title: "Cyber Security & Cryptography",
        credits: 4,
        semester: "Semester 5",
        status: "Enrolled",
        grade: "In Progress"
      },
      {
        step: 4,
        code: "CS314",
        title: "Computer Networks & Protocols",
        credits: 3,
        semester: "Semester 5",
        status: "Available",
        grade: "-"
      },
      {
        step: 5,
        code: "SEC405",
        title: "Ethical Hacking & Malware Defense",
        credits: 3,
        semester: "Semester 6",
        status: "Locked",
        grade: "-"
      },
      {
        step: 6,
        code: "SEC499",
        title: "Red/Blue Team Cyber Capstone",
        credits: 3,
        semester: "Semester 8",
        status: "Locked",
        grade: "-"
      }
    ]
  },
  {
    id: "path-iot-robotics",
    title: "Embedded Systems & Autonomous Robotics",
    slug: "iot-robotics",
    badge: "Hardware & Edge",
    color: "#059669",
    gradient: "linear-gradient(135deg, #047857 0%, #10b981 100%)",
    icon: "cpu",
    leadFaculty: "Dr. Nandita Sen (Robotics Center)",
    careerOutcomes: ["Robotics Software Engineer", "Embedded Firmware Developer", "Edge AI Specialist", "IoT Systems Lead"],
    description: "Hardware-software co-design focusing on real-time operating systems (FreeRTOS), sensor telemetry, TinyML on microcontrollers, and Robot Operating System (ROS 2).",
    totalCredits: 19,
    completedCredits: 4,
    progressPercentage: 21,
    milestones: [
      {
        step: 1,
        code: "ECE201",
        title: "Microprocessors & Digital Circuits",
        credits: 4,
        semester: "Semester 3",
        status: "Completed",
        grade: "B+"
      },
      {
        step: 2,
        code: "ECE312",
        title: "IoT Systems & Smart Robotics",
        credits: 4,
        semester: "Semester 5",
        status: "Available",
        grade: "-"
      },
      {
        step: 3,
        code: "ECE318",
        title: "Real-Time Embedded Systems & ROS 2",
        credits: 4,
        semester: "Semester 6",
        status: "Locked",
        grade: "-"
      },
      {
        step: 4,
        code: "ECE403",
        title: "Edge AI & Autonomous Navigation",
        credits: 4,
        semester: "Semester 7",
        status: "Locked",
        grade: "-"
      },
      {
        step: 5,
        code: "ROB499",
        title: "Autonomous Robotics Capstone",
        credits: 3,
        semester: "Semester 8",
        status: "Locked",
        grade: "-"
      }
    ]
  }
];

const INITIAL_COURSES = [
  {
    id: "AIML301",
    code: "AIML301",
    title: "AI & Machine Learning",
    department: "AIML",
    departmentName: "AI & Data Science",
    pathId: "path-ai-ml",
    pathName: "Artificial Intelligence & Data Engineering",
    pathMilestone: "Milestone 3 of 6 (Core Subject)",
    instructor: "Dr. Priya Sharma",
    instructorRole: "Professor, AI Lab",
    credits: 4,
    duration: "60 Hours",
    availableSeats: 24,
    totalSeats: 60,
    semester: "Semester 5",
    year: "3rd Year",
    fee: 3500,
    type: "Core",
    rating: 4.9,
    reviewCount: 142,
    difficulty: "Moderate",
    enrolledCount: 36,
    tags: ["Artificial Intelligence", "Python", "Deep Learning"],
    schedule: "Mon, Wed, Fri (10:00 - 11:00 AM)",
    classroom: "Lab AI-402",
    color: "#6366f1",
    bannerGradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    icon: "brain-circuit",
    description: "Master modern AI paradigms, supervised & unsupervised machine learning, deep neural networks with PyTorch, and real-world computer vision pipelines.",
    prerequisites: ["CS201 (Data Structures)", "MATH202 (Linear Algebra)"],
    syllabus: [
      "Introduction to Machine Learning & Math Foundations",
      "Regression, Classification & Decision Trees",
      "Deep Learning & Convolutional Neural Networks",
      "Natural Language Processing with Transformers",
      "Reinforcement Learning & AI Ethics"
    ],
    ratingBreakdown: { 5: 78, 4: 16, 3: 4, 2: 1, 1: 1 },
    reviews: [
      {
        id: "rev-101",
        studentName: "Devin Zhao",
        rollNo: "CS22B1015",
        batch: "Class of 2025",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "12 Sep 2024",
        verified: true,
        helpfulCount: 34,
        difficulty: "Moderate",
        instructorRating: 5,
        comment: "Dr. Priya Sharma is exceptional! The hands-on labs with PyTorch gave me the exact portfolio projects I needed for my machine learning internship interview at Google. Highly recommend paying attention to the backprop derivations in Week 3."
      },
      {
        id: "rev-102",
        studentName: "Ananya Iyer",
        rollNo: "AI23B1088",
        batch: "Class of 2026",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "28 Aug 2024",
        verified: true,
        helpfulCount: 22,
        difficulty: "Moderate",
        instructorRating: 5,
        comment: "Best course of third year so far! The balance between theoretical math foundations and practical computer vision coding assignments is spot-on. Make sure you brush up on linear algebra matrices before the midterm."
      },
      {
        id: "rev-103",
        studentName: "Rohan Verma",
        rollNo: "CS23B1044",
        batch: "Class of 2026",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        rating: 4,
        date: "15 Aug 2024",
        verified: true,
        helpfulCount: 15,
        difficulty: "Challenging",
        instructorRating: 4,
        comment: "Very comprehensive curriculum. The assignments are challenging but grading is transparent. Transformer module was top-tier."
      }
    ]
  },
  {
    id: "CS302",
    code: "CS302",
    title: "Data Structures & Algorithms",
    department: "CSE",
    departmentName: "Computer Science & Eng",
    pathId: "path-ai-ml",
    pathName: "Artificial Intelligence & Data Engineering",
    pathMilestone: "Milestone 2 of 6 (Foundation)",
    instructor: "Dr. Rajiv Kumar",
    instructorRole: "Head of Dept, CSE",
    credits: 4,
    duration: "60 Hours",
    availableSeats: 12,
    totalSeats: 65,
    semester: "Semester 5",
    year: "3rd Year",
    fee: 3200,
    type: "Core",
    rating: 4.85,
    reviewCount: 198,
    difficulty: "Challenging",
    enrolledCount: 53,
    tags: ["Algorithms", "Data Structures", "Problem Solving"],
    schedule: "Tue, Thu, Sat (10:00 - 11:00 AM)",
    classroom: "Room CS-204",
    color: "#2563eb",
    bannerGradient: "linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)",
    icon: "binary-tree",
    description: "Advanced data structures including AVL trees, Red-Black trees, Graphs, dynamic programming optimizations, and amortized complexity analysis.",
    prerequisites: ["CS101 (Intro to Programming)"],
    syllabus: [
      "Asymptotic Analysis & Recurrence Relations",
      "Self-Balancing Trees & Tries",
      "Graph Algorithms (Shortest Paths, Flow Networks)",
      "Dynamic Programming Patterns",
      "NP-Completeness & Approximation Algorithms"
    ],
    ratingBreakdown: { 5: 72, 4: 21, 3: 5, 2: 1, 1: 1 },
    reviews: [
      {
        id: "rev-201",
        studentName: "Siddharth Rao",
        rollNo: "CS22B1002",
        batch: "Class of 2025",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "04 Sep 2024",
        verified: true,
        helpfulCount: 42,
        difficulty: "Challenging",
        instructorRating: 5,
        comment: "Dr. Rajiv Kumar makes even the hardest dynamic programming problems feel intuitive. The weekly competitive programming problem sets on LeetCode prepared our entire batch for campus placement coding rounds."
      },
      {
        id: "rev-202",
        studentName: "Kavita Menon",
        rollNo: "CS23B1090",
        batch: "Class of 2026",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        rating: 4,
        date: "20 Aug 2024",
        verified: true,
        helpfulCount: 18,
        difficulty: "Challenging",
        instructorRating: 5,
        comment: "Demanding course with intense problem sets, but you will learn so much. Red-black tree rotations and max-flow Min-cut theorems were explained with amazing visual slides."
      }
    ]
  },
  {
    id: "CS304",
    code: "CS304",
    title: "Cloud Computing & DevOps",
    department: "IT",
    departmentName: "Information Technology",
    pathId: "path-cloud-devops",
    pathName: "Cloud Architecture & Full-Stack Systems",
    pathMilestone: "Milestone 4 of 6 (Core Elective)",
    instructor: "Prof. Sarah Jenkins",
    instructorRole: "Cloud Architect, Visiting Faculty",
    credits: 3,
    duration: "45 Hours",
    availableSeats: 30,
    totalSeats: 50,
    semester: "Semester 5",
    year: "3rd Year",
    fee: 3000,
    type: "Elective",
    rating: 4.78,
    reviewCount: 96,
    difficulty: "Moderate",
    enrolledCount: 20,
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    schedule: "Mon, Wed (02:00 - 03:30 PM)",
    classroom: "Cloud Lab CL-101",
    color: "#0891b2",
    bannerGradient: "linear-gradient(135deg, #0e7490 0%, #06b6d4 100%)",
    icon: "cloud",
    description: "Architecting cloud-native microservices on AWS/GCP, Docker containerization, Kubernetes cluster orchestration, and automated GitHub Actions pipelines.",
    prerequisites: ["CS203 (Operating Systems)"],
    syllabus: [
      "Virtualization & Cloud Infrastructure (IaaS, PaaS, SaaS)",
      "Docker Containers & Storage Strategies",
      "Kubernetes Deployment, Services & Ingress",
      "Infrastructure as Code with Terraform",
      "Observability, Metrics & SRE Principles"
    ],
    ratingBreakdown: { 5: 68, 4: 24, 3: 6, 2: 1, 1: 1 },
    reviews: [
      {
        id: "rev-301",
        studentName: "Michael Chang",
        rollNo: "IT23B1032",
        batch: "Class of 2026",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "14 Sep 2024",
        verified: true,
        helpfulCount: 29,
        difficulty: "Moderate",
        instructorRating: 5,
        comment: "Prof. Sarah Jenkins brings genuine AWS industry experience to class. Every student gets $100 AWS credits for lab exercises to deploy live Kubernetes clusters and Terraform infrastructure."
      }
    ]
  },
  {
    id: "CS306",
    code: "CS306",
    title: "Cyber Security & Cryptography",
    department: "CSE",
    departmentName: "Computer Science & Eng",
    pathId: "path-cyber-security",
    pathName: "Cyber Defense & Applied Cryptography",
    pathMilestone: "Milestone 3 of 6 (Core Subject)",
    instructor: "Dr. Vikram Malhotra",
    instructorRole: "Director of Cyber Defense",
    credits: 4,
    duration: "60 Hours",
    availableSeats: 18,
    totalSeats: 55,
    semester: "Semester 5",
    year: "3rd Year",
    fee: 3400,
    type: "Core",
    rating: 4.92,
    reviewCount: 118,
    difficulty: "Challenging",
    enrolledCount: 37,
    tags: ["Security", "Cryptography", "Ethical Hacking"],
    schedule: "Tue, Thu (09:00 - 10:30 AM)",
    classroom: "SecLab S-301",
    color: "#dc2626",
    bannerGradient: "linear-gradient(135deg, #991b1b 0%, #f43f5e 100%)",
    icon: "shield-check",
    description: "Comprehensive study of network vulnerabilities, modern cryptosystems (RSA, ECC, AES), penetration testing, zero-trust architecture, and secure software development.",
    prerequisites: ["CS204 (Computer Networks)"],
    syllabus: [
      "Classic & Modern Symmetric/Asymmetric Ciphers",
      "Digital Signatures, Public Key Infrastructure (PKI)",
      "Web & Network Penetration Testing",
      "Malware Analysis & Threat Modeling",
      "Cryptographic Protocols & Zero-Knowledge Proofs"
    ],
    ratingBreakdown: { 5: 82, 4: 14, 3: 3, 2: 1, 1: 0 },
    reviews: [
      {
        id: "rev-401",
        studentName: "Aditi Nambiar",
        rollNo: "CS22B1075",
        batch: "Class of 2025",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "09 Sep 2024",
        verified: true,
        helpfulCount: 38,
        difficulty: "Challenging",
        instructorRating: 5,
        comment: "The CTF (Capture the Flag) challenges in SecLab are unforgettable. Dr. Malhotra explains elliptic curve cryptography with incredible mathematical clarity. Must-take course!"
      }
    ]
  },
  {
    id: "IT308",
    code: "IT308",
    title: "Full-Stack Web Engineering",
    department: "IT",
    departmentName: "Information Technology",
    pathId: "path-cloud-devops",
    pathName: "Cloud Architecture & Full-Stack Systems",
    pathMilestone: "Milestone 3 of 6 (Core Subject)",
    instructor: "Prof. Elena Rostova",
    instructorRole: "Lead Web Technologist",
    credits: 3,
    duration: "45 Hours",
    availableSeats: 8,
    totalSeats: 60,
    semester: "Semester 5",
    year: "3rd Year",
    fee: 2800,
    type: "Elective",
    rating: 4.88,
    reviewCount: 164,
    difficulty: "Moderate",
    enrolledCount: 52,
    tags: ["React", "Node.js", "GraphQL", "PostgreSQL"],
    schedule: "Wed, Fri (11:00 AM - 12:30 PM)",
    classroom: "Web Studio WS-12",
    color: "#7c3aed",
    bannerGradient: "linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)",
    icon: "code-browser",
    description: "Build robust, scalable enterprise web applications using modern JavaScript/TypeScript, reactive frontend frameworks, REST/GraphQL APIs, and relational databases.",
    prerequisites: ["CS101 (Intro to Web & Programming)"],
    syllabus: [
      "Modern Semantic Web, CSS Architecture & Design Systems",
      "Single Page Apps & Reactive State Management",
      "RESTful API & GraphQL Server Architecture with Node",
      "PostgreSQL, Query Optimization & Prisma ORM",
      "Web Performance, Caching & Production Deployment"
    ],
    ratingBreakdown: { 5: 75, 4: 19, 3: 4, 2: 1, 1: 1 },
    reviews: [
      {
        id: "rev-501",
        studentName: "Rahul Kapoor",
        rollNo: "IT23B1010",
        batch: "Class of 2026",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "01 Sep 2024",
        verified: true,
        helpfulCount: 27,
        difficulty: "Moderate",
        instructorRating: 5,
        comment: "Prof. Rostova keeps the tech stack completely updated with real-world 2024 standards. We built production-ready SaaS projects with React, Tailwind, and Node.js."
      }
    ]
  },
  {
    id: "AIML310",
    code: "AIML310",
    title: "Big Data & Distributed Systems",
    department: "AIML",
    departmentName: "AI & Data Science",
    pathId: "path-ai-ml",
    pathName: "Artificial Intelligence & Data Engineering",
    pathMilestone: "Milestone 4 of 6 (Core Elective)",
    instructor: "Dr. K. S. Raman",
    instructorRole: "Chief Data Scientist",
    credits: 3,
    duration: "45 Hours",
    availableSeats: 35,
    totalSeats: 50,
    semester: "Semester 5",
    year: "3rd Year",
    fee: 3100,
    type: "Elective",
    rating: 4.71,
    reviewCount: 74,
    difficulty: "Challenging",
    enrolledCount: 15,
    tags: ["Apache Spark", "Kafka", "Hadoop", "Data Lakes"],
    schedule: "Mon, Thu (03:00 - 04:30 PM)",
    classroom: "Data Hub DH-2",
    color: "#d97706",
    bannerGradient: "linear-gradient(135deg, #b45309 0%, #f59e0b 100%)",
    icon: "database-zap",
    description: "Processing petabyte-scale data streams using Apache Spark, Kafka streaming pipelines, distributed storage formats (Parquet, Delta Lake), and cluster management.",
    prerequisites: ["CS202 (Database Systems)"],
    syllabus: [
      "Distributed Systems Theory & CAP Theorem",
      "MapReduce & Apache Hadoop Ecosystem",
      "High-Throughput Streaming with Apache Kafka",
      "In-Memory Cluster Computing with Apache Spark",
      "Data Lakehouse Architectures & Lake Query Engines"
    ],
    ratingBreakdown: { 5: 64, 4: 26, 3: 8, 2: 2, 1: 0 },
    reviews: [
      {
        id: "rev-601",
        studentName: "Pooja Hegde",
        rollNo: "AI23B1051",
        batch: "Class of 2026",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "25 Aug 2024",
        verified: true,
        helpfulCount: 19,
        difficulty: "Challenging",
        instructorRating: 5,
        comment: "Setting up 8-node Spark clusters and building real-time Kafka streams was mind-blowing. Truly enterprise-grade data engineering content."
      }
    ]
  },
  {
    id: "ECE312",
    code: "ECE312",
    title: "IoT Systems & Smart Robotics",
    department: "ECE",
    departmentName: "Electronics & Communication",
    pathId: "path-iot-robotics",
    pathName: "Embedded Systems & Autonomous Robotics",
    pathMilestone: "Milestone 2 of 5 (Core Subject)",
    instructor: "Dr. Nandita Sen",
    instructorRole: "Embedded Robotics Chair",
    credits: 4,
    duration: "60 Hours",
    availableSeats: 22,
    totalSeats: 45,
    semester: "Semester 5",
    year: "3rd Year",
    fee: 3300,
    type: "Core",
    rating: 4.82,
    reviewCount: 88,
    difficulty: "Moderate",
    enrolledCount: 23,
    tags: ["Embedded C", "Raspberry Pi", "ROS", "Sensors"],
    schedule: "Tue, Fri (02:00 - 04:00 PM)",
    classroom: "Robotics Lab RL-1",
    color: "#059669",
    bannerGradient: "linear-gradient(135deg, #047857 0%, #10b981 100%)",
    icon: "cpu-chip",
    description: "Hands-on design of intelligent embedded hardware, edge sensor integration, MQTT telemetry protocols, actuator control, and Robot Operating System (ROS 2).",
    prerequisites: ["ECE201 (Microprocessors)"],
    syllabus: [
      "Embedded Microcontrollers & Sensor Interfacing",
      "Low-Power Wireless Protocols (Zigbee, BLE, LoRaWAN)",
      "Edge Computing & TinyML on Microcontrollers",
      "ROS 2 Framework & Kinematics",
      "Autonomous Navigation & Path Planning"
    ],
    ratingBreakdown: { 5: 70, 4: 22, 3: 6, 2: 1, 1: 1 },
    reviews: [
      {
        id: "rev-701",
        studentName: "Tanmay Deshmukh",
        rollNo: "ECE23B1012",
        batch: "Class of 2026",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "05 Sep 2024",
        verified: true,
        helpfulCount: 16,
        difficulty: "Moderate",
        instructorRating: 5,
        comment: "You get your own hardware kit with Raspberry Pi 4 and LiDAR sensors. Dr. Sen is always available in the robotics lab to troubleshoot circuit issues."
      }
    ]
  },
  {
    id: "CS314",
    code: "CS314",
    title: "Computer Networks & Protocols",
    department: "CSE",
    departmentName: "Computer Science & Eng",
    pathId: "path-cyber-security",
    pathName: "Cyber Defense & Applied Cryptography",
    pathMilestone: "Milestone 4 of 6 (Core Elective)",
    instructor: "Prof. Anand Joshi",
    instructorRole: "Associate Professor, CSE",
    credits: 3,
    duration: "45 Hours",
    availableSeats: 15,
    totalSeats: 60,
    semester: "Semester 5",
    year: "3rd Year",
    fee: 2900,
    type: "Core",
    rating: 4.75,
    reviewCount: 104,
    difficulty: "Moderate",
    enrolledCount: 45,
    tags: ["TCP/IP", "Routing", "HTTP/3", "Wireshark"],
    schedule: "Mon, Wed (09:00 - 10:00 AM)",
    classroom: "Net Lab N-105",
    color: "#4338ca",
    bannerGradient: "linear-gradient(135deg, #3730a3 0%, #6366f1 100%)",
    icon: "network",
    description: "In-depth exploration of the OSI/TCP-IP models, advanced routing protocols (BGP, OSPF), socket programming, modern HTTP/3 protocols, and traffic analysis.",
    prerequisites: ["CS101 (Intro to Computing)"],
    syllabus: [
      "Physical & Data Link Layers, Framing & Error Correction",
      "Network Layer: IP Addressing, CIDR, OSPF & BGP Routing",
      "Transport Layer: Congestion Control, TCP Reno & Cubic",
      "Application Protocols: DNS, TLS 1.3, HTTP/2 & HTTP/3",
      "Software Defined Networking (SDN) Fundamentals"
    ],
    ratingBreakdown: { 5: 66, 4: 25, 3: 7, 2: 1, 1: 1 },
    reviews: [
      {
        id: "rev-801",
        studentName: "Sneha Roy",
        rollNo: "CS23B1080",
        batch: "Class of 2026",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "11 Aug 2024",
        verified: true,
        helpfulCount: 21,
        difficulty: "Moderate",
        instructorRating: 5,
        comment: "Wireshark packet sniffing practicals were incredible. You actually see how DNS, TCP handshakes, and TLS encryption work over live network wires."
      }
    ]
  },
  {
    id: "IT316",
    code: "IT316",
    title: "Mobile Application Development",
    department: "IT",
    departmentName: "Information Technology",
    pathId: "path-cloud-devops",
    pathName: "Cloud Architecture & Full-Stack Systems",
    pathMilestone: "Milestone 4 of 6 (Elective Specialization)",
    instructor: "Prof. Meera Das",
    instructorRole: "Mobile Systems Specialist",
    credits: 3,
    duration: "45 Hours",
    availableSeats: 26,
    totalSeats: 50,
    semester: "Semester 5",
    year: "3rd Year",
    fee: 2900,
    type: "Elective",
    rating: 4.8,
    reviewCount: 92,
    difficulty: "Beginner-Friendly",
    enrolledCount: 24,
    tags: ["Flutter", "Kotlin", "SwiftUI", "Cross-Platform"],
    schedule: "Tue, Thu (11:00 AM - 12:30 PM)",
    classroom: "Mobile Studio M-10",
    color: "#ea580c",
    bannerGradient: "linear-gradient(135deg, #c2410c 0%, #f97316 100%)",
    icon: "smartphone",
    description: "Develop high-performance cross-platform iOS and Android applications with Flutter and native integrations, state architecture, and local storage.",
    prerequisites: ["CS101 (Object Oriented Programming)"],
    syllabus: [
      "Mobile UX & Human Interface Guidelines",
      "Cross-Platform Architecture & Widget Trees",
      "State Management (Provider, Bloc, Riverpod)",
      "Native Hardware Access (Camera, GPS, Biometrics)",
      "App Store & Google Play Publishing Pipelines"
    ],
    ratingBreakdown: { 5: 72, 4: 20, 3: 6, 2: 2, 1: 0 },
    reviews: [
      {
        id: "rev-901",
        studentName: "Varun Nair",
        rollNo: "IT23B1066",
        batch: "Class of 2026",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "02 Sep 2024",
        verified: true,
        helpfulCount: 14,
        difficulty: "Beginner-Friendly",
        instructorRating: 5,
        comment: "We built an actual published Flutter app within 8 weeks! Prof. Meera Das is so patient with beginners and teaches state management thoroughly."
      }
    ]
  }
];

// Initial registered courses for the logged in student
const INITIAL_REGISTERED_IDS = ["AIML301", "CS302", "CS306"];

// Initial payment ledger
const INITIAL_TRANSACTIONS = [
  {
    id: "TXN-2024-99120",
    date: "14 Aug 2024",
    time: "11:32 AM",
    description: "Semester 5 Tuition & Registration Fee (Part 1)",
    amount: 20000,
    paymentMethod: "HDFC Net Banking",
    status: "Paid",
    receiptNumber: "REC-2024-5501",
    payerName: "Alex Vance",
    academicYear: "2024-2025 (Odd Sem)",
    items: [
      { name: "Academic Tuition Fee (Partial)", amount: 16500 },
      { name: "Laboratory & Computer Lab Fee", amount: 3000 },
      { name: "Student Welfare & Insurance", amount: 500 }
    ]
  },
  {
    id: "TXN-2024-98450",
    date: "10 Feb 2024",
    time: "02:15 PM",
    description: "Semester 4 Final Examination & Library Dues",
    amount: 18500,
    paymentMethod: "UPI - GPay",
    status: "Paid",
    receiptNumber: "REC-2024-4412",
    payerName: "Alex Vance",
    academicYear: "2023-2024 (Even Sem)",
    items: [
      { name: "Semester 4 Complete Tuition Fee", amount: 15500 },
      { name: "Library & Examination Fee", amount: 3000 }
    ]
  },
  {
    id: "TXN-2024-97210",
    date: "05 Aug 2023",
    time: "04:45 PM",
    description: "Semester 3 Annual Institutional Fee",
    amount: 22000,
    paymentMethod: "Credit Card (ICICI)",
    status: "Paid",
    receiptNumber: "REC-2023-3398",
    payerName: "Alex Vance",
    academicYear: "2023-2024 (Odd Sem)",
    items: [
      { name: "Semester 3 Complete Tuition Fee", amount: 18000 },
      { name: "Development Fee", amount: 4000 }
    ]
  },
  {
    id: "TXN-2024-10022",
    date: "18 Sep 2024",
    time: "09:10 AM",
    description: "Semester 5 Elective Add-on & Lab Certification",
    amount: 4500,
    paymentMethod: "Pending Gateway",
    status: "Pending",
    receiptNumber: "REC-2024-PENDING",
    payerName: "Alex Vance",
    academicYear: "2024-2025 (Odd Sem)",
    items: [
      { name: "AIML301 Specialization Lab Fee", amount: 3500 },
      { name: "Online Resource Access License", amount: 1000 }
    ]
  }
];

// Initial notifications
const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Course Registration Deadline Approaching",
    message: "Semester 5 course add/drop period closes on Friday at 11:59 PM. Please verify your selected credit load.",
    category: "registration",
    icon: "clock",
    time: "25 minutes ago",
    timestamp: Date.now() - 25 * 60 * 1000,
    unread: true,
    actionLink: "registration"
  },
  {
    id: "notif-2",
    title: "Pending Fee Reminder: ₹4,500 Due",
    message: "Semester 5 Elective Add-on fee invoice is awaiting clearance before exam hall tickets are generated.",
    category: "payment",
    icon: "credit-card",
    time: "2 hours ago",
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    unread: true,
    actionLink: "payments"
  },
  {
    id: "notif-3",
    title: "New Student Review on AIML301",
    message: "Devin Zhao shared detailed feedback and lab project advice on AI & Machine Learning. View ratings.",
    category: "review",
    icon: "star",
    time: "4 hours ago",
    timestamp: Date.now() - 4 * 60 * 60 * 1000,
    unread: true,
    actionLink: "browse"
  },
  {
    id: "notif-4",
    title: "Learning Path Update: AI Track",
    message: "You have completed 55% of the Artificial Intelligence & Data Engineering specialization track!",
    category: "path",
    icon: "map",
    time: "Yesterday",
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    unread: false,
    actionLink: "paths"
  },
  {
    id: "notif-5",
    title: "Weekly Timetable Venue Updated",
    message: "Cyber Security & Cryptography (CS306) on Tuesday has relocated from Room 102 to SecLab S-301.",
    category: "timetable",
    icon: "calendar",
    time: "2 days ago",
    timestamp: Date.now() - 48 * 60 * 60 * 1000,
    unread: false,
    actionLink: "timetable"
  }
];

// Weekly Timetable mapping (Days x Time slots)
const TIMETABLE_DATA = [
  {
    day: "Monday",
    slots: [
      { time: "9:00 AM", course: "CS314", name: "Computer Networks", room: "Net Lab N-105", faculty: "Prof. Anand Joshi", color: "#4338ca", bg: "#e0e7ff" },
      { time: "10:00 AM", course: "AIML301", name: "AI & Machine Learning", room: "Lab AI-402", faculty: "Dr. Priya Sharma", color: "#6366f1", bg: "#ede9fe" },
      { time: "11:00 AM", course: "FREE", name: "Self-Study / Library", room: "Central Library", faculty: "-", color: "#64748b", bg: "#f1f5f9" },
      { time: "12:00 PM", course: "FREE", name: "Department Seminar", room: "Auditorium", faculty: "Guest Speaker", color: "#0891b2", bg: "#cffafe" },
      { time: "1:00 PM", course: "LUNCH", name: "Lunch & Recess", room: "Campus Food Court", faculty: "-", color: "#94a3b8", bg: "#f8fafc" },
      { time: "2:00 PM", course: "CS304", name: "Cloud Computing & DevOps", room: "CL-101", faculty: "Prof. Sarah Jenkins", color: "#0284c7", bg: "#e0f2fe" },
      { time: "3:00 PM", course: "CS304", name: "Cloud Computing (Lab)", room: "CL-101", faculty: "Prof. Sarah Jenkins", color: "#0284c7", bg: "#e0f2fe" },
      { time: "4:00 PM", course: "FREE", name: "Open Office Hours", room: "Faculty Wing B", faculty: "Mentors", color: "#64748b", bg: "#f1f5f9" }
    ]
  },
  {
    day: "Tuesday",
    slots: [
      { time: "9:00 AM", course: "CS306", name: "Cyber Security & Crypto", room: "SecLab S-301", faculty: "Dr. Vikram Malhotra", color: "#dc2626", bg: "#fee2e2" },
      { time: "10:00 AM", course: "CS302", name: "Data Structures & Algos", room: "Room CS-204", faculty: "Dr. Rajiv Kumar", color: "#2563eb", bg: "#dbeafe" },
      { time: "11:00 AM", course: "IT316", name: "Mobile App Development", room: "Studio M-10", faculty: "Prof. Meera Das", color: "#ea580c", bg: "#ffedd5" },
      { time: "12:00 PM", course: "FREE", name: "Mentor Counseling", room: "Faculty Wing A", faculty: "Dr. Arvind Subramanian", color: "#64748b", bg: "#f1f5f9" },
      { time: "1:00 PM", course: "LUNCH", name: "Lunch & Recess", room: "Campus Food Court", faculty: "-", color: "#94a3b8", bg: "#f8fafc" },
      { time: "2:00 PM", course: "ECE312", name: "IoT Systems & Robotics", room: "RL-1", faculty: "Dr. Nandita Sen", color: "#059669", bg: "#d1fae5" },
      { time: "3:00 PM", course: "ECE312", name: "Robotics Hardware Lab", room: "RL-1", faculty: "Dr. Nandita Sen", color: "#059669", bg: "#d1fae5" },
      { time: "4:00 PM", course: "FREE", name: "Sports & Club Activities", room: "Student Center", faculty: "-", color: "#64748b", bg: "#f1f5f9" }
    ]
  },
  {
    day: "Wednesday",
    slots: [
      { time: "9:00 AM", course: "CS314", name: "Computer Networks", room: "Net Lab N-105", faculty: "Prof. Anand Joshi", color: "#4338ca", bg: "#e0e7ff" },
      { time: "10:00 AM", course: "AIML301", name: "AI & Machine Learning", room: "Lab AI-402", faculty: "Dr. Priya Sharma", color: "#6366f1", bg: "#ede9fe" },
      { time: "11:00 AM", course: "IT308", name: "Full-Stack Web Eng", room: "WS-12", faculty: "Prof. Elena Rostova", color: "#7c3aed", bg: "#ede9fe" },
      { time: "12:00 PM", course: "IT308", name: "Full-Stack Project Lab", room: "WS-12", faculty: "Prof. Elena Rostova", color: "#7c3aed", bg: "#ede9fe" },
      { time: "1:00 PM", course: "LUNCH", name: "Lunch & Recess", room: "Campus Food Court", faculty: "-", color: "#94a3b8", bg: "#f8fafc" },
      { time: "2:00 PM", course: "CS304", name: "Cloud Computing & DevOps", room: "CL-101", faculty: "Prof. Sarah Jenkins", color: "#0284c7", bg: "#e0f2fe" },
      { time: "3:00 PM", course: "FREE", name: "Code Review & Git Lab", room: "Lab 3", faculty: "Teaching Assistants", color: "#64748b", bg: "#f1f5f9" },
      { time: "4:00 PM", course: "FREE", name: "Technical Society Meet", room: "Auditorium 2", faculty: "Student Chapter", color: "#64748b", bg: "#f1f5f9" }
    ]
  },
  {
    day: "Thursday",
    slots: [
      { time: "9:00 AM", course: "CS306", name: "Cyber Security & Crypto", room: "SecLab S-301", faculty: "Dr. Vikram Malhotra", color: "#dc2626", bg: "#fee2e2" },
      { time: "10:00 AM", course: "CS302", name: "Data Structures & Algos", room: "Room CS-204", faculty: "Dr. Rajiv Kumar", color: "#2563eb", bg: "#dbeafe" },
      { time: "11:00 AM", course: "IT316", name: "Mobile App Development", room: "Studio M-10", faculty: "Prof. Meera Das", color: "#ea580c", bg: "#ffedd5" },
      { time: "12:00 PM", course: "FREE", name: "Aptitude & Placement Prep", room: "Hall C", faculty: "Training Cell", color: "#4f46e5", bg: "#ede9fe" },
      { time: "1:00 PM", course: "LUNCH", name: "Lunch & Recess", room: "Campus Food Court", faculty: "-", color: "#94a3b8", bg: "#f8fafc" },
      { time: "2:00 PM", course: "FREE", name: "Research Paper Review", room: "Conference Room", faculty: "Dr. Priya Sharma", color: "#64748b", bg: "#f1f5f9" },
      { time: "3:00 PM", course: "AIML310", name: "Big Data & Dist Systems", room: "DH-2", faculty: "Dr. K. S. Raman", color: "#d97706", bg: "#fef3c7" },
      { time: "4:00 PM", course: "AIML310", name: "Spark Cluster Practical", room: "DH-2", faculty: "Dr. K. S. Raman", color: "#d97706", bg: "#fef3c7" }
    ]
  },
  {
    day: "Friday",
    slots: [
      { time: "9:00 AM", course: "FREE", name: "Faculty Consultation", room: "Cabin 304", faculty: "Dr. Rajiv Kumar", color: "#64748b", bg: "#f1f5f9" },
      { time: "10:00 AM", course: "AIML301", name: "AI & Machine Learning", room: "Lab AI-402", faculty: "Dr. Priya Sharma", color: "#6366f1", bg: "#ede9fe" },
      { time: "11:00 AM", course: "IT308", name: "Full-Stack Web Eng", room: "WS-12", faculty: "Prof. Elena Rostova", color: "#7c3aed", bg: "#ede9fe" },
      { time: "12:00 PM", course: "FREE", name: "Innovation & Startup Cell", room: "Incubation Ctr", faculty: "Mentors", color: "#0891b2", bg: "#cffafe" },
      { time: "1:00 PM", course: "LUNCH", name: "Lunch & Recess", room: "Campus Food Court", faculty: "-", color: "#94a3b8", bg: "#f8fafc" },
      { time: "2:00 PM", course: "ECE312", name: "IoT Systems & Robotics", room: "RL-1", faculty: "Dr. Nandita Sen", color: "#059669", bg: "#d1fae5" },
      { time: "3:00 PM", course: "ECE312", name: "Robotics Hardware Lab", room: "RL-1", faculty: "Dr. Nandita Sen", color: "#059669", bg: "#d1fae5" },
      { time: "4:00 PM", course: "FREE", name: "Weekly Evaluation / Quiz", room: "Online Portal", faculty: "CSE Exam Cell", color: "#4f46e5", bg: "#ede9fe" }
    ]
  },
  {
    day: "Saturday",
    slots: [
      { time: "9:00 AM", course: "FREE", name: "Hackathon & Project Lab", room: "Open Innovation Hub", faculty: "TA Team", color: "#64748b", bg: "#f1f5f9" },
      { time: "10:00 AM", course: "CS302", name: "Data Structures & Algos", room: "Room CS-204", faculty: "Dr. Rajiv Kumar", color: "#2563eb", bg: "#dbeafe" },
      { time: "11:00 AM", course: "FREE", name: "Industry Guest Lecture", room: "Main Auditorium", faculty: "Industry Leader", color: "#4f46e5", bg: "#ede9fe" },
      { time: "12:00 PM", course: "FREE", name: "Open Source Club", room: "Lab 1", faculty: "Peer Mentors", color: "#64748b", bg: "#f1f5f9" },
      { time: "1:00 PM", course: "LUNCH", name: "Weekend Break Begins", room: "-", faculty: "-", color: "#94a3b8", bg: "#f8fafc" },
      { time: "2:00 PM", course: "FREE", name: "Optional Lab Access", room: "Labs Open", faculty: "Lab In-charge", color: "#64748b", bg: "#f1f5f9" },
      { time: "3:00 PM", course: "FREE", name: "Library Reading Hours", room: "Central Library", faculty: "-", color: "#64748b", bg: "#f1f5f9" },
      { time: "4:00 PM", course: "FREE", name: "Campus Sports", room: "Stadium", faculty: "-", color: "#64748b", bg: "#f1f5f9" }
    ]
  }
];

// =========================================================================
// ACADEMIC MOCK TESTS DATA CATALOG
// =========================================================================
const INITIAL_MOCK_TESTS = {
  AIML301: {
    courseId: "AIML301",
    courseCode: "AIML301",
    title: "AI & Machine Learning Comprehensive Assessment",
    durationMinutes: 10,
    passingPercentage: 70,
    totalPoints: 100,
    description: "Evaluates mathematical foundations of machine learning, backpropagation dynamics, deep neural networks with PyTorch, and Transformer self-attention.",
    questions: [
      {
        id: "aiml-q1",
        topic: "Neural Network Optimization",
        question: "In deep neural networks, what critical problem does Batch Normalization primarily mitigate during gradient descent?",
        options: [
          "It eliminates the need for computing activation functions entirely.",
          "It reduces internal covariate shift by normalizing layer inputs across the mini-batch.",
          "It converts all non-convex optimization landscapes into strictly linear functions.",
          "It compresses the model weights to reduce disk storage footprint."
        ],
        correctIndex: 1,
        explanation: "Batch Normalization stabilizes and accelerates deep network training by standardizing layer inputs to have zero mean and unit variance per mini-batch, significantly reducing internal covariate shift and allowing higher learning rates."
      },
      {
        id: "aiml-q2",
        topic: "PyTorch Framework Internals",
        question: "In PyTorch model training loops, why is optimizer.zero_grad() called before executing loss.backward()?",
        options: [
          "To reset model parameter weights to small random Gaussian numbers.",
          "To prevent gradient accumulation across successive training mini-batches.",
          "To allocate GPU VRAM memory for tensor calculations.",
          "To clamp loss gradients between -1.0 and 1.0 to prevent exploding gradients."
        ],
        correctIndex: 1,
        explanation: "In PyTorch, gradients accumulate in .grad buffers whenever loss.backward() is called. Calling optimizer.zero_grad() clears out old gradients from prior iterations so gradients aren't incorrectly added together."
      },
      {
        id: "aiml-q3",
        topic: "Loss Functions & Classification",
        question: "Which loss function is mathematically appropriate when training a multiclass neural network classifier with a Softmax output layer?",
        options: [
          "Mean Squared Error (MSE Loss)",
          "Categorical Cross-Entropy (Negative Log-Likelihood)",
          "Hinge Loss (Maximum Margin Loss)",
          "Huber / Smooth L1 Loss"
        ],
        correctIndex: 1,
        explanation: "Categorical Cross-Entropy measures the dissimilarity between the predicted probability distribution (via Softmax) and the true one-hot ground truth distribution, penalizing confident incorrect predictions exponentially."
      },
      {
        id: "aiml-q4",
        topic: "Transformer Architectures",
        question: "In standard Transformer multi-head self-attention, what is the computational time and memory complexity with respect to the input sequence length N?",
        options: [
          "O(log N) logarithmic scaling",
          "O(N) strictly linear scaling",
          "O(N²) quadratic scaling",
          "O(2^N) exponential scaling"
        ],
        correctIndex: 2,
        explanation: "Standard scaled dot-product attention computes Q × K^T of shape (N × N), calculating an attention weight score for every token pair in the sequence, which scales quadratically O(N²) in both memory and computation."
      },
      {
        id: "aiml-q5",
        topic: "Regularization Techniques",
        question: "Which regularization technique randomly drops activations with probability p during forward passes to prevent co-adaptation of features?",
        options: [
          "L1 / Lasso Regularization",
          "Dropout",
          "Early Stopping",
          "Gradient Clipping"
        ],
        correctIndex: 1,
        explanation: "Dropout randomly sets hidden neuron activations to zero with probability p during training, forcing neurons to learn robust independent features rather than relying on other specific neurons."
      }
    ]
  },
  CS302: {
    courseId: "CS302",
    courseCode: "CS302",
    title: "Cloud Computing & DevOps Certification Exam",
    durationMinutes: 10,
    passingPercentage: 70,
    totalPoints: 100,
    description: "Validates distributed cloud architectures, Kubernetes pod orchestration, Docker containers, infrastructure as code with Terraform, and CI/CD pipelines.",
    questions: [
      {
        id: "cs302-q1",
        topic: "Kubernetes Orchestration",
        question: "What is the primary role of a Kubernetes Ingress resource and controller?",
        options: [
          "To automatically rebuild failing Docker containers on physical cluster nodes.",
          "To manage external HTTP/HTTPS routing into cluster Services with SSL termination and path rules.",
          "To provision physical network cables between AWS EC2 instances.",
          "To format raw disk drives for Kubernetes Persistent Volume Claims."
        ],
        correctIndex: 1,
        explanation: "Kubernetes Ingress exposes HTTP and HTTPS routes from outside the cluster to internal Services. It provides load balancing, SSL/TLS termination, and name-based virtual hosting."
      },
      {
        id: "cs302-q2",
        topic: "Infrastructure as Code (IaC)",
        question: "In HashiCorp Terraform workflow, what is the exact purpose of running 'terraform plan'?",
        options: [
          "It destroys and recreates all active cloud infrastructure immediately.",
          "It creates an execution plan comparing the state file against real cloud resources and configuration.",
          "It compiles Go code into a native Docker container binary.",
          "It encrypts AWS secret credentials into a local .env configuration file."
        ],
        correctIndex: 1,
        explanation: "terraform plan determines what actions are necessary to achieve the desired state specified in the configuration files, creating a speculative preview without modifying cloud resources."
      },
      {
        id: "cs302-q3",
        topic: "Containerization",
        question: "What fundamentally distinguishes a Docker container from a traditional Virtual Machine (VM)?",
        options: [
          "Containers run their own complete hypervisor and guest operating system kernel.",
          "Containers share the host OS kernel and isolate user space using Linux cgroups and namespaces.",
          "Containers cannot run any networking protocols or expose TCP ports.",
          "Containers require dedicated physical hardware servers with no shared RAM."
        ],
        correctIndex: 1,
        explanation: "Containers share the host operating system's kernel and utilize Linux kernel primitives (namespaces for isolation, cgroups for resource constraints), making them vastly lighter and faster to start than full VMs."
      },
      {
        id: "cs302-q4",
        topic: "CI/CD & Deployment Strategies",
        question: "Which deployment strategy directs a small percentage (e.g. 5%) of live production traffic to a new release before rolling it out to 100% of users?",
        options: [
          "Blue/Green Deployment",
          "Canary Deployment",
          "Recreate Deployment",
          "Shadow Deployment"
        ],
        correctIndex: 1,
        explanation: "A Canary deployment rolls out software to a small subset of servers or users to test the release in production under live traffic before full-scale deployment."
      },
      {
        id: "cs302-q5",
        topic: "Serverless Architecture",
        question: "Which characteristic best defines Function-as-a-Service (FaaS) such as AWS Lambda or Google Cloud Functions?",
        options: [
          "Dedicated 24/7 provisioned virtual servers with manual OS patching.",
          "Event-driven ephemeral execution with zero idle compute cost and automated scaling.",
          "Hard drive partition management using custom RAID disk arrays.",
          "Manual port forwarding on edge hardware routers."
        ],
        correctIndex: 1,
        explanation: "FaaS executes code in response to events, automatically managing computing resources, scaling from zero to thousands of instances, and billing strictly for actual milliseconds of execution time."
      }
    ]
  },
  CS304: {
    courseId: "CS304",
    courseCode: "CS304",
    title: "Cryptography & Cyber Security Examination",
    durationMinutes: 10,
    passingPercentage: 70,
    totalPoints: 100,
    description: "Evaluates cryptographic primitives, asymmetric key exchange, public key infrastructure, TLS 1.3, SQL injection prevention, and Zero Trust security.",
    questions: [
      {
        id: "cs304-q1",
        topic: "Asymmetric Cryptography",
        question: "On which mathematical trapdoor one-way function is the classical RSA cryptosystem founded?",
        options: [
          "Discrete logarithm problem over elliptic curves.",
          "The computational hardness of factoring the product of two large prime numbers.",
          "Computing shortest vector problems in lattice structures.",
          "Reversible bitwise XOR permutation matrices."
        ],
        correctIndex: 1,
        explanation: "RSA derives its security from the difficulty of factoring the product of two large prime numbers (n = p × q), while multiplication is trivial to compute in the forward direction."
      },
      {
        id: "cs304-q2",
        topic: "Key Exchange Protocols",
        question: "What is the primary capability provided by the Diffie-Hellman Key Exchange protocol?",
        options: [
          "Encrypting digital files using symmetric passwords.",
          "Allowing two parties to establish a shared secret key over an insecure communication channel without prior secrets.",
          "Hashing passwords into irreversible SHA-256 digests.",
          "Detecting packet loss on wireless Wi-Fi routers."
        ],
        correctIndex: 1,
        explanation: "Diffie-Hellman allows two communicating parties to collaboratively generate a shared secret key over an eavesdropped channel without ever transmitting the key itself across the wire."
      },
      {
        id: "cs304-q3",
        topic: "Application Security & OWASP",
        question: "Which programming practice provides complete immunity against SQL Injection attacks in web applications?",
        options: [
          "Filtering out single quotation marks with regex replacements.",
          "Using Parameterized Queries (Prepared Statements) with bound parameters.",
          "Encoding all user inputs with Base64 before storing.",
          "Running database queries exclusively through GET requests."
        ],
        correctIndex: 1,
        explanation: "Parameterized queries separate SQL code structure from user-supplied data, ensuring the database engine treats parameter inputs strictly as literal values rather than executable SQL syntax."
      },
      {
        id: "cs304-q4",
        topic: "Transport Layer Security",
        question: "In TLS 1.3, what is the default handshake latency required for session resumption using 0-RTT Pre-Shared Keys?",
        options: [
          "0 Round Trip Times (client sends encrypted application data in first flight)",
          "3 Round Trip Times for handshake validation",
          "5 Round Trip Times including certificate authorities",
          "Continuous polling with no established connection"
        ],
        correctIndex: 0,
        explanation: "TLS 1.3 introduced 0-RTT (zero round-trip time) data resumption, enabling clients to transmit encrypted HTTP application payload alongside their first ClientHello message based on pre-shared keys."
      },
      {
        id: "cs304-q5",
        topic: "Zero Trust Architecture",
        question: "Which core operational mantra encapsulates the Zero Trust security philosophy?",
        options: [
          "Trust any connection that originates from within the corporate perimeter firewall.",
          "Never trust, always verify every access request regardless of location or network.",
          "Trust all authenticated users indefinitely until password expiration.",
          "Rely entirely on anti-virus scanning on end-user laptops."
        ],
        correctIndex: 1,
        explanation: "Zero Trust treats every request as though it originated from an open untrusted network, enforcing continuous authentication, least-privilege access, and cryptographic session verification."
      }
    ]
  },
  CS306: {
    courseId: "CS306",
    courseCode: "CS306",
    title: "Full Stack Web Engineering Evaluation",
    durationMinutes: 10,
    passingPercentage: 70,
    totalPoints: 100,
    description: "Assesses modern web technologies, React Virtual DOM, Node.js event loop, CSS Grid layout systems, WebSockets bidirectional communication, and RESTful APIs.",
    questions: [
      {
        id: "cs306-q1",
        topic: "React Architecture",
        question: "How does React's Virtual DOM and Reconciliation algorithm optimize web application performance?",
        options: [
          "By bypassing browser CSS rendering rules completely.",
          "By diffing lightweight in-memory DOM representations and batching minimal patches to the real DOM.",
          "By compiling JavaScript directly into WebAssembly x86 machine code.",
          "By preventing any re-renders regardless of state changes."
        ],
        correctIndex: 1,
        explanation: "Manipulating the real browser DOM is computationally expensive. React computes differences (diffing) in a lightweight Virtual DOM tree in memory and applies only the necessary batch changes to the real DOM."
      },
      {
        id: "cs306-q2",
        topic: "Node.js Concurrency",
        question: "How does the single-threaded Node.js runtime process thousands of concurrent network requests without blocking?",
        options: [
          "By spawning a new operating system thread for every incoming HTTP socket.",
          "Via the non-blocking event loop and libuv thread pool for asynchronous background I/O.",
          "By discarding requests that take longer than 5 milliseconds.",
          "By executing JavaScript code in parallel on all CPU cores simultaneously."
        ],
        correctIndex: 1,
        explanation: "Node.js utilizes a single-threaded event loop paired with libuv, delegating blocking filesystem, DNS, and network tasks to system kernel primitives or worker threads and processing callbacks non-blockingly."
      },
      {
        id: "cs306-q3",
        topic: "CSS Modern Layouts",
        question: "What makes CSS Grid Layout fundamentally different from CSS Flexbox?",
        options: [
          "Flexbox is two-dimensional while Grid is one-dimensional.",
          "CSS Grid is a two-dimensional layout system (rows and columns simultaneously), whereas Flexbox is one-dimensional.",
          "CSS Grid only works on text paragraphs and headers.",
          "Flexbox cannot be used on mobile screens."
        ],
        correctIndex: 1,
        explanation: "CSS Grid is designed for two-dimensional grid layouts aligning items across both rows and columns simultaneously, while Flexbox is specialized for one-dimensional layouts along either a row or a column."
      },
      {
        id: "cs306-q4",
        topic: "Real-time Web Communication",
        question: "What is the primary architectural benefit of WebSockets over standard HTTP polling?",
        options: [
          "WebSockets encrypt data without SSL certificates.",
          "WebSockets provide full-duplex, persistent TCP connections with minimal frame overhead for bi-directional data flow.",
          "WebSockets store data automatically in local IndexedDB.",
          "WebSockets eliminate the need for server backend code."
        ],
        correctIndex: 1,
        explanation: "Unlike HTTP polling which repeatedly opens and closes connections with large HTTP headers, WebSockets establish a single persistent bidirectional channel with 2-to-10 bytes of framing overhead per message."
      },
      {
        id: "cs306-q5",
        topic: "RESTful API Standards",
        question: "Which HTTP method is defined as idempotent and intended for complete replacement of a target resource?",
        options: [
          "POST",
          "PUT",
          "PATCH",
          "CONNECT"
        ],
        correctIndex: 1,
        explanation: "PUT is defined by RFC specifications as idempotent (calling it multiple times with the same payload results in the exact same resource state) and replaces the entire target resource."
      }
    ]
  },
  IT308: {
    courseId: "IT308",
    courseCode: "IT308",
    title: "Big Data Analytics & Distributed Systems Assessment",
    durationMinutes: 10,
    passingPercentage: 70,
    totalPoints: 100,
    description: "Evaluates distributed computing fundamentals, Apache Spark in-memory analytics, Hadoop MapReduce, CAP theorem, and streaming pipelines.",
    questions: [
      {
        id: "it308-q1",
        topic: "Apache Spark Internals",
        question: "What is a Resilient Distributed Dataset (RDD) in Apache Spark?",
        options: [
          "A relational database table stored on a single solid-state drive.",
          "An immutable, partitioned collection of records that can be operated on in parallel across a cluster with lineage fault tolerance.",
          "A hardware circuit board used inside GPU mining rigs.",
          "An encrypted file format used solely for audio streaming."
        ],
        correctIndex: 1,
        explanation: "An RDD is Spark's fundamental abstraction: an immutable distributed collection of elements divided into partitions, resilient because it tracks operation lineages to recompute lost data automatically on node failure."
      },
      {
        id: "it308-q2",
        topic: "Distributed Systems Theory",
        question: "According to Eric Brewer's CAP Theorem, what can a distributed data store guarantee in the event of a network partition (P)?",
        options: [
          "Both full Consistency (C) and 100% Availability (A).",
          "Either Consistency (CP) or Availability (AP), but cannot guarantee both simultaneously.",
          "Neither Consistency nor Availability under any circumstances.",
          "Infinite throughput and zero query latency."
        ],
        correctIndex: 1,
        explanation: "When network communication between cluster partitions fails (P), the system must choose between returning an error/stale data (preserving consistency CP) or continuing to answer writes with possible divergence (preserving availability AP)."
      },
      {
        id: "it308-q3",
        topic: "MapReduce Framework",
        question: "In Hadoop MapReduce, what happens during the 'Shuffle and Sort' phase?",
        options: [
          "Physical cluster computers are rebooted in randomized order.",
          "The intermediate key-value outputs from Map tasks are sorted and grouped by key before reaching Reducers.",
          "All output files are compressed into .zip archives.",
          "Unused RAM memory is wiped to zero."
        ],
        correctIndex: 1,
        explanation: "Shuffle and Sort routes values from mappers to the appropriate reducer based on key hashes, ensuring all values associated with the exact same key arrive together at a single reducer sorted by key."
      },
      {
        id: "it308-q4",
        topic: "Message Streaming",
        question: "What architectural role does Apache Kafka excel at in enterprise big data pipelines?",
        options: [
          "Relational OLTP transaction processing with nested foreign keys.",
          "Distributed, highly partitioned, replayable append-only commit log for high-throughput event streaming.",
          "Generating vector graphics for frontend UI charts.",
          "Hosting PHP web applications on Apache web servers."
        ],
        correctIndex: 1,
        explanation: "Kafka provides an immutable distributed publish-subscribe log structured as partitioned topics, enabling decoupling of real-time data producers and consumers with millisecond latency and horizontal scale."
      },
      {
        id: "it308-q5",
        topic: "NoSQL Database Models",
        question: "Which NoSQL database model is optimal for social networks and knowledge graphs with complex multi-hop relationships?",
        options: [
          "Key-Value stores (e.g. Redis)",
          "Graph databases (e.g. Neo4j)",
          "Column-Family stores (e.g. Cassandra)",
          "Document stores (e.g. MongoDB)"
        ],
        correctIndex: 1,
        explanation: "Graph databases treat relationships as first-class citizens with direct pointer hops (index-free adjacency), making complex relationship queries orders of magnitude faster than relational JOINs or key-value lookups."
      }
    ]
  },
  AIML310: {
    courseId: "AIML310",
    courseCode: "AIML310",
    title: "Deep Learning & Computer Vision Certification",
    durationMinutes: 10,
    passingPercentage: 70,
    totalPoints: 100,
    description: "Tests knowledge of modern vision architectures, ResNet skip connections, YOLO real-time object detection, convolutions, and image augmentation.",
    questions: [
      {
        id: "aiml310-q1",
        topic: "ResNet Residual Learning",
        question: "What architectural innovation allowed ResNet (Residual Networks) to train networks exceeding 100+ layers?",
        options: [
          "Replacing floating-point matrices with binary logic gates.",
          "Shortcut / residual skip connections that perform identity mapping F(x) + x, bypassing vanishing gradients.",
          "Removing all activation functions from convolution filters.",
          "Using exclusively CPU processing instead of GPUs."
        ],
        correctIndex: 1,
        explanation: "ResNet introduced residual skip connections that add the original input x directly to the output of convolutional blocks F(x), allowing gradients to flow uninterrupted through the identity shortcut during backpropagation."
      },
      {
        id: "aiml310-q2",
        topic: "Object Detection",
        question: "What is the core paradigm of the YOLO (You Only Look Once) object detection architecture?",
        options: [
          "Scanning an image with thousands of slow region proposal crops via sliding windows.",
          "Framing object detection as a single regression problem predicting bounding boxes and class probabilities in a single forward pass.",
          "Converting color images to grayscale text files.",
          "Relying on manual human bounding box annotations at inference time."
        ],
        correctIndex: 1,
        explanation: "YOLO divides an image into a grid and directly predicts bounding box coordinates and class probabilities across the entire image simultaneously in one single forward pass, enabling real-time FPS."
      },
      {
        id: "aiml310-q3",
        topic: "Convolutional Operations",
        question: "What mathematical operation does a 2D convolution layer perform between an input image and a learned kernel filter?",
        options: [
          "Matrix determinant inversion.",
          "Element-wise multiplication followed by summation across receptive fields (cross-correlation).",
          "Random number generation between 0 and 255.",
          "Fourier audio frequency transformations."
        ],
        correctIndex: 1,
        explanation: "A 2D convolution slides a small learned filter across input feature maps, calculating element-wise products between the filter weights and the overlapping pixels, summing them into a single scalar value per location."
      },
      {
        id: "aiml310-q4",
        topic: "Evaluation Metrics",
        question: "Which metric evaluates the spatial overlap between a predicted object bounding box and the ground-truth box?",
        options: [
          "Intersection over Union (IoU)",
          "Mean Squared Error (MSE)",
          "Cosine Similarity",
          "Word Error Rate (WER)"
        ],
        correctIndex: 0,
        explanation: "Intersection over Union (IoU) divides the area of overlap between the predicted and ground-truth bounding boxes by the total area of their combined union, with values from 0.0 to 1.0."
      },
      {
        id: "aiml310-q5",
        topic: "Downsampling & Invariance",
        question: "Why have MaxPooling layers been traditionally placed between convolutional blocks in CNN architectures?",
        options: [
          "To increase image resolution for print posters.",
          "To reduce spatial feature dimensions, decrease computational load, and provide translational invariance.",
          "To encrypt feature weights against cyber attacks.",
          "To invert pixel color contrast from white to black."
        ],
        correctIndex: 1,
        explanation: "MaxPooling downsamples spatial dimensions (height and width), retaining only the strongest feature response in each window, which cuts down computation, controls overfitting, and grants translation tolerance."
      }
    ]
  },
  ECE312: {
    courseId: "ECE312",
    courseCode: "ECE312",
    title: "Embedded Systems & IoT Architectures Exam",
    durationMinutes: 10,
    passingPercentage: 70,
    totalPoints: 100,
    description: "Evaluates microcontroller architectures, serial protocols (I2C/SPI), RTOS priority inversion mechanisms, MQTT IoT protocols, and hardware timers.",
    questions: [
      {
        id: "ece312-q1",
        topic: "Hardware Serial Protocols",
        question: "What is a key difference between I2C and SPI serial bus protocols in embedded systems?",
        options: [
          "I2C requires 4 wires while SPI requires only 1 wire.",
          "I2C uses 2 open-drain wires (SDA/SCL) with device addressing; SPI uses 4 wires (MOSI, MISO, SCK, CS) with dedicated chip-select lines.",
          "SPI is half-duplex and limited to 100 kHz, while I2C is full-duplex at 50 MHz.",
          "Neither I2C nor SPI can connect to sensors or microcontrollers."
        ],
        correctIndex: 1,
        explanation: "I2C uses two bidirectional open-drain lines (SDA and SCL) with pull-up resistors and 7-bit addressing, while SPI uses 4 separate push-pull lines for full-duplex transmission and hardware chip selects."
      },
      {
        id: "ece312-q2",
        topic: "Real-Time Operating Systems (RTOS)",
        question: "In preemptive RTOS scheduling, what protocol solves the dangerous 'Priority Inversion' problem?",
        options: [
          "Round-Robin time slicing without priorities.",
          "Priority Inheritance Protocol (temporarily boosting the priority of the lower task holding a shared resource).",
          "Disabling all interrupts permanently on startup.",
          "Doubling microcontroller clock frequency."
        ],
        correctIndex: 1,
        explanation: "Under Priority Inheritance, when a high-priority task is blocked waiting for a mutex held by a low-priority task, the low-priority task temporarily inherits the high priority so medium tasks cannot preempt it."
      },
      {
        id: "ece312-q3",
        topic: "IoT Communication Protocols",
        question: "Why is MQTT widely preferred over HTTP for battery-powered IoT edge sensors?",
        options: [
          "MQTT requires 100 Mbps broadband optical fiber connections.",
          "MQTT is a lightweight publish/subscribe protocol with small packet headers (as small as 2 bytes) and low power consumption.",
          "MQTT only transmits video files at 4K resolution.",
          "MQTT replaces all physical battery hardware with software code."
        ],
        correctIndex: 1,
        explanation: "MQTT has a minimal protocol footprint (2-byte fixed header), binary payload support, persistent session states, and QoS levels, making it ideal for constrained devices on high-latency wireless networks."
      },
      {
        id: "ece312-q4",
        topic: "System Reliability",
        question: "What is the primary function of a Watchdog Timer (WDT) in embedded microcontrollers?",
        options: [
          "To count battery discharge percentage in hours.",
          "To reset the microcontroller to a safe state if software crashes or hangs in an infinite loop.",
          "To synchronize the embedded clock with international atomic time via GPS.",
          "To cool down the silicon CPU chip with software cooling."
        ],
        correctIndex: 1,
        explanation: "A Watchdog Timer is a hardware countdown counter that must be periodically refreshed ('kicked') by healthy running code. If code hangs or deadlocks, the timer expires and forces an automatic hardware reset."
      },
      {
        id: "ece312-q5",
        topic: "Interrupt Controllers",
        question: "In ARM Cortex-M processors, what is the role of the Nested Vectored Interrupt Controller (NVIC)?",
        options: [
          "To manage audio volume outputs on DAC pins.",
          "To provide low-latency hardware interrupt handling with configurable priority levels and automatic tail-chaining.",
          "To render 3D game polygons on external monitors.",
          "To convert AC wall electricity to DC power."
        ],
        correctIndex: 1,
        explanation: "The NVIC is integrated directly into the ARM Cortex-M CPU core, delivering ultra-low-latency interrupt processing, preemption priorities, and tail-chaining to process consecutive interrupts without extra stack pop/push cycles."
      }
    ]
  },
  CS314: {
    courseId: "CS314",
    courseCode: "CS314",
    title: "Database Internals & Distributed Storage Exam",
    durationMinutes: 10,
    passingPercentage: 70,
    totalPoints: 100,
    description: "Assesses storage engine internals, B+ Tree indexing, Write-Ahead Logging (WAL), ACID transaction isolation, and Raft consensus protocols.",
    questions: [
      {
        id: "cs314-q1",
        topic: "Storage Structures",
        question: "Why do production relational database engines (PostgreSQL, MySQL InnoDB) use B+ Trees instead of standard Binary Search Trees?",
        options: [
          "B+ Trees have fewer nodes than binary trees for small arrays.",
          "B+ Trees have high fan-out to minimize expensive disk I/O operations and store all data records in leaf nodes linked for fast sequential scans.",
          "Binary search trees are incompatible with 64-bit operating systems.",
          "B+ Trees automatically translate SQL queries into JavaScript code."
        ],
        correctIndex: 1,
        explanation: "Because disk/SSD block reads are slow, B+ Trees use large node block sizes (4KB-16KB) with hundreds of keys per node, keeping tree depth low (3-4 levels for billions of rows) and linking leaves for linear range scans."
      },
      {
        id: "cs314-q2",
        topic: "Durability & Recovery",
        question: "What is the primary purpose of Write-Ahead Logging (WAL) in database storage engines?",
        options: [
          "To print user activity logs into human-readable text files for auditing.",
          "To append transaction modification records sequentially to durable storage before dirty pages are flushed to table data files.",
          "To slow down write operations to prevent server overheating.",
          "To eliminate the need for backup snapshots."
        ],
        correctIndex: 1,
        explanation: "WAL guarantees Atomicity and Durability (ACID) by logging change records to disk sequentially prior to updating random database pages in memory, allowing instant recovery from sudden crashes by replaying the log."
      },
      {
        id: "cs314-q3",
        topic: "ACID Isolation",
        question: "Which concurrency anomaly is prevented by the 'Repeatable Read' isolation level, which is allowed under 'Read Committed'?",
        options: [
          "Dirty Writes",
          "Non-Repeatable (Fuzzy) Reads (where reading the same row twice in one transaction yields different values)",
          "Disk drive physical sector corruption",
          "Deadlock detection timeouts"
        ],
        correctIndex: 1,
        explanation: "Under Read Committed, another committed transaction can modify a row between two reads. Repeatable Read guarantees that any row read by a transaction remains identical for that transaction's duration."
      },
      {
        id: "cs314-q4",
        topic: "Distributed Consensus",
        question: "In the Raft distributed consensus algorithm, how many functioning nodes are required to form a majority quorum in a 5-node cluster?",
        options: [
          "At least 2 nodes",
          "At least 3 nodes",
          "At least 4 nodes",
          "All 5 nodes must be online"
        ],
        correctIndex: 1,
        explanation: "Raft requires a strict majority quorum: ⌊N/2⌋ + 1. For a 5-node cluster, the quorum is ⌊5/2⌋ + 1 = 3 nodes, allowing the cluster to survive failures of up to 2 nodes without data inconsistency."
      },
      {
        id: "cs314-q5",
        topic: "Query Optimization",
        question: "In database query execution plans, what is the key difference between an Index Seek and an Index Scan?",
        options: [
          "An Index Scan traverses the whole index structure, while an Index Seek navigates directly to matching keys via B-Tree traversal.",
          "An Index Seek scans the entire disk surface byte by byte.",
          "Index Seeks are only allowed on non-numeric string columns.",
          "There is no difference; they are synonymous SQL terms."
        ],
        correctIndex: 0,
        explanation: "An Index Seek leverages the B-Tree search structure to jump directly to specific qualifying records based on equality or range filters, whereas an Index Scan reads through all leaf nodes of the index sequentially."
      }
    ]
  },
  IT316: {
    courseId: "IT316",
    courseCode: "IT316",
    title: "Quantum Computing Foundations Assessment",
    durationMinutes: 10,
    passingPercentage: 70,
    totalPoints: 100,
    description: "Evaluates qubit mathematics, superposition, entanglement, Bloch sphere representations, quantum logic gates, and Shor's algorithm.",
    questions: [
      {
        id: "it316-q1",
        topic: "Qubit Superposition",
        question: "What fundamental property differentiates a quantum bit (qubit) from a classical digital bit?",
        options: [
          "A qubit can only ever hold the value zero.",
          "A qubit can exist in a linear superposition |ψ⟩ = α|0⟩ + β|1⟩ where |α|² + |β|² = 1 until measurement.",
          "A qubit requires mechanical gears to rotate physically.",
          "A qubit transmits classical Morse code over radio towers."
        ],
        correctIndex: 1,
        explanation: "While a classical bit must be either 0 or 1, a qubit can be in a coherent superposition of both computational basis states |0⟩ and |1⟩ with complex probability amplitudes α and β satisfying |α|² + |β|² = 1."
      },
      {
        id: "it316-q2",
        topic: "Bloch Sphere",
        question: "On the geometric Bloch sphere representation of a two-level qubit, what do the north and south poles represent?",
        options: [
          "Magnetic north and south poles of planet Earth.",
          "The pure basis states |0⟩ (north pole) and |1⟩ (south pole).",
          "Maximum error states and system crashes.",
          "Positive and negative voltage battery terminals."
        ],
        correctIndex: 1,
        explanation: "The Bloch sphere is a geometrical representation of the pure state space of a qubit. The north pole represents |0⟩, the south pole represents |1⟩, and points on the equator represent equal superpositions."
      },
      {
        id: "it316-q3",
        topic: "Quantum Logic Gates",
        question: "Which single-qubit quantum gate creates an equal superposition (|0⟩ + |1⟩)/√2 when applied to state |0⟩?",
        options: [
          "Pauli-X Gate (NOT Gate)",
          "Hadamard Gate (H Gate)",
          "Phase Shift Gate (S Gate)",
          "CNOT Gate"
        ],
        correctIndex: 1,
        explanation: "The Hadamard (H) gate performs a 90-degree rotation mapping basis states into equal superpositions: H|0⟩ = (|0⟩ + |1⟩)/√2 and H|1⟩ = (|0⟩ - |1⟩)/√2."
      },
      {
        id: "it316-q4",
        topic: "Quantum Algorithms",
        question: "What makes Shor's Algorithm celebrated in quantum computational complexity?",
        options: [
          "It plays chess faster than supercomputers.",
          "It solves integer prime factorization in polynomial time O((log N)³), theoretically breaking RSA asymmetric encryption.",
          "It compresses video files into zero kilobytes.",
          "It eliminates the need for software compilers."
        ],
        correctIndex: 1,
        explanation: "Peter Shor's 1994 algorithm finds prime factors of integers exponentially faster than the best known classical algorithms by using the Quantum Fourier Transform to find the period of modular exponentiation."
      },
      {
        id: "it316-q5",
        topic: "Quantum Decoherence",
        question: "What is quantum decoherence, and why is it a monumental engineering challenge in quantum computers?",
        options: [
          "Qubits losing their quantum coherence and superposition due to unwanted environmental interaction (thermal noise, EM radiation).",
          "Software code running out of disk space on Windows laptops.",
          "Silicon chips melting due to high electrical current.",
          "Computer cables becoming unplugged from servers."
        ],
        correctIndex: 0,
        explanation: "Decoherence is the decay of quantum superposition into classical statistical mixtures caused by interactions with the surrounding physical environment, destroying quantum information before computations complete."
      }
    ]
  }
};

// Seed verified completed courses and earned academic certificates
const INITIAL_COMPLETED_COURSES = [
  {
    courseId: "CS201",
    courseCode: "CS201",
    title: "Advanced Data Structures & Algorithms",
    department: "CSE",
    credits: 4,
    grade: "A+",
    score: 96,
    completedDate: "18 May 2024",
    certificateId: "CHU-CERT-2024-CS201-8842",
    instructor: "Dr. Arvind Subramanian",
    instructorRole: "Chair, Computer Science Dept"
  }
];

const INITIAL_CERTIFICATES = [
  {
    id: "CHU-CERT-2024-CS201-8842",
    courseId: "CS201",
    courseCode: "CS201",
    courseTitle: "Advanced Data Structures & Algorithms",
    department: "Computer Science & Engineering",
    credits: 4,
    studentName: "Alex Vance",
    rollNo: "CS24B1042",
    college: "Institute of Technology & Advanced Science",
    grade: "A+",
    score: 96,
    percentage: 96,
    issueDate: "18 May 2024",
    instructor: "Dr. Arvind Subramanian",
    instructorRole: "Professor & Academic Dean",
    registrar: "Dr. Meenakshi Sundaram",
    registrarRole: "University Registrar",
    verificationUrl: "https://coursehub.university.edu/verify/CHU-CERT-2024-CS201-8842",
    qrCodePlaceholder: "VERIFIED-CREDENTIAL-CHU-8842",
    academicYear: "2023-2024 (Even Sem)"
  }
];
