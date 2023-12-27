import React, { useState } from "react";
import "./style.scss";
import SwitchTab from "../../../componets/switchtab/SwitchTab";
import useFetch from "../../../hooks/useFetch";
import Crousel from "../../../componets/crousel/Crousel";
const Trending = () => {
  const [endpoint, setendpoint] = useState("movie");
  const [switchtab, setswitchtab] = useState("day");
  const handleswitch = (tab) => {
    if (tab === "Day") {
      setswitchtab("day");
    } else {
      setswitchtab("week");
    }
  };
  const { data, loading } = useFetch(`/trending/all/${switchtab}`);
  return (
    <div className="trending">
      <div className="head">
        <span className="title">Trending</span>
        <span className="switchtab">
          <SwitchTab tabArr={["Day", "Week"]} handleswitch={handleswitch} />
        </span>
      </div>
      <div className="crousel">
        <Crousel data={data?.results} loading={loading} />
      </div>
    </div>
  );
};

export default Trending;
