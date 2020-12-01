import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function LoadPageNotFound(props) {
  return (
    <Jumbotron
      style={{
        width: "80%",
        marginLeft: "10%",
        marginTop: "10%",
        height: "400px",
      }}
    >
      <h1>ERROR 404!</h1>
      <p>Page not found</p>
    </Jumbotron>
  );
}
