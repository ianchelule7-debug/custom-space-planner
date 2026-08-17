import { createFileRoute } from "@tanstack/react-router";
import { EnquiryFlow } from "@/components/EnquiryFlow";

const title = "Softwoods Project Enquiry — Custom Wood, Stone & Marble";
const description =
  "Share the details of your custom wood, stone or marble project with Softwoods. Add each space and project in a few guided steps.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return <EnquiryFlow />;
}
