import AboutFaq from "@/components/AboutFaq";
import AboutStats from "@/components/AboutStats";
import AutomationJourney from "@/components/AutomationJourney";
import ExploreMore from "@/components/ExploreMore";
import ServiceGuide from "@/components/ServiceGuide";
import ServiceIncluded from "@/components/ServiceIncluded";
import ServiceProcess from "@/components/ServiceProcess";
import ServiceSplitHero from "@/components/ServiceSplitHero";
import { EXPLORE, GUIDE, INCLUDED, PROCESS, STATS } from "@/lib/brandServiceContent";

export const metadata = {
  title: "Marketing Automation | Social Edge",
  description: "Marketing automation in India from Social Edge: lead to customer, without the manual work.",
};

// Every section after the hero shares the Social Media Management copy
export default function MarketingAutomationPage() {
  return (
    <main className="flex-1">
      <ServiceSplitHero
        crumb="Marketing Automation"
        eyebrow="Marketing automation in India"
        lines={["Marketing", "Automation"]}
        body="Lead to customer, without the manual work."
        visual={<AutomationJourney />}
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
