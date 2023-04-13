import React, { useState } from "react";
import "./track.css";
import Navbar from "../navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Track = ({ changeLanguage, language }) => {
  var ticket, status, address, name, pin, complain;
  const [ticketId, setticketId] = useState("");
  const handleChange = (e) => {
    if (e.target.name === "complaint_Ticket") {
      setticketId(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ele = { ticketId };
    console.log(ticketId);
    const res = await fetch("/api/ticketStatus", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ele),
    });

    const c = await res.json();
    if (c.success) {
      ticket = c.data.ticketId;
      status = c.data.status;
      name = c.data.name;
      address = c.data.address;
      pin = c.data.pincode;
      complain = c.data.complain;
      let tab = document.getElementById("tab");
      console.log(tab);
      tab.innerHTML = `<tr>
      <th class="trackh">TicketID</th>
      <th class="trackh">Name</th>
      <th class="trackh">Address</th>
      <th class="trackh">Pincode</th>
      <th class="trackh">Issue</th>
      <th class="trackh">Status</th>
    </tr>
    <tr>
      <td class="trackd">${ticket}</td>
      <td class="trackd">${name}</td>
      <td class="trackd" id="trackaddr">
        ${address}
      </td>
      <td class="trackd">${pin}</td>
      <td class="trackd">${complain}</td>
      <td class="trackd">${status}</td>
    </tr>`;
      toast.success("Tracked Your Ticket Id", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Enter valid ticket id ", {
        position: "top-center",
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

  const handleResolve = async () => {
    if (!ticketId) {
      alert("please enter the ticket id");
    } else {
      var dateCreated = new Date(parseInt(ticketId)); //in normal format
      var currentDate = Date.now(); //in milliseconds
      console.log(dateCreated.toString());
      var dateDifference = parseInt(currentDate) - parseInt(ticketId);
      if (dateDifference > 3) {
        const ele = { ticketId };
        const res = await fetch("/api/resolve", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(ele),
        });

        const c = await res.json();
        alert(c.message);
      } else {
        toast.warn("please wait until estimated time, to solve the complaint", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div>
        <Navbar changeLanguage={changeLanguage} language={language}></Navbar>
        <div id="badadibba">
          <div className="form-container">
            <form className="Form">
              <input
                type="text"
                name="complaint_Ticket"
                id="complaint_Ticket"
                placeholder={
                  language === "English"
                    ? "Enter the Ticket-ID that you want to track"
                    : "ଆପଣ ଟ୍ରାକ୍ କରିବାକୁ ଚାହୁଁଥିବା ଟିକେଟ୍-ଆଇଡ୍ ପ୍ରବେଶ କରନ୍ତୁ"
                }
                onChange={handleChange}
              />
              <button onClick={handleSubmit} id="trs">
                {language === "English" ? "Track" : "ଟ୍ରାକ୍ କରନ୍ତୁ"}
              </button>
            </form>
            <p style={{textAlign:"center"}}>*Estimated time is 3 days</p>
          </div>
          <table id="tab" className="tab"></table>
          <button onClick={handleResolve} id="upperauth">
            {language === "English"
              ? "Push to higher authorities"
              : "ଉଚ୍ଚ କର୍ତ୍ତୃପକ୍ଷଙ୍କୁ ଠେଲିଦିଅ"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Track;
