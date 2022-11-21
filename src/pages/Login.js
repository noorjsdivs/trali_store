import React, { useState, useContext, useEffect } from "react";
import { Store } from "../Store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Panel, Form, ButtonToolbar, Button } from "rsuite";
import axios from "axios";

const Login = () => {
  const state = useLocation();
  useEffect(() => {
    if (state) {
      toast.success(state.state);
    } else {
      state.state = "";
    }
  }, [state]);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(Store);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Email is required !");
    } else if (password === "") {
      toast.error("Password is required !");
    } else {
      const { data } = await axios.post("http://localhost:8000/login", {
        email: email,
        password: password,
      });
      if (data) {
        toast.error(data);
      }
      if ((data.msg = "You are Successfully logged in")) {
        dispatch({ type: "USER_LOGIN", payload: data.data });
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        setEmail("");
        setPassword("");
        navigate("/", { state: data.msg });
      }
    }
  };
  return (
    <div>
      <div className="container">
        <div className="registration">
          <Panel>
            <Form className="regiForm">
              <h3>Login</h3>

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
                <ButtonToolbar>
                  <Button appearance="primary" block onClick={handleLogin}>
                    Sign in
                  </Button>
                  <p>
                    Do not have an Account?{" "}
                    <Link to="/registration"> Register </Link>
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

export default Login;
