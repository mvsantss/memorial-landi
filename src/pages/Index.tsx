import { HeroSection } from "@/components/HeroSection";
import { ManifestoSection } from "@/components/ManifestoSection";
import { GallerySection } from "@/components/GallerySection";
import { TShirtSection } from "@/components/TShirtSection"; // Importar o novo componente
import { SponsorsSection } from "@/components/SponsorsSection";
import { InfluencersSection } from "@/components/InfluencersSection";
import { CommunitySection } from "@/components/CommunitySection";
import { Footer } from "@/components/Footer";
import { AwardSection } from "@/components/AwardSection";
import { LeadModal } from "@/components/LeadModal";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <LeadModal />
      <HeroSection />
      <GallerySection />
      <ManifestoSection />
      <AwardSection />
      <TShirtSection /> {/* Adicionar a nova seção aqui */}
      <SponsorsSection />
      <InfluencersSection />
      <CommunitySection />
      <Footer />
    </main>
  );
};

export default Index;
