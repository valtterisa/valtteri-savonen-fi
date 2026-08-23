"use client";

import {
  ChevronDownIcon,
  ExternalLinkIcon,
} from "lucide-react";
import {
  type ComponentProps,
  type ReactElement,
  type ReactNode,
  useState,
} from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { cn } from "@/lib/utils";

export type ExperiencePositionItemType = {
  id: string;
  title: string;
  summary?: string;
  employmentPeriod?: {
    start: string;
    end?: string;
  };
  employmentType?: string;
  description?: string;
  icon?: ReactElement;
  skills?: string[];
  isExpanded?: boolean;
};

export type ExperienceLink = {
  label: string;
  href: string;
  icon?: ReactNode;
};

export type ExperienceItemType = {
  id: string;
  companyName: string;
  companyLogo?: string;
  companyWebsite?: string;
  positions: ExperiencePositionItemType[];
  isCurrentEmployer?: boolean;
  links?: ExperienceLink[];
};

export type WorkExperienceProps = {
  className?: string;
  experiences: ExperienceItemType[];
};

export function WorkExperience({
  className,
  experiences,
}: WorkExperienceProps) {
  return (
    <div className={cn("divide-y divide-border text-foreground", className)}>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </div>
  );
}

function ExperienceItem({
  experience,
}: {
  experience: ExperienceItemType;
}) {
  const description = experience.positions
    .map((position) => position.description)
    .filter(Boolean)
    .join("\n");
  const hasDescription = description.length > 0;
  const [open, setOpen] = useState(hasDescription);
  const icon = experience.positions.find((position) => position.icon)?.icon;
  const summary =
    experience.positions.find((position) => position.summary)?.summary ??
    fallbackSummary(experience);
  const skills = unique(
    experience.positions.flatMap((position) => position.skills ?? []),
  );
  const links =
    experience.links && experience.links.length > 0
      ? experience.links
      : experience.companyWebsite
        ? [{ label: "view", href: experience.companyWebsite }]
        : undefined;

  return (
    <article className="py-5 first:pt-0">
      <div className="flex items-center gap-3">
        <PositionIcon icon={icon} />

        {hasDescription ? (
          <button
            type="button"
            className="flex min-h-6 min-w-0 flex-1 items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            <h3 className="min-w-0 truncate text-lg font-semibold leading-none text-foreground">
              {experience.companyName}
            </h3>
            {experience.isCurrentEmployer ? <CurrentDot /> : null}
            <ChevronDownIcon
              className={cn(
                "ml-auto size-4 shrink-0 text-muted-foreground motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out",
                open && "rotate-180",
              )}
              strokeWidth={1.75}
              aria-hidden
            />
          </button>
        ) : (
          <div className="flex min-h-6 min-w-0 flex-1 items-center gap-2">
            <h3 className="min-w-0 truncate text-lg font-semibold leading-none text-foreground">
              {experience.companyName}
            </h3>
            {experience.isCurrentEmployer ? <CurrentDot /> : null}
          </div>
        )}
      </div>

      {summary ? (
        <p className="max-w-[65ch] pt-2 pl-9 text-sm leading-relaxed text-muted-foreground">
          {summary}
        </p>
      ) : null}

      {hasDescription ? (
        <div
          className={cn(
            "grid motion-safe:transition-[grid-template-rows] motion-safe:duration-200 motion-safe:ease-out",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <Prose className="pt-2 pl-9">
              <ReactMarkdown components={markdownComponents}>
                {description}
              </ReactMarkdown>
            </Prose>
            <ExperienceLinks links={links} />
          </div>
        </div>
      ) : (
        <ExperienceLinks links={links} />
      )}

      {skills.length > 0 ? (
        <p className="pt-3 pl-9 font-mono text-xs leading-relaxed text-muted-foreground">
          {skills.join(" / ")}
        </p>
      ) : null}
    </article>
  );
}

function fallbackSummary(experience: ExperienceItemType): string {
  const titles = experience.positions.map((position) => position.title);
  const types = unique(
    experience.positions
      .map((position) => position.employmentType)
      .filter((value): value is string => Boolean(value)),
  );
  const range = employmentRange(experience.positions);
  return [...titles, ...types, range].filter(Boolean).join(" - ");
}

function employmentRange(
  positions: ExperiencePositionItemType[],
): string {
  const starts = positions
    .map((position) => position.employmentPeriod?.start)
    .filter((value): value is string => Boolean(value));
  if (starts.length === 0) {
    return "";
  }

  const start = starts.reduce((earliest, current) =>
    periodToSortValue(current) < periodToSortValue(earliest)
      ? current
      : earliest,
  );
  const ongoing = positions.some(
    (position) =>
      Boolean(position.employmentPeriod?.start) &&
      !position.employmentPeriod?.end,
  );
  if (ongoing) {
    return `${start} - present`;
  }

  const ends = positions
    .map((position) => position.employmentPeriod?.end)
    .filter((value): value is string => Boolean(value));
  const end = ends.reduce((latest, current) =>
    periodToSortValue(current) > periodToSortValue(latest)
      ? current
      : latest,
  );
  return `${start} - ${end}`;
}

function periodToSortValue(period: string): number {
  const [month, year] = period.includes(".")
    ? period.split(".")
    : ["01", period];
  return (
    Number.parseInt(year ?? "0", 10) * 12 + Number.parseInt(month ?? "1", 10)
  );
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function CurrentDot() {
  return (
    <span className="relative flex size-2 shrink-0" aria-label="current">
      <span className="absolute inline-flex size-full rounded-full bg-[#39d353] opacity-50 motion-safe:animate-ping" />
      <span className="relative inline-flex size-2 rounded-full bg-[#39d353]" />
    </span>
  );
}

function ExperienceLinks({ links }: { links?: ExperienceLink[] }) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2 pt-3 pl-9">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          >
            {link.icon}
            <span>{link.label}</span>
            <ExternalLinkIcon className="size-3.5 shrink-0" strokeWidth={1.75} />
          </a>
        </li>
      ))}
    </ul>
  );
}

function PositionIcon({ icon }: { icon?: ReactElement }) {
  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-md",
        "bg-muted text-muted-foreground",
        "border border-border",
        "[&_svg]:size-4 [&_svg]:shrink-0",
      )}
    >
      {icon}
    </div>
  );
}

const markdownComponents: Components = {
  a: ({ href, children }) => {
    if (!href) {
      return children;
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {children}
      </a>
    );
  },
};

function Prose({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose prose-sm max-w-[65ch] dark:prose-invert",
        "prose-p:my-2 prose-p:leading-relaxed prose-p:text-muted-foreground",
        "prose-ul:my-1 prose-ul:pl-4 prose-ul:text-muted-foreground",
        "prose-li:my-1 prose-li:leading-relaxed prose-li:text-muted-foreground",
        "prose-strong:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
