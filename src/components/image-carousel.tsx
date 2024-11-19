import React, { useState } from "react";
import { Carousel } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: { id: number; src: string; alt: string }[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-md max-h-md">
      {/* Large Image Display */}
      <div className="mb-4">
        <Carousel>
          {images.map((image, index) => (
            <div
              key={image.id}
              className={cn("carousel-item", {
                "opacity-100": index === currentIndex,
                "opacity-0 hidden": index !== currentIndex,
              })}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "w-16 h-16 rounded-lg overflow-hidden border-2",
              index === currentIndex
                ? "border-blue-500"
                : "border-gray-300 hover:border-gray-500"
            )}
          >
            <img src={image.src} alt={image.alt} className="w-full h-full" />
          </button>
        ))}
      </div>
    </div>
  );
};

export { ImageCarousel };
