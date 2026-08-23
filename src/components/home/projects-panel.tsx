import { projects } from "../../lib/content";
import { WorkExperience } from "../work-experience";
import { toWorkExperience } from "./mapWorkExperience";

export function ProjectsPanel() {
  return (
    <WorkExperience
      className="w-full"
      experiences={toWorkExperience(projects)}
    />
  );
}
