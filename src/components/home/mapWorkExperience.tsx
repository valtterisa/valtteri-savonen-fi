import { CodeXmlIcon, LightbulbIcon } from "lucide-react";
import type { ReactElement } from "react";
import type { ExperienceItem, PositionIconName } from "../../lib/content";
import type { ExperienceItemType } from "../work-experience";

const POSITION_ICONS: Record<PositionIconName, ReactElement> = {
  code: <CodeXmlIcon strokeWidth={1.75} />,
  lightbulb: <LightbulbIcon strokeWidth={1.75} />,
};

export function toWorkExperience(
  items: ExperienceItem[],
): ExperienceItemType[] {
  return items.map((item) => ({
    ...item,
    positions: item.positions.map((position) => ({
      ...position,
      icon: position.icon ? POSITION_ICONS[position.icon] : undefined,
    })),
  }));
}
