import AboutHero from "@/components/AboutHero";
import AboutStats from "@/components/AboutStats";
import AboutValues from "@/components/AboutValues";
import AboutVision from "@/components/AboutVision";

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
    </main>
  );
}
