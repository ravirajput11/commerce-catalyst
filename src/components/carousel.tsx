import { contentfulAPI } from "@/contentful/contentful";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// interface CarouselImage {
//   sys: {
//     id: string;
//   };
//   fields: {
//     image: {
//       fields: {
//         file: {
//           url: string;
//         };
//       };
//     };
//   };
// }

// export interface CarouselImage {
//     id: string;
//     title: string;
//     imageUrl: string;
//   }

const CarouselSection = () => {
  const [images, setImages] = useState([]);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await contentfulAPI.get(
          "?content_type=commerceCatalyst"
        );
        //   console.log("Contentful data:", response.data.items);
        const items =
          response.data.items[0]?.fields.commerceCatalystCarousel || [];
        //   console.log("items", items);

        const assets = response.data.includes.Asset;
        //   console.log("assets", assets);

        // Map asset IDs to URLs
        const images = items
          .map((item: any) => {
            const asset = assets.find(
              (asset: any) => asset.sys.id === item.sys.id
            );
            return asset ? `https:${asset.fields.file.url}` : null;
          })
          .filter(Boolean); // Remove null values if no asset found

        console.log("asset images", images);
        setImages(images);
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
        return [];
      }
    };
    fetchCarouselImages();
  }, []);

  if (images.length === 0) return <p>Loading...</p>;

  //   console.log("carousel Images:", images);

  return (
    <>
      <div className="mb-3">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div>
                  <img src={image} alt={"Carousel"} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
        <div className="py-3 text-center">
          <div className="flex justify-center space-x-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  current === index + 1
                    ? "bg-[#552864] border border-[#552864]"
                    : "bg-[#FFFFFF] border border-[#552864]"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarouselSection;
