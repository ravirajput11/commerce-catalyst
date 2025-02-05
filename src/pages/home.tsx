import Header from "@/components/header";
import CategoriesList from "@/components/categories/categories-list";
import NewAarrivals from "@/components/products/new-arrivals/new-arrivals";
import BestSellarsInKitchen from "@/components/products/kitchen/best-sellars-in-kitchen";
import TrendingProducts from "@/components/products/trending-products";
import SquareIiamges from "@/components/square-images";
import CarouselSection from "@/components/carousel";

const Home = () => {
  return (
    <div className="flex flex-col h-[94vh] overflow-hidden">
      {/* Fixed Header */}
      <div className="fixed z-50">
        <Header />
      </div>

      {/* Main Content */}
      <div className="flex flex-col mt-[6rem] h-full">
        {/* Categories Section (Fixed) */}
        <CategoriesList />

        {/* Scrollable Section */}
        <div className="mt-[8rem] overflow-y-auto scrollbar-none p-4">
          <CarouselSection />
          <TrendingProducts />
          {/* special sale */}
          <SquareIiamges />
          <BestSellarsInKitchen />
          <NewAarrivals />
        </div>
      </div>
    </div>
  );
};

export default Home;
