const VIEWPORT_PADDING = 8;

type TipPosition = {
  left: number;
  top: number;
  transform: string;
};

export function positionContributionTip(
  tip: HTMLElement,
  anchor: DOMRect,
): TipPosition {
  tip.hidden = false;

  const tipRect = tip.getBoundingClientRect();
  const tipWidth = tipRect.width || tip.offsetWidth;
  const tipHeight = tipRect.height || tip.offsetHeight;

  let transform = "translate(-50%, calc(-100% - 8px))";
  let top = anchor.top;
  let left = anchor.left + anchor.width / 2;

  if (top - tipHeight - VIEWPORT_PADDING < 0) {
    transform = "translate(-50%, 8px)";
    top = anchor.bottom;
  }

  const halfWidth = tipWidth / 2;
  const minLeft = VIEWPORT_PADDING + halfWidth;
  const maxLeft = window.innerWidth - VIEWPORT_PADDING - halfWidth;
  left = Math.min(Math.max(left, minLeft), maxLeft);

  return { left, top, transform };
}

export function hideContributionTip(tip: HTMLElement): void {
  tip.hidden = true;
}
