import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import DetailBanner from "./detailsbanner/DetailBanner";
import Cast from "./cast/Cast";
import { useParams } from "react-router-dom";
import "./style.scss";
import Similar from "./similer/Similar";
import Recommand from "./Reccomand/Recommand";
import Popular from "../home/Popular/Popular";
const Details = () => {
  const { mediaType, id } = useParams();
  return (
    <div>
      <DetailBanner mediaType={mediaType} id={id} />
      <hr />
      <Cast mediaType={mediaType} id={id} />
      <div style={{ margin: "0% 7% 0% 2%" }}>
        <Popular />
      </div>
      <Similar mediaType={mediaType} id={id} />
      <Recommand mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
