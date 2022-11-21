import React, { useState, useContext } from "react";
import { Checkbox, Button } from "rsuite";
import { Store } from "../Store";
import axios from "axios";

const Vendor = () => {
  const { state } = useContext(Store);
  const [agree, setAgree] = useState(false);
  const handleVendor = async () => {
    let { data } = await axios.put(
      `http://localhost:8000/vendor/${state.userInfo._id}`
    );
    console.log(data);
  };
  return (
    <div>
      <div className="container">
        <div className="vendor">
          <div className="vendorTitle">
            <h3>Please read the statements carefully before submit.</h3>
          </div>
          <div className="vendorSubtitle">
            <ul>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
                repudiandae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
                repudiandae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
                repudiandae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
                repudiandae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
                repudiandae.
              </li>
            </ul>
            <Checkbox onChange={() => setAgree(!agree)} className="checkbox">
              {" "}
              Become a Vendor
            </Checkbox>
          </div>
          {agree ? (
            <Button onClick={handleVendor} className="vendorButton">
              Go to Shop
            </Button>
          ) : (
            <Button className="disabledBtn" disabled>
              Go to Shop
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vendor;
