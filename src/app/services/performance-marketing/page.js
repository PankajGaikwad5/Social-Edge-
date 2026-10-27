import SelectedWork from "@/components/SelectedWork";
import ServiceCases from "@/components/ServiceCases";
import ServiceHero from "@/components/ServiceHero";
import ServiceNext from "@/components/ServiceNext";
import { PROOF_CASES, SELECTED_FILMS } from "@/lib/sampleWork";

const HREF = "/services/performance-marketing";

export const metadata = {
  title: "Performance Marketing | Social Edge",
  description: "Performance marketing by Social Edge: paid media run on numbers, from ROAS and CPL to revenue.",
};

export default function PerformanceMarketingPage() {
  return (
    <main className="flex-1">
      <ServiceHero
        href={HREF}
        title="Performance Marketing"
        lines={["Performance", "Marketing"]}
        tags={["7x ROAS", "5L+ leads", "ROI-driven campaigns"]}
        blurb="Paid media run on numbers: ROAS, CPL and revenue."
      />
      <SelectedWork href={HREF} title="Selected work" items={SELECTED_FILMS} />
      <ServiceCases title="Proof, in three" cases={PROOF_CASES} />
      <ServiceNext current={HREF} />
    </main>
  );
}
