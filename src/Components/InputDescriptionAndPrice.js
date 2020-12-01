import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { render } from "react-dom";
import CustomTextField from "./CustomTextField";

export default class DescriptionAndPrice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <CustomTextField
              customId="itemDescription"
              label="Item Description"
              name="itemDescription"
              placeholder="Enter a short description"
              val={this.props.descriptionVal}
              inputHandler={this.props.customHandler}
            />
          </Col>
          <Col>
            <CustomTextField
              customId="itemPrice"
              label="Item Price"
              name="itemPrice"
              placeholder="Enter the price"
              val={this.props.priceVal}
              inputHandler={this.props.customHandler}
            />
          </Col>
          <Col>
            <Button
              variant="primary"
              size="lg"
              style={{ marginTop: "2em" }}
              onClick={this.props.buttonHandler}
            >
              Submit Item
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
