import BrandGrid from "@/components/BrandGrid";
import ServiceCases from "@/components/ServiceCases";
import ServiceHero from "@/components/ServiceHero";
import ServiceNext from "@/components/ServiceNext";
import { WEB_CASES } from "@/lib/sampleWork";

const HREF = "/services/website-development";

export const metadata = {
  title: "Website Development | Social Edge",
  description: "Websites by Social Edge: sites that load fast, read clearly and convert.",
};

// Sites from the reference (10 of its 15 were visible): replace with Social Edge builds before launch
const SITES = [
  { name: "Aari Tari", site: "aaritari.com" },
  { name: "Sutra Fine Jewellery", site: "sutrafinejewellery.com" },
  { name: "Tailor Didi", site: "tailordidi.com" },
  { name: "Credo Fiber Planters", site: "credoworld.com" },
  { name: "Dash Glasses", site: "dashglasses.com" },
  { name: "Scribbology", site: "scribbology.in" },
  { name: "Pragya yoga", site: "pragyayoga.in" },
  { name: "Sachi Online", site: "sachionline.com.br" },
  { name: "Woo You", site: "wooyou.in" },
  { name: "Mirasa Jewels", site: "mirasajewels.com" },
];

export default function WebsiteDevelopmentPage() {
  return (
    <main className="flex-1">
      <ServiceHero
        href={HREF}
        title="Website Development"
        lines={["Website", "Development"]}
        tags={["120+ websites", "95% conversion", "Conversion-focused design"]}
        blurb="Sites that load fast, read clearly and convert."
      />
      <BrandGrid
        eyebrow="15 websites, live"
        title="Websites we've built"
        action={{ label: "Start a project", href: "/contact" }}
        brands={SITES}
        columns={5}
      />
      <ServiceCases title="Proof, in three" cases={WEB_CASES} />
      <ServiceNext current={HREF} />
    </main>
  );
}
