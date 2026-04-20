/**
 * @copyright 2025 ibkobi
 * @license Apache-2.0
 */

/**
 * Components
 */
import SkillCard from "./SkillCard";

const skillItem = [
  {
    imgSrc: "/images/html5.svg",
    label: "HTML5",
    desc: "Website Structure",
  },
  {
    imgSrc: "/images/css3.svg",
    label: "CSS",
    desc: "UI Design",
  },
  {
    imgSrc: "/images/tailwindcss.svg",
    label: "TailwindCSS",
    desc: "CSS Framework",
  },
  {
    imgSrc: "/images/sass.svg",
    label: "SASS",
    desc: "CSS pre-processor",
  },
  {
    imgSrc: "/images/react.svg",
    label: "ReactJS",
    desc: "FrontEnd API Framework",
  },
  {
    imgSrc: "/images/nextjs-icon.svg",
    label: "NextJS",
    desc: "React API Framework",
  },
  {
    imgSrc: "/images/vitejs.svg",
    label: "ViteJS",
    desc: "Build tool + development server",
  },
  {
    imgSrc: "/images/expressjs.svg",
    label: "ExpressJS",
    desc: "Backend API Framework",
  },
  {
    imgSrc: "/images/javascript.svg",
    label: "JavaScript",
    desc: "High Level Language",
  },
  {
    imgSrc: "/images/typescript-programming-language-icon.svg",
    label: "TypeScript",
    desc: "Advanced JavaScript PL",
  },
  {
    imgSrc: "/images/nodejs.svg",
    label: "NodeJS",
    desc: "Web Server",
  },
  {
    imgSrc: "/images/mongodb.svg",
    label: "MongoDB",
    desc: "Database API Store",
  },
  {
    imgSrc: "/images/postman.svg",
    label: "Postman",
    desc: "API Testing Platform",
  },
  {
    imgSrc: "/images/figma.svg",
    label: "Figma",
    desc: "Design tool",
  },
  {
    imgSrc: "/images/c.svg",
    label: "C",
    desc: "Low Level Language",
  },
  {
    imgSrc: "/images/python.svg",
    label: "Python",
    desc: "High Level Language",
  },
  {
    imgSrc: "/images/github.png",
    label: "Github",
    desc: "Cloud-Based Host",
  },
  {
    imgSrc: "/images/git.svg",
    label: "Git",
    desc: "Version Control System",
  },
  {
    imgSrc: "/images/bash.svg",
    label: "Bash",
    desc: "Command Line Interface",
  },
  {
    imgSrc: "/images/vercel-icon.svg",
    label: "Vercel",
    desc: "Hosting Service",
  },
  {
    imgSrc: "/images/netlify.svg",
    label: "Netlify",
    desc: "Hosting Service",
  },
  {
    imgSrc: "/images/docker.svg",
    label: "Docker",
    desc: "Containerization Platform",
  },
];

const Skill = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="headline-2 reveal-up">Indispensable Tools I use</h2>

        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
          Locate the formidable tools and technologies I use to create unusual,
          high-performing websites & applications.
        </p>

        <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
          {skillItem.map(({ imgSrc, label, desc }, key) => (
            <SkillCard
              key={key}
              imgSrc={imgSrc}
              label={label}
              desc={desc}
              className="reveal-up"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skill;
