import AboutFaq from "@/components/AboutFaq";
import AboutStats from "@/components/AboutStats";
import EmailFlow from "@/components/EmailFlow";
import ExploreMore from "@/components/ExploreMore";
import ServiceGuide from "@/components/ServiceGuide";
import ServiceIncluded from "@/components/ServiceIncluded";
import ServiceProcess from "@/components/ServiceProcess";
import ServiceSplitHero from "@/components/ServiceSplitHero";
import { EXPLORE, GUIDE, INCLUDED, PROCESS, STATS } from "@/lib/brandServiceContent";

export const metadata = {
  title: "Email Marketing | Social Edge",
  description: "Email marketing services in India from Social Edge: the channel you own, working every week.",
};

// Every section after the hero shares the Social Media Management copy
export default function EmailMarketingPage() {
  return (
    <main className="flex-1">
      <ServiceSplitHero
        crumb="Email Marketing"
        eyebrow="Email marketing services in India"
        lines={["Email Marketing"]}
        body="The channel you own, working every week."
        visual={<EmailFlow />}
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
