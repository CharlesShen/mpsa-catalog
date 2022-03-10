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
              <div className="nav-link-container">
                <NavLink end to="/" className="nav-link">
                  Welcome
                </NavLink>
              </div>
            </li>
            <li>
              <div className="nav-link-container">
                <NavLink
                  to="workshops"
                  className="nav-link"
                >
                  Workshops
                </NavLink>
              </div>
            </li>
            <li>
              <div className="nav-link-container">
                <NavLink
                  to="partnerreadiness"
                  className="nav-link"
                >
                  Partner Readiness
                </NavLink>
              </div>
            </li>
            <li>
              <div className="nav-link-container">
                <NavLink
                  to="partnercast"
                  className="nav-link"
                >
                  Upcoming PartnerCasts
                </NavLink>
              </div>
            </li>
          </ul>
          <div className="heading">On-Demand Content</div>
          <ul>
            <li>
              <div className="nav-link-container">
                <NavLink
                  to="odbusiness"
                  className="nav-link"
                >
                  Business Track
                </NavLink>
              </div>
            </li>
            <li>
              <div className="nav-link-container">
                <NavLink
                  to="odtechnical"
                  className="nav-link"
                >
                  Technical Track
                </NavLink>
              </div>
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
