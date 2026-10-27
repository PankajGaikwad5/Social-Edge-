// Sample case studies with stock imagery shared by the service pages: replace with real work before launch

const image = (id) => `https://images.unsplash.com/photo-${id}?w=1000&q=75&auto=format&fit=crop`;

export const PROOF_CASES = [
  { client: "Aari Tari", sector: "Fashion", href: "/work/aari-tari", src: image("1610030469983-98e550d6193c") },
  { client: "City Vibes", sector: "Fashion", href: "/work/city-vibes", src: image("1558769132-cb1aea458c5e") },
  { client: "Pragya Gaur", sector: "Fashion", href: "/work/pragya-gaur", src: image("1583391733956-3750e0ff4e8b") },
];

// M4 Developers has no image yet, so its card shows the plain dark card surface
export const WEB_CASES = [
  { client: "M4 Developers", sector: "Real estate", href: "/work/m4-developers" },
  { client: "Sutra Fine", sector: "Jewellery", href: "/work/sutra-fine", src: image("1617038260897-41a1f14a8ca0") },
  { client: "Tatvadhan", sector: "Fashion", href: "/work/tatvadhan", src: image("1583391733956-3750e0ff4e8b") },
];

export const SELECTED_FILMS = [
  { client: "Vamika Silver", meta: "Jewellery · Film", href: "/work/vamika-silver", src: image("1599643478518-a784e5dc4c8f") },
  { client: "City Vibes", meta: "Fashion · Film", href: "/work/city-vibes", src: image("1558769132-cb1aea458c5e") },
  { client: "Dicassa", meta: "Interiors · Stills", href: "/work/dicassa", src: image("1505693416388-ac5ce068fe85") },
  { client: "Sutra Fine", meta: "Jewellery · Stills", href: "/work/sutra-fine", src: image("1617038260897-41a1f14a8ca0") },
];
