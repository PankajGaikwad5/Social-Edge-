import AboutFaq from "@/components/AboutFaq";
import AboutStats from "@/components/AboutStats";
import ExploreMore from "@/components/ExploreMore";
import RoasChart from "@/components/RoasChart";
import ServiceGuide from "@/components/ServiceGuide";
import ServiceIncluded from "@/components/ServiceIncluded";
import ServiceProcess from "@/components/ServiceProcess";
import ServiceSplitHero from "@/components/ServiceSplitHero";
import { EXPLORE, GUIDE, INCLUDED, PROCESS, STATS } from "@/lib/brandServiceContent";

export const metadata = {
  title: "Performance Marketing | Social Edge",
  description: "Performance marketing in India from Social Edge: ROI-focused campaigns, optimised in real time.",
};

// Every section after the hero shares the Social Media Management copy
export default function PerformanceMarketingPage() {
  return (
    <main className="flex-1">
      <ServiceSplitHero
        crumb="Performance Marketing"
        eyebrow="Performance marketing in India"
        lines={["Performance", "Marketing"]}
        body="ROI-focused campaigns, optimised in real time."
        visual={<RoasChart />}
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
