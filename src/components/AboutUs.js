import React from "react";
import { Button } from "rsuite";
import ImgOne from "../assets/images/aboutUs/aboutUs__1.png";
import ImgTwo from "../assets/images/aboutUs/aboutUs__2.png";
import ImgThree from "../assets/images/aboutUs/aboutUs__3.png";

const AboutUs = () => {
  return (
    <div>
      <div className="container">
        <div className="aboutUs">
          <div className="aboutUsLeft">
            <img className="imgOne" src={ImgOne} alt="ImageOne" />
            <img className="imgTwo" src={ImgTwo} alt="ImageTwo" />
          </div>
          <div className="aboutUsMiddle">
            <h4>Best sport shop</h4>
            <h1>Something about us</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              voluptatem repudiandae reprehenderit tempore similique quas et
              quos corrupti blanditiis tenetur vero, possimus autem! Qui natus
              porro aliquid similique, ipsam sunt.
            </p>
            <Button className="aboutUsButton">Go to Shop</Button>
          </div>
          <div className="aboutUsRight">
            <img className="imgThree" src={ImgThree} alt="ImgThree" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
