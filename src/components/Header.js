import React, { useContext, useState } from "react";
import { Store } from "../Store";
import {
  Navbar,
  Nav,
  Grid,
  Row,
  Col,
  Drawer,
  List,
  Button,
  Message,
} from "rsuite";
import logoImg from "../assets/images/logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { FaBalanceScale } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const {
    state,
    dispatch,
    cartstate,
    cartdispatch,
    comparestate,
    wishliststate,
    wishlistdispatch,
  } = useContext(Store);
  const { cart } = cartstate;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // ================ Cart items part start here==============
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

  const handleClearCart = () => {
    cartdispatch({
      type: "CLEAR_CART",
    });
  };
  const handleComparePage = () => {
    navigate("/compareproducts");
  };
  // ================ Cart items part end here================

  const handleHome = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const handleCart = (e) => {
    e.preventDefault();
    navigate("/cart");
  };
  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");

    navigate("/", { state: "Logout Successfully" });
  };
  const handleVendor = () => {
    navigate("/vendor");
  };
  const handleWishList = () => {
    navigate("/wishlist");
  };
  return (
    <div className="header__home">
      <div className="container">
        <Grid fluid={true}>
          <Row>
            <div className="navBar">
              <Navbar>
                <div className="left">
                  <Col lg={8}>
                    <Link to="/">
                      <img src={logoImg} alt="" />
                    </Link>
                  </Col>
                </div>
                <div className="center">
                  <Col lg={8}>
                    <Nav>
                      <Nav.Item onClick={handleHome}>Home</Nav.Item>
                      <Nav.Item onClick={handleCart}>Cart</Nav.Item>
                      <Nav.Item>Contact</Nav.Item>
                      {state.userInfo ? (
                        <Nav.Menu title={state.userInfo.name}>
                          <div className="userMenu">
                            <Nav.Item>Profile</Nav.Item>
                            {state.userInfo.isVendor ? (
                              <Link to="/vendordashboard">
                                <Nav.Item>Vendor Dashboard</Nav.Item>
                              </Link>
                            ) : (
                              <Nav.Item onClick={handleVendor}>
                                Become A Vendor
                              </Nav.Item>
                            )}

                            <Nav.Item onClick={handleLogout}>Logout</Nav.Item>
                          </div>
                        </Nav.Menu>
                      ) : (
                        ""
                      )}
                    </Nav>
                  </Col>
                </div>
                <div className="left">
                  <Col lg={8}>
                    <Nav pullRight>
                      <Nav.Item>
                        <FaRegUserCircle size={25} />
                      </Nav.Item>
                      <Nav.Item onClick={handleWishList}>
                        <AiOutlineHeart size={30} />
                        {wishliststate.wishlist.wishlistItems.length > 0 ? (
                          <span className="headerCompareItems">
                            {wishliststate.wishlist.wishlistItems.length}
                          </span>
                        ) : (
                          ""
                        )}
                      </Nav.Item>
                      <Nav.Item onClick={handleComparePage}>
                        <FaBalanceScale size={30} />
                        {comparestate.compareItem.compareItems.length > 0 ? (
                          <span className="headerCompareItems">
                            {comparestate.compareItem.compareItems.length}
                          </span>
                        ) : (
                          ""
                        )}
                      </Nav.Item>
                      <Nav.Item
                        onClick={() => setOpen(true)}
                        className="leftIcon"
                      >
                        <FiShoppingCart size={25} />
                        <span className="cartItems">
                          {cart.cartItems.length}
                        </span>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </div>
              </Navbar>
            </div>
          </Row>
        </Grid>
        <Drawer
          className="cartCloseIcon "
          open={open}
          onClose={() => setOpen(false)}
        >
          <Drawer.Header>
            <Drawer.Title className="cartTitle">
              Your Cart Items List
            </Drawer.Title>
            <Drawer.Actions></Drawer.Actions>
          </Drawer.Header>
          <Drawer.Body>
            {cart.cartItems.length > 0 ? (
              <List>
                {cart.cartItems.map((item) => (
                  <List.Item key={item.id}>
                    <div className="cartItemList">
                      <div className="details">
                        <img src={item.image} width="50" alt="productImages" />
                        <h6>{item.title}</h6>
                        <h6>${item.price}</h6>
                        <h6>{item.size}</h6>
                        <span
                          style={{
                            background: `#${item.color}`,
                          }}
                        ></span>
                      </div>
                      <div className="buttons">
                        <Button
                          onClick={() =>
                            handleQuantity(item, item.quantity + 1)
                          }
                          appearance="primary"
                        >
                          +
                        </Button>
                        <p>{item.quantity}</p>
                        <Button
                          onClick={() =>
                            handleQuantity(
                              item,
                              item.quantity > 1
                                ? item.quantity - 1
                                : item.quantity
                            )
                          }
                          color="orange"
                          appearance="primary"
                        >
                          -
                        </Button>
                        <Button
                          onClick={() => handleDeleteCart(item)}
                          color="red"
                          appearance="primary"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </List.Item>
                ))}
                <div className="cartItemBottomBtn">
                  <Link to="/cart">
                    <Button appearance="primary">Go to Cart Page</Button>
                  </Link>
                  <Button
                    onClick={handleClearCart}
                    color="red"
                    appearance="primary"
                  >
                    Clear Cart
                  </Button>
                </div>
              </List>
            ) : (
              <Message className="cartMsg" type="info">
                Your Item Cart is Empty
              </Message>
            )}
          </Drawer.Body>
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
