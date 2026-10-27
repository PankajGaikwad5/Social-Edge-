import AboutFaq from "@/components/AboutFaq";
import AboutStats from "@/components/AboutStats";
import CampaignCrop from "@/components/CampaignCrop";
import ExploreMore from "@/components/ExploreMore";
import ServiceGuide from "@/components/ServiceGuide";
import ServiceIncluded from "@/components/ServiceIncluded";
import ServiceProcess from "@/components/ServiceProcess";
import ServiceSplitHero from "@/components/ServiceSplitHero";
import { EXPLORE, GUIDE, INCLUDED, PROCESS, STATS } from "@/lib/brandServiceContent";

export const metadata = {
  title: "Campaign Shoots | Social Edge",
  description: "Campaign shoots in India from Social Edge: multi-channel campaign visuals from one production.",
};

// Every section after the hero shares the Social Media Management copy
export default function CampaignShootPage() {
  return (
    <main className="flex-1">
      <ServiceSplitHero
        crumb="Campaign Shoots"
        eyebrow="Campaign shoots in India"
        lines={["Campaign Shoots"]}
        body="Multi-channel campaign visuals from one production."
        visual={<CampaignCrop />}
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
