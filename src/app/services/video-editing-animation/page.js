import AboutFaq from "@/components/AboutFaq";
import AboutStats from "@/components/AboutStats";
import ExploreMore from "@/components/ExploreMore";
import ServiceGuide from "@/components/ServiceGuide";
import ServiceIncluded from "@/components/ServiceIncluded";
import ServiceProcess from "@/components/ServiceProcess";
import ServiceSplitHero from "@/components/ServiceSplitHero";
import VideoTimeline from "@/components/VideoTimeline";
import { EXPLORE, GUIDE, INCLUDED, PROCESS, STATS } from "@/lib/brandServiceContent";

export const metadata = {
  title: "Video Editing & Animation | Social Edge",
  description: "Video editing and animation in India from Social Edge: edits that hold attention and motion that makes a point.",
};

// Every section after the hero shares the Social Media Management copy
export default function VideoEditingAnimationPage() {
  return (
    <main className="flex-1">
      <ServiceSplitHero
        eyebrow="Video editing & animation in India"
        lines={["Video Editing", "& Animation"]}
        body="Edits that hold attention and motion that makes a point."
        visual={<VideoTimeline />}
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
