import type { ReactNode } from "react";
import type { Tab } from "../../lib/content";

type TabsRootProps = {
  children: ReactNode;
};

function Root({ children }: TabsRootProps) {
  return <nav className="flex gap-6 border-b border-gray-800">{children}</nav>;
}

type TabsTriggerProps = {
  href: string;
  active: boolean;
  children: ReactNode;
};

function Trigger({ href, active, children }: TabsTriggerProps) {
  const base = "pb-3 text-sm font-medium transition-colors";
  const className = active
    ? `${base} text-white border-b-2 border-white -mb-[2px]`
    : `${base} text-gray-500 hover:text-gray-300`;

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

type TabsListProps = {
  activeTab: Tab;
};

function List({ activeTab }: TabsListProps) {
  const tabs: Array<{ id: Tab; label: string; href: string }> = [
    { id: "projects", label: "projects", href: "/?tab=projects" },
    { id: "experience", label: "experience", href: "/?tab=experience" },
    { id: "blog", label: "blog", href: "/?tab=blog" },
  ];

  return (
    <>
      {tabs.map((tab) => (
        <Trigger key={tab.id} href={tab.href} active={activeTab === tab.id}>
          {tab.label}
        </Trigger>
      ))}
    </>
  );
}

export const Tabs = {
  Root,
  List,
  Trigger,
};
