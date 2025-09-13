/**
 * @copyright 2025 i-bee-k
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
    desc: "Web-App Structure",
  },
  {
    imgSrc: "/images/css3.svg",
    label: "CSS",
    desc: "Styles User Interface",
  },
  {
    imgSrc: "/images/javascript.svg",
    label: "JavaScript",
    desc: "Interaction Function",
  },
  {
    imgSrc: "/images/tailwindcss.svg",
    label: "TailwindCSS",
    desc: "Styles Framework",
  },
  {
    imgSrc: "/images/sass.svg",
    label: "SASS",
    desc: "Styles Preprocessor",
  },
  {
    imgSrc: "/images/react.svg",
    label: "React",
    desc: "JS Framework",
  },
  {
    imgSrc: "/images/vitejs.svg",
    label: "Vite",
    desc: "Build tool + development server",
  },
  {
    imgSrc: "/images/expressjs.svg",
    label: "ExpressJS",
    desc: "Node Framework",
  },
  {
    imgSrc: "/images/nodejs.svg",
    label: "NodeJS",
    desc: "Web Server",
  },
  {
    imgSrc: "/images/mongodb.svg",
    label: "MongoDB",
    desc: "Schema Database",
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
    desc: "General Purpose Build Tool",
  },
  {
    imgSrc: "/images/python.svg",
    label: "Python",
    desc: "Multipurpose Build Tool",
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
    imgSrc: "/images/netlify.svg",
    label: "Netlify",
    desc: "Build & Deploy",
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
