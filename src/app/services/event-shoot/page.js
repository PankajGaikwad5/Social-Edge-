import AboutFaq from "@/components/AboutFaq";
import AboutStats from "@/components/AboutStats";
import EventCoverage from "@/components/EventCoverage";
import ExploreMore from "@/components/ExploreMore";
import ServiceGuide from "@/components/ServiceGuide";
import ServiceIncluded from "@/components/ServiceIncluded";
import ServiceProcess from "@/components/ServiceProcess";
import ServiceSplitHero from "@/components/ServiceSplitHero";
import { EXPLORE, GUIDE, INCLUDED, PROCESS, STATS } from "@/lib/brandServiceContent";

export const metadata = {
  title: "Event Shoots | Social Edge",
  description: "Event shoots in India from Social Edge: launches, shows and celebrations, covered live and edited fast.",
};

// No reference supplied: hero copy and visual are our own. Every section after the hero shares the Social Media Management copy
export default function EventShootPage() {
  return (
    <main className="flex-1">
      <ServiceSplitHero
        crumb="Event Shoots"
        eyebrow="Event shoots in India"
        lines={["Event Shoots"]}
        body="Launches, shows and celebrations, covered live and edited fast."
        visual={<EventCoverage />}
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
