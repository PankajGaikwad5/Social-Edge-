import AboutFaq from "@/components/AboutFaq";
import AboutStats from "@/components/AboutStats";
import CampaignGantt from "@/components/CampaignGantt";
import ExploreMore from "@/components/ExploreMore";
import ServiceGuide from "@/components/ServiceGuide";
import ServiceIncluded from "@/components/ServiceIncluded";
import ServiceProcess from "@/components/ServiceProcess";
import ServiceSplitHero from "@/components/ServiceSplitHero";
import { EXPLORE, GUIDE, INCLUDED, PROCESS, STATS } from "@/lib/brandServiceContent";

export const metadata = {
  title: "Campaign Planning | Social Edge",
  description: "Campaign planning in India from Social Edge: one idea, rolled out across every channel, on time.",
};

// Every section after the hero shares the Social Media Management copy
export default function CampaignPlanningPage() {
  return (
    <main className="flex-1">
      <ServiceSplitHero
        crumb="Campaign Planning"
        eyebrow="Campaign planning in India"
        lines={["Campaign", "Planning"]}
        body="One idea, rolled out across every channel, on time."
        visual={<CampaignGantt />}
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
