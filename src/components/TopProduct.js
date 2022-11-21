import React from "react";
import Products from "./Products";
import { Row, Col } from "rsuite";
import { productData } from "../constants";

const TopProduct = () => {
  return (
    <div>
      <div className="container">
        <div className="topProduct">
          <div className="topProduct__top">
            <div>
              <h1>Top Products</h1>
            </div>
            <div>
              <ul>
                <li>
                  <span></span>All
                </li>
                <li>
                  <span></span>Boys Collection
                </li>
                <li>
                  <span></span>Girls Collection
                </li>
                <li>
                  <span></span>Shose Collection
                </li>
              </ul>
            </div>
          </div>
          <div className="topProduct__bottom">
            <Row className="show-grid">
              {productData.map((item) => (
                <Col key={item.id} xs={6}>
                  <Products
                    _id={item.id}
                    product={item}
                    image={item.image}
                    title={item.title}
                    brand={item.brand}
                    price={item.price}
                    color={item.color}
                    size={item.size}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProduct;
