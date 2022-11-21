import React from "react";
import { Input, Button } from "rsuite";
import Img1 from "../assets/images/cart/1.png";
import Img2 from "../assets/images/cart/2.png";
import Img3 from "../assets/images/cart/3.png";
import Img4 from "../assets/images/cart/4.png";
import Img5 from "../assets/images/cart/5.png";
import Img6 from "../assets/images/cart/6.png";
import logoImg from "../assets/images/footerLogo.png";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const CartFooter = () => {
  return (
    <div className="cartFooter">
      <div className="cartFooterTop">
        <img src={Img1} alt="FooterImg" />
        <img src={Img2} alt="FooterImg" />
        <img src={Img3} alt="FooterImg" />
        <img src={Img4} alt="FooterImg" />
        <img src={Img5} alt="FooterImg" />
        <img src={Img6} alt="FooterImg" />
        <Link to="/">
          <div className="gotoTrali">
            <p>go to</p>
            <h4>Trali</h4>
          </div>
        </Link>
      </div>
      <div className="cartFooterBottom">
        <div className="cartFooterBottomTop">
          <div className="container">
            <div className="topPart">
              <div className="one">
                <img src={logoImg} alt="logoimage" />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Molestiae numquam possimus earum ut deleniti magni quis a
                  dolor veritatis optio.
                </p>
              </div>
              <div className="two">
                <h3>Generals</h3>
                <ul>
                  <li>Customer support</li>
                  <li>Payments</li>
                  <li>API supports</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
              <div className="two">
                <h3>Supports</h3>
                <ul>
                  <li>Terms and Conditions</li>
                  <li>Products Retuen</li>
                  <li>Wholesale Policy</li>
                  <li>Address Store</li>
                </ul>
              </div>
              <div className="two">
                <h3>Subscribe Us</h3>
                <p>Contact with us with mails.</p>
                <div className="buttons">
                  <Input placeholder="Subscribe" />
                  <Button className="button" appearance="primary">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottomFooter">
        <div className="container">
          <p>
            All rights reserved
            <span>
              <AiOutlineCopyrightCircle size={18} />
            </span>
            2022 trali.bd
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartFooter;
