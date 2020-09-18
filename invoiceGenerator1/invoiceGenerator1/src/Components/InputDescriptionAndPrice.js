import React from "react";
import Container from "react-bootstrap/Container";
import CustomTextField from "./CustomTextField";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default class InputDescriptionAndPrice extends React.Component {
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
              label="item description"
              name="itemDescription"
              placeholder="Enter a description"
              val={this.props.descriptionVal}
              inputHandler={this.props.customHandler}
            />
          </Col>
          <Col>
            <CustomTextField
              customId="itemPrice"
              label="item price"
              name="itemPrice"
              placeholder="Enter a price"
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
