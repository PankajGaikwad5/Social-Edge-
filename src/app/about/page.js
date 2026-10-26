import AboutHero from "@/components/AboutHero";
import AboutStats from "@/components/AboutStats";
import AboutValues from "@/components/AboutValues";
import AboutFaq from "@/components/AboutFaq";
import AboutMore from "@/components/AboutMore";
import AboutTeam from "@/components/AboutTeam";
import AboutVision from "@/components/AboutVision";
import SayHello from "@/components/SayHello";

export const metadata = {
  title: "About | Social Edge",
  description:
    "Social Edge is an in-house marketing team across Mumbai, Pune and Dubai, redefining trust in marketing with transparent processes and measurable results.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutHero />
      <AboutStats />
      <AboutValues />
      <AboutVision />
      <AboutTeam />
      <AboutFaq />
      <AboutMore />
    </main>
  );
}
