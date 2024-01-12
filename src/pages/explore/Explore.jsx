import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import "./style.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../componets/card/Moviecard";
import { fetchDataFromApi } from "../../utils/api";

const Explore = () => {
  const { mediaType, id } = useParams();
  const [pageNum, setPageNum] = useState(1);
  const { query } = useParams();
  const [data, setData] = useState(null);
  const [Loading, setLoading] = useState(true);
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(
      `/${mediaType}/popular?language=en-US&page=${pageNum}`
    ).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(
      `/${mediaType}/popular?language=en-US&page=${pageNum}`
    ).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);
  return (
    <div className="search-result">
      <div className="handleheader"></div>
      {Loading ? (
        <div className="loading"></div>
      ) : (
        <InfiniteScroll
          dataLength={data?.results?.length || 0}
          hasMore={true}
          loader={
            <h3
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "azure",
                height: "100px",
              }}
            >
              Loading....
            </h3>
          }
          next={fetchNextPageData}
        >
          {data?.results?.length > 0 ? (
            <div className="cards">
              {data?.results.map((item, index) => (
                <MovieCard
                  key={index}
                  data={item}
                  fromSearch={true}
                  mediaType={mediaType}
                />
              ))}
            </div>
          ) : (
            <div className="page-not-found">404 page not found</div>
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Explore;
