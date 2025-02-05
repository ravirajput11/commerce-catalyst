import { contentfulAPI } from "@/contentful/contentful";
import { useEffect, useState } from "react";
import TopPicks from "./products/top-picks";

const SquareIiamges = () => {
  const [squareImages, setSquareImages] = useState([]);

  useEffect(() => {
    const fetchSquareImages = async () => {
      try {
        const response = await contentfulAPI.get(
          "?content_type=commerceCatalyst"
        );
        // console.log("Contentful data:", response.data.items);
        const items =
          response.data.items[0]?.fields.commerceCatalystImages || [];
        // console.log("items", items);

        const assets = response.data.includes.Asset;
        // console.log("assets", assets);

        // Map asset IDs to URLs
        const images = items
          .map((item: any) => {
            const asset = assets.find(
              (asset: any) => asset.sys.id === item.sys.id
            );
            return asset ? `https:${asset.fields.file.url}` : null;
          })
          .filter(Boolean); // Remove null values if no asset found

        // console.log("asset images", images);
        setSquareImages(images);
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
        return [];
      }
    };

    fetchSquareImages();
  }, []);

  // console.log("squareImages", squareImages);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="flex bg-[#EBE2F4] p-4 drop-shadow-lg rounded-xl ">
          <img
            src={squareImages[0]}
            alt="square image 1"
            className="w-full h-40 object-cover rounded-md mb-2"
          />
          <div className="text-sm">
            <p>SPECIAL SALE 60% OFFER</p>
            <p className="font-bold">SHOP NOW</p>
          </div>
        </div>
        <div className="flex bg-[#D3F1EC] p-4 drop-shadow-lg rounded-xl ">
          <img
            src={squareImages[1]}
            alt="square image 1"
            className="w-full h-40 object-cover rounded-md mb-2"
          />
          <div className="text-sm">
            <p>SPECIAL SALE 80% OFFER</p>
            <p className="font-bold">SHOP NOW</p>
          </div>
        </div>
        <div className="flex bg-[#EFEFEF] p-4 drop-shadow-lg rounded-xl ">
          <img
            src={squareImages[2]}
            alt="square image 1"
            className="w-full h-40 object-cover rounded-md mb-2"
          />
          <div className="text-sm">
            <p>DISCOUNT SALE UPTO 20%</p>
            <p className="font-bold">SHOP NOW</p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <TopPicks />
      </div>

      {/* FASHION SALE */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex bg-[#9A9576] p-4 drop-shadow-lg rounded-xl h-48">
          <img
            src={squareImages[3]}
            alt="square image 1"
            className="w-22 h-full object-cover rounded-md mb-2"
          />
          <div className="text-sm">
            <p>DISCOUNT SALE UPTO 20%</p>
            <p className="font-bold">SHOP NOW</p>
          </div>
        </div>
        <div className="flex bg-[#ABAFB2] p-4 drop-shadow-lg rounded-xl h-48">
          <img
            src={squareImages[4]}
            alt="square image 1"
            className="w-22 h-full object-cover rounded-md mb-2"
          />
          <div className="text-sm">
            <p>DISCOUNT SALE UPTO 20%</p>
            <p className="font-bold">SHOP NOW</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquareIiamges;
