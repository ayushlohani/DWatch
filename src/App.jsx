import { useEffect, useState } from "react";
import "./App.css";
import { fetchDataFromApi } from "./utils/api";
import store from "./store";
import { useDispatch, useSelector } from "react-redux";
import { homeAction } from "./store/homeSlice";
import Header from "./componets/Header/header";
import { Outlet } from "react-router-dom";
import Footer from "./componets/Footer/footer";
import HeroBanner from "./pages/home/HomeBanner.jsx/HeroBanner";
function App() {
  const homeurl = useSelector((store) => store.home.url);
  const dispatch = useDispatch();
  const apitesting = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(homeAction.getApiconfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(homeAction.getGenres(allGenres));
  };

  useEffect(() => {
    apitesting();
    genresCall();
  }, []);

  return (
    <div className="Page">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
