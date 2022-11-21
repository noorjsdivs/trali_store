import React, { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { Link } from "react-router-dom";
import { Breadcrumb, Row, Col, Rate, Button } from "rsuite";
import { AiOutlineShopping, AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import CartFooter from "../components/CartFooter";

const CompareProducts = () => {
  const { cartstate, cartdispatch, comparestate, comparedispatch } =
    useContext(Store);
  const compareProducts = comparestate;
  const [compare, setCompare] = useState([]);
  const [activecolor, setActivecolor] = useState("");
  const [activesize, setActivesize] = useState("");
  const { cart } = cartstate;
  useEffect(() => {
    setCompare(compareProducts.compareItem.compareItems);
    // eslint-disable-next-line
  }, []);

  //=============== Adding product on the Cart start here ===============
  const handleCartProductAdd = (item) => {
    const products = item;
    const existingItem = cart.cartItems.find((item) => item.id === products.id);

    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const color = activecolor;
    const size = activesize;
    if (!existingItem) {
      cartdispatch({
        type: "CART_ADD_PRODUCT",
        payload: { ...products, quantity, color, size },
      });
      toast.success(`${products.name} added to the Shopping Cart`);
    } else {
      toast.error(`${products.name} already added to the Cart`);
    }
  };
  //=============== Adding product on the Cart end here ===============
  //=============== Adding Compare product start here ===============
  const handleCompareItemRemove = (item) => {
    comparedispatch({
      type: "REMOVE_COMPARE_PRODUCT",
      payload: item,
    });
  };
  const handleClearCompare = (item) => {
    comparedispatch({
      type: "CLEAR_COMPARE",
      payload: item,
    });
  };
  //=============== Adding Compare product end here ===============

  return (
    <div className="compareProducts">
      <div className="container">
        <div className="cartHeader">
          <Breadcrumb>
            <Breadcrumb.Item className="breadcrum" href="/">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrum" href="/">
              Shop
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrum" active>
              Compare
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="title">
          <h1>Compare Items</h1>
          <button>Only Differences</button>
        </div>
        {compareProducts.compareItem.compareItems.length > 0 ? (
          <>
            <div className="compareItems">
              <div className="compareItemsTitle">
                <Row gutter={40}>
                  <Col xs={6}>
                    <p>Items</p>
                  </Col>
                  <Col xs={4}>
                    <p>Colors</p>
                  </Col>
                  <Col xs={4}>
                    <p>Size</p>
                  </Col>
                  <Col xs={4}>
                    <p>Material</p>
                  </Col>
                  <Col xs={3}>
                    <p>Price</p>
                  </Col>
                  <Col xs={2}></Col>
                </Row>
              </div>
              {compare.map((product) => (
                <div key={product.id}>
                  <div className="compareItemsProduct">
                    <Row gutter={40}>
                      <Col xs={6}>
                        <div className="item">
                          <div className="itemImg">
                            <img
                              style={{ width: "120px" }}
                              src={product.image}
                              alt="productImg"
                            />
                          </div>
                          <div className="des">
                            <p className="brand">{product.brand}</p>
                            <p className="name">{product.title}</p>
                            <p className="rate">
                              <Rate
                                className="rating"
                                defaultValue={3.5}
                                allowHalf
                              />
                            </p>
                            <p className="icon">
                              <AiOutlineShopping
                                onClick={() => handleCartProductAdd(product)}
                                size={30}
                              />
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className="color">
                          <div className="round__shape">
                            {product.color.map((item, i) => (
                              <span
                                className={
                                  activecolor === item ? "activeColor" : ""
                                }
                                key={i}
                                style={{
                                  background: `#${item}`,
                                  cursor: "pointer",
                                }}
                                onClick={() => setActivecolor(item)}
                              ></span>
                            ))}
                          </div>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className="color">
                          <div className="size">
                            <ul>
                              {product.size.map((item, i) => (
                                <li
                                  className={
                                    activesize === item ? "activeSize" : ""
                                  }
                                  key={i}
                                  onClick={() => setActivesize(item)}
                                  style={{ cursor: "pointer" }}
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className="color">
                          <p className="material">Unknown</p>
                        </div>
                      </Col>
                      <Col xs={3}>
                        <div className="color">
                          <p className="price">${product.price}</p>
                        </div>
                      </Col>
                      <Col xs={2}>
                        <div className="color">
                          <div className="deleteIcon">
                            <AiFillDelete
                              onClick={() => handleCompareItemRemove(product)}
                              size={30}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              ))}
            </div>
            <div className="comapreItemsBottom">
              <Button
                onClick={handleClearCompare}
                color="red"
                appearance="primary"
              >
                Clear Compare Items
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="cartMsg">
              <h1>Compare Item List is Empty</h1>
              <div className="btn">
                <Link to="/">
                  <Button className="cartMsgBtn" appearance="primary">
                    Go to Products
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <CartFooter />
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

export default CompareProducts;
