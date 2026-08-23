export const SITE_URL = "https://valtterisavonen.fi";
export const SITE_NAME = "Valtteri Savonen";
export const SITE_HANDLE = "@valtterisavonen";
export const DEFAULT_DESCRIPTION =
  "Full Stack Engineer from Finland. Building products, freelancing, and writing about software.";
export const PERSON_ID = `${SITE_URL}/#person`;
export const PROFILE_IMAGE_PATH = "/my-x-profile-pic.jpg";

export type SocialLinkId = "cal" | "github" | "x" | "linkedin";

export type SocialLink = {
  id: SocialLinkId;
  label: string;
  href: string;
  ariaLabel: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "cal",
    label: "Book a call",
    href: "https://cal.com/valtterisa/15min",
    ariaLabel: "Book a meeting",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/valtterisa",
    ariaLabel: "GitHub",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/vvaltterisa",
    ariaLabel: "X (Twitter)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/valtterisavonen",
    ariaLabel: "LinkedIn",
  },
];

export const SAME_AS = SOCIAL_LINKS.map((link) => link.href);

export function socialHref(id: SocialLinkId): string {
  const match = SOCIAL_LINKS.find((link) => link.id === id);
  if (!match) {
    throw new Error(`Unknown social link: ${id}`);
  }
  return match.href;
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

export function ogImageUrl(path: string): string {
  return absoluteUrl(path);
}
