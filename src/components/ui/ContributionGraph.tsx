import { useEffect, useRef } from "react";
import type { ContributionGraph as ContributionGraphData } from "../../lib/contrib";
import { ExternalLink } from "./ExternalLink";

type ContributionGraphRootProps = {
  graph: ContributionGraphData;
};

function Root({ graph }: ContributionGraphRootProps) {
  if (graph.days.length === 0) {
    return null;
  }

  return (
    <ContributionGraphFrame graph={graph} />
  );
}

function ContributionGraphFrame({ graph }: ContributionGraphRootProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    const frame = frameRef.current;
    const tip = tipRef.current;
    if (!el || !frame) return;

    function syncFade() {
      const noScroll = el!.scrollWidth <= el!.clientWidth + 2;
      const atStart = noScroll || el!.scrollLeft <= 2;
      const atEnd =
        noScroll || el!.scrollLeft + el!.clientWidth >= el!.scrollWidth - 2;
      frame!.classList.toggle("at-start", atStart);
      frame!.classList.toggle("at-end", atEnd);
    }

    el.scrollLeft = el.scrollWidth;
    syncFade();

    function onWheel(event: WheelEvent) {
      if (el!.scrollWidth <= el!.clientWidth) return;
      el!.scrollLeft += event.deltaY + event.deltaX;
      event.preventDefault();
    }

    function onMouseOver(event: MouseEvent) {
      const target = (event.target as HTMLElement | null)?.closest("[data-tip]");
      if (!target || !tip) return;
      const rect = target.getBoundingClientRect();
      tip.textContent = target.getAttribute("data-tip");
      tip.style.left = `${rect.left + rect.width / 2}px`;
      tip.style.top = `${rect.top}px`;
      tip.hidden = false;
    }

    function onMouseOut(event: MouseEvent) {
      if (!tip) return;
      const related = event.relatedTarget as Node | null;
      if (related && el!.contains(related)) return;
      tip.hidden = true;
    }

    function onScroll() {
      if (tip) tip.hidden = true;
      syncFade();
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("mouseover", onMouseOver);
    el.addEventListener("mouseout", onMouseOut);
    el.addEventListener("scroll", onScroll);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("mouseover", onMouseOver);
      el.removeEventListener("mouseout", onMouseOut);
      el.removeEventListener("scroll", onScroll);
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
