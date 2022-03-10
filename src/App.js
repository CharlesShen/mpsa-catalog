import "./App.scss";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import HtmlDocument from "./components/HtmlDocument";
import PartnerCast from "./components/PartnerCast";
import PartnerReadiness from "./components/PartnerReadiness";
import Workshops from "./components/Workshops";
import usePageTracking from "./components/usePageTracking";

function App() {
  usePageTracking();

  useEffect(() => {
    document.body.classList.remove("is-preload");
  }, []);

  return (
    <div>
      <ScrollToTop />
      <SideBar />
      <main role="main">
        <div id="content" className="container">
          <Routes>
            <Route
              path="/"
              element={<HtmlDocument location="/content/welcome.html" />}
            />
            <Route
              path="/odbusiness"
              element={<HtmlDocument location="/content/odbusiness.html" />}
            />
            <Route
              path="/odtechnical"
              element={<HtmlDocument location="/content/odtechnical.html" />}
            />
            <Route
              path="/partnercast"
              element={
                <PartnerCast
                  location-intro="/content/partnercast.html"
                  location-data="/content/partnercast.json"
                />
              }
            />
            <Route
              path="/partnerreadiness"
              element={
                <PartnerReadiness
                  location-intro="/content/partnerreadiness.html"
                  location-data="/content/partnerreadiness.json"
                />
              }
            />
            <Route
              path="/workshops"
              element={
                <Workshops
                  location-intro="/content/workshops.html"
                  location-data="/content/workshops.json"
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default App;
