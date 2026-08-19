import { OgLayout } from "./OgLayout";
import { absoluteUrl, SITE_NAME } from "../../lib/site";

export function HomeOgImage() {
  return (
    <OgLayout.Root>
      <OgLayout.Main>
        <OgLayout.Badge>software engineer</OgLayout.Badge>
        <OgLayout.Title>hey, i&apos;m valtteri!</OgLayout.Title>
        <OgLayout.Subtitle>
          building quickshops.app and shipping products from finland.
        </OgLayout.Subtitle>
      </OgLayout.Main>
      <OgLayout.Footer>
        <OgLayout.Avatar
          src={absoluteUrl("/my-x-profile-pic.jpg")}
          alt={SITE_NAME}
        />
        <OgLayout.Meta>
          <div style={{ color: "#f3f4f6", fontWeight: 600 }}>{SITE_NAME}</div>
          <div>full stack · next.js · typescript</div>
        </OgLayout.Meta>
      </OgLayout.Footer>
    </OgLayout.Root>
  );
}
