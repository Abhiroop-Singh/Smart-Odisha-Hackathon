import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ changeLanguage, language }) => {
  return (
    <div>
      <nav>
        <a href="/">
          <img src={require("../../Assets/logo.png")} alt="" />
        </a>
        <ul id="navul">
          <li>
            {" "}
            <Link to="/track">
              {language === "odiya" ? "ଟ୍ରାକ୍ କରନ୍ତୁ" : "Track"}
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/industry">
              {language === "odiya" ? "ଶିଳ୍ପ-ଅଭିଯୋଗ" : "Industry-Complaint"}
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/industryLogin">
              {language === "odiya" ? "ଶିଳ୍ପ" : "Industry"}
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/Committee">
              {language === "odiya" ? "କମିଟି" : "Committee"}
            </Link>
          </li>
          <li>
            <Link to="/Municipal">
              {language === "odiya" ? "ମ୍ୟୁନିସିପାଲିଟି" : "Municipal"}
            </Link>
          </li>
        </ul>

        <button onClick={changeLanguage} id="langbut">
          {language === "English"
            ? "Change Language to odiya"
            : "ଭାଷାକୁ ଇଂରାଜୀରେ ପରିବର୍ତ୍ତନ କରନ୍ତୁ"}
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
