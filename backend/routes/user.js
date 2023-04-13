const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const dotenv = require("dotenv");
const multer = require("multer");
const user = require("../schema/userschema");
const municipal = require("../schema/municipalschema");
const industry = require("../schema/industryschema");
const committee = require("../schema/committeeLogin");
const industryLogin = require("../schema/industryLoginSchema");

const arr = [
  { 750017: "Bhubaneshwar Municipal Corporation" },
  { 751002: "Bhubaneshwar Municipal Corporation" },
  { 751006: "Bhubaneshwar Municipal Corporation" },
  { 751003: "Bhubaneshwar Municipal Corporation" },
  { 751001: "Bhubaneshwar Municipal Corporation" },
  { 753001: "Cuttack Municipal Corporation" },
  { 753006: "Cuttack Municipal Corporation" },
  { 753002: "Cuttack Municipal Corporation" },
  { 753004: "Cuttack Municipal Corporation" },
  { 753003: "Cuttack Municipal Corporation" },
  { 760001: "Berhampur Municipal Corporation" },
  { 760002: "Berhampur Municipal Corporation" },
  { 760004: "Berhampur Municipal Corporation" },
  { 760005: "Berhampur Municipal Corporation" },
  { 760008: "Berhampur Municipal Corporation" },
  { 769001: "Rourkela Municipal Corporation" },
  { 769002: "Rourkela Municipal Corporation" },
  { 769003: "Rourkela Municipal Corporation" },
  { 769004: "Rourkela Municipal Corporation" },
  { 769005: "Rourkela Municipal Corporation" },
  { 768001: "Sambalpur Municipal Corporation" },
  { 768002: "Sambalpur Municipal Corporation" },
  { 768003: "Sambalpur Municipal Corporation" },
  { 768004: "Sambalpur Municipal Corporation" },
  { 768006: "Sambalpur Municipal Corporation" },
];

require("dotenv").config();

const client = new twilio(process.env.ACC_SID, process.env.AUTH_TOKEN); // UNCOMMENT THIS

// Storage
let file_name;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    file_name = file.originalname;
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post("/complain", (req, res) => {
  let pincode = parseInt(req.body.pincode);
  let phone = parseInt(req.body.phone);
  let municipality = req.body.municipality;
  let complain = req.body.complain;
  let ticketId = Date.now();

  const person = user.create({
    name: req.body.name,
    pincode: pincode,
    address: req.body.address,
    e_waste: req.body.e_waste,
    phone: phone,
    gov_com: req.body.gov_com,
    ticketId: ticketId,
    municipality: municipality,
    complain: complain,
  });

  send_SMS(req.body.name, phone, ticketId); // UNCOMMENT THIS
  res.status(200).json({
    success: true,
    message:
      "Ticket Generated successfully, and has been sent as an SMS to the phone number provided",
  });
});

router.post("/track", async (req, res) => {
  const ticketId = req.body.ticketId;

  const getData = await user.findOne({ ticketId: ticketId });

  if (getData) {
    res
      .status(200)
      .json({ success: true, data: getData, message: "TicketId found" });
  } else {
    res.status(200).json({ success: true, message: "TicketId doesnot exist" });
  }
});

router.post("/register", async (req, res) => {
  const check = await municipal.findOne({ name: req.body.name });

  if (check == null) {
    const municipal_corp = municipal.create({
      name: req.body.name,
      password: req.body.password,
    });

    res
      .status(200)
      .json({ success: true, message: "Municipal Corporation Created" });
  } else {
    res.status(200).json({ success: false, message: "User already exists" });
  }
});

router.post("/signIn", async (req, res) => {
  const municipal_corp = await municipal.findOne({ name: req.body.name });

  if (municipal_corp == null) {
    res
      .status(200)
      .json({ success: false, message: "Invalid municipal corporation" });
  } else {
    if (municipal_corp.password == req.body.password) {
      res
        .status(200)
        .json({ success: true, message: "Successfully logged In" });
    } else {
      res.status(200).json({ success: false, message: "Incorrect Password" });
    }
  }
});

router.post("/registerCommittee", async (req, res) => {
  const check = await committee.findOne({ email: req.body.email });

  if (check == null) {
    await committee.create({
      email: req.body.email,
      password: req.body.password,
    });

    res
      .status(200)
      .json({ success: true, message: "Governing committee registered" });
  } else {
    res.status(200).json({
      success: false,
      message: "Governing committee already registered",
    });
  }
});

// industryRegister used to register industry using postman
router.post("/industryRegister", async (req, res) => {
  const check = await industryLogin.findOne({ username: req.body.username });

  if (check == null) {
    const industry = industryLogin.create({
      username: req.body.username,
      password: req.body.password,
    });

    res.status(200).json({ success: true, message: "Industry Created" });
  } else {
    res
      .status(200)
      .json({ success: false, message: "Industry already exists" });
  }
});

// industrySignIn used to signin industry
let industryName;
router.post("/industrySignIn", async (req, res) => {
  industryName = req.body.email;
  const industry = await industryLogin.findOne({ username: req.body.email });
  console.log(req.body);

  if (industry == null) {
    res
      .status(200)
      .json({ success: false, message: "Invalid industry username" });
  } else {
    if (industry.password == req.body.password) {
      res
        .status(200)
        .json({ success: true, message: "Successfully logged In" });
    } else {
      res.status(200).json({ success: false, message: "Incorrect Password" });
    }
  }
});

router.post("/signInCommittee", async (req, res) => {
  const gov_committee = await committee.findOne({ email: req.body.email });

  if (gov_committee == null) {
    res
      .status(200)
      .json({ success: false, message: "Invalid government committee" });
  } else {
    if (gov_committee.password == req.body.password) {
      res
        .status(200)
        .json({ success: true, message: "Successfully logged In" });
    } else {
      res.status(200).json({ success: false, message: "Incorrect Password" });
    }
  }
});

function send_SMS(name, num, ticketId) {
  let mes = `Dear ${name},  Your request with ticket id : ${ticketId} has been generated succesfully and will be resolved within 3 working days`;
  console.log(mes);
  client.messages
    .create({
      body: mes,
      to: "+91" + num, // Text this number
      from: "+15139604746", // From Twilio number
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.log(error));
}

router.post("/ticketStatus", async (req, res) => {
  let ticketId = req.body.ticketId;
  console.log(ticketId);
  let d = await user.findOne({ ticketId: ticketId });
  if (!d) {
    res
      .status(200)
      .json({ success: false, data: null, message: "Ticket is invalid" });
  } else {
    res
      .status(200)
      .json({ success: true, data: d, message: "Ticket is valid" });
  }
});

router.post("/resolve", async (req, res) => {
  let ticketId = req.body.ticketId;
  let d = await user.findOneAndUpdate(
    { ticketId: ticketId },
    { gov_com: true, status: "pending" }
  );
  if (!d) {
    res
      .status(200)
      .json({ success: false, data: null, message: "Ticket is invalid" });
  } else {
    res.status(200).json({
      success: true,
      data: d,
      message: "Ticket is pushed to higher authorities",
    });
  }
});

router.post("/complainIndustry", upload.single("image"), async (req, res) => {
  const complain = await industry.create({
    ticketId: Date.now(),
    issue: req.body.issue,
    industry_name: req.body.industry_name,
    locality: req.body.locality,
    pincode: parseInt(req.body.pincode),
    myFile: file_name,
  });

  res.send("Successfully registered your industry complain");
  // res.status(200).json({
  //   success: true,
  //   data: null,
  //   message: "Industry Complaint registered sucessfully",
  // });
});

router.post("/municipality", async (req, res) => {
  res.status(200).json({ success: true, data: arr, message: "data sent" });
});

router.post("/fetchComplaints", async (req, res) => {
  let municipal = req.body.d;

  let d = await user.find({ municipality: municipal, status: "pending" });
  if (d) {
    res
      .status(200)
      .json({ success: true, data: d, message: "complaints fetched" });
  } else {
    res.status(200).json({
      success: false,
      data: null,
      message: "error getting complaints",
    });
  }
});

router.post("/fetchGovComplaints", async (req, res) => {
  let d = await user.find({ gov_com: true, status: "pending" });
  if (d) {
    res
      .status(200)
      .json({ success: true, data: d, message: "Gov complaints fetched" });
  } else {
    res
      .status(200)
      .json({ success: true, data: null, message: "Woo! no complaints there" });
  }
});

router.post("/resolveMunicipalComplaints", async (req, res) => {
  const a = req.body.ticketId;

  await user.findOneAndUpdate({ ticketId: a }, { status: "resolved" });
  res
    .status(200)
    .json({ success: true, data: null, message: "status updated" });
});

router.post("/resolveGovComplaints", async (req, res) => {
  const a = req.body.ticketId;
  console.log(a);
  await user.findOneAndUpdate({ ticketId: a }, { status: "resolved" });
  res
    .status(200)
    .json({ success: true, data: null, message: "status updated" });
});

router.post("/fetchPendingIndustryComplaints", async (req, res) => {
  let d = await industry.find({
    status: "pending"
  });
  if (d) {
    res.status(200).json({
      success: true,
      data: d,
      message: "Pending Industry complaints fetched",
    });
  } else {
    res
      .status(200)
      .json({ success: true, data: null, message: "Woo! no complaints there" });
  }
});

router.post("/fetchVerifiedIndustryComplaints", async (req, res) => {
  let d = await industry.find({ status: "verified" });
  if (d) {
    res.status(200).json({
      success: true,
      data: d,
      message: "Verified Industry complaints fetched",
    });
  } else {
    res
      .status(200)
      .json({ success: true, data: null, message: "Woo! no complaints there" });
  }
});

router.post("/rejectIndustryComplaints", async (req, res) => {
  let d = await industry.findOneAndDelete({ ticketId: req.body.ticketId });
  if (d) {
    res
      .status(200)
      .json({ success: true, data: d, message: "Industry complaint rejected" });
  } else {
    res.status(200).json({ success: false, data: d, message: "error" });
  }
});

router.post("/verifyIndustryComplaints", async (req, res) => {
  let d = await industry.findOneAndUpdate(
    { ticketId: req.body.ticketId },
    { status: "verified" }
  );
  console.log(req.body.ticketId);
  if (d) {
    res
      .status(200)
      .json({ success: true, data: d, message: "Industry complaint verified" });
  } else {
    res.status(200).json({ success: false, data: d, message: "error" });
  }
});

router.post("/fetchRespectiveVerifiedComplaints", (req, res) => {
  industry.find(
    { industry_name: req.body.industry_name, status: req.body.status },
    (err, found) => {
      if (err) {
        res
          .status(200)
          .json({ success: "false", message: "No verified complaints" });
      } else {
        res
          .status(200)
          .json({
            success: "true",
            data: found,
            message: "Found verified complaints",
          });
      }
    }
  );
});

router.post("/uploadProof", upload.single("image"), async (req, res) => {
  await industry
    .findOneAndUpdate(
      {
        industry_name: industryName,
      },
      {
        pdfUpload: file_name,
      }
    )
    .then(() =>
      res
        .send("Successfully uploaded pdf")
        // .status(200)
        // .json({ success: true, data: null, message: "Pdf uploaded" })
    )
    .catch(() =>
      res
        .status(200)
        .json({
          success: false,
          data: null,
          message: "error occurred while uploading pdf",
        })
    );
});

router.post("/resolveVerifiedIndustryComplaints", async (req, res) => {
  await industry.findOneAndUpdate(
    { ticketId: req.body.ticketId },
    { status: "resolved" }
  );
  res
    .status(200)
    .json({
      success: true,
      data: null,
      message: "complaint resolved(industry)",
    });
});
router.post("/pushComplaintToSPCB", async (req, res) => {
  await industry.findOneAndUpdate(
    { ticketId: req.body.ticketId },
    { SPCB: true }
  );
  res
    .status(200)
    .json({ success: true, data: null, message: "complaint pushed to SPCB " });
});

module.exports = router;
