import BrandGrid from "@/components/BrandGrid";
import ServiceCases from "@/components/ServiceCases";
import ServiceHero from "@/components/ServiceHero";
import ServiceNext from "@/components/ServiceNext";
import { PROOF_CASES } from "@/lib/sampleWork";

const HREF = "/services/social-media-marketing";

export const metadata = {
  title: "Social Media Marketing | Social Edge",
  description: "Feeds that build brands: content calendars, community management and trend-led creative from Social Edge.",
};

// Sample client list from the reference: replace with Social Edge clients before launch
const BRANDS = [
  { name: "Vamika Silver", handle: "vamikasilver_jaipur" },
  { name: "Sutra Fine Jewellery", handle: "sutrafinejewellery" },
  { name: "KRWA", handle: "krwa.co" },
  { name: "MANDAWARA", handle: "mandawarajewellers" },
  { name: "Aranqa", handle: "shoparanqa" },
  { name: "Avsa", handle: "avsajewels" },
  { name: "Textorium Jaipur", handle: "textorium_jaipur" },
  { name: "House of Fem", handle: "houseof_fem.in" },
  { name: "BG Jewels", handle: "bg_jewels" },
  { name: "Baala Jewels", handle: "baala_jewels" },
  { name: "Kothari Jewels", handle: "kotharijewels_jaipur" },
  { name: "Aari Tari", handle: "aaritariofficial" },
  { name: "Al Sehr Abaya", handle: "al_sehr_abaya" },
  { name: "Ethnic India", handle: "ethnicindia.co" },
  { name: "City Vibes", handle: "cityvibesindia" },
  { name: "Tatvadhan", handle: "tatvadhan.jaipur" },
  { name: "Tulsyan Jewels", handle: "tulsyanjewellery" },
  { name: "Rooh Amer", handle: "rooh.amer" },
  { name: "Dicassa Studio", handle: "dicassastudios" },
  { name: "Ethos Hospital", handle: "ethosmultispecialityhospital" },
  { name: "Aadhar Prime", handle: "aadhar_prime" },
  { name: "Manglam Aananda The Grand", handle: "aananda_thegrand" },
  { name: "Artisav House", handle: "artisav.house" },
  { name: "AIMS Studio", handle: "studio.aims" },
  { name: "SIGMAC", handle: "sigmac.in" },
  { name: "Aaditya Bath", handle: "aaditya.bath" },
  { name: "Design Atelier", handle: "designatelier_official" },
  { name: "Gloss India", handle: "glossindia" },
  { name: "Ayurva Wellness", handle: "ayurvaawellness" },
  { name: "Veriwell", handle: "veriwell.in" },
  { name: "Club Pilates", handle: "clubpilatesindia" },
  { name: "Engine Brand Mustard Oil", handle: "enginebrandmustardoil" },
  { name: "Tummy Pops", handle: "tummypops.in" },
  { name: "Tazara", handle: "tazara.official" },
  { name: "Gitanjali Agarwalla", handle: "the_saffronstudio" },
];

export default function SocialMediaMarketingPage() {
  return (
    <main className="flex-1">
      <ServiceHero
        href={HREF}
        title="Social Media Marketing"
        lines={["Social Media", "Marketing"]}
        tags={["1.3B views", "500+ brands", "Scalable growth"]}
        blurb="Feeds that build brands: calendars, community and trend-led creative."
      />
      <BrandGrid title="Brands we've grown on social" brands={BRANDS} />
      <ServiceCases title="Proof, in three" cases={PROOF_CASES} />
      <ServiceNext current={HREF} />
    </main>
  );
}
