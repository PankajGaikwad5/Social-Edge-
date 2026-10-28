import BlogIndex from "@/components/BlogIndex";

export const metadata = {
  title: "Blog | Social Edge",
  description:
    "Notes from the studio: thinking on brand, content and growth from the Social Edge team, with lessons from campaigns across India, the UAE, the UK, the US, Australia and Japan.",
};

export default function BlogPage() {
  return (
    <main className="flex-1">
      <BlogIndex />
    </main>
  );
}
