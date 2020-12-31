// import modules
const express = require("express");

const sgMail = require("@sendgrid/mail");

const { sendgrid_api_key } = require("../../config");

sgMail.setApiKey(sendgrid_api_key);

const router = express.Router();

/**************************************************************************************************************************************************** */

router.post("/email", async (req, res) => {
  let finalChanges = req.body.finalChanges || [];
  let rows = "";
  let loanId = req.body.loanId || "";

  if (finalChanges.length > 0) {
    for (let i = 0; i < finalChanges.length; i++) {
      let fieldName = finalChanges[i]["fieldName"];
      let CurrentValue = finalChanges[i]["CurrentValue"];
      let ExternalValue = finalChanges[i]["ExternalValue"];
      let ExternalSource = finalChanges[i]["ExternalSource"];
      let SourceOfTruth = finalChanges[i]["SourceOfTruth"];
      let errorColor = false;
      if (ExternalValue == undefined) {
        errorColor = true;
        ExternalValue = "No Value Received";
      }
      let finalRow = `<tr>
    <td>${fieldName}</td>
    <td>${ExternalSource}</td>
    <td ${errorColor ? "style=color:red" : null}>${ExternalValue}</td>
    <td>${CurrentValue}</td>
    <td ${SourceOfTruth ? "style=color:#2776D2" : "style=color:#F50057"}>${SourceOfTruth}</td>
    </tr>`;

      rows += finalRow;
    }
  } else {
    throw Error({
      reminderMessage: "There has been no changes made to a discrepancy report",
    });
  }

  let headerEmail = "https://i.imgur.com/5tHDqYV.png";
  let footerEmail = "https://i.imgur.com/KOe6gJn.png";

  let htmlFile = `
  <!DOCTYPE html>
    <html>
    <body>
      <img src=${headerEmail} alt="headerEmail" style="width:100%;height:100%;border:0">
      </a>
      <h1 style="color:black"> 
        Pending: Loan Discrepancy Report Summary 
      </h1>
      <h3 style="color:black">
      Loan ${loanId} 
      </h3>
      <div  style="width:100%;height:30px;border:0; visibility:hidden"></div>
      <p>
        <table rules="rows" style="width:88%; text-align:center; color:black;" align="center">
          <tr>
            <th>Field Name</th>
            <th>External Source</th>
            <th>External Value</th>
            <th>Proposed Value</th>
            <th>Source Of Truth</th>
          </tr>
          ${rows}
        </table>
      </p>
    <div  style="width:100%;height:30px;border:0; visibility:hidden"></div>
    <p style="text-align:center; color:black"> 
      Username: Eric Jho has sent a discrepancy report. These are the proposed changes. If you want to approve
      or make changes to this report, please click the button below and begin your work process at My requests page.
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
      when an unknown printer took a galley of type and scrambled it to make a type 
      specimen book. It has survived not only five centuries, but also the 
      leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets con
      taining Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
    </p>
    <div  style="width:100%;height:30px;border:0; visibility:hidden"></div>
    <table align="center" style="width:300px">
        <tr>
          <td>
            <a href="https://www.helixcpdemo.com/myrequest">
              <button 
              style="width:100%; 
              height:40px;
              border:0;
              border-radius:10px;
              background-color:#2B86CC;
              color:white">
              Go to My Requests
              </button>
            </a>
          </td>
        </tr>
    </table>
    <img 
    src=${footerEmail} 
    alt="footerEmail" 
    style="width:100%;height:100%;border:0"/>
  </body>
  </html>`;

  try {
    const msg = {
      to: "helixdemoproduct@gmail.com",
      from: "eric.jho@helixcp.com",
      subject: "Pending: Loan Discrepancy Report Summary",
      content: [{ type: "text/html", value: htmlFile }],
    };

    await sgMail.send(msg);

    return res.json("Email has been successfully sent.");
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
