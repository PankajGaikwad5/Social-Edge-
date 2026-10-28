import AboutTeam from "@/components/AboutTeam";
import CareerHero from "@/components/CareerHero";
import ServiceIncluded from "@/components/ServiceIncluded";

export const metadata = {
  title: "Careers | Social Edge",
  description:
    "Do the best work of your life at Social Edge. Full-time roles and a freelance bench for strategists, designers, editors, filmmakers and media buyers across three cities.",
};

const WHY = [
  { title: "Real brands, real budgets", body: "Work that ships to millions, not decks that die in a folder." },
  { title: "Three cities", body: "Jaipur, Mumbai and Dubai, with movement between them." },
  { title: "In-house studio", body: "Shoot, edit and publish under one roof." },
  { title: "Honest culture", body: "Transparent with clients, transparent with each other." },
];

export default function CareerPage() {
  return (
    <main className="flex-1">
      <CareerHero />
      <ServiceIncluded title="Why Social Edge" items={WHY} />
      <AboutTeam
        lines={[
          { text: "The brains behind", accent: false },
          { text: "the magic", accent: true },
        ]}
        cta={{ label: "Apply full-time", href: "/career/full-time" }}
      />
    </main>
  );
}
