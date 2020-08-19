import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

//TODO Make Company List Dynamic

const Header = () => (
  <header>
    <div className="center-column">
      <h1>Put New Header Here From Dashboard Component</h1>
    </div>
    <nav>
      <ol className="center-column">
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <select name="companyList" id="companies">
            <option value="Microsoft">Microsoft</option>
            <option value="CNB">City National Bank</option>
          </select>       
        </li>
      </ol>
    </nav>
  </header>
);

export default Header;
