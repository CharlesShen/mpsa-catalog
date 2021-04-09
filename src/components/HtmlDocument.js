import "./HtmlDocument.css";
import React, { useState, useEffect } from "react";

function HtmlDocument(props) {
  const [error, setError] = useState(null);
  const [html, setHtml] = useState(null);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(props.location)
      .then((res) => res.text())
      .then(
        (result) => {
          setHtml(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      );
  }, [props.location]);

  useEffect(() => {
    var contentElement = document.getElementById("content");
    contentElement
      .querySelectorAll("table")
      .forEach((el) => el.classList.add("table", "table-dark"));
  }, [html]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
}

export default HtmlDocument;
