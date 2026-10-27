import AboutFaq from "@/components/AboutFaq";
import AboutStats from "@/components/AboutStats";
import ExploreMore from "@/components/ExploreMore";
import PenToolCanvas from "@/components/PenToolCanvas";
import ServiceGuide from "@/components/ServiceGuide";
import ServiceIncluded from "@/components/ServiceIncluded";
import ServiceProcess from "@/components/ServiceProcess";
import ServiceSplitHero from "@/components/ServiceSplitHero";
import { EXPLORE, GUIDE, INCLUDED, PROCESS, STATS } from "@/lib/brandServiceContent";

export const metadata = {
  title: "Graphic Design, Iconography & Illustration | Social Edge",
  description: "Graphic design services in India from Social Edge: distinctive visual systems, from a single icon to a full campaign look.",
};

// Every section after the hero shares the Social Media Management copy
export default function GraphicDesigningPage() {
  return (
    <main className="flex-1">
      <ServiceSplitHero
        eyebrow="Graphic design services in India"
        lines={["Graphic Design,", "Iconography", "& Illustration"]}
        body="Distinctive visual systems, from a single icon to a full campaign look."
        visual={<PenToolCanvas />}
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
