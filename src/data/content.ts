import type { Project, Experience, SkillCategory, ContactMethod } from '../types/content';

export const skills: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["TypeScript", "SwiftUI", "React.js", "Vue.js", "JavaScript", "Tailwind CSS"],
    level: "advanced"
  },
  {
    title: "Backend & Tools", 
    skills: ["Python", "Swift", "Node.js", "SQLite", "Golang", "Docker", "Shell"],
    level: "intermediate"
  }
];

export const experiences: Experience[] = [
  {
    title: "Vice President",
    company: "Computerization",
    period: "2024 - 2025",
    description: "Participate in the management and framework design of the club. Lead the development of our open-source projects, including c13n, Enspire, etc.",
    current: false
  },
  {
    title: "Member",
    company: "Computerization",
    period: "2023 - Present",
    description: "Contributes to various projects in club. Actively participates in club activities and workshops.",
    current: true
  },
  {
    title: "OSS Contributor", 
    company: "GitHub",
    period: "2019 - Present",
    description: "Hunting, pull requests for open-source projects that interest me.",
    current: true
  }
];

export const projects: Project[] = [
  {
    title: "FlowDown",
    url: "https://github.com/Lakr233/FlowDown",
    description: "A blazing fast and smooth client app for using AI/LLM, with a strong emphasis on privacy and user experience.",
    tags: ["Swift", "UIKit", "MLX", "AI/ML"],
    external: true,
    featured: true
  },
  {
    title: "Enspire",
    url: "https://github.com/Computerization/Enspire", 
    description: "Our open-source CAS management platform built for WFLA campus.",
    tags: ["Nuxt.js", "Vue.js", "Tailwind CSS"],
    external: true,
    featured: true
  },
  {
    title: "Outspire",
    url: "https://github.com/at-wr/Outspire",
    description: "All-in-one WFLA campus App for Apple Platform.",
    tags: ["Swift", "SwiftUI"],
    external: true
  },
  {
    title: "MCP-Streamable-Adapter", 
    url: "https://github.com/at-wr/MCP-Streamable-Adapter",
    description: "Bridges Streamable HTTP clients with Stdio servers.",
    tags: ["Python", "FastAPI", "Uvicorn"],
    external: true
  }
];

export const contactMethods: ContactMethod[] = [
  {
    label: "Email",
    href: "#",
    primary: true
  },
  {
    label: "GitHub",
    href: "https://github.com/at-wr",
    external: true
  },
  {
    label: "Twitter",
    href: "https://twitter.com/Wr_Offi", 
    external: true
  },
  {
    label: "Mastodon",
    href: "https://mastodon.social/@wrye", 
    external: true,
    rel: "me"
  }
];

export const heroContent = {
  tagline: "Architecting human-centered digital experiences through code",
  subtitle: "👋 Hi there, how about scrolling down a little bit?"
};

export const aboutContent = {
  paragraphs: [
    "I'm a full-stack developer, currently a high school student. Have always been fascinated about building things that matter. I enjoy solving complex problems and bringing ideas to life through code.",
    "Clean design and robust engineering are at the core of my work, and I strive to create stuffs that are not only functional but also delightful to use."
  ]
};

export const contactContent = {
  description: "Always open to new friends and opportunities. Feel free to reach out if you have any questions, suggestions, or just want to say hi!",
};
