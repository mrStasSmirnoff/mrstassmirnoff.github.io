import { siteUrl } from "@/lib/urls";

// Personal details and homepage expertise live here; components only render them.
export const siteConfig = {
  url: siteUrl,
  name: "Stanislav Smirnov",
  role: "Lead Data Scientist",
  intro:
    "I combine applied machine learning, experimentation, and product thinking to make complex decisions clearer - and useful in the real world.",
  location: "Cologne, Germany",
  email: "mr.stassmirnoff@hotmail.com",
  github: "https://github.com/mrStasSmirnoff",
  linkedIn: "https://www.linkedin.com/in/smirnov-stanislav/",
  profileImage: "/title-page-photo-2.JPG",
  resumePath: "/resume.pdf",
};

export const expertise = [
  {
    shortName: "ML",
    title: "Applied machine learning",
    description:
      "Models that start with a real decision and end with something people can use.",
  },
  {
    shortName: "EX",
    title: "Experimentation & causal thinking",
    description:
      "Experiments and analyses designed to separate movement from meaningful impact.",
  },
  {
    shortName: "DP",
    title: "Data product strategy",
    description:
      "Clear priorities that connect data capabilities with customer and business value.",
  },
  {
    shortName: "TL",
    title: "Technical leadership",
    description:
      "Pragmatic direction, explicit trade-offs, and standards a team can work with.",
  },
];
