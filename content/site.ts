import { siteUrl } from "@/lib/urls";

// Personal details and homepage expertise live here; components only render them.
export const siteConfig = {
  url: siteUrl,
  name: "Stanislav Smirnov",
  role: "Lead Data Scientist",
  intro:
    "I work on machine learning, experiments, and data products to help teams make decisions.",
  location: "Cologne, Germany",
  email: "mr.stassmirnoff@hotmail.com",
  github: "https://github.com/mrStasSmirnoff",
  linkedIn: "https://www.linkedin.com/in/smirnov-stanislav/",
  profileImage: "/title-page-photo-2.JPG",
};

export const expertise = [
  {
    shortName: "ML",
    title: "Applied machine learning",
    description:
      "Models built for specific product and business decisions.",
  },
  {
    shortName: "EX",
    title: "Experimentation & causal thinking",
    description:
      "Reducing entropy through test design and results analysis.",
  },
  {
    shortName: "DP",
    title: "Data product strategy",
    description:
      "Finding high-value use cases and defining how to measure success.",
  },
  {
    shortName: "TL",
    title: "Technical leadership",
    description:
      "Designing systems, mentoring colleagues and sharing knowledge.",
  },
];
