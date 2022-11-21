import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { FaAppStore } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { SiGnuprivacyguard } from "react-icons/si";
import { VscSettingsGear } from "react-icons/vsc";
import { Link } from "react-router-dom";

const SideDashboard = () => {
  return (
    <div>
      <div className="sidenav">
        <ul>
          <Link to="/productupload">
            <li>
              <span>
                <RiProductHuntLine size={25} />
              </span>
              Product Upload
            </li>
          </Link>
          <Link to="/storename">
            <li>
              <span>
                <FaAppStore size={25} />
              </span>
              Store Name Upload
            </li>
          </Link>
          <Link to="/vendordashboard">
            <li>
              <span>
                <CgProfile size={25} />
              </span>
              Dashboard
            </li>
          </Link>
          <li>
            <span>
              <SiGnuprivacyguard size={25} />
            </span>
            Privacy
          </li>
          <li>
            <span>
              <VscSettingsGear size={25} />
            </span>
            Settings
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideDashboard;
