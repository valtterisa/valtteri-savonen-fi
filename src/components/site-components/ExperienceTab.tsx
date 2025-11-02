type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies?: string[];
};

const experiences: Experience[] = [
  {
    title: "Full Stack Engineer",
    company: "Self-employed",
    period: "September 2024 - Present",
    description:
      "Working for myself, looking for startup ideas, building my own products and doing work for clients. Specializing in full-stack development with modern technologies.",
    technologies: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Web Developer",
    company: "Ikius Oy",
    period: "February 2023 - September 2024",
    description:
      "Developed web applications and digital solutions for clients. Worked with modern web technologies to build scalable and maintainable applications.",
    technologies: ["Next.js", "TypeScript", "React", "Node.js"],
  },
  {
    title: "Co-founder",
    company: "Luxmarketfin Clothing & Accessories LLC",
    period: "May 2024 - Present",
    description:
      "Co-founded a pre-loved luxury clothing and accessories brand. Managing e-commerce operations and digital presence.",
  },
];

export function ExperienceTab() {
  return (
    <div className="space-y-8">
      {experiences.map((exp, index) => (
        <div key={index}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold">{exp.title}</h3>
              <p className="text-gray-400 text-sm">{exp.company}</p>
            </div>
            <span className="text-sm text-gray-500">{exp.period}</span>
          </div>
          <p className="text-gray-400 text-sm mb-3">{exp.description}</p>
          {exp.technologies && (
            <div className="flex flex-wrap gap-2 text-sm text-gray-500">
              {exp.technologies.map((tech, techIndex) => (
                <span key={techIndex}>
                  {tech}
                  {techIndex < exp.technologies!.length - 1 && " /"}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
