import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Img from "../lazyloadingimage/lazyloadingimage";
import "./style.scss";
import Genres from "../genres/genres";

const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel">
      {title && <div className="carouselTitle">{title}</div>}
      <BsFillArrowLeftCircleFill
        className="carouselLeftNav arrow"
        onClick={() => navigation("left")}
      />
      {!loading ? (
        <div className="carouselItems" ref={carouselContainer}>
          {data?.map((item) => {
            const posterUrl = item.poster_path
              ? url.poster + item.poster_path
              : "/no-poster.jpg";
            return (
              <div
                key={item.id}
                className="carouselItem"
                onClick={() =>
                  navigate(`/${endpoint || item.media_type}/${item.id}`)
                }
              >
                <div className="posterBlock">
                  <Img src={posterUrl} />
                  <Genres data={item.genre_ids.slice(0, 1)} />
                </div>
                <div className="textBlock">
                  <span className="title">{item.title || item.name}</span>
                  <span className="date">
                    {dayjs(item.release_date || item.first_air_date).format(
                      "MMM D, YYYY"
                    )}
                  </span>
                  <span className="rating">
                    {item.vote_average.toFixed(1)}★
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <center>
          <div className="loadingSkeleton" style={{ fontSize: "20px" }}>
            Loading....
          </div>
        </center>
      )}
      <BsFillArrowRightCircleFill
        className="carouselRighttNav arrow"
        onClick={() => navigation("right")}
      />
    </div>
  );
};

export default Carousel;
