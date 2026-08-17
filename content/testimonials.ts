export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  initials: string;
  image?: string;
};

// Replace these examples with recommendations copied from LinkedIn.
// Store optional portraits in public/testimonials and use a URL such as
// image: "/testimonials/jane-doe.jpg". The Home page updates automatically.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Paste a concise LinkedIn recommendation here. Two or three sentences work best on the page.",
    name: "Recommender name",
    title: "Role · Company",
    initials: "RN",
  },
  {
    quote:
      "Use a second recommendation to show a different strength: leadership, technical depth, or business impact.",
    name: "Second recommender",
    title: "Role · Company",
    initials: "SR",
  },
];
