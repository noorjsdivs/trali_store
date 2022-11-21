import React from "react";
import { Row, Col, Button } from "rsuite";
import DealImgOne from "../assets/images/deal/dealImage__1.png";
import DealImgTwo from "../assets/images/deal/dealImage__2.png";

const DealBanner = () => {
  return (
    <div>
      <div className="container">
        <div className="dealBanner">
          <Row className="show-grid" gutter={40}>
            <Col xs={12}>
              <div className="dealBannerdetails">
                <img src={DealImgOne} alt="DealBanner" />
                <div className="dealBannerInfo">
                  <h5>Flash Deal</h5>
                  <h2>Sale Up To 30% Off Clothes</h2>
                  <Button className="dealBtn">Go to Shop</Button>
                </div>
              </div>
            </Col>
            <Col xs={12}>
              <div className="dealBannerdetails">
                <img src={DealImgTwo} alt="DealBanner" />
                <div className="dealBannerInfo">
                  <h5>Flash Deal</h5>
                  <h2>Accessories Sale 20%</h2>
                  <Button className="dealBtn">Go to Shop</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default DealBanner;
