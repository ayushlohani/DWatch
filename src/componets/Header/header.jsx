import React, { useEffect, useState } from "react";
import "./style.scss";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Header = () => {
  const [query, setquery] = useState("");
  const navigate = useNavigate();
  const locate = useLocation();

  const [hamshow, sethamshow] = useState(false);
  const handleham = () => {
    sethamshow(!hamshow);
  };

  const [searchShow, setsearchShow] = useState(false);
  const handleSearch = (e) => {
    if (e.key == "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setsearchShow(false);
      }, 100);
      setquery("");
    }
  };

  //handle movie and series link
  const handleNavigation = (val) => {
    if (val === "Movies") {
      navigate("/explore/Movies");
    } else {
      navigate("/explore/Series");
    }
  };

  //handeling scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [locate]);
  return (
    <header>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="logo">
          <img src="/Dwatch-logo.png"></img>
          <h1>DWatch</h1>
        </div>
      </Link>
      <div className="nav-tabs">
        <ul className={`${hamshow && "nav-links-mob"} nav-links`}>
          <li
            className="movies nav-li"
            onClick={() => {
              handleNavigation("Movies");
            }}
          >
            Movies
          </li>
          <li
            className="series nav-li"
            onClick={() => {
              handleNavigation("Series");
            }}
          >
            Web Series
          </li>
        </ul>
        <div className="ham-search">
          <li>
            <input
              className={`search-input ${!searchShow && "search-input-hide"}`}
              type="text"
              placeholder="Movies and TV shows...."
              value={query}
              onChange={(e) => {
                setquery(e.target.value);
              }}
              onKeyUp={handleSearch}
            ></input>
          </li>
          <li
            className="search"
            onClick={() => {
              setsearchShow(!searchShow);
            }}
          >
            {searchShow ? (
              <RxCross2 size={30} className="cross" />
            ) : (
              <IoIosSearch size={30} />
            )}
          </li>
          <li className={searchShow ? "search-input-hide" : "ham"}>
            {hamshow ? (
              <RxCross2 size={30} onClick={handleham} />
            ) : (
              <GiHamburgerMenu size={30} onClick={handleham} />
            )}
          </li>
        </div>
      </div>
    </header>
  );
};

export default Header;
