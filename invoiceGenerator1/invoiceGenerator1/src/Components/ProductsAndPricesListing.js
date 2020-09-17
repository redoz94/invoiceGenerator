import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class ProductsAndPrices extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.itemsListing;
    let htmlMarkUp = [];

    items.map((product, index) => {
      htmlMarkUp.push(
        <Row key={"index- " + index}>
          <Col>{product.description}</Col>
          <Col>${product.price}</Col>
        </Row>
      );
    });
    return <Container>{htmlMarkUp}</Container>;
  }
}
