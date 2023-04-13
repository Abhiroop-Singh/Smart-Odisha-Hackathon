import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import "./municipal.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Municipal = ({ changeLanguage, language }) => {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setname(e.target.value);
    }
    if (e.target.name === "password") {
      setpassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, password };

    const res = await fetch("/api/signIn", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const c = await res.json();
    console.log(c.success);
    if (c.success) {
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
      localStorage.setItem("municipal", name);
      setTimeout(() => {
        navigate("/municipalDashboard");
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
    setname("");
    setpassword("");
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
        <div id="mcf">
          <form action="" method="POST" className="Form" id="compfor">
            <h2>
              {language === "odiya"
                ? "ମ୍ୟୁନିସିପାଲିଟି କର୍ପୋରେସନ୍ ଲଗଇନ୍"
                : "Municipal Corporation Login"}
            </h2>
            <img
              src={require("../../Assets/form-img.png")}
              className="form-img"
              alt=""
            />
            <label htmlFor="name">
              {language === "odiya"
                ? "ମ୍ୟୁନିସିପାଲିଟି କର୍ପୋରେସନ୍ ବାଛନ୍ତୁ"
                : "Choose Municipal Corporation"}
            </label>
            <select
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder={language === "odiya" ? "ନାମ" : "Name"}
              className="ipfield"
              onChange={handleChange}
            >
              <option value="">
                --{language === "odiya" ? "ଚୟନ କରନ୍ତୁ" : "Select"}--
              </option>
              <option value="Bhubaneshwar Municipal Corporation">
                {language === "odiya"
                  ? "ଭୁବନେଶ୍ୱର ମ୍ୟୁନିସିପାଲିଟି କର୍ପୋରେସନ୍ |"
                  : "Bhubaneshwar Municipal Corporation"}
              </option>
              <option value="Cuttack Municipal Corporation">
                {language === "odiya"
                  ? "କଟକ ମ୍ୟୁନିସିପାଲିଟି କର୍ପୋରେସନ୍ |"
                  : "Cuttack Municipal Corporation"}
              </option>
              <option value="Berhampur Municipal Corporation">
                {language === "odiya"
                  ? "ବରହମପୁର ମ୍ୟୁନିସିପାଲିଟି କର୍ପୋରେସନ୍ |"
                  : "Berhampur Municipal Corporation"}
              </option>
              <option value="Rourkela Municipal Corporation">
                {language === "odiya"
                  ? "ରାଉରକେଲା ମ୍ୟୁନିସିପାଲିଟି କର୍ପୋରେସନ୍ |"
                  : "Rourkela Municipal Corporation"}
              </option>
              <option value="Sambalpur Municipal Corporation">
                {language === "odiya"
                  ? "ସମ୍ବଲପୁର ମ୍ୟୁନିସିପାଲିଟି କର୍ପୋରେସନ୍ |"
                  : "Sambalpur Municipal Corporation"}
              </option>
            </select>
            <br></br>
            <label htmlFor="password">
              {language === "odiya" ? "ପାସୱାର୍ଡ" : "Password"}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder={language === "odiya" ? "ପାସୱାର୍ଡ" : "Password"}
              className="ipfield"
              onChange={handleChange}
            />
            <br></br>
            <button onClick={handleSubmit} id="raise">
              {language === "odiya" ? "ଦାଖଲ କରନ୍ତୁ" : "Submit"}
            </button>
          </form>
        </div>
        <div id="pedimg">
          <img src={require("../../Assets/ped.png")} alt="" id="tree" />
        </div>
      </div>
    </div>
  );
};

export default Municipal;
