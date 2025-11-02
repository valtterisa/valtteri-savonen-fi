import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import { Databuddy } from "@databuddy/sdk/react";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
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
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#000000" },
      { rel: "icon", href: "/favicon.ico" },
    ],
    scripts: [],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Databuddy
        clientId="gHCzLL73h4zbC94EXh5c1"
        trackInteractions={true}
        trackBounceRate={true}
        enableBatching={true}
      />
      <div className="flex min-h-screen w-full">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-black text-white">
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
