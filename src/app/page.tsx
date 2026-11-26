import ChatWidget from "@/components/landing/chat-widget";
import ClosingSection from "@/components/landing/closing-section";
import FaqSection from "@/components/landing/faq-section";
import HardwareSection from "@/components/landing/hardware-section";
import HeroSection from "@/components/landing/hero-section";
import InstallationSection from "@/components/landing/installation-section";
import NetworkProof from "@/components/landing/network-proof";
import NetworkSection from "@/components/landing/network-section";
import PricingSection from "@/components/landing/pricing-section";
import SiteFooter from "@/components/landing/site-footer";
import SiteHeader from "@/components/landing/site-header";

export default function Home() {
  return (
    <div className="siteShell">
      <SiteHeader />
      <main id="top">
        <HeroSection />
        <NetworkProof />
        <HardwareSection />
        <NetworkSection />
        <PricingSection />
        <InstallationSection />
        <FaqSection />
        <ClosingSection />
      </main>
      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
