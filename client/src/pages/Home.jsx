import React from "react";
import Hero from "../components/Hero";
import FeaturedDestination from "../components/FeaturedDestination";
import ExclusiveOffers from "../components/ExclusiveOffers";

import Testimonial from "../components/Testimonial";
import NewsLetter from "../components/NewsLetter";
import OurPartners from "../components/OurPartners";
import Promotional from "../components/Promotional";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedDestination />
      <ExclusiveOffers />

      <Testimonial />

      <OurPartners />
      <NewsLetter />
      <Promotional />
    </div>
  );
};

export default Home;
