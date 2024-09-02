import type { SliderProps } from "@/lib/types";
import { StrapiImage } from "@/components/custom/strapi-image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Slider({ slides }: SliderProps) {
  return (
    <div className="container mx-auto rounded-2xl shadow-md overflow-hidden my-12">
      <Carousel className="relative ">
        <CarouselPrevious className="absolute left-10 h-10 w-10 top-1/2 transform -translate-y-1/2 z-10" />

        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="relative">
              <span className="absolute bg-black/50 inset-0 flex items-center justify-center text-white text-4xl font-bold">
                {slide.title}
              </span>
              <StrapiImage
                src={slide.image.url}
                alt={slide.image.alternativeText || ""}
                width={1080}
                height={720}
                className="w-full h-[600px] object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="absolute right-10 h-10 w-10 top-1/2 transform -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
}
