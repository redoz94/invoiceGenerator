import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default function ButtonToHomepage(props) {
  const history = useHistory();

  function handleClick() {
    history.push("/");
  }

  return (
    <Button variant="warning" size="lg" onClick={handleClick}>
      Go back to homepage
    </Button>
  );
}
