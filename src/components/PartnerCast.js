import React, { useState, useEffect, useRef } from "react";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import "./PartnerCast.scss";

function PartnerCast(props) {
  const [error, setError] = useState(null);
  const [html, setHtml] = useState(null);
  const [json, setJson] = React.useState(null);
  const [filters, setFilters] = React.useState({
    audienceBusiness: false,
    audienceTechnical: false,
    geoNamer: false,
    geoEmea: false,
    geoApj: false,
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

  function getFilteredSessions() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var upcomingSessions = json.data.Sessions.filter(function (x) {
      return new Date(x.date) >= today;
    });

    var allAudiences = !filters.audienceTechnical && !filters.audienceBusiness;
    var allGeos = !filters.geoNamer && !filters.geoEmea && !filters.geoApj;

    var filteredSessions = upcomingSessions.filter(function (x) {
      return (
        (allAudiences ||
          (x.audience == "Technical" && filters.audienceTechnical) ||
          (x.audience == "Business" && filters.audienceBusiness)) &&
        (allGeos ||
          (x.geo.includes("NAMER") && filters.geoNamer) ||
          (x.geo.includes("EMEA") && filters.geoEmea) ||
          (x.geo.includes("APJ") && filters.geoApj))
      );
    });

    return filteredSessions;
  }

  function handleCheckboxChange(event) {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  }

  function RegistrationLink(props) {
    if (props.link) {
      return (
        <a target="_blank" href={props.link} className="icon-link">
          Register »
        </a>
      );
    } else {
      return <span>&lt;Registration Coming Soon&gt;</span>;
    }
  }

  function Repeat(props) {
    return (
      <div className="feature col py-3">
        <div className="py-2">
          <h3>{props.value.title}</h3>
          <small>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="currentColor"
              className="bi bi-calendar3-event"
              viewBox="0 0 16 16"
            >
              <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
              <path d="M12 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg>{" "}
            <em className="date">
              {new Date(props.value.date).toDateString()} - {props.value.time}
            </em>
          </small>
          <div className="tags">
            <small>
              {" "}
              <Badge bg="success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-people"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>{" "}
                {props.value.audience}
              </Badge>{" "}
              <Badge bg="success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-globe"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                </svg>{" "}
                {props.value.geo}
              </Badge>{" "}
              <Badge bg="success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-folder"
                  viewBox="0 0 16 16"
                >
                  <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
                </svg>{" "}
                {props.value.topic}
              </Badge>
            </small>
          </div>
        </div>
        <p>{props.value.abstract}</p>
        <RegistrationLink link={props.value.link} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div class="partnercast">
        <div className="quip-html" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="filters">
          <div class="heading">Filter Audience</div>
          <div className="mb-3">
            <Form.Check
              inline
              label="Technical"
              name="audienceTechnical"
              type="checkbox"
              checked={filters.audienceTechnical}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              inline
              label="Business"
              name="audienceBusiness"
              type="checkbox"
              checked={filters.audienceBusiness}
              onChange={handleCheckboxChange}
            />
          </div>
          <div class="heading">Filter Geo</div>
          <div className="mb-3">
            <Form.Check
              inline
              label="N. America (NAMER)"
              name="geoNamer"
              type="checkbox"
              checked={filters.geoNamer}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              inline
              label="EMEA"
              name="geoEmea"
              type="checkbox"
              checked={filters.geoEmea}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              inline
              label="Asia Pacific (APJ)"
              name="geoApj"
              type="checkbox"
              checked={filters.geoApj}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
        <div className="row g-4 row-cols-1 row-cols-lg-1">
          {json &&
            getFilteredSessions().map((session, index) => (
              <Repeat key={index} value={session} />
            ))}
        </div>
      </div>
    );
  }
}

export default PartnerCast;
