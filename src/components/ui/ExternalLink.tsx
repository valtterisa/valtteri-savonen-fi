import type { ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function ExternalLink({
  href,
  children,
  className = "",
  ariaLabel,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  );
}

type InlineExternalLinkProps = {
  href: string;
  children: ReactNode;
};

export function InlineExternalLink({ href, children }: InlineExternalLinkProps) {
  return (
    <ExternalLink
      href={href}
      className="text-gray-300 hover:text-white transition-colors underline underline-offset-2"
    >
      {children}
    </ExternalLink>
  );
}
