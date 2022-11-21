import React from "react";
import { Button } from "rsuite";
import bgImg from "../assets/images/freeshipping/freeShipping.png";

const FreeShipping = () => {
  return (
    <div className="freeShipping">
      <img src={bgImg} alt="backgroundImages" />
      <div className="container">
        <div>
          <div className="details">
            <h1>Free shipping worldwide on all baskets over $200</h1>
            <Button className="bannerButton">Go to Shop</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeShipping;
