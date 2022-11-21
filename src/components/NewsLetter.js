import React from "react";
import { Input, Button } from "rsuite";
import { BiSupport } from "react-icons/bi";
import { RiExchangeDollarLine } from "react-icons/ri";

import { FaShippingFast } from "react-icons/fa";

const NewsLetter = () => {
  return (
    <div className="newsLetterbg">
      <div className="container">
        <div className="newsLetter">
          <div className="newsLetterTop">
            <div className="details">
              <h2>Sign Up For Our</h2>
              <h1>NewsLetters</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Consequuntur voluptas dolore deleniti consectetur praesentium
                quaerat amet nemo ipsum dignissimos ex?
              </p>
            </div>
            <div className="inputs">
              <Input placeholder="Subscribe" />
              <Button className="button" appearance="primary">
                Submit
              </Button>
            </div>
          </div>
          <div className="newsLetterBottom">
            <div className="newsLetterBottomLeft">
              <p>
                <FaShippingFast size={60} />
              </p>
              <h4>Free Shipping</h4>
              <span>
                <FaShippingFast size={60} />
              </span>
            </div>
            <div className="newsLetterBottomLeft">
              <p>
                <RiExchangeDollarLine size={60} />
              </p>
              <h4>Free Shipping</h4>
              <span>
                <RiExchangeDollarLine size={60} />
              </span>
            </div>
            <div className="newsLetterBottomLeft">
              <p>
                <BiSupport size={60} />
              </p>
              <h4>Free Shipping</h4>
              <span>
                <BiSupport size={60} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
