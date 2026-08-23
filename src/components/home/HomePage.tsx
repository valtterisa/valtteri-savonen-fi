import { useState } from "react";
import { useTabState } from "../../hooks/useTabState";
import type { Tab } from "../../lib/content";
import type { ContributionGraph as ContributionGraphData } from "../../lib/contrib";
import { CURRENT_FOCUS_NAME, CURRENT_FOCUS_URL } from "../../lib/profile";
import { PROFILE_IMAGE_PATH, socialHref } from "../../lib/site";
import { SiteShell } from "../ui/SiteShell";
import { Profile } from "../ui/Profile";
import { InlineExternalLink } from "../ui/ExternalLink";
import { SocialLinks } from "../ui/SocialLinks";
import { ContributionGraph } from "../ui/ContributionGraph";
import { Tabs } from "../ui/Tabs";
import { ProjectsPanel } from "./ProjectsPanel";
import { ExperiencePanel } from "./ExperiencePanel";
import { BlogPanel, type BlogPostSummary } from "./BlogPanel";

type HomePageProps = {
  activeTab: Tab;
  graph: ContributionGraphData;
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
  graph,
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
              <Profile.Subtitle>
                currently building{" "}
                <InlineExternalLink href={CURRENT_FOCUS_URL}>
                  {CURRENT_FOCUS_NAME}
                </InlineExternalLink>
                . full-stack engineer in Finland. freelance via{" "}
                <InlineExternalLink href={socialHref("cal")}>
                  cal.com
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
