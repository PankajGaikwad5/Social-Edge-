import { SERVICE_GROUPS } from "@/components/Navbar";
import { SERVICES } from "@/components/WorkServices";

// Every service link in navbar order, each once ("Tailored for Your Business" first, so its numbers match "More of our work")
const ALL_SERVICES = [...new Set(SERVICE_GROUPS.flatMap((g) => g.links.map((l) => l.href)))];

// A service page's number and colours follow its menu position, using the Work-by-service card colours (approved off-palette exception)
export function serviceTheme(href) {
  const index = Math.max(ALL_SERVICES.indexOf(href), 0);
  return { number: String(index + 1).padStart(2, "0"), colors: SERVICES[index % SERVICES.length].colors };
}
