export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    id: "infotact",
    role: "UI/UX Designer Intern",
    company: "Infotact Solutions",
    period: "Jul – Sep 2025",
    bullets: [
      "Designed Figma wireframes for the Any Meet platform with captions, comments, questions, and notification workflows.",
      "Designed the UI/UX workflow for the Focus Flow productivity app using structured task segmentation and progress tracking.",
      "Created user personas and user flows to improve navigation clarity and usability across application screens.",
      "Refined interface layouts through typography, button placement, and navigation consistency testing for better interaction.",
    ],
  },
  {
    id: "technohacks",
    role: "Python Developer Intern",
    company: "Technohacks Solutions Pvt. Ltd",
    period: "Jul – Aug 2025",
    bullets: [
      "Built Python CLI utilities: contact manager, task tracker, REST API clients for weather and news.",
      "Web scraper using BeautifulSoup — command-driven, processes and stores structured data.",
      "Automated file backup system using os/shutil — periodic categorised folder organisation.",
    ],
  },
];

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
}

export const achievements: Achievement[] = [
  {
    id: "iit-roorkee",
    title: "7th Place — Drone4s Lab Hackathon",
    subtitle: "Civil Dept, IIT Roorkee",
  },
  {
    id: "git-hackathon",
    title: "Top 15 Finalist — 48-Hour Hackathon",
    subtitle: "Global Institute of Technology",
  },
];
