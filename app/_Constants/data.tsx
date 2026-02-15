
type QualificationType = "education" | "experience" | "all"
type QualificationEntry = {
  title: string
  location: string
  description : string
  tech : string[]
  period: string
  type: QualificationType
}

export const qualificationData: QualificationEntry[] = [
    {
      title: "Software Engineering & Project Development",
      location: "Remote",
      description : "Turning ideas into functional full-stack solutions through hands-on projects, experimentation, and continuous learning.",
      tech : ["NextJS", "Django", "Django REST framework", "Docker", "Network", "AWS services", "Leetcode" ],
      period: "2023 - Present",
      type: "experience",
    },
    {
      title: "Technical Support Professional - Intenship",
      location: "IBM Ireland, Dublin, Ireland",
      description : "Designed, developed, and deployed automated log analysis and data mining solutions for IBM’s Engineering Lifecycle Management (ELM) platform, improving L2 troubleshooting efficiency, reducing manual diagnostics, and optimizing incident resolution workflows.",
      tech : ["python", "RegExp","Log Analysis", "pandas", "Agile / Scrum", "Trello" ],
      period: "2022 - 2023",
      type: "experience",
    },
    {
      title: "M.Sc in Big Data Management & Analytics",
      location: "Griffith College Dublin, Dublin, Ireland",
      description :  "Focused on big data processing, analytics, and data-driven decision making through practical coursework and applied projects.",
      tech : ["Big Data Analytics", "Data Mining", "Data Warehousing", "SQL", "Python", "Hadoop", "Apache Spark", "ETL", "Statistical Analysis", "Data Visualization"],
      period: "2019 - 2020",
      type: "education",
    },
    {
      title: "B.Eng in Computer Engineering",
      location: "St. Francis Institute of Technology, University of Mumbai, India",
      description : "Developed a strong foundation in computer engineering principles including programming, systems, networking, and problem-solving.",
      tech : ["Data Structures & Algorithms", "C", "C++", "Java", "Operating Systems", "Computer Networks", "Databases & Management", "Microprocessors", "Software Engineering"],
      period: "2014 - 2018",
      type: "education",
    },
    {
      title: "11th & 12th years - High School - Computer Science",
      location: "Kendriya Vidyalaya INS Hamla, Mumbai, India",
      description : "Introduced to computer science fundamentals, logical problem solving, and programming concepts through academic coursework.",
      tech : ["Computer Science Fundamentals", "Programming Basics", "C++", "Mathematics", "Logical Reasoning"],
      period: "2012 - 2014",
      type: "education",
    },
  ]

type techSkillsType = {
  title: string,
  skill: string[]
}

export const techSkills: techSkillsType[] = [
  {
    title: "PROGRAMMING LANGUAGES",
    skill: ["Python", "JavaScript", "TypeScript", "C", "SQL", "HTML/CSS"]
  },
  {
    title: "FRAMEWORKS & LIBRARIES",
    skill: ["React", "Next.js", "Node.js", "Django", "Django REST", "Electron"]
  },
  {
    title: "DATABASES & STORAGE",
    skill: ["PostgreSQL", "MySQL"]
  },
  {
    title: "CLOUD & DEVOPS",
    skill: ["AWS (IAM, S3, EC2, VPC)", "Docker","Docker Compose", "Kubernetes"]
  },
  {
    title: "NETWORKING & SYSTEMS",
    skill: ["TCP/IP", "DNS", "Routing/Switching", "Firewalls", "LAN/WAN", "NGINX", "Gunicorn", "WSGI"]
  },
  {
    title: "TOOLS & PLATFORMS",
    skill: ["Git/GitHub", "Tableau", "Jupyter", "Wireshark", "Microsoft Office", "Trello", "Jira"]
  },
  {
    title: "OPERATING SYSTEMS",
    skill: ["Windows", "Linux", "MacOS"]
  }
]

type softSkillsType = string[]

export const softSkills: softSkillsType = ["Customer Support", "Troubleshooting", "Communication", "Problem-Solving", "Time Management & Planning", "Teamwork & Collaboration", "Analytical and Critical Thinking", "Documentation", "Detail Oriented", "Creativity", "Innovation", "Adaptability", "Curious & Willingness to learn" ]

type projectsType = {
  title: string
  description: string
  tech:string[]
  year:string
}

export const projects: projectsType[] = [
                {
                    title: "E-Commerce Platform",
                    description:
                    "Full-stack e-commerce solution with real-time inventory management, payment processing, and order tracking. Built with Next.js, Node.js, and PostgreSQL.",
                    tech: ["Next.js", "React", "PostgreSQL", "AWS S3", "Stripe"],
                    year: "2024",
                },
                {
                    title: "Real-Time Analytics Dashboard",
                    description:
                    "Data visualization platform for monitoring KPIs and metrics with live updates. Features custom charts, filtering, and export functionality using Tableau integration.",
                    tech: ["React", "Node.js", "Tableau", "WebSocket", "Docker"],
                    year: "2024",
                },
                {
                    title: "Cloud Infrastructure Manager",
                    description:
                    "Tool for managing AWS resources with automated deployment pipelines. Includes EC2, S3, VPC management with container orchestration via Kubernetes.",
                    tech: ["Python", "AWS", "Kubernetes", "Docker", "Django"],
                    year: "2023",
                },
                {
                    title: "Network Monitoring System",
                    description:
                    "Network analysis tool for monitoring traffic, detecting anomalies, and generating reports. Built with Wireshark integration and real-time alerting.",
                    tech: ["Python", "Wireshark", "MySQL", "NGINX", "Linux"],
                    year: "2023",
                },{
                    title: "Car Dealer App",
                    description:
                    "Car Dealer App is a web application built using Next.js and TypeScript, designed for users to easily buy, sell, or rent cars. It retrieves real-time car data using the Cars by API Ninjas API from RapidAPI, providing detailed vehicle information such as brand, model, year, and specifications.",
                    tech: ["NextJS", "REST API", "Tailwind Css"],
                    year: "2020",
                },
                ]

type ProjectDetailsType = {
  title: string
  type: string[]        
  stack: string[]
  demo?: string
  sourceCode?: string
  overview: string
  purpose: string
  thoughtProcess: string 
  takeaways: string
  images: string[]
}

export const projectDetails: ProjectDetailsType[] = [
  {
    title: "Car Dealer App",
    type: ["Web Application", "Car Marketplace"],
    stack: ["Next.js", "TypeScript", "RapidAPI", "Tailwind CSS"],
    sourceCode: "https://github.com/NeilJoseph019/CarDealerApp",
    
    overview:
      "Car Dealer App is a modern car marketplace platform that allows users to browse, search, and explore cars available for buying, selling, or renting. The app displays real-time vehicle information fetched dynamically from the Cars by API Ninjas API.",
    
    purpose:
      "The goal of this project was to build a real-world Next.js application that demonstrates API integration, dynamic search functionality, and clean UI development using TypeScript.",
    
    thoughtProcess:
      "I focused on building a simple but scalable UI that makes car discovery easy. The main challenge was structuring API requests efficiently and ensuring search results were fast and accurate. I implemented a search bar for filtering by car name and model, while keeping the UI responsive across devices.",
    
    takeaways:
      "This project strengthened my understanding of Next.js routing, server-side data fetching, TypeScript typing, and working with third-party APIs. I also improved my ability to design user-friendly search experiences.",
    
    images: [
      "/projects/car-dealer/pic1.png",
      "/projects/car-dealer/pic2.png",
      "/projects/car-dealer/pic3.png",
      "/projects/car-dealer/pic4.png",
      "/projects/car-dealer/pic5.png",
      "/projects/car-dealer/pic6.png",
    ],
  },
]
