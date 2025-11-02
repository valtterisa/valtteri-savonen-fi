import {
  createFileRoute,
  useSearch,
  useNavigate,
} from "@tanstack/react-router";
import { Github, Mail, Linkedin, ExternalLink } from "lucide-react";
import { ProjectsTab } from "~/components/site-components/ProjectsTab";
import { ExperienceTab } from "~/components/site-components/ExperienceTab";
import { BlogTab } from "~/components/site-components/BlogTab";
import { seo } from "~/utils/seo";

type Tab = "projects" | "experience" | "blog";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      tab: (search.tab as Tab) || "projects",
    };
  },
  head: () => ({
    meta: [
      ...seo({
        title: "Valtteri Savonen - Software Engineer",
        description:
          "Full Stack Engineer from Finland. Working for myself, looking for startup ideas, building and doing work for clients. Specializing in Next.js, TypeScript, and modern web technologies.",
        keywords:
          "Valtteri Savonen, full stack engineer, software engineer, web development, Next.js, TypeScript, Finland, Builddrr",
        image: "https://valtterisavonen.fi/og-image.png",
        url: "https://valtterisavonen.fi",
      }),
    ],
    links: [{ rel: "canonical", href: "https://valtterisavonen.fi" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Valtteri Savonen",
          jobTitle: "Software Engineer",
          url: "https://valtterisavonen.fi",
          sameAs: [
            "https://cal.com/valtterisa/15min",
            "https://github.com/valtterisavonen",
            "https://x.com/valtterisavonen",
            "https://linkedin.com/in/valtterisavonen",
          ],
          address: {
            "@type": "PostalAddress",
            addressCountry: "FI",
          },
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate({ from: "/" });
  const { tab } = useSearch({ from: "/" });
  const activeTab = (tab || "projects") as Tab;

  const handleTabChange = (newTab: Tab) => {
    navigate({
      search: { tab: newTab },
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="max-w-xl mx-auto px-6 py-12 md:py-16">
        <header className="mb-8">
          <div className="flex items-center gap-6 mb-6">
            <img
              src="/my-x-profile-pic.jpg"
              alt="Valtteri Savonen"
              className="w-20 h-20 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-bold mb-3">
                Hey, I'm Valtteri
              </h1>
              <p className="text-gray-400 text-sm">
                Software Engineer from Finland. Currently freelancing and
                working on my own products.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <a
              href="https://cal.com/valtterisa/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Book a meeting"
            >
              <svg
                width="20"
                height="10"
                viewBox="0 0 40 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all"
              >
                <path
                  d="M10.0582 20.817C4.32115 20.817 0 16.2763 0 10.6704C0 5.04589 4.1005 0.467773 10.0582 0.467773C13.2209 0.467773 15.409 1.43945 17.1191 3.66311L14.3609 5.96151C13.2025 4.72822 11.805 4.11158 10.0582 4.11158C6.17833 4.11158 4.04533 7.08268 4.04533 10.6704C4.04533 14.2582 6.38059 17.1732 10.0582 17.1732C11.7866 17.1732 13.2577 16.5566 14.4161 15.3233L17.1375 17.7151C15.501 19.8453 13.2577 20.817 10.0582 20.817Z"
                  fill="currentColor"
                />
                <path
                  d="M29.0161 5.88601H32.7304V20.4612H29.0161V18.331C28.2438 19.8446 26.9566 20.8536 24.4927 20.8536C20.5577 20.8536 17.4133 17.4341 17.4133 13.2297C17.4133 9.02528 20.5577 5.60571 24.4927 5.60571C26.9383 5.60571 28.2438 6.61477 29.0161 8.12835V5.88601ZM29.1264 13.2297C29.1264 10.95 27.5634 9.06266 25.0995 9.06266C22.7274 9.06266 21.1828 10.9686 21.1828 13.2297C21.1828 15.4346 22.7274 17.3967 25.0995 17.3967C27.5451 17.3967 29.1264 15.4907 29.1264 13.2297Z"
                  fill="currentColor"
                />
                <path
                  d="M35.3599 0H39.0742V20.4427H35.3599V0Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="https://github.com/valtterisavonen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://x.com/valtterisavonen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="X (Twitter)"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/valtterisavonen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:valtteri@valtterisavonen.fi"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>

          <nav className="flex gap-6 border-b border-gray-800">
            <button
              onClick={() => handleTabChange("projects")}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "projects"
                  ? "text-white border-b-2 border-white -mb-[2px]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => handleTabChange("experience")}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "experience"
                  ? "text-white border-b-2 border-white -mb-[2px]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => handleTabChange("blog")}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "blog"
                  ? "text-white border-b-2 border-white -mb-[2px]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Blog
            </button>
          </nav>
        </header>

        <main className="mt-8">
          {activeTab === "projects" && <ProjectsTab />}
          {activeTab === "experience" && <ExperienceTab />}
          {activeTab === "blog" && <BlogTab />}
        </main>

        <footer className="mt-16 pt-8 border-t border-gray-800 flex justify-between items-center text-sm text-gray-500">
          <span>valtterisavonen.fi</span>
          <span>Built with TanStack Start</span>
        </footer>
      </div>
    </div>
  );
}
