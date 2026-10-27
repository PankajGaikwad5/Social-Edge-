import AboutFaq from "@/components/AboutFaq";
import AboutStats from "@/components/AboutStats";
import DraftTyper from "@/components/DraftTyper";
import ExploreMore from "@/components/ExploreMore";
import ServiceGuide from "@/components/ServiceGuide";
import ServiceIncluded from "@/components/ServiceIncluded";
import ServiceProcess from "@/components/ServiceProcess";
import ServiceSplitHero from "@/components/ServiceSplitHero";
import { EXPLORE, GUIDE, INCLUDED, PROCESS, STATS } from "@/lib/brandServiceContent";

export const metadata = {
  title: "Original Content & Copywriting | Social Edge",
  description: "Original content and copywriting from Social Edge: brand voice, captions, scripts and long-form copy that people actually read.",
};

// Every section after the hero shares the Social Media Management copy
export default function OriginalContentCopyPage() {
  return (
    <main className="flex-1">
      <ServiceSplitHero
        crumb="Original Content & Copywriting"
        eyebrow="Content writing in India"
        lines={["Original Content", "& Copywriting"]}
        body="Words that sound like you and sell like a good salesperson."
        visual={<DraftTyper />}
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
