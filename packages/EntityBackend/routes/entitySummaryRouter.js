// import modules
const express = require("express");

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
  let imgLink = "https://i.imgur.com/5tHDqYV.png";
  let htmlFile = `
 
  <!DOCTYPE html>
  <html>
  <body>
  <img src=${imgLink} alt="HTML tutorial" style="width:100%;height:100%;border:0">
  </a>
  <p>
  <table style="width:100%; border: solid 1px black; text-align:center">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
</table></p>
  </body>
  </html>`;

  try {
    const msg = {
      to: "helixdemoproduct@gmail.com",
      from: "eric.jho@helixcp.com",
      subject: "testing",
      content: [{ type: "text/html", value: htmlFile }],
    };

    await sgMail.send(msg);

    return res.json("DONE");
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
