import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
const Trailer = ({ mediaType, id, handletrailer, stat, handletrailerlink }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const linkbase = "https://www.youtube.com/embed/";
  if (data && window.innerWidth <= 600) {
    handletrailerlink(linkbase + data.results[0].key);
  }
  return (
    <>
      <>
        {stat && (
          <div className="trailer">
            {data && (
              <iframe
                src={linkbase + data.results[0].key}
                frameBorder={0}
                width={"100%"}
              />
            )}
            <IoClose className="close" size={50} onClick={handletrailer} />
          </div>
        )}
      </>
    </>
  );
};

export default Trailer;
