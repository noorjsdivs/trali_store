import React, { useState, useRef } from "react";
import { Row, Col, Panel, Form, ButtonToolbar, Button, Checkbox } from "rsuite";
import { Link } from "react-router-dom";
import SideDashboard from "../components/SideDashboard";
import JoditEditor from "jodit-react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ProductUpload = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  let [productName, setProductName] = useState("");
  let [productBrand, setProductBrand] = useState("");
  let [productImage, setProductImage] = useState("");
  let [productCategory, setProductCategory] = useState("");
  let [productPrice, setProductPrice] = useState("");
  let [productColor, setProductColor] = useState([]);

  //================ Product Color Array Start ====================

  const handleProductColor = (e) => {
    if (e.split("").indexOf("#") !== -1) {
      toast.error("# is not acceptable");
    } else {
      setProductColor(e.split(","));
    }
  };
  //================= Product Color Array End ================

  //=============== Size Array Start ===================
  const sizeArr = [];

  const handleSizeSmall = () => {
    if (sizeArr.indexOf("sm") !== -1) {
      sizeArr.splice(sizeArr.indexOf("sm"), 1);
    } else {
      sizeArr.push("sm");
    }
  };
  const handleSizeMediun = () => {
    if (sizeArr.indexOf("md") !== -1) {
      sizeArr.splice(sizeArr.indexOf("md"), 1);
    } else {
      sizeArr.push("md");
    }
  };
  const handleSizeLarge = () => {
    if (sizeArr.indexOf("lg") !== -1) {
      sizeArr.splice(sizeArr.indexOf("lg"), 1);
    } else {
      sizeArr.push("lg");
    }
  };
  const handleSizeExtraLarge = () => {
    if (sizeArr.indexOf("xl") !== -1) {
      sizeArr.splice(sizeArr.indexOf("xl"), 1);
    } else {
      sizeArr.push("xl");
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    if (productName === "") {
      toast.error("Product name is required !");
    } else if (content === "") {
      toast.error("Product Description is required!");
    } else if (productBrand === "") {
      toast.error("Product Brand is required!");
    } else if (productImage === "") {
      toast.error("Product Image is required!");
    } else if (productCategory === "") {
      toast.error("Product Category is required!");
    } else if (productPrice === "") {
      toast.error("Product Price is required!");
    } else if (productColor.length <= 0) {
      toast.error("Product color is required!");
    } else if (sizeArr.length <= 0) {
      toast.error("Product Size is required!");
    } else {
      let data = await axios.post("http://localhost:8000/product", {
        name: productName,
        description: content,
        brand: productBrand,
        proimg: productImage,
        category: productCategory,
        price: productPrice,
        size: sizeArr,
        color: productColor,
      });
      toast.success(data.data);
      setProductName("");
      setContent("");
      setProductBrand("");
      setProductImage("");
      setProductCategory("");
      setProductPrice("");
      setProductColor([]);
    }
  };

  //================= Size Array End ========================
  return (
    <div>
      <div className="container">
        <div className="productUpload">
          <Row className="show-grid">
            <Col xs={6}>
              <SideDashboard />
            </Col>
            <Col xs={12}>
              <div className="products">
                <h2 className="title"> Please Upload your Product here:</h2>
                <div className="registration">
                  <Panel>
                    <Form className="regiForm">
                      <h3>Product Register:</h3>
                      <Form.Group>
                        <Form.ControlLabel>Product Name</Form.ControlLabel>
                        <Form.Control
                          onChange={(e) => setProductName(e)}
                          name="name"
                          value={productName}
                          type="text"
                          block
                          placeholder="Enter Product Name"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.ControlLabel>
                          Product Description
                        </Form.ControlLabel>
                        <span className="joditEditor">
                          <JoditEditor
                            ref={editor}
                            value={content}
                            tabIndex={1}
                            onBlur={(newContent) => setContent(newContent)}
                            onChange={(newContent) => {}}
                          />
                        </span>
                      </Form.Group>
                      <Form.Group>
                        <Form.ControlLabel>Product Brand</Form.ControlLabel>
                        <Form.Control
                          onChange={(e) => setProductBrand(e)}
                          value={productBrand}
                          name="name"
                          type="text"
                          block
                          placeholder="Enter Product Brand"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.ControlLabel>Product Image</Form.ControlLabel>
                        <Form.Control
                          onChange={(e) => setProductImage(e)}
                          value={productImage}
                          name="name"
                          type="text"
                          block
                          placeholder="Enter Product Image Link"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.ControlLabel>Product Category</Form.ControlLabel>
                        <Form.Control
                          onChange={(e) => setProductCategory(e)}
                          value={productCategory}
                          name="name"
                          type="text"
                          block
                          placeholder="Enter Product Category"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.ControlLabel>Product Color</Form.ControlLabel>
                        <Form.Control
                          name="name"
                          value={productColor}
                          type="text"
                          block
                          placeholder="Enter Product Color"
                          onChange={handleProductColor}
                        />
                        {productColor.length > 0 &&
                          productColor.map((item, i) => (
                            <div
                              key={i}
                              style={{
                                width: "20px",
                                height: "20px",
                                background: `#${item}`,
                                display: "inline-block",
                                marginTop: "5px",
                                marginLeft: "5px",
                                borderRadius: "50%",
                              }}
                            ></div>
                          ))}
                      </Form.Group>
                      {/* <Form.Group>
                        <Form.ControlLabel>Product Position</Form.ControlLabel>
                        <Form.Control
                          name="name"
                          type="text"
                          block
                          placeholder="Enter Product Position"
                        />
                      </Form.Group> */}
                      <Form.Group>
                        <Form.ControlLabel>Product Price</Form.ControlLabel>
                        <Form.Control
                          onChange={(e) => setProductPrice(e)}
                          value={productPrice}
                          name="name"
                          type="number"
                          block
                          placeholder="Enter Product Price"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Group>
                          <Form.ControlLabel>Product Size</Form.ControlLabel>
                          <Checkbox onChange={handleSizeSmall}>SM</Checkbox>
                          <Checkbox onChange={handleSizeMediun}>MD</Checkbox>
                          <Checkbox onChange={handleSizeLarge}>LG</Checkbox>
                          <Checkbox onChange={handleSizeExtraLarge}>
                            XL
                          </Checkbox>
                        </Form.Group>
                        {/* <Form.Group></Form.Group> */}
                        <ButtonToolbar>
                          <Button
                            onClick={handleProductSubmit}
                            appearance="primary"
                            block
                          >
                            Upload Product
                          </Button>
                          <p>
                            Done Uploading ?
                            <Link to="/">
                              <span>view Product</span>
                            </Link>
                          </p>
                        </ButtonToolbar>
                      </Form.Group>
                    </Form>
                  </Panel>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
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

export default ProductUpload;
