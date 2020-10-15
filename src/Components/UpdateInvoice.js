import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomCard from "./CustomCard.js";
import CustomTextArea from "./CustomTextArea.js";
import CustomTextField from "./CustomTextField.js";
import ProductsAndPrices from "./ProductsAndPricesListing.js";
import DescriptionAndPrice from "./InputDescriptionAndPrice.js";
import FinalPrice from "./FinalPrice.js";

export default class UpdateInvoice extends React.Component {
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
      descriptionVal: "",
      priceVal: "",
    };

    this.textFieldsHandler = this.textFieldsHandler.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  buttonClick() {
    this.setState((state, props) => {
      const currentArray = this.state.itemsListing;

      return {
        itemsListing: currentArray.concat([
          {
            description: state.descriptionVal,
            price: parseFloat(state.priceVal),
          },
        ]),
      };
    });
    console.log("You want to add an item to the listing");
  }

  handleSubmit(event) {
    const data = {
      sellerName: this.state.sellerName,
      sellerAddress: this.state.sellerAddress,
      customerName: this.state.customerName,
      customerAddress: this.state.customerAddress,
      invoiceDescription: this.state.invoiceDescription,
      terms: this.state.terms,
      items: this.state.itemsListing,
      finalPrice: this.state.finalPrice,
    };

    fetch("/api/updateinvoice/" + this.props.invoiceId, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          //the information was updated
          return response.json();
        } else {
          //Problems when updating the information
          throw new Error();
        }
      })
      .then((responseAsJson) => {
        console.log("SUCCESS!!!");
      })
      .catch(() => {
        console.log("ERROR when updating!!!");
      });
  }

  textFieldsHandler(event) {
    if (event.target.name === "itemDescription") {
      this.setState({
        descriptionVal: event.target.value,
      });

      console.log("Item Description: " + this.state.descriptionVal);
    }

    if (event.target.name === "itemPrice") {
      this.setState({
        priceVal: event.target.value,
      });

      console.log("Item Price: " + this.state.priceVal);
    }

    if (event.target.name === "termsAndConditions") {
      this.setState({
        termsAndConditions: event.target.value,
      });

      console.log("Terms and Conditions: " + this.state.termsAndConditions);
    }

    if (event.target.name === "invoiceDescription") {
      this.setState({
        invoiceDescription: event.target.value,
      });

      console.log("Invoice Description: " + this.state.invoiceDescription);
    }

    if (event.target.name === "sellerName") {
      this.setState({
        sellerName: event.target.value,
      });

      console.log("Seller Name: " + this.state.value);
    }

    if (event.target.name === "sellerAddress") {
      this.setState({
        sellerAddress: event.target.value,
      });

      console.log("Seller Address: " + this.state.sellerAddress);
    }

    if (event.target.name === "customerName") {
      this.setState({
        customerName: event.target.value,
      });

      console.log("Customer Name: " + this.state.customerName);
    }

    if (event.target.name === "customerAddress") {
      this.setState({
        customerAddress: event.target.value,
      });

      console.log("Customer Address: " + this.state.customerAddress);
    }
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
          //something went wrong when reading the information
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
        });
        console.log("The info was read");
      })
      .catch(() => {
        this.setState({
          fetchError: true,
        });
        console.log("Problems when reading the information");
      });
  }

  render() {
    if (this.state.fetchError) {
      //if something goes wrong, this message displays
      return (
        <Jumbotron>
          <Card bg="dark" text="white">
            <Card.Header as="h3" style={{ textAlign: "center" }}>
              Update Invoice
            </Card.Header>
            <Card.Body style={{ color: "black" }}>
              <h1>
                ERROR: Problems when reading the information from the Database.
              </h1>
            </Card.Body>
          </Card>
        </Jumbotron>
      );
    }
    return (
      <Jumbotron>
        <Card bg="dark" text="white">
          <Card.Header as="h3" style={{ textAlign: "center" }}>
            Update Invoice
          </Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Container>
                <Row style={{ marginTop: "1em", color: "black" }}>
                  <Col>
                    <CustomCard head="Invoice Description">
                      <CustomTextArea
                        label="Invoice Description"
                        name="invoiceDescription"
                        val={this.state.invoiceDescription}
                        inputHandler={this.textFieldsHandler}
                      />
                    </CustomCard>
                  </Col>
                </Row>
                <Row style={{ marginTop: "1em", color: "black" }}>
                  <Col>
                    <CustomCard head="Sellers Information">
                      <CustomTextField
                        customId="seller-name"
                        label="Seller's Name"
                        placeholder="Type in the name..."
                        name="sellerName"
                        val={this.state.sellerName}
                        inputHandler={this.textFieldsHandler}
                        text="Enter the full name..."
                      />

                      <CustomTextField
                        customId="seller-address"
                        label="Seller's Address"
                        placeholder="Type in the Address..."
                        name="sellerAddress"
                        val={this.state.sellerAddress}
                        inputHandler={this.textFieldsHandler}
                        text="Enter the full address..."
                      />
                    </CustomCard>
                  </Col>
                  <Col>
                    <CustomCard head="Customer's information">
                      <CustomTextField
                        customId="customer-name"
                        label="Customer's Name"
                        placeholder="Type in the name..."
                        name="customerName"
                        val={this.state.customerName}
                        inputHandler={this.textFieldsHandler}
                        text="Enter the full name..."
                      />

                      <CustomTextField
                        customId="customer-address"
                        label="Customer's address"
                        placeholder="Type in the name..."
                        name="customerAddress"
                        val={this.state.customerAddress}
                        inputHandler={this.textFieldsHandler}
                        text="Enter the full customer address..."
                      />
                    </CustomCard>
                  </Col>
                </Row>
                <Row style={{ marginTop: "1em" }} style={{ color: "black" }}>
                  <Col>
                    <CustomCard head="Items/Services purchased">
                      <ProductsAndPrices
                        itemsListing={this.state.itemsListing}
                      />
                      <DescriptionAndPrice
                        descriptionVal={this.state.descriptionVal}
                        priceVal={this.state.priceVal}
                        customHandler={this.textFieldsHandler}
                        buttonHandler={this.buttonClick}
                      />
                    </CustomCard>
                  </Col>
                </Row>
                <Row style={{ marginTop: "1em", color: "black" }}>
                  <Col>
                    <CustomCard head="Final Price">
                      <FinalPrice itemsListing={this.state.itemsListing} />
                    </CustomCard>
                  </Col>
                </Row>
                <Row style={{ marginTop: "1em", color: "black" }}>
                  <Col>
                    <CustomCard head="Terms and Conditions">
                      <CustomTextArea
                        label="Terms  and Conditions"
                        name="termsAndConditions"
                        val={this.state.termsAndConditions}
                        inputHandler={this.textFieldsHandler}
                      />
                    </CustomCard>
                  </Col>
                </Row>
                <Row style={{ marginTop: "1em", color: "black" }}>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Button type="submit" variant="primary" size="lg">
                          Update Invoice
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </Jumbotron>
    );
  }
}
