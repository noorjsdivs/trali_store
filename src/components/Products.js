import React, { useContext, useState } from "react";
import { Row, Col, Panel, Rate } from "rsuite";
import { Store } from "../Store";
import { AiOutlineShopping, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Products = (props) => {
  const { cartstate, cartdispatch, wishliststate, wishlistdispatch } =
    useContext(Store);
  const [activecolor, setActivecolor] = useState("");
  const [activesize, setActivesize] = useState("");
  const { cart } = cartstate;

  // ================== Cart Product Add start here ==============
  const handleCartProductAdd = (product) => {
    const existingItem = cart.cartItems.find((item) => item.id === product.id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const color = activecolor;
    const size = activesize;
    cartdispatch({
      type: "CART_ADD_PRODUCT",
      payload: { ...product, quantity, color, size },
    });
  };
  // ================== Cart Product Add end here ================
  // ================== WishList Add start here ==================
  const handleWishList = (product) => {
    const existingItem = wishliststate.wishlist.wishlistItems.find(
      (item) => item.id === product.id
    );
    if (!existingItem) {
      wishlistdispatch({
        type: "WISHLIST_ADD_PRODUCT",
        payload: { ...product },
      });
      toast.success(`${product.name} is added to wishlist`);
    } else {
      toast.error(`${product.name} already added to Wishlist`);
    }
  };
  // ================== WishList Add end here ====================

  return (
    <div>
      <div className="container">
        <Row className="show-grid">
          <Col key={props.id} xs={24}>
            <div className="products">
              <Panel className="productsPanel">
                <img src={props.image} alt="productImage" />
                <div className="border">
                  <div className="ratingBrand">
                    <Rate className="rating" defaultValue={3.5} allowHalf />
                    <div className="brand">{props.brand}</div>
                  </div>
                  <div className="productstitle">
                    <Link to={`/productdetails/${props.product.id}`}>
                      <p>{props.title}</p>
                    </Link>
                  </div>
                  <div className="shapeSize">
                    <div className="round__shape">
                      {props.color.map((item, i) => (
                        <span
                          key={i}
                          className={activecolor === item ? " activeColor" : ""}
                          style={{ background: `#${item}` }}
                          onClick={() => setActivecolor(item)}
                        ></span>
                      ))}
                    </div>
                    <div className="size">
                      <ul>
                        {props.size.map((item, i) => (
                          <li
                            className={activesize === item ? "activeSize" : ""}
                            key={i}
                            onClick={() => setActivesize(item)}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="price">
                    <div className="priceLeft">
                      <span onClick={() => handleCartProductAdd(props.product)}>
                        <AiOutlineShopping size={30} />
                      </span>
                      <p>${props.price}</p>
                    </div>
                    <div className="priceRight">
                      <p onClick={() => handleWishList(props.product)}>
                        <AiFillHeart size={30} />
                      </p>
                    </div>
                  </div>
                </div>
              </Panel>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Products;
