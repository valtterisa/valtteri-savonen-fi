import { useEffect, useRef } from "react";
import type { ContributionGraph as ContributionGraphData } from "../../lib/contrib";
import {
  hideContributionTip,
  positionContributionTip,
} from "../../lib/contribTip";
import { ExternalLink } from "./ExternalLink";

type ContributionGraphRootProps = {
  graph: ContributionGraphData;
};

function Root({ graph }: ContributionGraphRootProps) {
  if (graph.days.length === 0) {
    return null;
  }

  return <ContributionGraphFrame graph={graph} />;
}

function ContributionGraphFrame({ graph }: ContributionGraphRootProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const activeDayRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    const frame = frameRef.current;
    const tip = tipRef.current;
    if (!el || !frame || !tip) return;

    function syncFade() {
      const noScroll = el!.scrollWidth <= el!.clientWidth + 2;
      const atStart = noScroll || el!.scrollLeft <= 2;
      const atEnd =
        noScroll || el!.scrollLeft + el!.clientWidth >= el!.scrollWidth - 2;
      frame!.classList.toggle("at-start", atStart);
      frame!.classList.toggle("at-end", atEnd);
    }

    function showTip(target: HTMLElement) {
      const label = target.getAttribute("data-tip");
      if (!label) return;

      tip!.textContent = label;
      activeDayRef.current = target;

      const position = positionContributionTip(tip!, target.getBoundingClientRect());
      tip!.style.left = `${position.left}px`;
      tip!.style.top = `${position.top}px`;
      tip!.style.transform = position.transform;
    }

    el.scrollLeft = el.scrollWidth;
    syncFade();

    function onWheel(event: WheelEvent) {
      if (el!.scrollWidth <= el!.clientWidth) return;
      el!.scrollLeft += event.deltaY + event.deltaX;
      event.preventDefault();
    }

    function onPointerOver(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      const target = (event.target as HTMLElement | null)?.closest("[data-tip]");
      if (!target || !(target instanceof HTMLElement)) return;
      showTip(target);
    }

    function onPointerOut(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      const related = event.relatedTarget as Node | null;
      if (related && el!.contains(related)) return;
      hideContributionTip(tip!);
      activeDayRef.current = null;
    }

    function onPointerDown(event: PointerEvent) {
      const target = (event.target as HTMLElement | null)?.closest("[data-tip]");
      if (!target || !(target instanceof HTMLElement) || !el!.contains(target)) {
        hideContributionTip(tip!);
        activeDayRef.current = null;
        return;
      }

      event.preventDefault();

      if (activeDayRef.current === target && !tip!.hidden) {
        hideContributionTip(tip!);
        activeDayRef.current = null;
        return;
      }

      showTip(target);
    }

    function onScroll() {
      hideContributionTip(tip!);
      activeDayRef.current = null;
      syncFade();
    }

    function onResize() {
      if (!activeDayRef.current || tip!.hidden) return;
      showTip(activeDayRef.current);
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerover", onPointerOver);
    el.addEventListener("pointerout", onPointerOut);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerover", onPointerOver);
      el.removeEventListener("pointerout", onPointerOut);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [graph.days.length]);

  return (
    <>
      <div className="contrib-block">
        <div className="contrib-frame" ref={frameRef}>
          <div className="contrib-scroll" ref={scrollRef}>
            <Grid days={graph.days} />
          </div>
          <div className="contrib-fade contrib-fade-left" />
          <div className="contrib-fade contrib-fade-right" />
        </div>
        <Caption text={graph.caption} />
      </div>
      <div ref={tipRef} id="contrib-tip" className="contrib-tip" hidden />
    </>
  );
}

type GridProps = {
  days: ContributionGraphData["days"];
};

function Grid({ days }: GridProps) {
  return (
    <div className="contrib">
      {days.map((day) => (
        <Day key={day.date} level={day.level} tip={day.tip} />
      ))}
    </div>
  );
}

type DayProps = {
  level: number;
  tip: string;
};

function Day({ level, tip }: DayProps) {
  return (
    <span
      className={`l${level}`}
      data-tip={tip}
      aria-label={tip}
      role="button"
      tabIndex={0}
    />
  );
}

type CaptionProps = {
  text: string;
};

function Caption({ text }: CaptionProps) {
  return (
    <p className="contrib-caption">
      {text} ·{" "}
      <ExternalLink
        href="https://github.com/valtterisa"
        className="contrib-source"
      >
        source
      </ExternalLink>
    </p>
  );
}

export const ContributionGraph = {
  Root,
  Grid,
  Day,
  Caption,
};
