import React, { useRef, useEffect, useContext } from "react";
import SideDashboard from "../components/SideDashboard";
import { Row, Col } from "rsuite";
import Typed from "typed.js";
import { Store } from "../Store";

const VendorDashboard = () => {
  const { state } = useContext(Store);
  const typeTarget = useRef(null);
  useEffect(() => {
    const typed = new Typed(typeTarget.current, {
      strings: [
        "Welcome you to Vendor Dashboard",
        "you can open your Store with Trali",
        "Upload your products easily",
        "Find your customers in Trali",
      ],
      typeSpeed: 120,
      smartBackspace: true,
      loop: true,
    });
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div>
      <div className="container">
        <div className="vendorDashboard">
          <Row className="show-grid" gutter={20}>
            <Col xs={6}>
              <SideDashboard />
            </Col>
            <Col xs={18}>
              <div className="details">
                <h3>
                  Hello {state.userInfo.name}! <span ref={typeTarget}></span>
                </h3>
                <h6>
                  As a Vendor you have below listed access on the product
                  Server:
                </h6>
                <ul>
                  <li>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Ut, rem?
                  </li>
                  <li>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Ut, rem?
                  </li>
                  <li>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Ut, rem?
                  </li>
                  <li>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Ut, rem?
                  </li>
                  <li>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Ut, rem?
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
