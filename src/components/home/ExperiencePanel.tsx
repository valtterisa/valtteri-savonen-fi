import { experiences } from "../../lib/content";
import { WorkExperience } from "../work-experience";
import { toWorkExperience } from "./mapWorkExperience";

export function ExperiencePanel() {
  return (
    <WorkExperience className="w-full" experiences={toWorkExperience(experiences)} />
  );
}
