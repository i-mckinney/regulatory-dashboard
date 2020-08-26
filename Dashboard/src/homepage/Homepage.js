import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "./Homepage.css";
import helixLogo from "../helixLogo.jpg";

/** Homepage of site.
 *
 * Shows welcome message
 *
 * Routed at /
 */

function Homepage() {
  return (
    <div className="Homepage mt-5">
      <div className="container text-center">
        <img className="mb-5" src={helixLogo} alt="helixLogo" />
        <h3 className="font-weight-bold">Helix Regulatory Dashboard</h3>
        <p className="lead">File faster and easier with Helix!</p>
        <Button className="mt-2" color="primary">
          <Link to="/dashboard" className="HomepageButton">
            Get Started!
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Homepage;
