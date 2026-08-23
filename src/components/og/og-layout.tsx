import type { ReactNode } from "react";
import { SITE_URL } from "../../lib/site";

const CANVAS = {
  width: 1200,
  height: 630,
  background: "#0a0a0a",
  border: "#1f2937",
  text: "#f3f4f6",
  muted: "#9ca3af",
  accent: "#39d353",
} as const;

type OgRootProps = {
  children: ReactNode;
};

function Root({ children }: OgRootProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: CANVAS.background,
        color: CANVAS.text,
        padding: "64px",
        fontFamily: "Inter",
      }}
    >
      {children}
    </div>
  );
}

type OgMainProps = {
  children: ReactNode;
};

function Main({ children }: OgMainProps) {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        gap: "24px",
      }}
    >
      {children}
    </div>
  );
}

type OgBadgeProps = {
  children: ReactNode;
};

function Badge({ children }: OgBadgeProps) {
  return (
    <div
      style={{
        display: "flex",
        alignSelf: "flex-start",
        fontSize: "22px",
        fontWeight: 600,
        color: CANVAS.accent,
        background: "rgba(57, 211, 83, 0.12)",
        padding: "10px 18px",
        borderRadius: "999px",
        letterSpacing: "0.02em",
        textTransform: "lowercase",
      }}
    >
      {children}
    </div>
  );
}

type OgTitleProps = {
  children: ReactNode;
};

function Title({ children }: OgTitleProps) {
  return (
    <div
      style={{
        fontSize: "72px",
        fontWeight: 700,
        lineHeight: 1.05,
        letterSpacing: "-0.03em",
        maxWidth: "980px",
      }}
    >
      {children}
    </div>
  );
}

type OgSubtitleProps = {
  children: ReactNode;
};

function Subtitle({ children }: OgSubtitleProps) {
  return (
    <div
      style={{
        fontSize: "32px",
        fontWeight: 400,
        lineHeight: 1.4,
        color: CANVAS.muted,
        maxWidth: "920px",
      }}
    >
      {children}
    </div>
  );
}

type OgFooterProps = {
  children?: ReactNode;
};

function Footer({ children }: OgFooterProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: `1px solid ${CANVAS.border}`,
        paddingTop: "28px",
        fontSize: "24px",
        color: CANVAS.muted,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {children}
      </div>
      <div>{SITE_URL.replace("https://", "")}</div>
    </div>
  );
}

type OgAvatarProps = {
  src: string;
  alt: string;
};

function Avatar({ src, alt }: OgAvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={56}
      height={56}
      style={{
        borderRadius: "999px",
        objectFit: "cover",
      }}
    />
  );
}

type OgMetaProps = {
  children: ReactNode;
};

function Meta({ children }: OgMetaProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        fontSize: "24px",
        color: CANVAS.muted,
      }}
    >
      {children}
    </div>
  );
}

export const OgLayout = {
  Root,
  Main,
  Badge,
  Title,
  Subtitle,
  Footer,
  Avatar,
  Meta,
};
