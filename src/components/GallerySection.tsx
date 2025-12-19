import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { galleryImages } from "@/utils/galleryImages";

// Global set to track preloaded images across component re-mounts
const preloadedUrls = new Set<string>();

const IMAGES_PER_PAGE = 8;
export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  const {
    ref: headerRef,
    isVisible: headerVisible
  } = useScrollAnimation({
    threshold: 0.3
  });
  const {
    ref: galleryRef,
    isVisible: galleryVisible
  } = useScrollAnimation({
    threshold: 0.1
  });
  const totalPages = Math.ceil(galleryImages.length / IMAGES_PER_PAGE);
  const currentImages = galleryImages.slice(currentPage * IMAGES_PER_PAGE, (currentPage + 1) * IMAGES_PER_PAGE);

  // Smart preloading strategy
  useEffect(() => {
    // Preload current, previous, and next few pages
    // We prioritize the immediate navigation paths
    const pagesToPreload = [
      currentPage,
      currentPage + 1,
      currentPage - 1,
      currentPage + 2
    ].filter(p => p >= 0 && p < totalPages);

    pagesToPreload.forEach(page => {
      const startIdx = page * IMAGES_PER_PAGE;
      const endIdx = Math.min(startIdx + IMAGES_PER_PAGE, galleryImages.length);
      
      for (let i = startIdx; i < endIdx; i++) {
        const imageUrl = galleryImages[i].src;
        if (!preloadedUrls.has(imageUrl)) {
          // Mark as preloaded immediately to prevent duplicate requests
          preloadedUrls.add(imageUrl);
          
          const img = new Image();
          img.src = imageUrl;
          // We don't need to do anything on load since we rely on browser cache
          // and the global set prevents re-triggering
        }
      }
    });
  }, [currentPage, totalPages]);

  const openLightbox = (index: number) => {
    const globalIndex = currentPage * IMAGES_PER_PAGE + index;
    setSelectedImage(globalIndex);
  };
  const closeLightbox = () => setSelectedImage(null);
  const nextImage = () => setSelectedImage(prev => prev !== null ? (prev + 1) % galleryImages.length : null);
  const prevImage = () => setSelectedImage(prev => prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null);
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  };
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };
  const canGoNext = currentPage < totalPages - 1;
  const canGoPrev = currentPage > 0;
  return <section id="gallery" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef} className={`text-center mb-16 transition-all duration-700 ${headerVisible ? "animate-scroll-fade-up" : "opacity-0 translate-y-12"}`}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline uppercase mb-4">
            <span className="text-foreground">O Ronco que Ficou na Imagem.</span>
            <br />
            <span className="text-primary skew-headline inline-block mt-2">O Mural Está no Ar.</span>
          </h2>
        </div>

        {/* Video Section - Slideshow of clips */}
        

        {/* Photo Gallery */}
        <div className="mt-16" ref={galleryRef}>
          <h3 className={`text-xl md:text-2xl font-headline uppercase mb-2 text-center text-muted-foreground transition-all duration-500 ${galleryVisible ? "opacity-100" : "opacity-0"}`}>
            O Mural Oficial do Encontro
          </h3>
          <p className={`text-center text-foreground/70 mb-8 text-lg font-body transition-all duration-500 delay-100 ${galleryVisible ? "opacity-100" : "opacity-0"}`}>
            Não deixe as fotos ficarem só na sua galeria!<br className="md:hidden" /> O mural oficial está no ar!
          </p>

          {/* Gallery Container with Fixed Height */}
          <div className={`relative transition-all duration-500 delay-150 ${galleryVisible ? "opacity-100" : "opacity-0"}`}>
            {/* Navigation Arrows */}
            <button onClick={goToPrevPage} disabled={!canGoPrev} className={`absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${canGoPrev ? "opacity-100 hover:bg-primary hover:border-primary hover:text-primary-foreground cursor-pointer" : "opacity-30 cursor-not-allowed"}`} aria-label="Página anterior">
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button onClick={goToNextPage} disabled={!canGoNext} className={`absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${canGoNext ? "opacity-100 hover:bg-primary hover:border-primary hover:text-primary-foreground cursor-pointer" : "opacity-30 cursor-not-allowed"}`} aria-label="Próxima página">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Photo Grid with Limited Height */}
            <div className="mx-8 md:mx-12 overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 min-h-[400px] md:min-h-[500px]">
                {currentImages.map((image, index) => <div key={`${currentPage}-${index}`} onClick={() => openLightbox(index)} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className="relative overflow-hidden cursor-pointer group animate-gallery-item" style={{
                animationDelay: `${index * 60}ms`
              }}>
                    <div className="relative aspect-square">
                      <img src={image.src} alt={image.alt} loading="eager" className={`w-full h-full object-cover transition-all duration-500 ${hoveredIndex === index ? "scale-110" : "scale-100"}`} />
                      
                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 bg-primary/0 transition-all duration-500 ${hoveredIndex === index ? "bg-primary/20" : ""}`} />
                      
                      {/* Bottom Line Animation */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-primary transition-transform duration-500 origin-left ${hoveredIndex === index ? "scale-x-100" : "scale-x-0"}`} />

                      {/* Zoom Icon */}
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`}>
                        <div className="w-12 h-12 rounded-full bg-background/80 flex items-center justify-center">
                          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>

            {/* Pagination Indicators */}
            <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
              {/* First Page */}
              {currentPage > 2 && (
                <>
                  <button
                    onClick={() => setCurrentPage(0)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary/30 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm"
                  >
                    1
                  </button>
                  {currentPage > 3 && <span className="text-muted-foreground">...</span>}
                </>
              )}

              {/* Page Numbers Window */}
              {Array.from({ length: totalPages })
                .map((_, index) => index)
                .filter(page => page >= currentPage - 2 && page <= currentPage + 2)
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 text-sm ${
                      page === currentPage
                        ? "bg-primary text-primary-foreground scale-110 font-bold"
                        : "bg-secondary/30 text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                    }`}
                    aria-label={`Ir para página ${page + 1}`}
                  >
                    {page + 1}
                  </button>
                ))}

              {/* Last Page */}
              {currentPage < totalPages - 3 && (
                <>
                  {currentPage < totalPages - 4 && <span className="text-muted-foreground">...</span>}
                  <button
                    onClick={() => setCurrentPage(totalPages - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary/30 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            {/* Photo count info */}
            <div className="flex justify-center mt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/30 rounded-full text-xs text-muted-foreground/70 font-body">
                <ImageIcon className="w-3 h-3" />
                <span>{galleryImages.length} fotos no mural</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-full transition-colors">
            <X className="w-8 h-8" />
          </button>
          
          <button onClick={e => {
        e.stopPropagation();
        prevImage();
      }} className="absolute left-4 p-2 hover:bg-secondary rounded-full transition-colors">
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <img src={galleryImages[selectedImage].src} alt={galleryImages[selectedImage].alt} className="max-h-[85vh] max-w-[90vw] object-contain animate-scale-in" onClick={e => e.stopPropagation()} />
          
          <button onClick={e => {
        e.stopPropagation();
        nextImage();
      }} className="absolute right-4 p-2 hover:bg-secondary rounded-full transition-colors">
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground font-body">
            {selectedImage + 1} / {galleryImages.length}
          </div>
        </div>}
    </section>;
};
