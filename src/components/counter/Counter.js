import React, { useState } from "react";
import "./counter.css";

const Counter = (props) => {

  window.onload = function () {
    const c = document.querySelectorAll(".ch");
    c.forEach((item) => {
      item.innerText = "0";

      const updateCounter = () => {
        const target = +item.getAttribute("data-target");
        const a = +item.innerText;

        const increment = target / 3200;
        if (a < target) {
          item.innerText = `${Math.ceil(a + increment)}`;
          setTimeout(updateCounter, 30);
        } else {
          item.innerText = target;
        }
      };
      updateCounter();
    });
  };

  return (
    <div className="count-container">
      <div className="col-container">
        <div className="counter-box">
          <img src={require("../../Assets/a.jpeg")} className="cim" alt="" />
          <h2 data-target="112" class="ch">
            112
          </h2>
          <h4 class="tex">Complaints Raised</h4>
        </div>
      </div>
      <div className="col-container">
        <div className="counter-box">
          <img src={require("../../Assets/b.jpeg")} className="cim" alt="" />
          <h2 data-target="99" class="ch">
            99
          </h2>
          <h4 class="tex">Complaints Resolved</h4>
        </div>
      </div>
      <div className="col-container">
        <div className="counter-box">
          <img src={require("../../Assets/c.jpeg")} className="cim" alt="" />
          <h2 data-target="13" class="ch">
            13
          </h2>
          <h4 class="tex">Unresolved</h4>
        </div>
      </div>
    </div>
  );
};

export default Counter;
