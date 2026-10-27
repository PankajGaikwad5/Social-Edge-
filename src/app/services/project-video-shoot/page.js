import SelectedWork from "@/components/SelectedWork";
import ServiceCases from "@/components/ServiceCases";
import ServiceHero from "@/components/ServiceHero";
import ServiceNext from "@/components/ServiceNext";
import { PROOF_CASES, SELECTED_FILMS } from "@/lib/sampleWork";

const HREF = "/services/project-video-shoot";

export const metadata = {
  title: "Project Video Shoot | Social Edge",
  description: "Project video shoots by Social Edge: concept, production and edit for brand films and launches.",
};

export default function ProjectVideoShootPage() {
  return (
    <main className="flex-1">
      {/* Placeholder tags and blurb until the reference copy is supplied */}
      <ServiceHero
        href={HREF}
        title="Project Video Shoot"
        lines={["Project Video", "Shoot"]}
        tags={["Concept to edit", "Brand films", "Launch-ready"]}
        blurb="Shoots built around your project: concept, crew and edit in one pass."
      />
      <SelectedWork href={HREF} title="Selected work" items={SELECTED_FILMS} />
      <ServiceCases title="Proof, in three" cases={PROOF_CASES} />
      <ServiceNext current={HREF} />
    </main>
  );
}
