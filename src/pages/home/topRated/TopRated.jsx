import React, { useState } from "react";
import "./style.scss";
import SwitchTab from "../../../componets/switchtab/SwitchTab";
import useFetch from "../../../hooks/useFetch";
import Crousel from "../../../componets/crousel/Crousel";
const TopRated = () => {
  const [switchtab, setswitchtab] = useState("movie");
  const handleswitch = (tab) => {
    if (tab === "Movies") {
      setswitchtab("movie");
    } else {
      setswitchtab("tv");
    }
  };
  const { data, loading } = useFetch(`/${switchtab}/top_rated`);
  return (
    <div className="topRated">
      <div className="head">
        <span className="title">Top Rated</span>
        <span className="switchtab">
          <SwitchTab
            tabArr={["Movies", "Series"]}
            handleswitch={handleswitch}
          />
        </span>
      </div>
      <div className="crousel">
        <Crousel data={data?.results} loading={loading} endpoint={switchtab} />
      </div>
    </div>
  );
};

export default TopRated;
