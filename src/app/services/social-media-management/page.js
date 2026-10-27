import AboutFaq from "@/components/AboutFaq";
import AboutStats from "@/components/AboutStats";
import ExploreMore from "@/components/ExploreMore";
import LiveFeed from "@/components/LiveFeed";
import ServiceGuide from "@/components/ServiceGuide";
import ServiceIncluded from "@/components/ServiceIncluded";
import ServiceProcess from "@/components/ServiceProcess";
import ServiceSplitHero from "@/components/ServiceSplitHero";
import { EXPLORE, GUIDE, INCLUDED, PROCESS, STATS } from "@/lib/brandServiceContent";

export const metadata = {
  title: "Social Media Management in India | Social Edge",
  description:
    "Content calendars, community and trend-led creative that keeps your brand in the feed. Full-service social media management from Social Edge.",
};

export default function SocialMediaManagementPage() {
  return (
    <main className="flex-1">
      <ServiceSplitHero
        eyebrow="Social media management in India"
        lines={["Social Media", "Management"]}
        body="Content calendars, community and trend-led creative that keeps your brand in the feed."
        visual={<LiveFeed />}
      />
      <AboutStats stats={STATS} />
      <ServiceIncluded title="What's included" items={INCLUDED} />
      <ServiceProcess eyebrow="How we work" lines={["Four steps,", "no surprises."]} steps={PROCESS} />
      <AboutFaq />
      <ExploreMore links={EXPLORE} />
      <ServiceGuide {...GUIDE} />
    </main>
  );
}
