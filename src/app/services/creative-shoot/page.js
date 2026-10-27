import AboutFaq from "@/components/AboutFaq";
import AboutStats from "@/components/AboutStats";
import CreativeMood from "@/components/CreativeMood";
import ExploreMore from "@/components/ExploreMore";
import ServiceGuide from "@/components/ServiceGuide";
import ServiceIncluded from "@/components/ServiceIncluded";
import ServiceProcess from "@/components/ServiceProcess";
import ServiceSplitHero from "@/components/ServiceSplitHero";
import { EXPLORE, GUIDE, INCLUDED, PROCESS, STATS } from "@/lib/brandServiceContent";

export const metadata = {
  title: "Creative Shoots | Social Edge",
  description: "Creative shoots in India from Social Edge: concept-first shoots that give social a reason to stop.",
};

// Every section after the hero shares the Social Media Management copy
export default function CreativeShootPage() {
  return (
    <main className="flex-1">
      <ServiceSplitHero
        eyebrow="Creative shoots in India"
        lines={["Creative Shoots"]}
        body="Concept-first shoots that give social a reason to stop."
        visual={<CreativeMood />}
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
