import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../complain/complain.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../counter/counter.css";

const CommitteelDashboard = () => {
  const [data1, setdata1] = useState([]);
  const [data2, setdata2] = useState([]);
  const [data3, setdata3] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("committee")) {
      navigate("/committee");
    }
    fetchComplaints();
    fetchPendingIndustryComplaints();
    fetchVerifiedIndustryComplaints();
  }, []);

  const fetchComplaints = async () => {
    window.onload = function () {
      const c = document.querySelectorAll(".ch");
      c.forEach((item) => {
        item.innerText = "0";

        const updateCounter = () => {
          const target = +item.getAttribute("data-target");
          const a = +item.innerText;

          const increment = target / 2600;
          if (a < target) {
            item.innerText = `${Math.ceil(a + increment)}`;
            setTimeout(updateCounter, 30);
          } else {
            item.innerText = target;
          }
        };
        updateCounter();
      });
      const arr = new Array("Raised", "Verified", "Resolved");
      const b = document.querySelectorAll(".tex");
      let i = 0;
      b.forEach((item) => {
        item.innerText = arr[i];
        i++;
      });
    };

    const res = await fetch("/api/fetchGovComplaints", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    const c = await res.json();

    if (c.data) {
      setdata1(c.data);
    } else {
      document.getElementById("Gov_complaints").innerHTML =
        "No complaints so far!!!";
    }
  };

  const fetchPendingIndustryComplaints = async () => {
    const res = await fetch("/api/fetchPendingIndustryComplaints", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    const c = await res.json();

    if (c.data) {
      setdata2(c.data);
    }
  };

  const fetchVerifiedIndustryComplaints = async () => {
    const res = await fetch("/api/fetchVerifiedIndustryComplaints", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    const c = await res.json();

    if (c.data) {
      setdata3(c.data);
    }
  };

  async function resolveGovComplaints(ticketId) {
    console.log(ticketId);
    let tId = { ticketId };
    const res = await fetch("/api/resolveGovComplaints", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tId),
    });
    const d = await res.json();
    console.log(d);
    if (d.success) {
      console.log("reloading");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  }

  async function rejectIndustryComplaints(ticketId) {
    let tId = { ticketId };

    const res = await fetch("/api/rejectIndustryComplaints", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tId),
    });
    const d = await res.json();
    console.log(d);
    if (d.success) {
      console.log("reloading");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  }

  async function verifyIndustryComplaints(ticketId) {
    let tId = { ticketId };
    const res = await fetch("/api/verifyIndustryComplaints", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tId),
    });
    const d = await res.json();
    console.log(d);
    if (d.success) {
      console.log("reloading");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  }

  const logout = async () => {
    localStorage.removeItem("committee");
    window.location.reload();
  };
  async function resolveVerifiedIndustryComplaints(ticketId){
    let tId = { ticketId };
    const res = await fetch("/api/resolveVerifiedIndustryComplaints", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tId),
    });
    const d = await res.json();
    console.log(d);
    if (d.success) {
      console.log("reloading");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  }
  async function pushComplaintToSPCB(ticketId){
    //add toast
    let tId = { ticketId };
    const res = await fetch("/api/pushComplaintToSPCB", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tId),
    });
    const d = await res.json();
    console.log(d);
    if (d.success) {
      console.log("reloading");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  }

  const renderList = data1.map((item, index) => (
    <tr>
      <td className="trackd">{item.ticketId}</td>
      <td className="trackd">{item.municipality}</td>
      <td className="trackd">{item.name}</td>
      <td className="trackd">{item.phone}</td>
      <td className="trackd">
        <button
          className="resbut"
          onClick={() => resolveGovComplaints(item.ticketId)}
        >
          Yes?
        </button>
      </td>
    </tr>
  ));

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    // console.log(index);
    setToggleState(index);
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
        <div id="gchead">
          <a href="/">
            <img src={require("../../Assets/logo.png")} alt="" />
          </a>
          <div id="uparlog">
            <h2>Governing Committee Dashboard</h2>
            <button onClick={logout} id="clout">
              Logout
            </button>
          </div>
        </div>
        <div id="notelse">
          <br />
          <br />
          <div className="count-container">
            <div className="col-container">
              <div className="counter-box">
                <img
                  src={require("../../Assets/a.jpeg")}
                  className="cim"
                  alt=""
                />
                <h2 data-target="112" class="ch">
                  112
                </h2>
                <h4 class="tex">Complaints Raised</h4>
              </div>
            </div>
            <div className="col-container">
              <div className="counter-box">
                <img
                  src={require("../../Assets/b.jpeg")}
                  className="cim"
                  alt=""
                />
                <h2 data-target="99" class="ch">
                  99
                </h2>
                <h4 class="tex">Complaints Resolved</h4>
              </div>
            </div>
            <div className="col-container">
              <div className="counter-box">
                <img
                  src={require("../../Assets/c.jpeg")}
                  className="cim"
                  alt=""
                />
                <h2 data-target="13" class="ch">
                  13
                </h2>
                <h4 class="tex">Unresolved</h4>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="bloc-tabs">
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
                id="bon1"
              >
                <u>
                  <b>Civilian Complaints</b>
                </u>
              </button>
              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
                id="bon2"
              >
                <u>
                  <b>Pending Industry Complaints</b>
                </u>
              </button>
              <button
                className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(3)}
                id="bon2"
              >
                <u>
                  <b>Verified Industry Complaints</b>
                </u>
              </button>
            </div>
            <div className="content-tabs">
              <div
                className={
                  toggleState === 1 ? "content  active-content" : "content"
                }
              >
                {data1.length !== 0 && (
                  <div id="Gov_complaints">
                    <table id="tabtab">
                      {/* {item.name} {item.address} */}
                      <tr>
                        <th class="trackh">TicketID</th>
                        <th class="trackh">Municipality</th>
                        <th class="trackh">Complainee</th>
                        <th class="trackh">Phone</th>
                        <th class="trackh">Resolution</th>
                      </tr>
                      {renderList}
                    </table>
                  </div>
                )}
                {data1.length === 0 && (
                  <div id="complaints1">No complaints so far!!</div>
                )}
              </div>
              <div
                className={
                  toggleState === 2 ? "content  active-content" : "content"
                }
              >
                {data2.length !== 0 && (
                  <div>
                    {data2.map((item) => (
                      <div className="bahar">
                        <div className="ldibba">
                          <div>
                            <span className="headeritems">ID : </span>
                            {item.ticketId}
                          </div>
                          <br />
                          <div>
                            <span className="headeritems">Issue : </span>
                            {item.issue}
                          </div>
                          <br />
                          <div>
                            <span className="headeritems">Locality : </span>
                            {item.industry_name}
                          </div>
                          <br />
                          <div>
                            <span className="headeritems">Pincode : </span>
                            {item.pincode}
                          </div>
                          <br />
                          <div>
                            <span className="headeritems">
                              Verify / Reject :{" "}
                            </span>
                            <span>
                              <button
                                id="verify"
                                className="accbutt"
                                onClick={() =>
                                  verifyIndustryComplaints(item.ticketId)
                                }
                              >
                                &#x2713;
                              </button>
                            </span>
                            <span>
                              <button
                                id="reject"
                                className="accbutt"
                                onClick={() =>
                                  rejectIndustryComplaints(item.ticketId)
                                }
                              >
                                &#x2717;
                              </button>
                            </span>
                          </div>
                        </div>
                        <div className="rdibba">
                          Proof:
                          <img
                            src={"http://localhost:4000/uploads/" + item.myFile}
                            alt=""
                            className="issue-image"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {data2.length === 0 && (
                  <div id="complaints1">No complaints so far!!</div>
                )}
              </div>
              <div
                className={
                  toggleState === 3 ? "content  active-content" : "content"
                }
              >
                {data3.length !== 0 && (
                  <div>
                    <table id="tabtab">
                      {/* {item.name} {item.address} */}
                      <tr>
                        <th className="trackh">TicketID</th>
                        <th className="trackh">Issue</th>
                        <th className="trackh">Industry Name</th>
                        <th className="trackh">Status</th>
                        <th className="trackh">View Reports</th>
                      </tr>
                      {data3.map((item) => (
                        <tr>
                          <td className="trackd">{item.ticketId}</td>
                          <td className="trackd">{item.issue}</td>
                          <td className="trackd">{item.industry_name}</td>
                          <td className="trackd">{item.status}</td>
                          <td>
                            <span>{item.pdfUpload==""?"Pending response":<a id="pdf" href={"http://localhost:4000/uploads/" + item.pdfUpload } target="_">View Pdf</a>}</span>
                          </td>
                          {item.pdfUpload!=="" && <td className="trackd"><button
                                id="verify"
                                className="accbutt"
                                onClick={() =>
                                  resolveVerifiedIndustryComplaints(item.ticketId)
                                }
                              >Resolved</button></td>}
                             { item.pdfUpload!=="" &&<td className="trackd"><button
                                id="reject"
                                className="accbutt"
                                onClick={() =>
                                  pushComplaintToSPCB(item.ticketId)
                                }
                              >SPCB</button></td>}
                        </tr>
                      ))}
                    </table>
                  </div>
                )}
                {data3.length === 0 && (
                  <div id="complaints1">No complaints so far!!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommitteelDashboard;
