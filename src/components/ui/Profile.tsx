import type { ReactNode } from "react";

type ProfileRootProps = {
  children: ReactNode;
};

function Root({ children }: ProfileRootProps) {
  return <div className="flex items-center gap-6 mb-6">{children}</div>;
}

type ProfileAvatarProps = {
  src: string;
  alt: string;
};

function Avatar({ src, alt }: ProfileAvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-20 h-20 rounded-full object-cover flex-shrink-0"
    />
  );
}

type ProfileContentProps = {
  children: ReactNode;
};

function Content({ children }: ProfileContentProps) {
  return <div className="flex-1">{children}</div>;
}

type ProfileTitleProps = {
  children: ReactNode;
};

function Title({ children }: ProfileTitleProps) {
  return <h1 className="text-xl md:text-2xl font-bold mb-3">{children}</h1>;
}

type ProfileSubtitleProps = {
  children: ReactNode;
};

function Subtitle({ children }: ProfileSubtitleProps) {
  return <p className="text-gray-400 text-sm">{children}</p>;
}

export const Profile = {
  Root,
  Avatar,
  Content,
  Title,
  Subtitle,
};
