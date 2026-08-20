import type { ReactNode } from "react";
import type { Tab } from "../../lib/content";

type TabsRootProps = {
  children: ReactNode;
};

function Root({ children }: TabsRootProps) {
  return <nav className="flex gap-6 border-b border-gray-800">{children}</nav>;
}

function Spinner() {
  return (
    <span
      className="inline-block h-3.5 w-3.5 shrink-0 rounded-full border-2 border-gray-500 border-t-white animate-spin"
      aria-hidden="true"
    />
  );
}

type TabsTriggerProps = {
  active: boolean;
  onSelect: () => void;
  loading?: boolean;
  children: ReactNode;
};

function Trigger({ active, onSelect, loading = false, children }: TabsTriggerProps) {
  const base = "pb-3 text-sm font-medium transition-colors";
  const layout = loading ? " inline-flex items-center gap-2" : "";
  const className = active
    ? `${base}${layout} text-white border-b-2 border-white -mb-[2px]`
    : `${base}${layout} text-gray-500 hover:text-gray-300`;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={className}
      aria-busy={loading || undefined}
      disabled={loading}
    >
      {children}
      {loading ? <Spinner /> : null}
    </button>
  );
}

type TabsListProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  blogLoading?: boolean;
};

function List({ activeTab, onTabChange, blogLoading = false }: TabsListProps) {
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
          loading={tab.id === "blog" && blogLoading}
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
