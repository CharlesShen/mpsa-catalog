import "./Footer.css";
import React from "react";

function Footer() {
  return (
    <footer className="footer mt-auto pt-5 pb-2 text-center">
      <div className="container">
        <span className="text-muted">
          <a target="_blank" href="https://aws.amazon.com/privacy/">
            Privacy
          </a>
          |
          <a target="_blank" href="https://aws.amazon.com/terms/">
            Site terms
          </a>
          | © 2020, Amazon Web Services, Inc. or its affiliates. All rights
          reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
