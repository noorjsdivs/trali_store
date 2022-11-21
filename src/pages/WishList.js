import React, { useContext, useEffect, useRef, useState } from "react";
import { Breadcrumb, Row, Col, Panel, Rate, Dropdown, Button } from "rsuite";
import { Store } from "../Store";
import Typed from "typed.js";
import { AiFillDelete, AiOutlineShopping } from "react-icons/ai";
import CartFooter from "../components/CartFooter";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const WishList = () => {
  const { wishliststate, wishlistdispatch, cartstate, cartdispatch } =
    useContext(Store);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const typeTarget = useRef(null);
  const [activecolor, setActivecolor] = useState("");
  const [activesize, setActivesize] = useState("");
  const { cart } = cartstate;

  useEffect(() => {
    setWishlistProducts(wishliststate.wishlist.wishlistItems);

    const typed = new Typed(typeTarget.current, {
      strings: [
        "Buy products from wishlist with surprising offers and gifts",
        "Your Wish list products will be removed after a week of inactivities",
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
  }, [wishliststate]);
  //=============== Adding product on the Cart start here ===============
  const handleCartProductAdd = (item) => {
    const products = item;
    const existingItem = cart.cartItems.find(
      (item) => item._id === products._id
    );

    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const color = activecolor;
    const size = activesize;
    if (!existingItem) {
      cartdispatch({
        type: "CART_ADD_PRODUCT",
        payload: { ...products, quantity, color, size },
      });
      wishlistdispatch({
        type: "REMOVE_WISHLIST_PRODUCT",
        payload: item,
      });
      toast.success(`${products.name} added to the Shopping Cart`);
    } else {
      toast.error(`${products.name} already added to the Cart`);
    }
  };
  //=============== Adding product on the Cart end here ===============
  //============== WishList Product Remove start here ==================
  const handleWishlistItemRemove = (item) => {
    wishlistdispatch({
      type: "REMOVE_WISHLIST_PRODUCT",
      payload: item,
    });
  };
  const handleClearWishList = (item) => {
    wishlistdispatch({
      type: "CLEAR_WISHLIST",
      payload: item,
    });
  };
  //============== WishList Product Remove end here ====================
  // console.log(wishlistProducts);
  return (
    <div className="wishList">
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
                Wish List
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="title">
            <h1>Wish List</h1>
            <h4>
              <span ref={typeTarget}></span>
            </h4>
          </div>
        </div>
      </div>
      {wishlistProducts.length > 0 ? (
        <div className="container">
          <div className="inputSort">
            <div className="inputSortDropdown">
              <Dropdown className="inputSortDown" title="Sort By">
                <Dropdown.Item>Price</Dropdown.Item>
                <Dropdown.Item>Categories</Dropdown.Item>
                <Dropdown.Item>Brand</Dropdown.Item>
                <Dropdown.Item>Colors</Dropdown.Item>
                <Dropdown.Item>Size</Dropdown.Item>
                <Dropdown.Item>Others</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <div className="wishlistProducts">
            <Row className="show-grid">
              {wishlistProducts.map((item) => (
                <Col key={item.id} xs={6}>
                  <div className="products">
                    <Panel className="productsPanel">
                      <img src={item.image} alt="productImage" />
                      <div className="border">
                        <div className="ratingBrand">
                          <Rate
                            className="rating"
                            defaultValue={3.5}
                            allowHalf
                          />
                          <div className="brand">{item.brand}</div>
                        </div>
                        <div className="productstitle">
                          <p>{item.title}</p>
                        </div>
                        <div className="shapeSize">
                          <div className="round__shape">
                            {item.color.map((item, i) => (
                              <span
                                className={
                                  activecolor === item ? " activeColor" : ""
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
                          <div className="size">
                            <ul>
                              {item.size.map((item, i) => (
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
                        <div className="price">
                          <div className="priceLeft">
                            <span>
                              <AiOutlineShopping
                                onClick={() => handleCartProductAdd(item)}
                                size={30}
                              />
                            </span>
                            <p>${item.price}</p>
                          </div>
                          <div className="priceRight">
                            <p>
                              <AiFillDelete
                                onClick={() => handleWishlistItemRemove(item)}
                                color="red"
                                size={30}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </Panel>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <div className="comapreItemsBottom">
            <Button
              onClick={handleClearWishList}
              color="red"
              appearance="primary"
            >
              Clear Your Wishlist
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="container">
            <div className="cartMsg">
              <h1>Your Wish List is Empty</h1>
              <div className="btn">
                <Link to="/">
                  <Button className="cartMsgBtn" appearance="primary">
                    Go to Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
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

export default WishList;
