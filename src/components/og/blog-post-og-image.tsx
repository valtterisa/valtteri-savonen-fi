import { OgLayout } from "./OgLayout";
import { absoluteUrl, SITE_NAME } from "../../lib/site";

type BlogPostOgImageProps = {
  title: string;
  description: string;
  authorName: string;
  publishedDisplay?: string;
};

export function BlogPostOgImage({
  title,
  description,
  authorName,
  publishedDisplay,
}: BlogPostOgImageProps) {
  return (
    <OgLayout.Root>
      <OgLayout.Main>
        <OgLayout.Badge>blog post</OgLayout.Badge>
        <OgLayout.Title>{title}</OgLayout.Title>
        <OgLayout.Subtitle>{description}</OgLayout.Subtitle>
      </OgLayout.Main>
      <OgLayout.Footer>
        <OgLayout.Avatar
          src={absoluteUrl("/my-x-profile-pic.jpg")}
          alt={authorName}
        />
        <OgLayout.Meta>
          <div style={{ color: "#f3f4f6", fontWeight: 600 }}>{authorName}</div>
          <div>{publishedDisplay ?? SITE_NAME}</div>
        </OgLayout.Meta>
      </OgLayout.Footer>
    </OgLayout.Root>
  );
}
