import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import camisetaMockupFrente from "@/assets/tshirts/1º Encontro Landi Turbina-5.webp";
import camisetaRack from "@/assets/tshirts/1º Encontro Landi Turbina-67.webp";
import camisetaNova from "@/assets/tshirts/landi-turbina-mockup.webp";

const tShirtImages = [
  { src: camisetaMockupFrente, alt: "Camiseta Landi Turbina - Mockup frente" },
  { src: camisetaRack, alt: "Camiseta Landi Turbina em uso no evento" },
  { src: camisetaNova, alt: "Camiseta Landi Turbina - frente em estúdio" },
];

export const TShirtSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const whatsappLink = "https://api.whatsapp.com/send/?phone=5514997297754&text=Quero%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20camiseta%20da%20Landi%20Turbina%21&type=phone_number&app_absent=0";

  return (
    <section className="py-20 md:py-32 bg-landi-black relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-5xl mx-auto text-center transition-all duration-700 ${isVisible ? "animate-scroll-fade-up" : "opacity-0 translate-y-12"}`}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline uppercase mb-4">
            <span className="text-foreground">O Estilo que Acelera.</span>
            <br />
            <span className="text-primary skew-headline inline-block mt-2">A Camiseta Oficial.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mt-6 font-body max-w-3xl mx-auto">
            Lançada no 1º Encontro Landi Turbina, essa camiseta é mais que um item de vestuário: é a sua identidade no Time dos Barulhentos. Vista a paixão pela potência e pelo estilo.
          </p>
        </div>

        <div className={`mt-16 flex flex-col lg:flex-row items-center justify-center gap-12 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          {/* Carousel da Camiseta */}
          <div className="w-full lg:w-1/2 max-w-md">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: false,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {tShirtImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <div className="aspect-square rounded-xl overflow-hidden border border-primary/20 shadow-2xl">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4 bg-background/80 hover:bg-primary hover:text-primary-foreground border-primary/20" />
              <CarouselNext className="hidden md:flex -right-4 bg-background/80 hover:bg-primary hover:text-primary-foreground border-primary/20" />
            </Carousel>
          </div>

          {/* Detalhes da Compra */}
          <div className="w-full lg:w-1/2 max-w-lg text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-headline uppercase text-foreground mb-4">
              Garanta a Sua!
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground font-body mb-6">
              Lançada no 1º Encontro Landi Turbina — disponível para todos.
            </p>

            <div className="bg-secondary/30 p-6 rounded-lg mb-8 border border-primary/20 shadow-inner">
              <p className="text-xl md:text-2xl font-body text-muted-foreground line-through">
                De: R$ 189,90
              </p>
              <p className="text-3xl md:text-4xl font-headline uppercase text-primary mt-2 mb-4">
                Por: R$ 129,90 no Cartão
              </p>
              <p className="text-2xl md:text-3xl font-headline uppercase text-foreground">
                Ou: R$ 100,00 no Pix
              </p>
            </div>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="xl" className="font-headline text-lg tracking-wide group">
                <span className="group-hover:scale-105 inline-block transition-transform">
                  QUERO MINHA CAMISETA!
                </span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
