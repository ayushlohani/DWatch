import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../componets/lazyloadingimage/lazyloadingimage";
import { PiPlayCircleLight } from "react-icons/pi";
import { MdOutlineStarPurple500 } from "react-icons/md";
import "./style.scss";
import Cast from "../cast/Cast";
const DetailBanner = ({ video, crew }) => {
  const { url } = useSelector((store) => store.home);
  const toHoursandMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}hrs ${minutes > 0 ? `${minutes}` : ""}m`;
  };
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { data: videos } = useFetch(`/${mediaType}/${id}/videos`);
  console.log(data);
  console.log("hii");
  console.log(videos);
  return (
    <div>
      {!loading ? (
        <div className="detailsBanner">
          <div className="backdrop">
            <img src={url.backdrop + data?.backdrop_path} alt="..." />
          </div>
          <div className="detailinfo">
            <div className="poster">
              <img src={url.poster + data?.poster_path} />
              {data?.adult && <span className="adult">18+</span>}
            </div>
            <div className="other-info">
              <div className="summary">
                <div className="title">
                  {mediaType == "movie"
                    ? data?.title + "(" + data?.release_date.slice(0, 4) + ")"
                    : data?.name + "(" + data?.first_air_date.slice(0, 4) + ")"}
                </div>
                <div className="summarygenres">
                  {data?.genres.map((item) => (
                    <span className="summary-genres">{item.name}</span>
                  ))}
                </div>
                <div className="summary-info">
                  <div className="overview-title"> Overview</div>
                  <hr />
                  <div className="overview">{data?.overview}</div>
                </div>
                <div className="summary-btn">
                  <span className="rating">
                    {data?.vote_average.toFixed(1)}
                    <MdOutlineStarPurple500 style={{ marginLeft: "5px" }} />
                  </span>
                  <span className="trailer-btn">
                    <PiPlayCircleLight size={40} />
                    Watch Trailer
                  </span>
                </div>
                <div className="details">
                  <span>
                    Status:-
                    <span style={{ color: "#f6faf9a2" }}>{data?.status}</span>
                  </span>
                  <span>
                    Release-Date:-
                    <span style={{ color: "#f6faf9a2" }}>
                      {data?.release_date ||
                        data?.first_air_date.slice(0, 4) +
                          " - " +
                          data?.last_air_date.slice(0, 4)}
                    </span>
                  </span>
                </div>
                <div className="details">
                  {mediaType == "movie" ? (
                    <span>
                      RunTime:-
                      <span style={{ color: "#f6faf9a2" }}>
                        {toHoursandMinutes(data?.runtime)}
                      </span>
                    </span>
                  ) : (
                    <span>
                      No. of Episodes:-
                      <span style={{ color: "#f6faf9a2" }}>
                        {data?.number_of_episodes}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="cast">
            <Cast mediaType={mediaType} id={id} />
          </div>
        </div>
      ) : (
        <div className="loading">Loading....</div>
      )}
    </div>
  );
};

export default DetailBanner;
