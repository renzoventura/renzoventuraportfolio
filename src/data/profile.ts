export type SocialLinks = {
  github: string;
  linkedin: string;
  email: string;
  phone: string;
  photography: string;
  cv: string;
};

export type Profile = {
  name: string;
  title: string;
  statement: string;
  about: string;
  focusAreas: string[];
  links: SocialLinks;
};

export const profile: Profile = {
  name: "Renzo Ventura",
  title: "Senior Software Engineer @ Tabcorp",
  statement:
    "Currently building a real-time, high-performance mobile wagering platform for Australia’s premier sports and racing app, leading technical delivery and architecture at scale in a heavily regulated environment.",
  about:
    "I am a software engineer focused on building reliable, user-first digital products. I enjoy turning ambiguous ideas into production systems that create measurable business value.",
  focusAreas: ["AI Tools", "SaaS Platforms", "Mobile Products", "Developer Experience"],
  links: {
    github: "https://github.com/renzoventura",
    linkedin: "https://www.linkedin.com/in/renzoventura/",
    email: "renzoventura96@gmail.com",
    phone: "+61 466 893 313",
    photography: "https://photo.renzoventura.com",
    cv: "/cv/RENZO_VENTURA_CV.pdf",
  },
};
