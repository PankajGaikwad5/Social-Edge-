import SelectedWork from "@/components/SelectedWork";
import ServiceCases from "@/components/ServiceCases";
import ServiceHero from "@/components/ServiceHero";
import ServiceNext from "@/components/ServiceNext";
import { PROOF_CASES, SELECTED_FILMS } from "@/lib/sampleWork";

const HREF = "/services/event-marketing";

export const metadata = {
  title: "Event Marketing | Social Edge",
  description: "Event marketing by Social Edge: launches, pop-ups and activations that people remember.",
};

export default function EventMarketingPage() {
  return (
    <main className="flex-1">
      <ServiceHero
        href={HREF}
        title="Event Marketing"
        lines={["Event Marketing"]}
        tags={["500+ assets", "3x engagement", "25% lower CPL"]}
        blurb="Launches, pop-ups and activations that people remember."
      />
      <SelectedWork href={HREF} title="Selected work" items={SELECTED_FILMS} />
      <ServiceCases title="Proof, in three" cases={PROOF_CASES} />
      <ServiceNext current={HREF} />
    </main>
  );
}
