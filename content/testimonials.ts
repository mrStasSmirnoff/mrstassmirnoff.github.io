export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  initials: string;
  image?: string;
};

// Recommendations supplied by their authors on LinkedIn. Blank lines preserve
// paragraphs; image paths refer to the small portraits in public/testimonials/.
export const testimonials: Testimonial[] = [
  {
    name: "Andreas Linn",
    title: "Chief Product Officer",
    initials: "AL",
    image: "/testimonials/andreas-linn.jpeg",
    quote: `It's been an honor and pleasure to have worked with Stanislav during our common tenure at cleverbridge. Stanislav is that kind of employee you don’t want to miss in your data team. He is not only knowledgeable and gets the job done, he is also looking beyond the obvious to find ways to improve. He spent time digging through data to find trends, peaks, dependencies and, last but not least, opportunities. He mastered his assignment and has built up a vast pool of data science knowledge. Obviously, he reached the point where given algorithms didn’t suffice. He came up with great proposals and improvements. To me it looked like he is in a permanent iteration towards the optimum and was never just content with a given situation.

Even today, occasionally I wish for a colleague like Stanislav. No question, future colleagues will benefit tremendously from Stanislav’s contribution. I will definitely keep an eye on his career (maybe just hoping to be united again some day).

Aside from Stanislav's knowledge, expertise and abilities, he is also a great team player and he went out of his way to help others when needed.

If you are reading this because you are a hiring expert, my first recommendation is to quickly extend him an offer.`,
  },
  {
    name: "Kcarlos",
    title: "Data Engineer",
    initials: "K",
    image: "/testimonials/kcarlos.jpeg",
    quote: `I had the pleasure of working with Stanislav, and I can confidently say he’s one of the best data scientists I’ve collaborated with. He brings a rare balance of deep technical expertise and strong communication skills. His foundational knowledge in data analysis and machine learning is unmatched—he not only understands the theory but also knows how to apply it to solve real-world problems effectively.

What stood out most was his ability to work as a true team player. He always made complex concepts accessible to both technical and non-technical stakeholders, which helped drive alignment and impact across the team. Anyone looking for a data scientist who can bridge the gap between advanced analytics and business outcomes would be lucky to have Stanislav on their team.`,
  },
  {
    name: "Maxime Regh",
    title: "Senior Product Manager, Payments",
    initials: "MR",
    image: "/testimonials/maxime-regh.jpeg",
    quote: `Stanislav and I didn’t sit on the same team, but we kept bumping into each other around payments and fraud. He learns the domain quickly and asks the right questions. While I was at Stripe, he drove Dynamic Retries forward; when I came back we went straight into details—signals, rollout, what to test next, and where routing or further experiments with retries make sense. He’s curious, precise, and focused on measurable lift. I’d be glad to work with him on routing or any payment optimization work.`,
  },
  {
    name: "Shannon Kehoe",
    title: "Director of Artificial Intelligence",
    initials: "SK",
    image: "/testimonials/shannon-kehoeai.jpeg",
    quote: `When I stepped in to lead AI at Cleverbridge, Stanislav was already driving progress on payment recovery—but it quickly became clear that his impact reached far beyond a single project. He combines the structured thinking of a product owner with the deep technical intuition of a seasoned data scientist, and that rare blend made him indispensable to our team.

His work on Dynamic Retries wasn’t just about modeling—it was about end-to-end ownership. He framed the problem, rallied cross-functional support, built the MVP, and led ongoing experimentation and tuning. That initiative helped us unlock a 36% relative uplift in recovery rates, and set a new benchmark internally for how we measure AI ROI.

But what truly set Stanislav apart—and why I promoted him to Senior Data Scientist—was how he consistently elevated those around him. He mentored junior team members with patience and clarity, brought stakeholders along with him through collaborative decision-making, and never lost sight of the business context behind the data.

If you’re looking for someone who can take ambiguous problems, shape them into product-ready solutions, and deliver measurable business outcomes—all while strengthening the team around him—I can’t recommend Stanislav highly enough.`,
  },
];
