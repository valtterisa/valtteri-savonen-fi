import { contributions, projects } from "../../lib/content";
import { WorkExperience } from "../work-experience";
import { toWorkExperience } from "./map-work-experience";

export function ProjectsPanel() {
  return (
    <div className="flex w-full flex-col gap-8">
      <section
        aria-labelledby="contributions-heading"
        className="rounded-lg border border-border bg-muted/30 px-4 py-4 sm:px-5"
      >
        <h2
          id="contributions-heading"
          className="flex items-center gap-2 pb-4 font-mono text-xs tracking-wide text-muted-foreground uppercase"
        >
          Contributing to OSS
        </h2>
        <WorkExperience
          className="w-full [&_article]:first:pt-0 [&_article]:last:pb-0"
          experiences={toWorkExperience(contributions)}
        />
      </section>

      <WorkExperience
        className="w-full"
        experiences={toWorkExperience(projects)}
      />
    </div>
  );
}
