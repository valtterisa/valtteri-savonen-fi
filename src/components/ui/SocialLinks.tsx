import type { ReactNode } from "react";
import { ExternalLink } from "./ExternalLink";

type SocialLinkProps = {
  href: string;
  ariaLabel: string;
  children: ReactNode;
};

function SocialLink({ href, ariaLabel, children }: SocialLinkProps) {
  return (
    <ExternalLink
      href={href}
      ariaLabel={ariaLabel}
      className="text-gray-400 hover:text-white transition-colors"
    >
      {children}
    </ExternalLink>
  );
}

function CalIcon() {
  return (
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
      <path d="M35.3599 0H39.0742V20.4427H35.3599V0Z" fill="currentColor" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Root({ children }: { children?: ReactNode }) {
  return <div className="flex items-center gap-4 mb-6">{children}</div>;
}

function Links() {
  return (
    <>
      <SocialLink href="https://cal.com/valtterisa/15min" ariaLabel="Book a meeting">
        <CalIcon />
      </SocialLink>
      <SocialLink href="https://github.com/valtterisa" ariaLabel="GitHub">
        <GitHubIcon />
      </SocialLink>
      <SocialLink href="https://x.com/vvaltterisa" ariaLabel="X (Twitter)">
        <XIcon />
      </SocialLink>
      <SocialLink
        href="https://linkedin.com/in/valtterisavonen"
        ariaLabel="LinkedIn"
      >
        <LinkedInIcon />
      </SocialLink>
    </>
  );
}

export const SocialLinks = {
  Root,
  Links,
};
