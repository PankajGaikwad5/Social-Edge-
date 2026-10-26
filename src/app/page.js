import Hero from "@/components/Hero";
import ServicesMarquee from "@/components/ServicesMarquee";
import WhatWeDo from "@/components/WhatWeDo";
import WhyChooseUs from "@/components/WhyChooseUs";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import SayHello from "@/components/SayHello";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <ServicesMarquee />
      <WhyChooseUs />
      <WhatWeDo />
      <CaseStudies />
      <Testimonials />
      <Partners />
      <SayHello />
    </main>
  );
}
