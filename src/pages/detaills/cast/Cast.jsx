import React, { useRef } from "react";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";
import { useSelector } from "react-redux";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
const Cast = ({ mediaType, id }) => {
  const containerref = useRef();
  const { data, loading } = useFetch(`/${mediaType}/${id}/credits`);
  const { url } = useSelector((store) => store.home);
  const arrowNavigate = (direction) => {
    const container = containerref.current;
    const scrollamnt =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollamnt,
      behavior: "smooth",
    });
  };
  const profurl = url.profile + data?.profile_path;
  return (
    <div className="cast-page">
      Cast
      <div className="cast" ref={containerref}>
        <BsFillArrowLeftCircleFill
          size={40}
          className="left-arrow arrow"
          onClick={() => {
            arrowNavigate("left");
          }}
        />
        {data &&
          data?.cast?.map((data) => (
            <div className="cast-card">
              <img
                className="profile-img"
                src={
                  data.profile_path
                    ? url.profile + data.profile_path
                    : "/no-cast.jpg"
                }
                alt="..."
              />
              <div className="charac">{data.character}</div>
              <div className="name">{data.original_name}</div>
            </div>
          ))}
        <BsFillArrowRightCircleFill
          size={40}
          className="right-arrow arrow"
          onClick={() => {
            arrowNavigate("right");
          }}
        />
      </div>
    </div>
  );
};

export default Cast;
