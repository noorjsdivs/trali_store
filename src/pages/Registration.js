import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Panel, Form, ButtonToolbar, Button } from "rsuite";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const handleRegistration = (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Name is required !");
    } else if (email === "") {
      toast.error("Email is required !");
    } else if (password === "") {
      toast.error("Password is required !");
    } else if (cpassword === "") {
      toast.error("confirm your password !!");
    } else if (password !== cpassword) {
      toast.error("Password not matched !!!");
    } else {
      axios.post("http://localhost:8000/registration", {
        name: name,
        email: email,
        password: password,
      });

      setName("");
      setEmail("");
      setPassword("");
      setCpassword("");
      navigate("/login", { state: "Account Created Successfully !!!" });
    }
  };
  return (
    <div>
      <div className="container">
        <div className="registration">
          <Panel>
            <Form className="regiForm">
              <h3>Registration</h3>
              <Form.Group>
                <Form.ControlLabel>Name</Form.ControlLabel>
                <Form.Control
                  onChange={(e) => setName(e)}
                  value={name}
                  name="name"
                  type="text"
                  block
                  placeholder="Give your Name"
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control
                  onChange={(e) => setEmail(e)}
                  value={email}
                  type="email"
                  name="email"
                  block
                  placeholder="Give a valid Email"
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel block>Password</Form.ControlLabel>
                <Form.Control
                  onChange={(e) => setPassword(e)}
                  value={password}
                  name="password"
                  type="password"
                  autoComplete="off"
                  placeholder="Give me your password"
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel block>Confirm Password</Form.ControlLabel>
                <Form.Control
                  onChange={(e) => setCpassword(e)}
                  value={cpassword}
                  name="cpassword"
                  type="password"
                  autoComplete="off"
                  placeholder="Confirm your password"
                />
              </Form.Group>
              <Form.Group>
                <ButtonToolbar>
                  <Button
                    appearance="primary"
                    block
                    onClick={handleRegistration}
                  >
                    Sign in
                  </Button>
                  <p>
                    Have an Account? <Link to="/login"> Log In </Link>
                  </p>
                </ButtonToolbar>
              </Form.Group>
            </Form>
          </Panel>
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

export default Registration;
