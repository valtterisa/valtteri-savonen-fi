import { useState } from "react";
import { useTabState } from "../../hooks/use-tab-state";
import type { Tab } from "../../lib/content";
import { PROFILE_IMAGE_PATH } from "../../lib/site";
import { SiteShell } from "../ui/site-shell";
import { Profile } from "../ui/profile";
import { ThemeSwitcher } from "../theme-switcher";
import { SocialLinks } from "../ui/social-links";
import { ContributionGraph } from "../ui/contribution-graph";
import { Tabs } from "../ui/tabs";
import { ProjectsPanel } from "./projects-panel";
import { ExperiencePanel } from "./experience-panel";
import { BlogPanel, type BlogPostSummary } from "./blog-panel";

type HomePageProps = {
  activeTab: Tab;
  initialPosts: BlogPostSummary[];
};

function TabPanel({
  activeTab,
  posts,
  postsFailed,
}: Pick<HomePageProps, "activeTab"> & {
  posts: BlogPostSummary[];
  postsFailed: boolean;
}) {
  switch (activeTab) {
    case "experience":
      return <ExperiencePanel />;
    case "blog":
      return <BlogPanel posts={posts} failed={postsFailed} />;
    default:
      return <ProjectsPanel />;
  }
}

export function HomePage({
  activeTab: initialTab,
  initialPosts,
}: HomePageProps) {
  const { activeTab, setActiveTab } = useTabState(initialTab);
  const [posts] = useState(initialPosts);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <SiteShell.Root>
      <SiteShell.Container>
        <SiteShell.Header>
          <Profile.Root>
            <Profile.Avatar src={PROFILE_IMAGE_PATH} alt="Valtteri Savonen" />
            <Profile.Content>
              <Profile.Title>hey, i'm valtteri!</Profile.Title>
              <Profile.Subtitle>building stuff</Profile.Subtitle>
            </Profile.Content>
            <ThemeSwitcher className="ml-auto" />
          </Profile.Root>

          <SocialLinks.Root>
            <SocialLinks.Links />
          </SocialLinks.Root>

          <ContributionGraph.Root />

          <Tabs.Root>
            <Tabs.List
              activeTab={activeTab}
              onTabChange={handleTabChange}
              blogLoading={false}
            />
          </Tabs.Root>
        </SiteShell.Header>

        <SiteShell.Main>
          <TabPanel
            activeTab={activeTab}
            posts={posts}
            postsFailed={false}
          />
        </SiteShell.Main>
      </SiteShell.Container>
    </SiteShell.Root>
  );
}
