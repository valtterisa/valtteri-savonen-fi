import type { ReactNode } from "react";

function ExternalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1 2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

type ActionLinkProps = {
  href: string;
  label: string;
  icon?: ReactNode;
};

function ActionLink({ href, label, icon }: ActionLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
    >
      {icon}
      <span className="text-sm">{label}</span>
      <ExternalIcon />
    </a>
  );
}

type ActionGroupProps = {
  children: ReactNode;
};

function ActionGroup({ children }: ActionGroupProps) {
  return <div className="flex gap-3 items-start">{children}</div>;
}

export const LinkActions = {
  Group: ActionGroup,
  Link: ActionLink,
};
