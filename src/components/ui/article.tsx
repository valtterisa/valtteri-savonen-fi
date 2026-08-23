import type { ReactNode } from "react";

type ArticleRootProps = {
  children: ReactNode;
};

function Root({ children }: ArticleRootProps) {
  return <article>{children}</article>;
}

type ArticleHeaderProps = {
  children: ReactNode;
};

function Header({ children }: ArticleHeaderProps) {
  return <header className="mb-8">{children}</header>;
}

type ArticleTitleProps = {
  children: ReactNode;
};

function Title({ children }: ArticleTitleProps) {
  return (
    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight lowercase">
      {children}
    </h1>
  );
}

type ArticleMetaProps = {
  children: ReactNode;
};

function Meta({ children }: ArticleMetaProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
      {children}
    </div>
  );
}

type ArticleAvatarProps = {
  src: string;
  alt: string;
};

function Avatar({ src, alt }: ArticleAvatarProps) {
  return (
    <img src={src} alt={alt} className="w-8 h-8 rounded-full object-cover" />
  );
}

type ArticleBylineProps = {
  children: ReactNode;
};

function Byline({ children }: ArticleBylineProps) {
  return <div className="flex-1">{children}</div>;
}

type ArticleAuthorProps = {
  children: ReactNode;
};

function Author({ children }: ArticleAuthorProps) {
  return <div className="text-foreground">{children}</div>;
}

type ArticleDateProps = {
  datetime: string;
  children: ReactNode;
};

function Date({ datetime, children }: ArticleDateProps) {
  return <time dateTime={datetime}>{children}</time>;
}

type ArticleTagsProps = {
  children: ReactNode;
};

function Tags({ children }: ArticleTagsProps) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}

type ArticleTagProps = {
  children: ReactNode;
};

function Tag({ children }: ArticleTagProps) {
  return (
    <span className="px-2 py-0.5 text-xs text-muted-foreground bg-muted rounded-full">
      {children}
    </span>
  );
}

type ArticleContentProps = {
  html: string;
};

const proseClassName = [
  "prose prose-sm max-w-[65ch] text-foreground",
  "[--tw-prose-body:var(--foreground)] [--tw-prose-bold:var(--foreground)] [--tw-prose-counters:var(--foreground)] [--tw-prose-bullets:var(--foreground)] [--tw-prose-quotes:var(--foreground)] [--tw-prose-lead:var(--foreground)] [--tw-prose-headings:var(--foreground)] [--tw-prose-captions:var(--foreground)] [--tw-prose-code:var(--foreground)] [--tw-prose-links:var(--muted-foreground)]",
  "prose-headings:text-foreground prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4",
  "prose-h1:text-3xl prose-h1:font-bold prose-h1:mt-10 prose-h1:mb-5",
  "prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4",
  "prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3",
  "prose-p:my-2 prose-p:leading-relaxed prose-p:text-foreground",
  "prose-a:text-muted-foreground prose-a:font-normal prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-foreground",
  "prose-strong:text-foreground prose-strong:font-semibold",
  "prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono",
  "prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-3 prose-pre:overflow-x-auto prose-pre:my-4",
  "prose-blockquote:border-l-4 prose-blockquote:border-border prose-blockquote:text-foreground prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4",
  "prose-img:rounded-lg prose-img:my-5 prose-img:w-full prose-img:h-auto",
  "prose-ul:my-1 prose-ul:pl-4 prose-ul:text-foreground",
  "prose-ol:my-1 prose-ol:pl-4 prose-ol:text-foreground",
  "prose-li:my-1 prose-li:leading-relaxed prose-li:text-foreground",
  "prose-hr:border-border prose-hr:my-5",
].join(" ");

function Content({ html }: ArticleContentProps) {
  return <div className={proseClassName} dangerouslySetInnerHTML={{ __html: html }} />;
}

export const Article = {
  Root,
  Header,
  Title,
  Meta,
  Avatar,
  Byline,
  Author,
  Date,
  Tags,
  Tag,
  Content,
};
