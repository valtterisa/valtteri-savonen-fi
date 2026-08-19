import type { Tab } from "../../lib/content";
import type { Project, Experience } from "../../lib/content";
import type { Post } from "../../lib/marble";
import type { ContributionGraph as ContributionGraphData } from "../../lib/contrib";
import { SiteShell } from "../ui/SiteShell";
import { Profile } from "../ui/Profile";
import { InlineExternalLink } from "../ui/ExternalLink";
import { SocialLinks } from "../ui/SocialLinks";
import { ContributionGraph } from "../ui/ContributionGraph";
import { Tabs } from "../ui/Tabs";
import { ProjectsPanel } from "./ProjectsPanel";
import { ExperiencePanel } from "./ExperiencePanel";
import { BlogPanel } from "./BlogPanel";

type HomePageProps = {
  activeTab: Tab;
  graph: ContributionGraphData;
  projects: Project[];
  experiences: Experience[];
  posts: Post[];
};

function TabPanel({
  activeTab,
  projects,
  experiences,
  posts,
}: Pick<HomePageProps, "activeTab" | "projects" | "experiences" | "posts">) {
  switch (activeTab) {
    case "experience":
      return <ExperiencePanel experiences={experiences} />;
    case "blog":
      return <BlogPanel posts={posts} />;
    default:
      return <ProjectsPanel projects={projects} />;
  }
}

export function HomePage({
  activeTab,
  graph,
  projects,
  experiences,
  posts,
}: HomePageProps) {
  return (
    <SiteShell.Root>
      <SiteShell.Container>
        <SiteShell.Header>
          <Profile.Root>
            <Profile.Avatar src="/my-x-profile-pic.jpg" alt="Valtteri Savonen" />
            <Profile.Content>
              <Profile.Title>hey, i'm valtteri!</Profile.Title>
              <Profile.Subtitle>
                currently building{" "}
                <InlineExternalLink href="https://quickshops.app">
                  quickshops.app
                </InlineExternalLink>
                .
              </Profile.Subtitle>
            </Profile.Content>
          </Profile.Root>

          <SocialLinks.Root>
            <SocialLinks.Links />
          </SocialLinks.Root>

          <ContributionGraph.Root graph={graph} />

          <Tabs.Root>
            <Tabs.List activeTab={activeTab} />
          </Tabs.Root>
        </SiteShell.Header>

        <SiteShell.Main>
          <TabPanel
            activeTab={activeTab}
            projects={projects}
            experiences={experiences}
            posts={posts}
          />
        </SiteShell.Main>
      </SiteShell.Container>
    </SiteShell.Root>
  );
}
