import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import HtmlDocument from "./components/HtmlDocument";
import PartnerCast from "./components/PartnerCast";

function App() {
  useEffect(() => {
    document.body.classList.remove("is-preload");
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <SideBar />
      <main role="main" className="mx-auto">
        <div id="content" className="container">
          <Routes>
            <Route
              path="/"
              element={<HtmlDocument location="content/welcome.html" />}
            />
            <Route
              path="/platform"
              element={<HtmlDocument location="content/platform.html" />}
            />
            <Route
              path="/net"
              element={<HtmlDocument location="content/net.html" />}
            />
            <Route
              path="/sql"
              element={<HtmlDocument location="content/sql.html" />}
            />
            <Route
              path="/odbusiness"
              element={<HtmlDocument location="content/odbusiness.html" />}
            />
            <Route
              path="/odtechnical"
              element={<HtmlDocument location="content/odtechnical.html" />}
            />
            <Route path="/partnercast" element={<PartnerCast />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
