import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import "./committee.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Committee = ({ changeLanguage, language }) => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setemail(e.target.value);
    }
    if (e.target.name === "password") {
      setpassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };

    const res = await fetch("/api/signInCommittee", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const c = await res.json();
    console.log(c);
    if(c.success){
      localStorage.setItem("committee",email)
      toast.success("Successfully logged in", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        
        navigate("/committeeDashboard")
      }, 2000);
    }
    else{
      toast.error("Invalid credentials", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      
    }
  };

  return (
    <>
    <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <div>
      <Navbar changeLanguage={changeLanguage} language={language}></Navbar>
      <div id="cformOuter">
        <div className="complainForm">
          <form action="" method="POST" className="Form" id="compfor">
            <h2>
              {language === "odiya" ? "କମିଟି ଲଗଇନ୍ |" : "Committee Login"}
            </h2>
            <img
              src={require("../../Assets/form-img.png")}
              className="form-img"
              alt=""
            />
            <label htmlFor="name">
              {language === "odiya" ? "କମିଟି ବାଛନ୍ତୁ |" : "Choose Committee"}
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              placeholder="Enter ur email"
              className="ipfield"
              onChange={handleChange}
            />
            <br></br>
            <label htmlFor="password">
              {language === "odiya" ? "ପାସୱାର୍ଡ" : "Password"}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              className="ipfield"
              onChange={handleChange}
            />
            <br></br>
            <button onClick={handleSubmit} id="raise">
              {language === "odiya" ? "ଦାଖଲ କରନ୍ତୁ" : "Submit"}
            </button>
          </form>
        </div>
        {/* <div id="pedimg">
          <img src={require("../../Assets/ped.png")} alt="" id="tree" />
        </div> */}
      </div>
    </div>
    </>
  );
};

export default Committee;
