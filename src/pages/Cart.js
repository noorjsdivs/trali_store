import React, { useContext, useEffect, useRef, useState } from "react";
import { Breadcrumb, Row, Col, Button, Input } from "rsuite";
import { Store } from "../Store";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import { AiFillDelete } from "react-icons/ai";
import CartFooter from "../components/CartFooter";

const Cart = () => {
  const { cartstate, cartdispatch } = useContext(Store);
  const { cart } = cartstate;
  const [total, setTotal] = useState("");
  const [shipping, setShipping] = useState("");
  let handleQuantity = (item, quantity) => {
    cartdispatch({
      type: "CART_ADD_PRODUCT",
      payload: { ...item, quantity },
    });
  };
  const handleDeleteCart = (item) => {
    cartdispatch({
      type: "CART_REMOVE_PRODUCT",
      payload: item,
    });
  };
  useEffect(() => {
    let price = 0;
    // eslint-disable-next-line
    cart.cartItems.map((item) => {
      price += item.price * item.quantity;
    });
    setTotal(price);
    if (price >= 500) {
      setShipping(20);
    } else if (price < 500) {
      setShipping(30);
    }
  }, [cart.cartItems]);

  const typeTarget = useRef(null);
  useEffect(() => {
    const typed = new Typed(typeTarget.current, {
      strings: [
        "Please proceed to Checkout for Finalising your Shopping",
        "Trali always protect your privacy and personal Information",
      ],
      typeSpeed: 70,
      backSpeed: 20,
      backDelay: 4000,
      startDelay: 1000,
      loop: true,
      smartBackspace: true,
    });
    return () => {
      typed.destroy();
    };
  }, []);

  const handleCheckout = () => {
    console.log("checkout");
  };

  return (
    <div className="cart">
      <div className="container">
        <div className="cartHeader">
          <div>
            <Breadcrumb>
              <Breadcrumb.Item className="breadcrum" href="/">
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrum" href="/">
                Products
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrum" active>
                Cart
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="title">
            <h1>Cart Page</h1>
            <h4>
              <span ref={typeTarget}></span>
            </h4>
          </div>
        </div>
        <div className="cartDetails">
          {cart.cartItems.length > 0 ? (
            <div>
              <Row className="show-grid" gutter={40}>
                <Col xs={16}>
                  <div className="productInfo">
                    <Row>
                      <Col xs={11}>
                        <div>
                          <h6>Item</h6>
                        </div>
                      </Col>
                      <Col xs={3}>
                        <div>
                          <h6>Price</h6>
                        </div>
                      </Col>
                      <Col xs={5}>
                        <div>
                          <h6>Quantity</h6>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div>
                          <h6>Subtotal</h6>
                        </div>
                      </Col>
                      <Col xs={1}>
                        <div></div>
                      </Col>
                    </Row>
                    {cart.cartItems.map((item) => (
                      <Row className="show-grid cartItems" key={item.id}>
                        <Col xs={11}>
                          <div className="item">
                            <img src={item.image} width="160" alt="" />
                            <div className="itemText">
                              <p className="brand">{item.brand}</p>
                              <p className="name">{item.title}</p>
                              <div
                                className="description"
                                dangerouslySetInnerHTML={{
                                  __html: item.description,
                                }}
                              />

                              <p className="color">
                                Color:
                                <span
                                  style={{
                                    width: "14px",
                                    height: "14px",
                                    borderRadius: "50%",
                                    background: `#${item.color}`,
                                    display: "inline-flex",
                                  }}
                                ></span>
                              </p>
                              <h6 className="size">
                                Size: <span>{item.size}</span>
                              </h6>
                            </div>
                          </div>
                        </Col>
                        <Col xs={3}>
                          <div className="price">
                            <p>${item.price}</p>
                          </div>
                        </Col>
                        <Col xs={5}>
                          <div className="quantity">
                            <button
                              onClick={() =>
                                handleQuantity(item, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                            <p>{item.quantity}</p>
                            <button
                              onClick={() =>
                                handleQuantity(
                                  item,
                                  item.quantity > 1
                                    ? item.quantity - 1
                                    : item.quantity
                                )
                              }
                            >
                              -
                            </button>
                          </div>
                        </Col>
                        <Col xs={4}>
                          <div className="subtotal">
                            <p>${item.price * item.quantity}</p>
                          </div>
                        </Col>
                        <Col xs={1}>
                          <div>
                            <AiFillDelete
                              className="deleteIcon"
                              onClick={() => handleDeleteCart(item)}
                              size={30}
                            />
                          </div>
                        </Col>
                      </Row>
                    ))}
                    <div className="discount">
                      <h2>Coupon Discount</h2>
                      <div className="discountbtn">
                        <Input placeholder="Enter your code here" />
                        <Button className="btn" appearance="primary">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={8}>
                  <div className="shippingInfo">
                    <div className="inputs">
                      <h3>Shipping</h3>
                      <Input placeholder="Address" />
                      <Input placeholder="Phone Number" />
                      <Input placeholder="Email Address" />
                      <Input placeholder="Country" />
                    </div>
                    <Button className="btn" appearance="primary">
                      Submit
                    </Button>
                    <div className="total">
                      <div className="subtotal">
                        <p>Subtotal</p>
                        <p>${total}</p>
                      </div>
                      <div className="shipping">
                        <p>Shipping</p>
                        <p>${shipping}</p>
                      </div>
                      <div className="orderTotal">
                        <p>Order Total</p>
                        <p className="total">${total + shipping}</p>
                      </div>
                    </div>
                    <Button
                      onClick={handleCheckout}
                      className="checkoutBtn"
                      appearance="primary"
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            <div className="cartMsg">
              <h1>Your Cart is Empty</h1>
              <div className="btn">
                <Link to="/">
                  <Button className="cartMsgBtn" appearance="primary">
                    Go to Products
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <CartFooter />
    </div>
  );
};

export default Cart;
