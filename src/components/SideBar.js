import "./SideBar.scss";
import React from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <section id="sidebar">
      <div className="inner">
        <div className="logo">
          <img src="/logo.svg" />
        </div>
        <nav>
          <div className="heading">Content Catalog</div>
          <ul>
            <li>
              <NavLink end to="/" className="nav-link" activeClassName="active">
                Welcome
              </NavLink>
            </li>
            <li>
              <NavLink
                to="workshops"
                className="nav-link"
                activeClassName="active"
              >
                Workshops
              </NavLink>
            </li>
            <li>
              <NavLink
                to="partnercast"
                className="nav-link"
                activeClassName="active"
              >
                Upcoming PartnerCasts
              </NavLink>
            </li>
          </ul>
          <div className="heading">On-Demand Content</div>
          <ul>
            <li>
              <NavLink
                to="odbusiness"
                className="nav-link"
                activeClassName="active"
              >
                Business Track
              </NavLink>
            </li>
            <li>
              <NavLink
                to="odtechnical"
                className="nav-link"
                activeClassName="active"
              >
                Technical Track
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="contact">
          <a
            href="https://partners.awscloud.com/Microsoft-PSA-Request.html"
            target="_blank"
          >
            CONTACT US
          </a>
        </div>
      </div>
    </section>
  );
}

export default SideBar;
