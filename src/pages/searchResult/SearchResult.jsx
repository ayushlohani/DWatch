import React, { useEffect, useState } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import MovieCard from "../../componets/card/Moviecard";
const SearchResult = () => {
  const [data, setdata] = useState(null);
  const [pagenum, setpagenum] = useState(1);
  const [loading, setloading] = useState(false);
  const { query } = useParams();

  const fetchsearchdata = () => {
    setloading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pagenum}`).then(
      (res) => {
        setdata(res);
        setpagenum((prev) => prev + 1);
        setloading(false);
      }
    );
  };
  useEffect(() => {
    fetchsearchdata();
  }, [query]);

  const fetchnextdata = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pagenum}`).then(
      (res) => {
        if (data?.results) {
          setdata({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setdata(res);
        }
      }
    );
  };

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
                <div className="title">Search results for {`"${query}"`}</div>
                <div className="cards">
                  {data?.results.map((item, index) => {
                    return (
                      <MovieCard
                        key={index}
                        data={item}
                        fromSearch={true}
                        mediaType={item?.media_type}
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

export default SearchResult;
