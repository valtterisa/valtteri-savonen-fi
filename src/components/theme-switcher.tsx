import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/lib/click-soft";
import { cn } from "@/lib/utils";
import {
  setThemeCookie,
  themeColor,
  type Theme,
} from "@/lib/theme";

function readTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  setThemeCookie(theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // ignore
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", themeColor(theme));
  }
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  if (target.isContentEditable) {
    return true;
  }
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

export function ThemeSwitcher({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document === "undefined" ? "dark" : readTheme(),
  );
  const [play] = useSound(clickSoftSound);

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const changeTheme = useCallback(
    (next: Theme) => {
      if (next === readTheme()) {
        return;
      }
      applyTheme(next);
      setTheme(next);
      play();
    },
    [play],
  );

  const toggleTheme = useCallback(() => {
    changeTheme(readTheme() === "dark" ? "light" : "dark");
  }, [changeTheme]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }
      if (isTypingTarget(event.target)) {
        return;
      }
      if (event.key.toLowerCase() !== "d") {
        return;
      }
      event.preventDefault();
      toggleTheme();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleTheme]);

  const label =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={cn("relative shrink-0", className)}
            aria-label={label}
          >
            <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end">
          Toggle theme <Kbd>D</Kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
