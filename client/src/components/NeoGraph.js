import React, { useEffect, useRef } from "react";
import useResizeAware from "react-resize-aware";
import PropTypes from "prop-types";
import Neovis from "neovis.js/dist/neovis.js";

const NeoGraph = (props) => {
  const {
    width,
    height,
    containerId,
    backgroundColor,
    neo4jUri,
    neo4jUser,
    neo4jPassword,
    init_cypher
  } = props;

  const visRef = useRef();

  useEffect(() => {
    const config = {
      container_id: visRef.current.id,
      server_url: neo4jUri,
      server_user: neo4jUser,
      server_password: neo4jPassword,
      labels: {
			"Person":{
                caption: "name",
                size: 0.5,
                font: '20px arial red',
            },
            "Name":{
				caption: "label",
                size: 0.5,
                font: '15px arial black'
            },
			"Group":{
				caption: "label",
                size: 0.5,
                font: '15px arial black'
            },
            "Process":{
				caption: "label",
                size: 0.5,
                font: '15px arial black'
            },
            "Event":{
                caption: "label",
                size: 0.5,
                font: '15px arial black'
            },
      	    "Function":{
				        caption: "label",
                size: 0.5,
                font: '15px arial black'
            },
      	    "Timespan":{
				        caption: "label",
                size: 0.5,
                font: '15px arial black'
            },
      	    "Activity":{
				        caption: "name",
                size: 0.5,
                font: '15px arial black'
            },
      	    "Source":{
				        caption: "label",
                size: 0.5,
                font: '15px arial black'
            },
            "Location":{
              caption: "label",
              size: 0.5,
              font: '15px arial black'
          }
      },
      relationships: {
        "WAS_MEMBER_IN":{
            thickness: "50"
        },
        "NAMED":{
            thickness: "10"
        },
        "DID_PROCESS":{
            thickness: "10"
        },
        "SUB_PROCESS":{
            thickness: "10"
        },
        "HAS_EVENT":{
            thickness: "10"
        },
        "ACCORDING_TO":{
          thickness: "10"
      },
        "WAS_A":{
        thickness: "10"
    },
        "ACTIVITY":{
        thickness: "10"
    },
        "IN_TIME":{
        thickness: "10"
        },
        "IN_LOCATION":{
          thickness: "10"
          },
          "FATHER_OF":{
            thickness: "10"
            }
      },
	  arrows: true,
      initial_cypher:
        init_cypher,
    };
    const vis = new Neovis(config);
    vis.render();
  }, [neo4jUri, neo4jUser, neo4jPassword]);

  return (
    <div
      id={containerId}
      ref={visRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: `${backgroundColor}`,
      }}
    />
  );
};

NeoGraph.defaultProps = {
  width: 600,
  height: 600,
  backgroundColor: "#d3d3d3",
};

NeoGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  containerId: PropTypes.string.isRequired,
  neo4jUri: PropTypes.string.isRequired,
  neo4jUser: PropTypes.string.isRequired,
  neo4jPassword: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
};

const ResponsiveNeoGraph = (props) => {
  const [resizeListener, sizes] = useResizeAware();

  const side = Math.max(sizes.width, sizes.height) / 2;
  const neoGraphProps = { ...props, width: side, height: side };
  return (
    <div style={{ position: "relative" }}>
      {resizeListener}
      <NeoGraph {...neoGraphProps} />
    </div>
  );
};

ResponsiveNeoGraph.defaultProps = {
  backgroundColor: "#d3d3d3",
};

ResponsiveNeoGraph.propTypes = {
  containerId: PropTypes.string.isRequired,
  neo4jUri: PropTypes.string.isRequired,
  neo4jUser: PropTypes.string.isRequired,
  neo4jPassword: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
};

export { NeoGraph, ResponsiveNeoGraph };