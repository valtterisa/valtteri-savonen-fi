import { OgLayout } from "./OgLayout";
import { absoluteUrl, SITE_NAME } from "../../lib/site";

export function BlogIndexOgImage() {
  return (
    <OgLayout.Root>
      <OgLayout.Main>
        <OgLayout.Badge>blog</OgLayout.Badge>
        <OgLayout.Title>writing about building software</OgLayout.Title>
        <OgLayout.Subtitle>
          notes on products, engineering, and things i&apos;m learning.
        </OgLayout.Subtitle>
      </OgLayout.Main>
      <OgLayout.Footer>
        <OgLayout.Avatar
          src={absoluteUrl("/my-x-profile-pic.jpg")}
          alt={SITE_NAME}
        />
        <OgLayout.Meta>
          <div style={{ color: "#f3f4f6", fontWeight: 600 }}>{SITE_NAME}</div>
          <div>valtterisavonen.fi/blog</div>
        </OgLayout.Meta>
      </OgLayout.Footer>
    </OgLayout.Root>
  );
}
