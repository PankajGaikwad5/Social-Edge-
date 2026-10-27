import AboutFaq from "@/components/AboutFaq";
import AboutStats from "@/components/AboutStats";
import ExploreMore from "@/components/ExploreMore";
import InterviewStories from "@/components/InterviewStories";
import ServiceGuide from "@/components/ServiceGuide";
import ServiceIncluded from "@/components/ServiceIncluded";
import ServiceProcess from "@/components/ServiceProcess";
import ServiceSplitHero from "@/components/ServiceSplitHero";
import { EXPLORE, GUIDE, INCLUDED, PROCESS, STATS } from "@/lib/brandServiceContent";

export const metadata = {
  title: "Interviews & Testimonials | Social Edge",
  description: "Interview and testimonial shoots in India from Social Edge: founders, experts and customers on camera, comfortable and clear.",
};

// Combines the reference's separate Interviews and Testimonials heroes; every section after the hero shares the Social Media Management copy
export default function InterviewsTestimonialsPage() {
  return (
    <main className="flex-1">
      <ServiceSplitHero
        crumb="Interviews & Testimonials"
        eyebrow="Interview & testimonial shoots in India"
        lines={["Interviews &", "Testimonials"]}
        body="Founders and experts on camera, comfortable and clear, and customer stories that do the selling for you."
        visual={<InterviewStories />}
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
