import React, { useState } from "react"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap"

/** @returns {jsx} Handles Navigation for Helix Regulatory DashBoard. */
const Navigation = () => {
  // When the browser window gets to small, nav bar collapses and toggle is used to show and hide the navbar.
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <b>Home</b>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/dashboard">Dashboard</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/entity">Entity</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/loan">Loan</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/regulatory">Regulatory</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/myrequest">My Request</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default Navigation
