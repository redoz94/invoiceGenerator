import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class FinalPrice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.itemsListing;

    let finalPrice = 0;
    items.map((products, index) => {
      finalPrice = finalPrice + products.price;
    });
    return (
      <Container>
        <Row></Row>
        <Col>
          <h4>${finalPrice}</h4>
        </Col>
      </Container>
    );
  }
}
