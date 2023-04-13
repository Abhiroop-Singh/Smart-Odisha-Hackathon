import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import "../committee/committee.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const IndustryLogin = ({ changeLanguage, language }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };

    const res = await fetch("/api/industrySignIn", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const content = await res.json();
    console.log(content);
    if (content.success) {
      toast.success("Login Successfully", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("industry_name", email);
      setTimeout(() => {
        navigate("/indDash");
      }, 2000);
    } else {
      toast.error("Invalid credentials", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar changeLanguage={changeLanguage} language={language}></Navbar>
      <div id="cformOuter">
        <div className="complainForm" id="cf">
          <form action="" method="POST" className="Form" id="compfor">
            <h2>
              {language === "odiya" ? "ଇଣ୍ଡଷ୍ଟ୍ରି ଲଗଇନ୍" : "Industry Login"}
            </h2>
            <img
              src={require("../../Assets/form-img.png")}
              className="form-img"
              alt=""
            />
            <label htmlFor="name">
              {language === "odiya" ? "ଶିଳ୍ପ ନାମ" : "Industry Name"}:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              placeholder={language === "odiya" ? "ଶିଳ୍ପ ନାମ" : "Industry Name"}
              className="ipfield"
              onChange={handleChange}
            />
            <br></br>
            <label htmlFor="password">
              {language === "odiya" ? "oପାସୱାର୍ଡd" : "Password"}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder={language === "odiya" ? "oପାସୱାର୍ଡd" : "Password"}
              className="ipfield"
              onChange={handleChange}
            />
            <br></br>
            <button onClick={handleSubmit} id="raise">
              {language === "odiya" ? "ଦାଖଲ କରନ୍ତୁ" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IndustryLogin;
