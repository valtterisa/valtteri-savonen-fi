import { projects } from "../../lib/content";
import { WorkExperience } from "../work-experience";
import { toWorkExperience } from "./map-work-experience";

export function ProjectsPanel() {
  return (
    <WorkExperience
      className="w-full"
      experiences={toWorkExperience(projects)}
    />
  );
}
