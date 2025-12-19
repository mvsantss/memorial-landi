import { HeroSection } from "@/components/HeroSection";
import { ManifestoSection } from "@/components/ManifestoSection";
import { GallerySection } from "@/components/GallerySection";
import { SponsorsSection } from "@/components/SponsorsSection";
import { InfluencersSection } from "@/components/InfluencersSection";
import { CommunitySection } from "@/components/CommunitySection";
import { Footer } from "@/components/Footer";
import { AwardSection } from "@/components/AwardSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <GallerySection />
      <ManifestoSection />
      <AwardSection />
      <SponsorsSection />
      <InfluencersSection />
      <CommunitySection />
      <Footer />
    </main>
  );
};

export default Index;
