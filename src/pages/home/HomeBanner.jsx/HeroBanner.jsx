import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import store from "../../../store";
import Img from "../../../componets/lazyloadingimage/lazyloadingimage";
import "./style.scss";
import ContentWrapper from "../../../componets/contentWrapper/contentWrapper";
const HeroBanner = () => {
  const { url } = useSelector((store) => store.home);
  //SETING USESTATE FOR CHANGING BG IMAGE AND SEARCH QUERY
  const [bg, setbg] = useState("*");
  const [searchquery, setsearchquery] = useState("");
  const Navigate = useNavigate();

  //for API FETCHING FOR UPCOMING
  const { data, loading, error } = useFetch("/movie/upcoming");

  //CHOOSE RANDOM ID FOR BG IMAGE
  //data? mean run if data present
  useEffect(() => {
    const bgRandom =
      url.backdrop +
      data?.results?.[Math.ceil(Math.random() * 19)]?.backdrop_path;
    setbg(bgRandom);
  }, [data]);

  //TO HANDLE SEARCH ON ENTER
  const handlesearch = (e) => {
    if (e.key == "Enter" && searchquery.length > 0) {
      Navigate(`/search/${searchquery}`);
      setsearchquery("");
    }
  };
  const handlesearchviabtn = (e) => {
    if (searchquery.length > 0) {
      Navigate(`/search/${searchquery}`);
      setsearchquery("");
    }
  };
  return (
    <ContentWrapper>
      <div className="heroBanner">
        <div className="bgImage">
          {!loading && (
            <div className="backdrop-img">
              <Img src={bg} />
            </div>
          )}
        </div>
        <div className="opacitylayer"></div>
        <div className="wrapper">
          <div className="heroBannerContent">
            <span className="title">Welcome,</span>
            <span className="subtitle">
              Millions of movies,TV shows and people to discover. Explore now.
            </span>
            <div className="searchInput">
              <input
                type="text"
                onChange={(e) => setsearchquery(e.target.value)}
                value={searchquery}
                onKeyUp={handlesearch}
                placeholder="Search for a movie or tv"
              ></input>
              <button className="searchBtn" onClick={handlesearchviabtn}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default HeroBanner;
