import type { Experience } from "../../lib/content";
import { Stack, TechStack } from "../ui/Stack";

type ExperienceItemProps = {
  experience: Experience;
};

function ExperienceItem({ experience }: ExperienceItemProps) {
  return (
    <Stack.Item>
      <ExperienceItem.Header experience={experience} />
      <p className="text-gray-400 text-sm mb-3">{experience.description}</p>
      {experience.technologies && (
        <TechStack items={experience.technologies} />
      )}
    </Stack.Item>
  );
}

function ExperienceItemHeader({ experience }: ExperienceItemProps) {
  return (
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="text-lg font-semibold">{experience.title}</h3>
        <p className="text-gray-400 text-sm">{experience.company}</p>
      </div>
      <span className="text-sm text-gray-500">{experience.period}</span>
    </div>
  );
}

ExperienceItem.Header = ExperienceItemHeader;

type ExperiencePanelProps = {
  experiences: Experience[];
};

export function ExperiencePanel({ experiences }: ExperiencePanelProps) {
  return (
    <Stack.Root>
      {experiences.map((experience) => (
        <ExperienceItem key={`${experience.company}-${experience.period}`} experience={experience} />
      ))}
    </Stack.Root>
  );
}
