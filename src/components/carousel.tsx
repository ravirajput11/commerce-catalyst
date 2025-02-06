import { contentfulAPI } from "@/contentful/contentful";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Asset {
  sys: {
    id: string;
  };
  fields: {
    file: {
      url: string;
    };
  };
}

interface CarouselItem {
  sys: {
    id: string;
  };
}

interface ContentfulResponse {
  data: {
    items: {
      fields: {
        commerceCatalystCarousel: CarouselItem[];
      };
    }[];
    includes: {
      Asset: Asset[];
    };
  };
}

const CarouselSection = () => {
  const [images, setImages] = useState<string[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response: ContentfulResponse = await contentfulAPI.get(
          "?content_type=commerceCatalyst"
        );
        const items =
          response.data.items[0]?.fields.commerceCatalystCarousel || [];
        const assets = response.data.includes.Asset;
        // Map asset IDs to URLs
        const images = items
          .map((item: any) => {
            const asset = assets.find(
              (asset: any) => asset.sys.id === item.sys.id
            );
            return asset ? `https:${asset.fields.file.url}` : null;
          })
          .filter(Boolean); // Remove null values if no asset found
        setImages(images.filter((image): image is string => image !== null));
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
        return [];
      }
    };
    fetchCarouselImages();
  }, []);

  if (images.length === 0) return <p>Not found</p>;

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
