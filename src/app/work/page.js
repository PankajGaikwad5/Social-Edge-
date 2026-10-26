import WorkCases from "@/components/WorkCases";
import WorkHero from "@/components/WorkHero";
import WorkIndustries from "@/components/WorkIndustries";
import WorkStudio from "@/components/WorkStudio";
import WorkServices from "@/components/WorkServices";

export const metadata = {
  title: "Work | Social Edge",
  description:
    "Case studies from Social Edge: campaigns, content and brand work for 1000+ brands across India, UAE, Australia, the US, the UK and Japan.",
};

export default function WorkPage() {
  return (
    <main className="flex-1">
      <WorkHero />
      <WorkCases />
      <WorkServices />
      <WorkIndustries />
      <WorkStudio />
    </main>
  );
}
