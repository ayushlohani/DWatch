import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { PiPlayCircleLight } from "react-icons/pi";
import { MdOutlineStarPurple500 } from "react-icons/md";
import "./style.scss";
import Trailer from "../Trailer/Trailer";
const DetailBanner = ({ mediaType, id }) => {
  const { url } = useSelector((store) => store.home);
  const toHoursandMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}hrs ${minutes > 0 ? `${minutes}` : ""}m`;
  };
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const [trailerstatus, settailerstatus] = useState(false);
  const handletrailer = () => {
    settailerstatus(!trailerstatus);
  };
  const [trailerlink, settrailerlink] = useState("");
  const handletrailerlink = (link) => {
    settrailerlink(link);
  };
  const posterUrl = data?.poster_path
    ? url.poster + data.poster_path
    : "/no-poster.jpg";
  const backdropurl = data?.backdrop_path
    ? url.backdrop + data?.backdrop_path
    : "/no-backdrop.jpg";
  return (
    <div>
      {!loading ? (
        <div className="detailsBanner">
          <div className="backdrop">
            <img src={backdropurl} alt="..." />
          </div>
          <div className="detailinfo">
            <div className="poster">
              <img src={posterUrl} />
              {data?.adult && <span className="adult">18+</span>}
            </div>
            <div className="other-info">
              <div className="summary">
                <div className="title">
                  {mediaType == "movie"
                    ? data?.title + "(" + data?.release_date?.slice(0, 4) + ")"
                    : data?.name +
                      "(" +
                      data?.first_air_date?.slice(0, 4) +
                      ")"}
                </div>
                <div className="summarygenres">
                  {data?.genres?.map((item) => (
                    <span className="summary-genres">
                      {item.name.length > 7
                        ? item?.name?.slice(0, 6) + ".."
                        : item.name}
                    </span>
                  ))}
                </div>
                <div className="summary-info">
                  <div className="overview-title"> Overview</div>
                  <hr />
                  <div className="overview">
                    {data?.overview?.slice(0, 200)}
                  </div>
                </div>
                <div className="summary-btn">
                  <span className="rating">
                    {data?.vote_average?.toFixed(1)}
                    <MdOutlineStarPurple500 style={{ marginLeft: "5px" }} />
                  </span>
                  <span className="trailer-btn" onClick={handletrailer}>
                    <PiPlayCircleLight size={40} />
                    Watch Trailer
                  </span>
                  <a
                    href={trailerlink}
                    className="trailer-btn-md"
                    target="_blank"
                  >
                    <PiPlayCircleLight size={40} />
                    Watch Trailer
                  </a>
                  <Trailer
                    mediaType={mediaType}
                    id={id}
                    handletrailer={handletrailer}
                    stat={trailerstatus}
                    handletrailerlink={handletrailerlink}
                  />
                </div>
                <div className="details">
                  <span>
                    Status:-
                    <span style={{ color: "#f6faf9a2" }}>{data?.status}</span>
                  </span>
                  <span className="de">
                    Release-Date:-
                    <span style={{ color: "#f6faf9a2" }}>
                      {data?.release_date ||
                        data?.first_air_date?.slice(0, 4) +
                          " - " +
                          data?.last_air_date?.slice(0, 4)}
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
        </div>
      ) : (
        <div className="loading">Loading....</div>
      )}
    </div>
  );
};

export default DetailBanner;
