import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomTextField from "./CustomTextField";
import CustomTextArea from "./CustomTextArea";
import ProductsAndPrices from "./ProductsAndPricesListing";
import FinalPrice from "./FinalPrice";
import InputDescriptionAndPrice from "./InputDescriptionAndPrice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { json } from "body-parser";
import DailogWindow from "./DialogWindow";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerName: "",
      sellerAddress: "",
      customerName: "",
      customerAddress: "",
      invoiceDescription: "",
      termsAndConditions: "",
      descriptionVal: "",
      priceVal: "",
      itemsListing: [],
      show: false,
      title: "",
      content: "",
    };

    this.textFieldsHandler = this.textFieldsHandler.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }

  closeWindow() {
    this.setState({
      show: false,
    });
    event.preventDefault();
    console.log("you want to close this dialogue box.");
  }

  handleSubmit(event) {
    //final price
    const currentItems = this.state.itemsListing;
    let finalPrice = 0;
    currentItems.map((product, index) => {
      finalPrice = finalPrice + product.price;
    });

    //sales invoice information
    const salesInvoice = {
      sellerName: this.state.sellerName,
      sellerAddress: this.state.sellerAddress,
      customerName: this.state.customerName,
      customerAddress: this.state.customerAddress,
      items: this.state.itemsListing,
      finalPrice: finalPrice,
      terms: this.state.termsAndConditions,
      invoiceDescription: this.state.invoiceDescription,
    };

    fetch("/api/createinvoice", {
      method: "POST",
      body: JSON.stringify(salesInvoice),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        //if everything is working then this if block is run
        this.setState({
          show: true,
          title: "Success",
          content: "the invoice was created successfully",
        });
        console.log("the invoice was saved!!!");
      } else {
        //Something went wrong
        this.setState({
          show: true,
          title: "ERROR",
          content: "Problems when creating the invoice, try it again.",
        });
        console.log("Problems when saving the invoice");
      }
    });

    event.preventDefault();
    console.log("You want to create a new sales invoice");
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
    console.log("you want to add an item to the listing");
  }

  textFieldsHandler(event) {
    if (event.target.name === "itemDescription") {
      this.setState({
        descriptionVal: event.target.value,
      });

      console.log("Item description: " + this.state.descriptionVal);
    }

    if (event.target.name === "itemPrice") {
      this.setState({
        priceVal: event.target.value,
      });

      console.log("Item price: " + this.state.priceVal);
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

      console.log("Seller Name: " + this.state.sellerName);
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
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Container>
          <Row style={{ marginTop: "1em" }}>
            <Col>
              <CustomTextArea
                label="Invoice Description"
                name="invoiceDescription"
                val={this.state.invoiceDescription}
                inputHandler={this.textFieldsHandler}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "1em" }}>
            <Col>
              <CustomTextField
                customId="seller-name"
                label="seller's name"
                placeholder="Type in the name. . ."
                name="sellerName"
                val={this.state.sellerName}
                inputHandler={this.textFieldsHandler}
                text="Enter the full name"
              />
              <CustomTextField
                customId="seller-address"
                label="seller's address"
                placeholder="Type in the address. . ."
                name="sellerAddress"
                val={this.state.sellerAddress}
                inputHandler={this.textFieldsHandler}
                text="Enter the full address "
              />
            </Col>
            <Col>
              <CustomTextField
                customId="customer-name"
                label="Customer's name"
                placeholder="Type in the full name. . ."
                name="customerName"
                val={this.state.customerName}
                inputHandler={this.textFieldsHandler}
                text="Enter the customer name"
              />
              <CustomTextField
                customId="customer-name"
                label="Customer's address"
                placeholder="Type in the name. . ."
                name="customerAddress"
                val={this.state.customerAddress}
                inputHandler={this.textFieldsHandler}
                text="Enter the full address"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "1em" }}>
            <Col>
              <ProductsAndPrices itemsListing={this.state.itemsListing} />
              <InputDescriptionAndPrice
                descriptionVal={this.state.descriptionVal}
                priceVal={this.state.priceVal}
                customHandler={this.textFieldsHandler}
                buttonHandler={this.buttonClick}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "1em" }}>
            <Col>
              <FinalPrice itemsListing={this.state.itemsListing} />
            </Col>
          </Row>
          <Row style={{ marginTop: "1em" }}>
            <Col>
              <CustomTextArea
                label="Terms And Conditions"
                name="termsAndConditions"
                val={this.state.termsAndConditions}
                inputHandler={this.textFieldsHandler}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "1em" }}>
            <Col>
              <Button type="submit" variant="primary" size="lg">
                Create a sales invoice
              </Button>
            </Col>
          </Row>
        </Container>

        <DailogWindow
          show={this.state.show}
          title={this.state.title}
          content={this.state.content}
          closeHandler={this.closeWindow}
        />
      </Form>
    );
  }
}
