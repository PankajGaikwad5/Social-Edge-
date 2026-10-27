import AboutFaq from "@/components/AboutFaq";
import AboutStats from "@/components/AboutStats";
import ShootCallSheet from "@/components/ShootCallSheet";
import ExploreMore from "@/components/ExploreMore";
import ServiceGuide from "@/components/ServiceGuide";
import ServiceIncluded from "@/components/ServiceIncluded";
import ServiceProcess from "@/components/ServiceProcess";
import ServiceSplitHero from "@/components/ServiceSplitHero";
import { EXPLORE, GUIDE, INCLUDED, PROCESS, STATS } from "@/lib/brandServiceContent";

export const metadata = {
  title: "Project Shoots | Social Edge",
  description: "Project shoots in India from Social Edge: planned, scheduled shoots that deliver every shot on the list.",
};

// No reference supplied: hero copy and visual are our own. Every section after the hero shares the Social Media Management copy
export default function ProjectShootPage() {
  return (
    <main className="flex-1">
      <ServiceSplitHero
        crumb="Project Shoots"
        eyebrow="Project shoots in India"
        lines={["Project Shoots"]}
        body="Planned, scheduled shoots that deliver every shot on the list."
        visual={<ShootCallSheet />}
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
