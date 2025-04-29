import BgGradient from "@/components/common/bg-gradient";
import HowItWorks from "@/components/home/how-it-works";
import DemoSection from "@/components/home/demo-section";
import { HeroSection } from "@/components/home/HeroSection";
import PricingSection from "@/components/home/pricing-section";
import CTA from "@/components/home/cta-section";


export default function Home() {
  return (
    <div className=" relative w-full">
      <BgGradient/>
      <div className="flex flex-col">
      <HeroSection/>
      <DemoSection/>
      <HowItWorks/>
      <PricingSection/> 
      <CTA/>
      </div>
      
       
       {/* <DemoSection/>
       <HowItWorksSection/>
       <PricingSection/>
       <CTASection/> */}
    </div>
  );
}
