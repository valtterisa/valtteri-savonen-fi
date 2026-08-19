import type { ReactNode } from "react";
import type { Tab } from "../../lib/content";

type TabsRootProps = {
  children: ReactNode;
};

function Root({ children }: TabsRootProps) {
  return <nav className="flex gap-6 border-b border-gray-800">{children}</nav>;
}

type TabsTriggerProps = {
  active: boolean;
  onSelect: () => void;
  children: ReactNode;
};

function Trigger({ active, onSelect, children }: TabsTriggerProps) {
  const base = "pb-3 text-sm font-medium transition-colors";
  const className = active
    ? `${base} text-white border-b-2 border-white -mb-[2px]`
    : `${base} text-gray-500 hover:text-gray-300`;

  return (
    <button type="button" onClick={onSelect} className={className}>
      {children}
    </button>
  );
}

type TabsListProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

function List({ activeTab, onTabChange }: TabsListProps) {
  const tabs: Array<{ id: Tab; label: string }> = [
    { id: "projects", label: "projects" },
    { id: "experience", label: "experience" },
    { id: "blog", label: "blog" },
  ];

  return (
    <>
      {tabs.map((tab) => (
        <Trigger
          key={tab.id}
          active={activeTab === tab.id}
          onSelect={() => onTabChange(tab.id)}
        >
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
