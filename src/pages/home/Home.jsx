import React from "react";
import HeroBanner from "./HomeBanner.jsx/HeroBanner";
import "./style.scss";
import Trending from "./trending/Trending";
import Popular from "./Popular/Popular";
import TopRated from "./topRated/TopRated";
const Home = () => {
  return (
    <div className="HomePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
