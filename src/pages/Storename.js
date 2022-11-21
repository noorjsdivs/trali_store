import React, { useContext, useEffect, useState } from "react";
import SideDashboard from "../components/SideDashboard";
import { Row, Col, Form, Panel, ButtonToolbar, Button, Modal } from "rsuite";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Storename = () => {
  const { state } = useContext(Store);
  const [storeName, setStoreName] = useState("");
  const [storeOwner, setStoreOwner] = useState("");
  const [store, setStore] = useState("");
  const [open, setOpen] = useState(false);
  const [storeDetails, setStoreDetails] = useState({});
  const [updateStoreName, setUpdateStoreName] = useState("");
  const handleStoreSubmit = async (e) => {
    e.preventDefault();
    if (storeName === "") {
      toast.error("Please Enter your Store Name");
    } else {
      let { data } = await axios.post("http://localhost:8000/storename", {
        storename: storeName,
        owner: state.userInfo._id,
        ownername: state.userInfo.name,
      });
      toast.success(data);
      console.log(storeName);
      setStoreName("");
    }
  };
  useEffect(() => {
    async function store() {
      let { data } = await axios.get(
        `http://localhost:8000/storename/${state.userInfo._id}`
      );
      setStore(data[0].storename);
      setStoreOwner(data[0].ownername);
      setStoreDetails(data);
    }
    store();
  }, [state.userInfo._id]);

  // ========== Storename edit start here ============
  const handleEdit = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditStorename = async (e) => {
    e.preventDefault();
    console.log("done");
    let { data } = await axios.put("http://localhost:8000/storename", {
      storename: updateStoreName,
      id: storeDetails[0]._id,
    });
    toast.success(data);
    setOpen(false);
  };
  //======================== Delete Store Name
  const handleDeleteStoreName = async (e) => {
    console.log(storeDetails[0]._id);
    let { data } = await axios.delete(
      `http://localhost:8000/storename/${storeDetails[0]._id}`
    );
    toast.success(data);
    e.preventDefault();
  };
  // ========== Storename edit end here ============

  return (
    <div>
      <div className="container">
        <Row className="show-grid" gutter={20}>
          <Col xs={6}>
            <SideDashboard />
          </Col>
          <Col xs={12}>
            {store ? (
              <div className="storeName">
                <div className="name">
                  <h5>Store Name:</h5>
                  <p>{store}</p>
                </div>
                <div className="name">
                  <h5>Store Owner:</h5>
                  <p>{storeOwner}</p>
                </div>
                <div className="buttons">
                  <Button
                    onClick={handleEdit}
                    className="btn"
                    appearance="primary"
                  >
                    Edit Storename
                  </Button>
                  <Button
                    onClick={handleDeleteStoreName}
                    className="btn"
                    color="red"
                    appearance="primary"
                  >
                    Delete Store
                  </Button>
                </div>
              </div>
            ) : (
              <div className="products">
                <h2 className="title"> Upload your Store name here:</h2>
                <div className="registration">
                  <Panel>
                    <Form className="regiForm">
                      <h3>Store Register:</h3>
                      <Form.Group>
                        <Form.ControlLabel>Store Name</Form.ControlLabel>
                        <Form.Control
                          name="name"
                          onChange={(e) => setStoreName(e)}
                          value={storeName}
                          type="text"
                          block
                          placeholder="Enter Your Store Name"
                        />
                      </Form.Group>
                      <ButtonToolbar>
                        <Button
                          onClick={handleStoreSubmit}
                          appearance="primary"
                          block
                        >
                          Upload StoreName
                        </Button>
                        <p>
                          Done Uploading ?
                          <Link to="/vendordashboard">
                            <span>Go to Dashboard</span>
                          </Link>
                        </p>
                      </ButtonToolbar>
                    </Form>
                  </Panel>
                </div>
              </div>
            )}
          </Col>
          <Modal open={open}>
            {/* <Modal.Header>
              <Modal.Title>Edit Store Name:</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
              <div className="registration">
                <Panel>
                  <Form className="regiForm">
                    <Form.Group>
                      <Form.ControlLabel>
                        Edit Your Store Name
                      </Form.ControlLabel>
                      <Form.Control
                        name="name"
                        onChange={(e) => setUpdateStoreName(e)}
                        value={updateStoreName}
                        type="text"
                        block
                        placeholder="Enter Your Store Name"
                      />
                    </Form.Group>
                  </Form>
                </Panel>
              </div>
            </Modal.Body>
            <Modal.Footer className="modalFooter">
              <Button
                className="btn"
                onClick={handleEditStorename}
                appearance="primary"
              >
                Change Storename
              </Button>
              <Button
                className="btn"
                onClick={handleClose}
                color="red"
                appearance="primary"
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
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

export default Storename;
