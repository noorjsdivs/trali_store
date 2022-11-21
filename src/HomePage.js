import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AboutUs from "./components/AboutUs";
import BannerSlider from "./components/BannerSlider";
import DealBanner from "./components/DealBanner";
import FreeShipping from "./components/FreeShipping";
import HomeFooter from "./components/HomeFooter";
import NewsLetter from "./components/NewsLetter";
import TopProduct from "./components/TopProduct";

const HomePage = () => {
  const state = useLocation();
  useEffect(() => {
    if (state) {
      toast.success(state.state);
    } else {
      state.state = "";
    }
  }, [state]);
  return (
    <div>
      <BannerSlider />
      <DealBanner />
      <TopProduct />
      <FreeShipping />
      <AboutUs />
      <NewsLetter />
      <HomeFooter />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default HomePage;
