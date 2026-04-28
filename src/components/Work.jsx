/**
 * @copyright 2025 i-bee-k
 * @license Apache-2.0
 */

/**
 * Components
 */
import ProjectCard from "./ProjectCard";

const works = [
  {
    imgSrc: "/images/project-0.png",
    title: "Full stack eCommerce Website",
    tags: ["eCommerce", "Development"],
    projectLink: "https://github.com/i-bee-k/anon-ecommerce-website",
  },
  {
    imgSrc: "/images/works/fiverr-copy.jpg",
    title: "FiverrUI appClone",
    tags: ["Web-design", "Development"],
    projectLink: "https://github.com/i-be-k/fiverr-appclone/tree/main/fiverrUi",
  },
  {
    imgSrc: "/images/works/project-1.png",
    title: "Full-stack realtor app",
    tags: ["API", "MVC", "Development"],
    projectLink: "https://github.com/i-bee-k/realtor-client-server",
  },
  {
    imgSrc: "/images/project-2.jpg",
    title: "Full-stack picture app",
    tags: ["API", "SPA"],
    projectLink: "https://pixstock-official.vercel.app/",
  },
  {
    imgSrc: "/images/project-3.jpg",
    title: "Recipe app",
    tags: ["Development", "API"],
    projectLink: "https://github.com/i-bee-k/food-recipe-app",
  },
  {
    imgSrc: "/images/project-5.jpg",
    title: "eCommerce UI/UX",
    tags: ["eCommerce", "Development"],
    projectLink: "https://github.com/i-bee-k/anon-ecommerce-website",
  }
];

const Work = () => {
  return (
    <section id="work" className="section">
      <div className="container">
        <h2 className="headline-2 mb-8 reveal-up">My project reviews</h2>

        <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
          {works.map(({ imgSrc, title, tags, projectLink }, key) => (
            <ProjectCard
              key={key}
              imgSrc={imgSrc}
              title={title}
              tags={tags}
              projectLink={projectLink}
              classes="reveal-up"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
