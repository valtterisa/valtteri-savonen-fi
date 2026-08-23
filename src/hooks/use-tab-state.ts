import { useCallback, useEffect, useState } from "react";
import { normalizeTab, type Tab } from "../lib/content";

function tabHref(tab: Tab): string {
  return tab === "projects" ? "/" : `/?tab=${tab}`;
}

function readTabFromLocation(): Tab {
  if (typeof window === "undefined") {
    return "projects";
  }
  return normalizeTab(new URLSearchParams(window.location.search).get("tab"));
}

export function useTabState(initialTab: Tab): {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
} {
  const [activeTab, setActiveTabState] = useState<Tab>(initialTab);

  useEffect(() => {
    setActiveTabState(initialTab);
  }, [initialTab]);

  useEffect(() => {
    function onPopState() {
      setActiveTabState(readTabFromLocation());
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const setActiveTab = useCallback((tab: Tab) => {
    setActiveTabState(tab);
    const nextUrl = tabHref(tab);
    if (window.location.pathname + window.location.search !== nextUrl) {
      window.history.pushState({ tab }, "", nextUrl);
    }
  }, []);

  return { activeTab, setActiveTab };
}
