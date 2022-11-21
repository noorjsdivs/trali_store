import React, { useContext, useState, useEffect } from "react";
import { Store } from "../Store";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Breadcrumb, Row, Col, Rate } from "rsuite";
import { AiOutlineHeart } from "react-icons/ai";
import { FaBalanceScale } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import CartFooter from "../components/CartFooter";
import ImgOne from "../assets/images/collection/bg.png";
import ImgTwo from "../assets/images/collection/bg2.png";
import ImgThree from "../assets/images/collection/bg3.png";

const ProductDetails = () => {
  let [products, setProducts] = useState([]);
  let [colors, setColors] = useState([]);
  let [sizes, setSizes] = useState([]);
  const [activecolor, setActivecolor] = useState("");
  const [activesize, setActivesize] = useState("");
  const [activeItems, setActiveItems] = useState("");
  const params = useParams();
  let [selected, setSelected] = useState("description");

  //=================== store start here ============
  const { cartstate, cartdispatch, comparestate, comparedispatch } =
    useContext(Store);
  const { cart } = cartstate;
  //=================== store end here ==============

  useEffect(() => {
    async function details() {
      let { data } = await axios.get(
        `http://localhost:8000/productdetails/${params.id}`
      );
      setProducts(data);
      setColors(data.color);
      setSizes(data.size);
    }
    details();
  }, [params.id]);

  useEffect(() => {
    const existingItem = cart.cartItems.find((item) => item.id === products.id);
    if (existingItem) {
      setActiveItems(existingItem);
    } else setActiveItems("");
  }, [cart, products.id]);

  const handleCartProductAdd = (products) => {
    const existingItem = cart.cartItems.find((item) => item.id === products.id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const color = activecolor;
    const size = activesize;
    if (!existingItem) {
      cartdispatch({
        type: "CART_ADD_PRODUCT",
        payload: { ...products, quantity, color, size },
      });
    }
  };
  let handleQuantity = (activeItems, quantity) => {
    cartdispatch({
      type: "CART_ADD_PRODUCT",
      payload: { ...activeItems, quantity },
    });
  };

  const handleCompare = () => {
    const existingItem = comparestate.compareItem.compareItems.find(
      (item) => item.id === products.id
    );

    if (!existingItem) {
      comparedispatch({
        type: "ADD_COMPARE_PRODUCT",
        payload: { ...products },
      });
      toast.success(`${products.name} added to Compare List`);
    } else {
      toast.error(`${products.name} already added to Compare`);
    }
  };
  const handleSelected = (select) => {
    setSelected(select);
  };

  return (
    <div>
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
                Product Page
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="productDetails">
          <div className="top">
            <Row gutter={50}>
              <Col xs={10}>
                <img
                  width="100%"
                  className="productImg"
                  src={products.image}
                  alt="ProductDetails Images"
                />
              </Col>
              <Col xs={14}>
                <div className="productDetailsRight">
                  <h1>{products.title}</h1>
                  <div className="instock">
                    <div className="price">
                      <p className="validPrice">${products.price}</p>
                      <p className="invalidPrice">${products.price}</p>
                    </div>
                    <div className="stock">
                      <span></span>
                      <p>In Stock</p>
                    </div>
                    <div className="icons">
                      <span>
                        <AiOutlineHeart size={35} />
                      </span>
                      <span
                        onClick={handleCompare}
                        style={{ cursor: "pointer" }}
                      >
                        <FaBalanceScale size={35} />
                      </span>
                    </div>
                  </div>
                  <div className="reviews">
                    <div className="reviewsrate">
                      <Rate
                        className="reviewsRating"
                        defaultValue={3.5}
                        allowHalf
                      />
                    </div>
                    <div className="addreviews">
                      <p>
                        6 Review <span>Add review</span>
                      </p>
                      <span className="line"></span>
                    </div>
                  </div>
                  <div className="description">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Est saepe labore ipsam quaerat error maiores obcaecati
                      commodi a. Earum placeat soluta in animi, ipsum rerum
                      iusto? Temporibus quidem facere dicta!
                    </p>
                  </div>
                  <div className="selectColor">
                    <div className="selectColorLeft">
                      <div>
                        <p>Select Color</p>
                      </div>
                      <div className="round__shape">
                        {colors.map((item, i) => (
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
                    </div>
                    <div className="selectColorLeft">
                      <div>
                        <p>Choose Size</p>
                      </div>
                      <div className="size">
                        <ul>
                          {sizes.map((item, i) => (
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
                  </div>
                  <div className="addToCart">
                    {activeItems ? (
                      <>
                        <div className="cartButtons">
                          <div className="quantity">
                            <button
                              onClick={() =>
                                handleQuantity(
                                  activeItems,
                                  activeItems.quantity + 1
                                )
                              }
                            >
                              +
                            </button>
                            <p>{activeItems.quantity}</p>
                            <button
                              onClick={() =>
                                handleQuantity(
                                  activeItems,
                                  activeItems.quantity > 1
                                    ? activeItems.quantity - 1
                                    : activeItems.quantity
                                )
                              }
                            >
                              -
                            </button>
                          </div>
                        </div>
                        <div className="cartPrice">
                          <p>
                            <span>SubTotal:</span>$
                            {products.price * activeItems.quantity}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          onClick={() => handleCartProductAdd(products)}
                          className="cartIcons"
                        >
                          <span>
                            <AiOutlineShopping />
                          </span>
                          <p>Add to Cart</p>
                          <span className="line"></span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="categories">
                    <p>
                      Category: <span>{products.category}</span>
                    </p>
                    <p>
                      Brand: <span>{products.brand}</span>
                    </p>
                    <p>
                      Id: <span>{products._id}</span>
                    </p>
                  </div>
                  <div className="icons">
                    <BsInstagram />
                    <BsTwitter />
                    <FaFacebookF />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {/*==========================================================
                Reviews part start here
        ===========================================================*/}
        <div className="productDetailsReviews">
          <div className="productDetailsReviewsTitle">
            <p
              onClick={() => handleSelected("description")}
              style={{
                borderBottom: selected === "description" && "3px solid #05297f",
              }}
            >
              Description
            </p>
            <p
              onClick={() => handleSelected("reviews")}
              style={{
                borderBottom: selected === "reviews" && "3px solid #05297f",
              }}
            >
              Reviews <span>(4)</span>
            </p>
            <p
              onClick={() => handleSelected("info")}
              style={{
                borderBottom: selected === "info" && "3px solid #05297f",
              }}
            >
              Additional Information
            </p>
          </div>
          <div className="productDetailsReviewsDescription">
            {selected === "description" && (
              <div>
                <p>
                  Descriptino ipsum dolor sit amet consectetur, adipisicing
                  elit. Repellendus deserunt asperiores natus, eos a soluta ad,
                  rerum fugit doloremque accusamus ratione repellat tenetur
                  ipsum? Quas est ut cum, reiciendis hic nostrum natus
                  dignissimos dolorem consequuntur voluptas ad, dicta qui
                  numquam dolor consectetur dolore eligendi debitis totam quis
                  quibusdam minima harum.
                </p>
                <div className="additionalInfo">
                  <p>
                    Material: <span>100% Cotton</span>
                  </p>
                  <p>
                    Color: <span>100% Green, Blue, Pink, Red</span>
                  </p>
                  <p>
                    Size: <span>S, M, LG, XL</span>
                  </p>
                  <p>
                    Weight: <span>500 g</span>
                  </p>
                </div>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Enim, expedita nobis voluptatum, voluptas assumenda ipsam,
                  numquam fuga similique et reiciendis minima consequatur!
                  Debitis consequuntur culpa accusantium repellat, totam dolorum
                  earum!
                </p>
                <div className="images">
                  <img src={ImgOne} alt="ImageOne" />
                  <img src={ImgTwo} alt="ImageTwo" />
                  <img src={ImgThree} alt="ImageThree" />
                </div>
              </div>
            )}
            {selected === "reviews" && (
              <div>
                <p>
                  Reviews ipsum dolor sit amet consectetur, adipisicing elit.
                  Repellendus deserunt asperiores natus, eos a soluta ad, rerum
                  fugit doloremque accusamus ratione repellat tenetur ipsum?
                  Quas est ut cum, reiciendis hic nostrum natus dignissimos
                  dolorem consequuntur voluptas ad, dicta qui numquam dolor
                  consectetur dolore eligendi debitis totam quis quibusdam
                  minima harum. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Iste iusto natus sequi sed accusamus eveniet
                  excepturi! Distinctio quasi omnis soluta cumque! Atque fugit
                  temporibus quos inventore laudantium cupiditate pariatur
                  perspiciatis ad quo ullam nam quas, perferendis consequatur
                  odit quis voluptates incidunt molestiae aut ex ea libero!
                  Cumque quia quam nulla.
                </p>
                <div className="additionalInfo">
                  <p>
                    Unkonwn: <span>Excellent Products.</span>
                  </p>
                  <p>
                    Stephen <span>Love to shopping with trali.</span>
                  </p>
                  <p>
                    Jenifer: <span>It is always a five Stars.</span>
                  </p>
                  <p>
                    Robert: <span>Great experience.</span>
                  </p>
                </div>
              </div>
            )}
            {selected === "info" && (
              <p>
                Additional Information ipsum dolor sit amet consectetur,
                adipisicing elit. Repellendus deserunt asperiores natus, eos a
                soluta ad, rerum fugit doloremque accusamus ratione repellat
                tenetur ipsum? Quas est ut cum, reiciendis hic nostrum natus
                dignissimos dolorem consequuntur voluptas ad, dicta qui numquam
                dolor consectetur dolore eligendi debitis totam quis quibusdam
                minima harum. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Voluptas in assumenda fuga labore eos quos minima quasi
                necessitatibus accusamus. Recusandae! Lorem, ipsum dolor sit
                amet consectetur adipisicing elit. Repudiandae consequuntur
                iusto excepturi aperiam voluptatem aut ut corrupti nemo quasi
                quidem.
              </p>
            )}
          </div>
        </div>
        {/*==========================================================
                Reviews part end here
        ===========================================================*/}
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

export default ProductDetails;
