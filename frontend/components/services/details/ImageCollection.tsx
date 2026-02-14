import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function ImageCollection({
  images,
}: {
  images: [string];
}) {
  return (
    <Carousel className="w-full max-w-[32rem]">
      <CarouselContent>
        {images.map((eachImage, index) => {
          return (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent
                    className="flex aspect-square items-center justify-center p-6 bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url("${eachImage}")` }}
                  ></CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious variant={"secondary"} />
      <CarouselNext />
    </Carousel>
  );
}
