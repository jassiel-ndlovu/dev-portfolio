/**
 * Site + content configuration
 * ----------------------------
 * Single source of truth for identity, CV, and all the About/Experience/
 * Certifications page content. Edit freely; most fields have sensible
 * placeholders where I didn't have your exact details (marked "// edit").
 */

export const site = {
  name: "Nkosenhle Ndlovu",
  role: "Software Engineer",
  tagline: "I build compilers, platforms and apps from scratch.",
  intro:
    "Computer Science graduate who likes going a layer deeper: writing the SQL engine instead of using one, wiring the event bus instead of gluing services. This is a tour of the projects that taught me how.",
  location: "South Africa",
  email: "nkosijassiel@gmail.com",
  githubUser: "jassiel-ndlovu",
  // Portrait shown on the landing page. Falls back to an illustration if missing.
  photo: "/me.jpg",
};

/* ------------------------------------------------------------------ */
/* Socials                                                            */
/* ------------------------------------------------------------------ */

export interface Social {
  label: string;
  href: string;
  icon: string; // Font Awesome classes
}

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/jassiel-ndlovu", icon: "fa-brands fa-github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nkosenhle-ndlovu-8a0745290/", icon: "fa-brands fa-linkedin-in" },
  { label: "X", href: "", icon: "fa-brands fa-x-twitter" },
  { label: "Email", href: "mailto:nkosijassiel@gmail.com", icon: "fa-solid fa-envelope" },
];

/* ------------------------------------------------------------------ */
/* Education                                                          */
/* ------------------------------------------------------------------ */

export interface Education {
  qualification: string;
  institution: string; 
  period: string;
  detail: string;
  status?: "current" | "completed";
  illustration: string;
}

export const education: Education[] = [
  {
    qualification: "BSc (Hons) Computer Science",
    institution: "University of the Witwatersrand, Johannesburg",
    period: "2025 - Present",
    status: "current",
    detail:
      "Currently completing, majoring in Data Science / Big Data Analytics.",
    illustration: "research-paper.svg",
  },
  {
    qualification: "BSc Computer Science",
    institution: "University of the Witwatersrand, Johannesburg",
    period: "2022 - 2025",
    status: "completed",
    detail: "Majored in Mathematics.",
    illustration: "developer.svg",
  },
  {
    qualification: "National Senior Certificate (Grade 12)",
    institution: "Northern Academy Secondary School, Polokwane", 
    period: "2021",
    status: "completed",
    detail: "Passed with 7 distinctions.",
    illustration: "success-factors.svg",
  },
];

/* ------------------------------------------------------------------ */
/* Experience: tutoring                                              */
/* ------------------------------------------------------------------ */

export interface Experience {
  role: string;
  company: string;
  logo: string; // path under /public/companies
  period: string;
  detail: string;
}

export const experience: Experience[] = [
  {
    role: "Mathematics & IT Tutor",
    company: "Axiom Tutoring Company",
    logo: "/companies/axiom-tutoring-company.jpg",
    period: "Jan 2024 – July 2024",
    detail:
      "Tutoring high-school and university students in Mathematics and IT. I break down hard concepts, build problem-solving intuition and track progress toward exams.",
  },
  {
    role: "IT Tutor",
    company: "Euphoria Academia (formerly The HR Academy)",
    logo: "/companies/euphoria-academia.png",
    period: "May 2023 – Dec 2023",
    detail:
      "Delivering one-on-one and group tutoring in Mathematics and IT, adapting explanations to each learner and helping students turn confusion into confidence.",
  },
  {
    role: "Educational Content Creator",
    company: "Triangle Labs",
    logo: "/companies/triangle-labs.jpeg",
    period: "Aug 2023 – Dec 2023",
    detail:
      "Creating educational content for high-school and primary-level students, including problem sets, tutorials, and explanatory videos.",
  },
  {
    role: "Computer Science & Applied Mathematics Tutor",
    company: "University of the Witwatersrand",
    logo: "/companies/wits.jpeg",
    period: "Jan 2024 – Dec 2024",
    detail:
      "Tutoring university students in Computer Science and Applied Mathematics, helping them understand complex concepts and develop problem-solving skills.",
  },
  {
    role: "Graphic Designer & Content Creator",
    company: "ENC Wits",
    logo: "/companies/enc-wits.png",
    period: "Jan 2023 – Dec 2023",
    detail:
      "Designing graphics and creating content for the Every Nation Church at the University of the Witwatersrand, enhancing communication and engagement with students.",
  }
];

export const experienceSummary =
  "Four years of tutoring Mathematics and IT. Explaining hard ideas simply has shaped how I design and document software.";

/* ------------------------------------------------------------------ */
/* Olympiads & competitions                                          */
/* ------------------------------------------------------------------ */

export interface Olympiad {
  name: string;
  years: string;
  result: string;
}

export const olympiads: Olympiad[] = [
  {
    name: "SATMO Olympiad",
    years: "2023, 2024",
    result: "Reached Round 2 in both years.",
  },
  {
    name: "Wits Mathematics Competition",
    years: "2023",
    result: "Progressed to the third round.",
  },
  {
    name: "SAMO (SA Mathematics Olympiad)",
    years: "2020 – 2021",
    result: "Participated during secondary school.",
  },
  {
    name: "IITPSA Computer Olympiad",
    years: "2020",
    result: "Participant.",
  },
];

/* ------------------------------------------------------------------ */
/* Certifications                                                     */
/* ------------------------------------------------------------------ */

export interface Certification {
  name: string;
  issuer: string;
  image: string; // path under /public/certifications
  credentialUrl?: string;
  detail?: string;
}

export const certifications: Certification[] = [
  {
    name: "Cloud Computing",
    issuer: "Alibaba Cloud Academy",
    image:
      "/certifications/AliBaba Cloud Academy - Cloud Computing Certification.png",
    credentialUrl: "",
    detail: "Foundational cloud computing certification.",
  },
  {
    name: "Professional Member (Student)",
    issuer: "IITPSA (Institute of IT Professionals South Africa)",
    image: "/certifications/IITPSA-Membership-Certificate.png",
    credentialUrl: "/certifications/IITPSA-Membership-Certificate.pdf",
    detail:
      "Student membership of South Africa's SAQA-recognised IT professional body · valid to Jul 2027.",
  },
];

/* ------------------------------------------------------------------ */
/* Tech stack (for the auto-scrolling marquees)                      */
/* Icons: `fa` = Font Awesome classes, `lucide` = lucide-react name.  */
/* ------------------------------------------------------------------ */

export interface Tech {
  name: string;
  fa?: string;
  lucide?: string;
}

export const techStack: Tech[] = [
  { name: "Java", fa: "fa-brands fa-java" },
  { name: "Python", fa: "fa-brands fa-python" },
  { name: "JavaScript", fa: "fa-brands fa-js" },
  { name: "TypeScript", lucide: "Braces" },
  { name: "Kotlin", lucide: "Smartphone" },
  { name: "SQL", lucide: "Database" },
  { name: "React", fa: "fa-brands fa-react" },
  { name: "Next.js", lucide: "Triangle" },
  { name: "Node.js", fa: "fa-brands fa-node-js" },
  { name: "Android", fa: "fa-brands fa-android" },
  { name: "Docker", fa: "fa-brands fa-docker" },
  { name: "Git", fa: "fa-brands fa-git-alt" },
  { name: "Azure", fa: "fa-brands fa-microsoft" },
  { name: "Alibaba Cloud", lucide: "Cloud" },
  { name: "Linux", fa: "fa-brands fa-linux" },
  { name: "HTML5", fa: "fa-brands fa-html5" },
  { name: "CSS3", fa: "fa-brands fa-css3-alt" },
  { name: "REST APIs", lucide: "Network" },
  { name: "Event Messaging", lucide: "Radio" },
  { name: "Data Science", lucide: "BarChart3" },
  { name: "Big Data", lucide: "Boxes" },
  { name: "Mathematics", lucide: "Sigma" },
];

/* ------------------------------------------------------------------ */
/* Soft skills & achievements                                        */
/* ------------------------------------------------------------------ */

export interface SoftSkill {
  name: string;
  lucide: string;
  blurb: string;
}

export const softSkills: SoftSkill[] = [
  { name: "Problem Solving", lucide: "Puzzle", blurb: "Breaking hard problems into tractable pieces." },
  { name: "Leadership", lucide: "Users", blurb: "Taking initiative and bringing people along." },
  { name: "Communication", lucide: "MessagesSquare", blurb: "Explaining complex ideas simply, a habit from tutoring." },
  { name: "Curiosity", lucide: "Lightbulb", blurb: "Going a layer deeper to understand how things work." },
  { name: "Creativity", lucide: "Palette", blurb: "Finding elegant, unexpected solutions." },
  { name: "Adaptability", lucide: "Repeat", blurb: "Comfortable across systems, mobile, and data." },
  { name: "Teamwork", lucide: "Handshake", blurb: "Collaborating and sharing knowledge." },
  { name: "Time Management", lucide: "Clock", blurb: "Balancing study, work, and shipping projects." },
];

export const achievements: string[] = [
  "Matriculated with 7 distinctions (NSC, 2021).",
  "Academic Top 3 at Knockando residence, Wits (2022).",
  "Four Certificates of Merit across CS and Mathematics (2022–2023).",
  "University Entrance & Council Merit Scholarships (2022–2024).",
  "Reached Round 2 of the SATMO Olympiad in both 2023 and 2024.",
  "Progressed to the third round of the Wits Mathematics Competition (2023).",
  "Alibaba Cloud Academy Cloud Computing certification and IITPSA student membership.",
];

/* ------------------------------------------------------------------ */
/* Awards & scholarships                                              */
/* ------------------------------------------------------------------ */

export interface Award {
  title: string;
  detail: string;
}

export const awards: Award[] = [
  { title: "Academic Top 3, Knockando Residence", detail: "Wits · 2022" },
  {
    title: "Certificate of Merit: Data Structures & Algorithms I",
    detail: "Wits · 2022",
  },
  {
    title: "Certificate of Merit: Information Systems IB",
    detail: "Wits · 2022",
  },
  {
    title: "Certificate of Merit: Database Fundamentals II",
    detail: "Wits · 2023",
  },
  {
    title: "Certificate of Merit: Multivariable Calculus",
    detail: "Wits · 2023",
  },
];

export const scholarships: Award[] = [
  { title: "University Entrance Scholarship", detail: "Wits · 2022" },
  { title: "University Council Merit Scholarship", detail: "Wits · 2023" },
  { title: "University Council Merit Scholarship", detail: "Wits · 2024" },
];

// Recreational activities, each with its own illustration.
export interface Recreation {
  name: string;
  illustration: string;
  blurb: string;
}
export const recreation: Recreation[] = [
  {
    name: "Chess",
    illustration: "chess.svg",
    blurb: "Strategy, patterns, and playing the long game.",
  },
  {
    name: "Digital Art",
    illustration: "digital-artist.svg",
    blurb: "Making art with a stylus and screen.",
  },
  {
    name: "Sketching & Hyperrealism",
    illustration: "sketch-artist.svg",
    blurb: "Pencil work, from quick sketches to hyperreal detail.",
  },
  {
    name: "Graphic Design",
    illustration: "graphic-designer.svg",
    blurb: "Type, layout, and visual systems.",
  },
  {
    name: "Poetry",
    illustration: "poet.svg",
    blurb: "Writing verse and playing with language.",
  },
  {
    name: "Music",
    illustration: "music.svg",
    blurb: "Listening widely, with a soft spot for jazz.",
  },
];

/* ------------------------------------------------------------------ */
/* Values: "how I work"                                              */
/* ------------------------------------------------------------------ */

export type Tint = "blue" | "sky" | "green" | "slate";

export interface Value {
  title: string;
  blurb: string;
  illustration: string;
  tint: Tint;
}

export const values: Value[] = [
  {
    title: "First principles",
    blurb:
      "I'd rather understand the layer beneath than treat it as magic. That's how the SQL engine and compiler happened.",
    illustration: "problem-solving.svg",
    tint: "green",
  },
  {
    title: "Built to be read",
    blurb:
      "Clear structure and documentation, so the next person (often future me) can follow the reasoning.",
    illustration: "agile-workflow.svg",
    tint: "sky",
  },
  {
    title: "Teach as you build",
    blurb:
      "Four years of tutoring taught me that if I can't explain it simply, I don't understand it yet.",
    illustration: "teamwork.svg",
    tint: "blue",
  },
  {
    title: "Lead with initiative",
    blurb:
      "Spotting what needs doing and taking ownership of it end to end.",
    illustration: "leadership-minded.svg",
    tint: "slate",
  },
];

export const tintClasses: Record<Tint, string> = {
  blue: "bg-tint-blue",
  sky: "bg-tint-sky",
  green: "bg-tint-green",
  slate: "bg-tint-slate",
};

/* ------------------------------------------------------------------ */
/* CV page                                                            */
/* ------------------------------------------------------------------ */

export interface CVEntry {
  title: string;
  org: string;
  period: string;
  detail: string;
}

export const cv = {
  summary:
    "Computer Science graduate (BSc, major in Mathematics) currently completing an Honours in Data Science / Big Data Analytics. Four years of Mathematics & IT tutoring alongside hands-on projects spanning compilers, distributed platforms, mobile, and full-stack web.",
  skills: {
    Languages: ["Java", "Kotlin", "TypeScript", "Python", "SQL"],
    "Systems & Backend": ["Compilers", "Microservices", "Event Messaging", "REST APIs", "Docker"],
    "Web & Mobile": ["React / Next.js", "Android Studio", "Node.js"],
    "Data & Cloud": ["Data Science", "Big Data Analytics", "Azure", "Alibaba Cloud"],
  } as Record<string, string[]>,
  resumePdf: "/Nkosenhle-Ndlovu-CV.pdf",
};
