import { useCallback, useEffect, useRef, useState } from "react";
import { useTabState } from "../../hooks/useTabState";
import type { Tab } from "../../lib/content";
import type { Project, Experience } from "../../lib/content";
import type { ContributionGraph as ContributionGraphData } from "../../lib/contrib";
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
  projects: Project[];
  experiences: Experience[];
};

function TabPanel({
  activeTab,
  projects,
  experiences,
  posts,
  postsFailed,
}: Pick<HomePageProps, "activeTab" | "projects" | "experiences"> & {
  posts: BlogPostSummary[];
  postsFailed: boolean;
}) {
  switch (activeTab) {
    case "experience":
      return <ExperiencePanel experiences={experiences} />;
    case "blog":
      return <BlogPanel posts={posts} failed={postsFailed} />;
    default:
      return <ProjectsPanel projects={projects} />;
  }
}

async function fetchPosts(): Promise<BlogPostSummary[]> {
  const response = await fetch("/api/posts");
  if (!response.ok) {
    throw new Error(`posts ${response.status}`);
  }
  const data = (await response.json()) as { posts?: BlogPostSummary[] };
  return Array.isArray(data.posts) ? data.posts : [];
}

export function HomePage({
  activeTab: initialTab,
  graph,
  projects,
  experiences,
}: HomePageProps) {
  const { activeTab, setActiveTab } = useTabState(
    initialTab === "blog" ? "projects" : initialTab,
  );
  const [posts, setPosts] = useState<BlogPostSummary[] | null>(null);
  const [postsFailed, setPostsFailed] = useState(false);
  const [blogLoading, setBlogLoading] = useState(initialTab === "blog");
  const blogRequestRef = useRef(0);

  const loadBlog = useCallback(async () => {
    const requestId = ++blogRequestRef.current;
    setBlogLoading(true);

    try {
      const nextPosts = await fetchPosts();
      if (blogRequestRef.current !== requestId) {
        return;
      }
      setPosts(nextPosts);
    } catch {
      if (blogRequestRef.current !== requestId) {
        return;
      }
      setPostsFailed(true);
    }

    if (blogRequestRef.current !== requestId) {
      return;
    }
    setBlogLoading(false);
    setActiveTab("blog");
  }, [setActiveTab]);

  useEffect(() => {
    if (initialTab !== "blog") {
      return;
    }

    void loadBlog();

    return () => {
      blogRequestRef.current += 1;
    };
  }, [initialTab, loadBlog]);

  const handleTabChange = (tab: Tab) => {
    if (tab !== "blog") {
      blogRequestRef.current += 1;
      setBlogLoading(false);
      setActiveTab(tab);
      return;
    }

    if (posts !== null || postsFailed) {
      setActiveTab("blog");
      return;
    }

    void loadBlog();
  };

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
            <Tabs.List
              activeTab={activeTab}
              onTabChange={handleTabChange}
              blogLoading={blogLoading}
            />
          </Tabs.Root>
        </SiteShell.Header>

        <SiteShell.Main>
          <TabPanel
            activeTab={activeTab}
            projects={projects}
            experiences={experiences}
            posts={posts ?? []}
            postsFailed={postsFailed}
          />
        </SiteShell.Main>
      </SiteShell.Container>
    </SiteShell.Root>
  );
}
