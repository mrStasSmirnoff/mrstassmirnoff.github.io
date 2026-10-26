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
      "Designing tests and analysing results, including uncertainty and causal assumptions.",
  },
  {
    shortName: "DP",
    title: "Data product strategy",
    description:
      "Choosing which data problems to work on and defining how to measure success.",
  },
  {
    shortName: "TL",
    title: "Technical leadership",
    description:
      "Reviewing technical work, mentoring colleagues, and helping teams choose practical approaches.",
  },
];
