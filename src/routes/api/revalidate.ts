import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "node:crypto";

type PostEventData = {
  event: string;
  data: {
    id: string;
    slug?: string;
    name?: string;
    title?: string;
    userId: string;
  };
};

function verifySignature(
  secret: string,
  signatureHeader: string,
  bodyText: string
): boolean {
  const expectedHex = signatureHeader.replace(/^sha256=/, "");
  const computedHex = createHmac("sha256", secret)
    .update(bodyText)
    .digest("hex");

  const expected = Buffer.from(expectedHex, "hex");
  const computed = Buffer.from(computedHex, "hex");

  if (expected.length !== computed.length) return false;

  return timingSafeEqual(expected, computed);
}

async function handleWebhookEvent(payload: PostEventData) {
  const event = payload.event;

  if (event.startsWith("post")) {
    return {
      revalidated: true,
      now: Date.now(),
      message: "Post event handled",
    };
  }

  return {
    revalidated: false,
    now: Date.now(),
    message: "Event ignored",
  };
}

export const Route = createFileRoute("/api/revalidate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const signature = request.headers.get("x-marble-signature");
        const secret = process.env.MARBLE_WEBHOOK_SECRET;

        if (!secret || !signature) {
          return Response.json(
            { error: "Secret or signature missing" },
            { status: 400 }
          );
        }

        const bodyText = await request.text();

        if (!verifySignature(secret, signature, bodyText)) {
          return Response.json({ error: "Invalid signature" }, { status: 400 });
        }

        const payload = JSON.parse(bodyText) as PostEventData;
        if (!payload.event || !payload.data) {
          return Response.json(
            { error: "Invalid payload structure" },
            { status: 400 }
          );
        }

        try {
          const result = await handleWebhookEvent(payload);
          return Response.json(result, { status: 200 });
        } catch (err) {
          return Response.json(
            { error: "Failed to process webhook" },
            { status: 500 }
          );
        }
      },
    },
  },
});
