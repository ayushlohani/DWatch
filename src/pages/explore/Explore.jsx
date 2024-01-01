import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import "./style.scss";
import MovieCard from "../../componets/card/Moviecard";
const Explore = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(
    `/${mediaType}/popular?language=en-US&page=1`
  );
  return (
    <div className="search-result">
      <div className="handleheader"></div>
      {loading ? (
        <div className="loading"></div>
      ) : (
        <div>
          {data?.results?.length > 0 ? (
            <div>
              <>
                <div className="cards">
                  {data?.results?.map((item, index) => {
                    return (
                      <MovieCard
                        key={index}
                        data={item}
                        fromSearch={true}
                        mediaType={mediaType}
                      />
                    );
                  })}
                </div>
              </>
            </div>
          ) : (
            <div className="page-not-found">404 page not found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;
