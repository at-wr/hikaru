// Types for content management and blog integration

export interface Project {
  title: string;
  url: string;
  description: string;
  tags: string[];
  external?: boolean;
  featured?: boolean;
  image?: string;
  date?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  location?: string;
  current?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  /**
   * Publication date for the post. Matches the `published` field
   * defined in the content collection schema and is stored as a
   * JavaScript Date instance by Astro.
   */
  published: Date;
  category: string;
  tags: string[];
  featured?: boolean;
  draft?: boolean;
  readingTime?: number;
  image?: string;
}

export interface ContactMethod {
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
  primary?: boolean;
  rel?: string;
}

// Page metadata for SEO and social sharing
export interface PageMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
}

// Site configuration
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  author: {
    name: string;
    email: string;
    twitter?: string;
    github?: string;
  };
  social: ContactMethod[];
}
