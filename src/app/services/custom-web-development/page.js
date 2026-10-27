import AboutFaq from "@/components/AboutFaq";
import AboutStats from "@/components/AboutStats";
import ExploreMore from "@/components/ExploreMore";
import ServiceGuide from "@/components/ServiceGuide";
import ServiceIncluded from "@/components/ServiceIncluded";
import ServiceProcess from "@/components/ServiceProcess";
import ServiceSplitHero from "@/components/ServiceSplitHero";
import WebBuild from "@/components/WebBuild";
import { EXPLORE, GUIDE, INCLUDED, PROCESS, STATS } from "@/lib/brandServiceContent";

export const metadata = {
  title: "Custom Web Development | Social Edge",
  description: "Web development services in India from Social Edge: fast, conversion-focused websites built to your spec.",
};

// Every section after the hero shares the Social Media Management copy
export default function CustomWebDevelopmentPage() {
  return (
    <main className="flex-1">
      <ServiceSplitHero
        crumb="Custom Web Development"
        eyebrow="Web development services in India"
        lines={["Custom Web", "Development"]}
        body="Fast, conversion-focused websites built to your spec."
        visual={<WebBuild />}
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
