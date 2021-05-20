import React from "react";
import { Button } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import IconButton from "@material-ui/core/IconButton";
import ReportMockData from "./ReportMockData"
/**
 * @param {object} reportData contains data (columns/ rows/ values) of a report
 * @return {function} function to convert json object into a csv file.
 */

const objectToCsv = function (reportData) {
  const csvRows = [];

  //get the headers
  const headers = Object.keys(reportData[0]);
  csvRows.push(headers.join(","));

  //loop over the rows
  for (const row of reportData) {
    const values = headers.map((header) => {
      const escaped = ("" + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
};

/**
 * @param {string} csvData
 * @return starts downloading csv file from the client side (download will begin from the user side)
 */
const startDownloadCsv = function (csvData) {
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  let tempLink = document.createElement("a");
  tempLink.setAttribute("hidden", "");
  tempLink.setAttribute("href", url);
  tempLink.setAttribute("download", "Regualtory-Dashboard-Report.csv");

  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
};

/**
 * This component will be used in report rows on my request page.
 * It will be able to download selected report in a csv format.
 */

function DownloadReport() {
  const handleDownloadReport = async () => {
    // const jsonUrl = "https://next.json-generator.com/api/json/get/4JlwwsM3K";
    // const res = await fetch(jsonUrl);
    // const json = await res.json();
    let finalReport = ReportMockData()
    //Instead of 45 ~ 47, we will make an api request to grab the REPORT object using reportId

    const reportData = finalReport.map((row) => ({
      fieldCode: row.fieldCode,
      fieldName: row.fieldName,
      fieldValue: row.fieldValue
    }));

    //Conversting json report object into csv file.
    const csvReportData = objectToCsv(reportData);

    //the download of csv file will be started on the client side
    startDownloadCsv(csvReportData);
  };

  return (
    <>
      <IconButton
        aria-label="discrepancy"
        size="small"
        edge="start"
        color="primary"
        onClick={handleDownloadReport}
      >
        <CloudDownloadIcon />
      </IconButton>
    </>
  );
}

export default DownloadReport;