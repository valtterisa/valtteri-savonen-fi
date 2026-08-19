import type { Project } from "../../lib/content";
import { Stack, StatusBadge, TechStack } from "../ui/Stack";
import { LinkActions } from "../ui/LinkActions";

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

type ProjectItemProps = {
  project: Project;
};

function ProjectItem({ project }: ProjectItemProps) {
  return (
    <Stack.Item className="flex justify-between items-start gap-4">
      <ProjectItem.Content project={project} />
      <ProjectItem.Actions project={project} />
    </Stack.Item>
  );
}

function ProjectItemContent({ project }: ProjectItemProps) {
  return (
    <div className="flex-1">
      <h3 className="text-lg font-semibold mb-2">
        {project.title} <StatusBadge active={project.active} />
      </h3>
      <p className="text-gray-400 text-sm mb-3">{project.description}</p>
      <TechStack items={project.technologies} />
    </div>
  );
}

function ProjectItemActions({ project }: ProjectItemProps) {
  return (
    <LinkActions.Group>
      {project.githubUrl && (
        <LinkActions.Link
          href={project.githubUrl}
          label="GitHub"
          icon={<GitHubIcon />}
        />
      )}
      {project.liveUrl && (
        <LinkActions.Link href={project.liveUrl} label="view" />
      )}
    </LinkActions.Group>
  );
}

ProjectItem.Content = ProjectItemContent;
ProjectItem.Actions = ProjectItemActions;

type ProjectsPanelProps = {
  projects: Project[];
};

export function ProjectsPanel({ projects }: ProjectsPanelProps) {
  return (
    <Stack.Root>
      {projects.map((project) => (
        <ProjectItem key={project.title} project={project} />
      ))}
    </Stack.Root>
  );
}
