// Career details come from the CV; About and recent work use the owner's updated copy.
// Keep measurement qualifications beside the results, not in footnotes.
// The full PDF is private; this file is the editable source for /resume/.
export const resume = {
  role: "Senior Data Scientist, Payments",
  about: [
    "Senior Data Scientist in payments. I lead ML and analytics work across authorization, routing, retries, network tokenization and fraud, from problem framing and business case through production rollout, KPI evaluation and iteration.",
  ],
  collaboration: "I work closely with Product, Engineering and Fraud Prevention and mentor junior data scientists.",
  recentWork: [
    {
      area: "Network tokenization & account updater",
      detail: "Developed in-house analytics for uplift measurement for network tokenization and account updater, in approval rates and USD revenue: matched the PSP’s figures within 0.01 pp and corrected for merchant mix.",
    },
    {
      area: "Fraud detection",
      detail: "Rebuilding and deploying an in-house fraud ML model. Working with Fraud Prevention, I revised the fraud-labelling logic and improved offline recall from ~44% to ~72% at the same 1% false-positive rate budget. I also benchmarked the model against an external vendor score for a build-vs-buy decision involving roughly EUR 200K in annual vendor cost.",
    },
    {
      area: "Fallback routing",
      detail: "Improving fallback-routing success by 4x and recovered revenue by approximately 3x after identifying an underperforming route in North American traffic and driving the switch to a better-performing PSP.",
    },
    {
      area: "Dynamic Retries",
      detail: "Proposing and launching Dynamic Retries, an ML-driven payment-recovery product. It improved retry success by 25–50% for in-scope transactions and was later expanded to > 90% of the client base.",
    },
  ],
  experience: [
    {
      title: "Senior Data Scientist, Payments",
      company: "Cleverbridge AG",
      period: "April 2024 – Present",
    },
    {
      title: "Data Scientist",
      company: "Cleverbridge AG",
      period: "December 2021 – April 2024",
    },
    {
      title: "Data Engineer",
      company: "Cleverbridge AG",
      period: "September 2019 – December 2021",
    },
    { title: "Machine Learning Intern", company: "KOSTAL Group", period: "May 2017 – July 2017" },
    { title: "Network Optimization Engineer", company: "MegaFon", period: "May 2012 – March 2015" },
  ],
  skills: [
    { area: "Programming & ML", detail: "Python, SQL, PySpark, classical ML, TensorFlow, Keras" },
    { area: "Cloud & production", detail: "AWS, Azure, Glue, SageMaker, Databricks, Airflow, Docker, FastAPI" },
    { area: "Payments & fraud", detail: "Authorization/decline analysis, PSP performance, routing, retries, tokenization, fraud detection" },
    { area: "Product & leadership", detail: "KPI definition, experimentation design, rollout planning, stakeholder management, technical mentoring" },
  ],
  education: {
    institution: "University of Paderborn",
    degree: "Master of Science in Electrical Systems Engineering (Signal Processing)",
    period: "2015 – 2018",
  },
  languages: "Russian (Native), English (Fluent), German (Upper Intermediate, B2)",
};
