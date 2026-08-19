import type { ReactNode } from "react";

type SiteShellRootProps = {
  children: ReactNode;
};

function Root({ children }: SiteShellRootProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">{children}</div>
  );
}

type SiteShellContainerProps = {
  children: ReactNode;
  className?: string;
};

function Container({ children, className = "" }: SiteShellContainerProps) {
  return (
    <div className={`max-w-xl mx-auto px-6 py-12 md:py-16 ${className}`.trim()}>
      {children}
    </div>
  );
}

type SiteShellHeaderProps = {
  children: ReactNode;
};

function Header({ children }: SiteShellHeaderProps) {
  return <header className="mb-8">{children}</header>;
}

type SiteShellMainProps = {
  children: ReactNode;
};

function Main({ children }: SiteShellMainProps) {
  return <main className="mt-8">{children}</main>;
}

export const SiteShell = {
  Root,
  Container,
  Header,
  Main,
};
