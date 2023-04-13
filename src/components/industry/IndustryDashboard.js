import React from "react";
import { useEffect, useState } from "react";
import "../complain/complain.css";
import "../committee/committee.css";
import "./industry.css";
import { useNavigate } from "react-router-dom";

const IndustryDashboard = ({ changeLanguage, language }) => {
  const [pendingData, setPendingData] = useState([]);
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("industry_name");
    window.location.reload();
  };

  useEffect(() => {
    if (!localStorage.getItem("industry_name")) {
      navigate("/industryLogin");
    }
    fetchPending();
  }, []);

  const fetchPending = async () => {
    let industry_name = localStorage.getItem("industry_name");
    let status = "verified";
    const data = { industry_name, status };

    const res = await fetch("/api/fetchRespectiveVerifiedComplaints", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const finalRes = await res.json();
    if (finalRes.success) {
      setPendingData(finalRes.data);
    } else {
      alert("No compalains currently");
    }
    console.log(finalRes);
  };

  const renderList = pendingData.map((item, index) => (
    <>
      <div id="indbadadabba">
        <div id="leftdibba">
          <ul id="dashul">
            <li>ID : {item.ticketId}</li>
            <li>Issue : {item.issue}</li>
            <li>Locality : {item.locality}</li>
            <li>Pincode : {item.pincode}</li>
            <li>
              Attach a valid proof:
              <form
              method="POST"
              action="/api/uploadProof"
              encType="multipart/form-data"
              // id="ind-comp-form"
              >
                <input type="file" id="testImage" name="image" />
                <input type="submit" id="icbut" />
              </form>
            </li>
          </ul>
        </div>
        <div id="rightdibba">
          Photo:
          <div id="im">
            <img
              src={"http://localhost:4000/uploads/" + item.myFile}
              id="shikayat"
              alt=""
            />
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  ));

  return (
    <div>
      <div id="gchead">
        <a href="/">
          <img src={require("../../Assets/logo.png")} alt="" />
        </a>
        <div id="stark">
          <h2>Industry Name</h2>
          <button onClick={logout} id="clout">
            Logout
          </button>
        </div>
      </div>
      <div class="ind-dibba">
        <h2>Complain :</h2>
        <br />
        <br />
        {renderList}
      </div>
    </div>
  );
};

export default IndustryDashboard;
