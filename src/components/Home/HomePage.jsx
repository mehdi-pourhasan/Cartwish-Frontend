import HeroSection from "./HeroSection";

import iPhone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeatureProducts from "./FeatureProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy iPhone 14 pro"
        subtitle="Experience the power of the latest iphone 14 with our most pro camera ever."
        link="/product/65fec7d8a2a26c93a5094419"
        image={iPhone}
      />

      <FeatureProducts />

      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add studio display to your bag after configure your mac mini"
        link="/product/65fec7d8a2a26c93a5094425"
        image={mac}
      />
    </div>
  );
};

export default HomePage;
