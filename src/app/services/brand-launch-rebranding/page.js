import AboutFaq from "@/components/AboutFaq";
import AboutStats from "@/components/AboutStats";
import ExploreMore from "@/components/ExploreMore";
import RebrandMorph from "@/components/RebrandMorph";
import ServiceGuide from "@/components/ServiceGuide";
import ServiceIncluded from "@/components/ServiceIncluded";
import ServiceProcess from "@/components/ServiceProcess";
import ServiceSplitHero from "@/components/ServiceSplitHero";
import { EXPLORE, GUIDE, INCLUDED, PROCESS, STATS } from "@/lib/brandServiceContent";

export const metadata = {
  title: "New Brand Launch & Rebranding | Social Edge",
  description: "Brand launch and rebranding in India from Social Edge: launch right, or start again without losing what worked.",
};

// Every section after the hero shares the Social Media Management copy
export default function BrandLaunchRebrandingPage() {
  return (
    <main className="flex-1">
      <ServiceSplitHero
        eyebrow="Brand launch & rebranding in India"
        lines={["New Brand Launch", "& Rebranding"]}
        body="Launch right, or start again without losing what worked."
        visual={<RebrandMorph />}
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
