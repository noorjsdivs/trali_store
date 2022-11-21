import React from "react";
import { Carousel, Button } from "rsuite";
import SliderImgOne from "../assets/images/slider/sliderImage__1.png";
import SliderImgTwo from "../assets/images/slider/2.jpg";

import SliderImgFour from "../assets/images/slider/4.jpg";

const BannerSlider = () => {
  return (
    <div>
      <div className="banner">
        <Carousel autoplay className="custom-slider bannerSlider">
          <img src={SliderImgOne} alt="sliderImg" />
          <img src={SliderImgTwo} alt="sliderImg" />
          <img src={SliderImgFour} alt="sliderImg" />
        </Carousel>
        <div className="container">
          <div className="bannerText">
            <h6>STOCK IS LIMITED</h6>
            <h1>
              End of Season Clearance Sale upto <span>30%</span>
            </h1>
            <Button className="bannerButton">Go to Shop</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
