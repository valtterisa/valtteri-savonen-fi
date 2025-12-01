import { ExternalLink, Github } from "lucide-react";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  active: boolean;
};

const projects: Project[] = [
  {
    title: "project-x",
    description: "start selling online quick. coming soon.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    active: true,
  },
  {
    title: "haalarikone.fi",
    description: "Finnish university students overall search tool.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    liveUrl: "https://haalarikone.fi",
    active: true,
  },
  {
    title: "builddrr.com",
    description: "Make websites without coding. AI-powered website builder.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI", "Vercel"],
    liveUrl: "https://builddrr.com",
    active: false,
  },
];

export function ProjectsTab() {
  return (
    <div className="space-y-8">
      {projects.map((project, index) => (
        <div key={index} className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">
              {project.title}{" "}
              {project.active ? (
                <span className="text-green-500 text-xs bg-green-500/10 px-2 py-1 rounded-md">
                  active
                </span>
              ) : (
                <span className="text-red-500 text-xs bg-red-500/10 px-2 py-1 rounded-md">
                  discontinued
                </span>
              )}
            </h3>
            <p className="text-gray-400 text-sm mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 text-sm text-gray-500">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex}>
                  {tech}
                  {techIndex < project.technologies.length - 1 && " /"}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 items-start">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <Github size={16} />
                <span className="text-sm">GitHub</span>
                <ExternalLink size={12} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <span className="text-sm">View</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
