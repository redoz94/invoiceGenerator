import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductsAndPrices from "./ProductsAndPricesListing";
import ButtonAllInvoices from "./ButtonToInvoicesListing.js";

export default class DisplayInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchError: false,
      sellerName: "",
      sellerAddress: "",
      customerName: "",
      customerAddress: "",
      invoiceDescription: "",
      termsAndConditions: "",
      itemsListing: [],
      finalPrice: "",
      date: "",
      invoiceId: "",
    };
  }

  componentDidMount() {
    //Runs automatically
    fetch("/api/readinvoice/" + this.props.invoiceId, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          //everything is working
          return response.json();
        } else {
          //problems when reading information from mongodb
          throw new Error();
        }
      })
      .then((responseAsJson) => {
        this.setState({
          sellerName: responseAsJson.sellerName,
          sellerAddress: responseAsJson.sellerAddress,
          customerName: responseAsJson.customerName,
          customerAddress: responseAsJson.customerAddress,
          invoiceDescription: responseAsJson.invoiceDescription,
          termsAndConditions: responseAsJson.terms,
          itemsListing: responseAsJson.items,
          finalPrice: responseAsJson.finalPrice,
          date: responseAsJson.date,
          invoiceId: responseAsJson._id,
        });
        console.log("The information was read from mongodb");
      })
      .catch(() => {
        this.setState({
          fetchError: true,
        });
        console.log("Something went wrong");
      });
  }

  render() {
    if (this.state.fetchError) {
      //If something goes wrong when reading info from mongodb
      return (
        <Jumbotron>
          <Card bg="dark" text="white">
            <Card.Header as="h3" style={{ textAlign: "center" }}>
              Sales Invoice
            </Card.Header>
            <Card.Body>
              <h2>
                ERROR: Something went wrong when reading information from
                MongoDB
              </h2>
            </Card.Body>
          </Card>
        </Jumbotron>
      );
    }
    return (
      <Jumbotron>
        <Card bg="dark" text="white">
          <Card.Header as="h3" style={{ textAlign: "center" }}>
            Sales Invoice
          </Card.Header>
          <Card.Body>
            <Container style={{ fontSize: "1.3em" }}>
              <Row style={{ marginTop: "1.2em" }}>
                <Col style={{ textAlign: "right", color: "white" }}>
                  <h5>Seller's name and Address</h5>
                  <p>
                    {this.state.sellerName}
                    <br />
                    {this.state.sellerAddress}
                  </p>
                </Col>
              </Row>
              <Row style={{ marginTop: "1.2em" }}>
                <Col style={{ textAlign: "left", color: "white" }}>
                  <h5>Customer's Name and Address</h5>
                  <p>
                    {this.state.customerName}
                    <br />
                    {this.state.customerAddress}
                  </p>
                </Col>
                <Col style={{ textAlign: "right", color: "white" }}>
                  <h5>Invoice ID and Date</h5>
                  <p>
                    {this.state.invoiceId}
                    <br />
                    {new Date(this.state.date).toLocaleString()}
                  </p>
                </Col>
              </Row>
              <Row style={{ marginTop: "1.2em" }}>
                <Col style={{ textAlign: "left", color: "white" }}>
                  <h5>Invoice Description</h5>
                  <p>{this.state.invoiceDescription}</p>
                </Col>
              </Row>
              <Row style={{ marginTop: "1.2em" }}>
                <Col style={{ textAlign: "left", color: "white" }}>
                  <h5>Items/Services purchased</h5>
                  <ProductsAndPrices itemsListing={this.state.itemsListing} />
                </Col>
              </Row>
              <Row style={{ marginTop: "1.2em" }}>
                <Col style={{ textAlign: "left", color: "white" }}>
                  <h5>Final Price</h5>
                  <p>${this.state.finalPrice}</p>
                </Col>
              </Row>
              <Row style={{ marginTop: "1.2em" }}>
                <Col style={{ textAlign: "left", color: "white" }}>
                  <h5>Terms and Conditions</h5>
                  <p>{this.state.termsAndConditions}</p>
                </Col>
              </Row>
              <Row style={{ marginTop: "1.2em" }}>
                <Col>
                  <ButtonAllInvoices />
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Jumbotron>
    );
  }
}
