import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import "./PartnerReadiness.scss";

function PartnerReadiness(props) {
  const [error, setError] = useState(null);
  const [html, setHtml] = useState(null);
  const [json, setJson] = useState(null);
  const [topics, setTopics] = useState(null);
  const [filters, setFilters] = useState({});

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

          const topics = [...new Set(result.data.Resources.map(item => item.topic))].sort();
          setTopics(topics);

          //check for existence of "filters" parameter and setup initial view
          try {
            const urlParameters = new URLSearchParams(window.location.search);
            if (urlParameters.has("filters")) {
              const urlFilters = urlParameters.get("filters").split(",");

              const selectedFilters = {};
              for (var i = 0; i < urlFilters.length; i++) {
                // check if filter represents a valid topic
                if (topics.includes(urlFilters[i])) {
                  selectedFilters[urlFilters[i]] = true;
                }
              }
              setFilters(selectedFilters);
            }
          } catch (error) {
            console.error(error);
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      );
  }, [props]);

  function RepeatCategory(props) {
    return (
      <div>
        <h2 className="category">{props.category}</h2>
        {
          [...new Set(json.data.Resources
            .filter(object => {
              return object.category === props.category && (Object.keys(filters).length > 0 ? filters[object.topic] : true);
            })
            .map(item => item.topic))]
            .map((item, index) => (
              <RepeatTopic key={index} category={props.category} topic={item} />
            ))
        }
        <hr />
      </div>
    );
  }

  function RepeatTopic(props) {
    return (
      <div className="topic">
        <h3>{props.topic}</h3>
        {
          [...new Set(json.data.Resources
            .filter(object => {
              return (object.category === props.category && object.topic === props.topic && (Object.keys(filters).length > 0 ? filters[object.topic] : true));
            })
            .map(item => item.product))]
            .map((item, index) => (
              <RepeatProduct key={index} category={props.category} topic={props.topic} product={item} />
            ))
        }
      </div>
    );
  }

  function RepeatProduct(props) {
    return (
      <div className="product">
        <h4>{props.product}</h4>
        {
          json.data.Resources
            .filter(object => {
              return (object.category === props.category && object.topic === props.topic && object.product === props.product && (Object.keys(filters).length > 0 ? filters[object.topic] : true));
            })
            .map((item, index) => (
              <RepeatResource key={index} value={item} />
            ))
        }
      </div>
    );
  }

  function RepeatResource(props) {
    return (
      <div className="resource">
        <span title={props.value.resourceType}><ResourceIcon resourceType={props.value.resourceType} /></span>&nbsp;<a target="_blank" href={props.value.resourceLink}>{props.value.resourceName}</a>&nbsp;<ResourceMetadata value={props.value} />
      </div>
    );
  }

  function ResourceIcon(props) {
    switch (props.resourceType) {
      case "Blog":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-text" viewBox="0 0 16 16">
            <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
          </svg>
        )
      case "Catalog":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder" viewBox="0 0 16 16">
            <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
          </svg>
        )
      case "Documentation":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
          </svg>
        )
      case "FAQ": return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
        </svg>
      )
      case "HomePage": return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
        </svg>
      )
      case "Playlist": return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-collection-play" viewBox="0 0 16 16">
          <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1zm2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848l-4-2.5z" />
          <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5h13z" />
        </svg>
      )
      case "Prescriptive Guidance": return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-medical" viewBox="0 0 16 16">
          <path d="M7.5 5.5a.5.5 0 0 0-1 0v.634l-.549-.317a.5.5 0 1 0-.5.866L6 7l-.549.317a.5.5 0 1 0 .5.866l.549-.317V8.5a.5.5 0 1 0 1 0v-.634l.549.317a.5.5 0 1 0 .5-.866L8 7l.549-.317a.5.5 0 1 0-.5-.866l-.549.317V5.5zm-2 4.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
        </svg>
      )
      case "Video": return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
        </svg>
      )
      case "Workshop": return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tools" viewBox="0 0 16 16">
          <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z" />
        </svg>
      )
    }

    return null;
  }

  function ResourceMetadata(props) {
    switch (props.value.resourceType) {
      case "Video": return (
        <span style={{ fontSize: "0.7em" }}>({props.value.videoRuntime})</span>
      )
    }

    return null;
  }

  function TopicFilter(props) {
    return (
      <div className="col-3">
        <Form.Check
          inline
          label={props.value}
          name={props.value}
          type="checkbox"
          checked={filters[props.value]}
          onChange={handleFilterChange}
        />
      </div>
    );

    function handleFilterChange(event) {
      var filtersCurrentState = null;

      if (event.target.checked) {
        filtersCurrentState = {
          ...filters,
          [event.target.name]: true,
        }
      }
      else {
        filtersCurrentState = filters;
        delete filtersCurrentState[event.target.name];
      }

      setFilters({ ...filtersCurrentState })

      if (Object.keys(filtersCurrentState).length > 0) {
        window.history.replaceState(filtersCurrentState, "", `${window.location.pathname}?${(new URLSearchParams({ filters: Object.keys(filtersCurrentState).sort() })).toString()}`);
      }
      else {
        window.history.replaceState(null, "", `${window.location.pathname}`);
      }
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className="partnerreadiness">
        <div className="quip-html" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="filters">
          <div className="heading">Filter Topics</div>
          <div className="row">
            {
              topics && topics.map((item, index) => (
                <TopicFilter key={index} value={item} />
              ))
            }
          </div>
        </div>
        <div className="row g-4 row-cols-1 row-cols-lg-1">
          {
            json && [...new Set(json.data.Resources
              .filter(object => {
                return (Object.keys(filters).length > 0 ? filters[object.topic] : true);
              })
              .map(item => item.category))]
              .map((item, index) => (
                <RepeatCategory key={index} category={item} />
              ))
          }
        </div>
      </div>
    );
  }
}

export default PartnerReadiness;
