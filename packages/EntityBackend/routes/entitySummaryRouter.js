// import modules
const express = require("express");

const nodemailer = require("nodemailer");

const sgMail = require("@sendgrid/mail");

const { sendgrid_api_key } = require("../config");

sgMail.setApiKey(sendgrid_api_key);

const router = express.Router();
const { ObjectId } = require("mongodb");
const dateTimeHelper = require("../utils/dateTimeHelper");

// db setup
const DbConnection = require("../db");

/**************************************************************************************************************************************************** */

// POST (create) a new Entity
router.post("/email", async (req, res) => {

  try {
    const msg = {
      to:"eric.jho@helixcp.com",
      from:"eric.jho@helixcp.com",
      subject:"testing",
      text:"yoyoyoyo",
      html:"<table> <tr><th>Month</th>th>Savings</th></tr><tr> <td>January</td><td>$100</td></tr></table>"
    }

     sgMail.send(msg).then(() => {return res.json("DONE")})
     .catch(res.json(error.message));

  } catch (error) {

  }

  res.json("DONE")
});

module.exports = router;
