import React from "react";
import logoImg from "../assets/images/logo.png";
import cardOne from "../assets/images/footer/visa__card.png";
import cardTwo from "../assets/images/footer/paypal__card.png";
import cardThree from "../assets/images/footer/ae__card.png";
import cardFour from "../assets/images/footer/master__card.png";
import { FiPhoneCall, FiInstagram } from "react-icons/fi";
import { BsTwitter, BsYoutube, BsGithub } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

const HomeFooter = () => {
  return (
    <div className="HomeFooter">
      <div className="container">
        <div className="footerTop">
          <div className="info">
            <div className="image">
              <img src={logoImg} style={{ width: "120px" }} alt="LogoImg" />
            </div>
            <div className="phone">
              <p>Call us free</p>
              <h3>+1 800 6565 222</h3>
              <span>
                <FiPhoneCall color="#fc9d9d" size={40} />
              </span>
            </div>
            <div className="timing">
              <p>Mon-Sun: 9:00am - 9:00pm</p>
            </div>
            <div className="icons">
              <ul>
                <li>
                  <FiInstagram size={30} />
                </li>
                <li>
                  <BsTwitter size={30} />
                </li>
                <li>
                  <FaFacebookF size={30} />
                </li>
                <li>
                  <BsYoutube size={30} />
                </li>
                <li>
                  <BsGithub size={30} />
                </li>
              </ul>
            </div>
          </div>
          <div className="getInTouch">
            <h3>Get In Touch</h3>
            <ul>
              <li>Delivery Information</li>
              <li>Discount</li>
              <li>100% Purchase Protection</li>
              <li>Returns Center</li>
              <li>Your Account</li>
            </ul>
          </div>
          <div className="getInTouch">
            <h3>Categories</h3>
            <ul>
              <li>Woman</li>
              <li>Men</li>
              <li>Accessories</li>
              <li>Sports Shoes</li>
              <li>Clothes</li>
            </ul>
          </div>
          <div className="paymentMethod">
            <h3>Get In Touch</h3>
            <div className="images">
              <img src={cardOne} alt="cardOne" />
              <img src={cardTwo} alt="cardTwo" />
              <img src={cardThree} alt="cardThree" />
              <img src={cardFour} alt="cardFour" />
            </div>
          </div>
        </div>
      </div>
      <div className="bottomFooter">
        <div className="container">
          <div className="bottomFooterDetails">
            <div className="left">
              <p>
                All rights reserved
                <span>
                  <AiOutlineCopyrightCircle size={18} />
                </span>
                2022 trali.bd
              </p>
            </div>
            <div className="right">
              <ul>
                <li>Home</li>
                <li>Shop</li>
                <li>Blog</li>
                <li>About</li>
                <li>Contacts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
