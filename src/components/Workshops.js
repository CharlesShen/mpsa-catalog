import React, { useState, useEffect, useRef } from "react";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import "./Workshops.scss";

function Workshops(props) {
  const [error, setError] = useState(null);
  const [html, setHtml] = useState(null);
  const [json, setJson] = useState(null);
  const [filters, setFilters] = React.useState({
    categoryAwsPlatform: false,
    categoryDotNet: false,
    categorySql: false,
    tagCostOptimization: false,
    tagMigration: false,
    tagModernization: false,
    tagServerless: false,
  });
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(props["location-intro"])
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
  }, [props]);

  useEffect(() => {
    fetch(props["location-data"])
      .then((res) => res.json(), {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then(
        (result) => {
          setJson(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      );
  }, [props]);

  useEffect(() => {
    var contentElement = document.getElementById("content");
    contentElement
      .querySelectorAll("table")
      .forEach((el) => el.classList.add("table", "table-dark"));
  }, [html]);

  function getFilteredSessions() {
    var filteredWorkshops = json.data.Workshops.filter(function (x) {
      return !x.hidden;
    });

    var allTags =
      !filters.categoryAwsPlatform &&
      !filters.categoryDotNet &&
      !filters.categorySql &&
      !filters.tagCostOptimization &&
      !filters.tagMigration &&
      !filters.tagModernization &&
      !filters.tagServerless;

    filteredWorkshops = filteredWorkshops.filter(function (x) {
      return (
        allTags ||
        (x.tags.awsPlatform && filters.categoryAwsPlatform) ||
        (x.tags.dotNet && filters.categoryDotNet) ||
        (x.tags.sql && filters.categorySql) ||
        (x.tags.costOptimization && filters.tagCostOptimization) ||
        (x.tags.migration && filters.tagMigration) ||
        (x.tags.modernization && filters.tagModernization) ||
        (x.tags.serverless && filters.tagServerless)
      );
    });

    return filteredWorkshops;
  }

  function LabUrls(props) {
    if (props.link) {
      return (
        <li>
          <span>
            <b>Lab Guide:</b>&nbsp;
            <a target="_blank" href={props.link} className="icon-link">
              Link
            </a>
          </span>
        </li>
      );
    } else {
      return null;
    }
  }

  function handleCheckboxChange(event) {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  }

  function RepeatAgenda(props) {
    return (
      <tr>
        <td style={{ textAlign: "center", verticalAlign: "top" }}>
          <span className="align-center">{props.value.duration}</span>
        </td>
        <td style={{ textAlign: "left", verticalAalign: "top" }}>
          <span>{props.value.topic}</span>
        </td>
        <td style={{ textAlign: "left", verticalAalign: "top" }}>
          <span>{props.value.type}</span>
        </td>
      </tr>
    );
  }

  function Repeat(props) {
    return (
      <div>
        <h3>{props.value.title}</h3>
        <p>{props.value.abstract}</p>
        <h4>Agenda</h4>
        <table className="table table-dark">
          <thead>
            <tr>
              <th style={{ width: "15%" }}>
                <span>Duration (min)</span>
              </th>
              <th>
                <span>Topic</span>
              </th>
              <th style={{ width: "15%" }}>
                <span>Module Type</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.value.agenda &&
              props.value.agenda.map((agenda, index) => (
                <RepeatAgenda key={index} value={agenda} />
              ))}
          </tbody>
        </table>

        <h4>Details</h4>
        <div>
          <ul>
            <li>
              <span>
                <b>ID:&nbsp;</b>
                {props.value.id}
              </span>
            </li>
            <li>
              <span>
                <b>Technical Level:</b>&nbsp;{props.value.technicalLevel}
              </span>
            </li>
            <LabUrls link={props.value.labUrls} />
          </ul>
        </div>
        <hr />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className="workshops">
        <div className="quip-html" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="filters">
          <div class="heading">Filter Category</div>
          <div className="mb-3">
            <Form.Check
              inline
              label="AWS Platform"
              name="categoryAwsPlatform"
              type="checkbox"
              checked={filters.categoryAwsPlatform}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              inline
              label=".NET"
              name="categoryDotNet"
              type="checkbox"
              checked={filters.categoryDotNet}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              inline
              label="SQL Server"
              name="categorySql"
              type="checkbox"
              checked={filters.categorySql}
              onChange={handleCheckboxChange}
            />
          </div>
          <div class="heading">Filter Tags</div>
          <div className="mb-3">
            <Form.Check
              inline
              label="Migration"
              name="tagMigration"
              type="checkbox"
              checked={filters.tagMigration}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              inline
              label="Modernization"
              name="tagModernization"
              type="checkbox"
              checked={filters.tagModernization}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              inline
              label="Cost Optimization"
              name="tagCostOptimization"
              type="checkbox"
              checked={filters.tagCostOptimization}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              inline
              label="Serverless"
              name="tagServerless"
              type="checkbox"
              checked={filters.tagServerless}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
        <div className="row g-4 row-cols-1 row-cols-lg-1">
          {json &&
            getFilteredSessions().map((workshop, index) => (
              <Repeat key={index} value={workshop} />
            ))}
        </div>
      </div>
    );
  }
}

export default Workshops;
