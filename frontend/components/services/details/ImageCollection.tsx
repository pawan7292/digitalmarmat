import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default async function ImageCollection({
  images,
}: {
  images: string[];
}) {
  return (
    <div className="w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((eachImage, index) => (
            <CarouselItem key={index}>
              <div className="overflow-hidden rounded-xl aspect-video bg-slate-100">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachImage}`}
                  alt={`Service image ${index + 1}`}
                  className="w-full h-full object-contain"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white shadow-sm" />
        <CarouselNext className="right-3 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white shadow-sm" />
      </Carousel>

      {/* Thumbnail dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full bg-slate-300 transition-all ${i === 0 ? "w-5 bg-[#1d58a9]" : "w-1.5"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
