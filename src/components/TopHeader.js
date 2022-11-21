import React, { useContext } from "react";
import { Store } from "../Store";
import { AiOutlineDown } from "react-icons/ai";
import { Link } from "react-router-dom";

const TopHeader = () => {
  const { state } = useContext(Store);
  return (
    <div className="headerTop">
      <div className="container">
        <div className="topHeader">
          <div className="left">
            <ul>
              <li>
                USD
                <span>
                  <AiOutlineDown size={10} />
                </span>
              </li>
              <li>
                ENGLISH
                <span>
                  <AiOutlineDown size={10} />
                </span>
              </li>
            </ul>
          </div>
          <div className="right">
            {state.userInfo ? (
              <p className="userName">{state.userInfo.email}</p>
            ) : (
              <ul>
                <Link to="/login">
                  <li>Login</li>
                </Link>
                <li>or</li>
                <Link to="/registration">
                  <li>Register</li>
                </Link>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
