import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import CustomTextField from "./CustomTextField.js";
import CustomTextArea from "./CustomTextArea.js";
import ProductsAndPrices from "./ProductsAndPricesListing.js";
import FinalPrice from "./FinalPrice.js";
import DescriptionAndPrice from "./InputDescriptionAndPrice.js";
import Button from "react-bootstrap/Button";
import DialogBox from "./DialogWindow";
import Form from "react-bootstrap/Form";
import CustomCard from "./CustomCard.js";

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

    console.log("You want to close this dialogue box.");
  }

  handleSubmit(event) {
    //Final price

    const currentItems = this.state.itemsListing;
    let finalPrice = 0;
    currentItems.map((product, index) => {
      finalPrice = finalPrice + product.price;
    });

    //Sales invoice information
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
        //if everything is working
        this.setState({
          show: true,
          title: "Success!!!",
          content: "The Invoice was created successfully",
        });
        console.log("The invoice was saved");
      } else {
        //If something wrong happens
        this.setState({
          show: true,
          title: "Error!!!",
          content: "Problems when creating the invoice, try it again!",
        });
        console.log("problems when saving the invoice");
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
    console.log("You want to add an item to the listing");
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

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Container>
          <Row style={{ marginTop: "1em" }}>
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
          <Row style={{ marginTop: "1em" }}>
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
          <Row style={{ marginTop: "1em" }}>
            <Col>
              <CustomCard head="Items/Services purchased">
                <ProductsAndPrices itemsListing={this.state.itemsListing} />
                <DescriptionAndPrice
                  descriptionVal={this.state.descriptionVal}
                  priceVal={this.state.priceVal}
                  customHandler={this.textFieldsHandler}
                  buttonHandler={this.buttonClick}
                />
              </CustomCard>
            </Col>
          </Row>
          <Row style={{ marginTop: "1em" }}>
            <Col>
              <CustomCard head="Final Price">
                <FinalPrice itemsListing={this.state.itemsListing} />
              </CustomCard>
            </Col>
          </Row>
          <Row style={{ marginTop: "1em" }}>
            <Col>
              <CustomCard head="Terms and Conditions">
                <CustomTextArea
                  label="Terms  and Conditions"
                  name="termsAndConditions"
                  val={this.state.TermsAndConditions}
                  inputHandler={this.textFieldsHandler}
                />
              </CustomCard>
            </Col>
          </Row>
          <Row style={{ marginTop: "1em" }}>
            <Col>
              <Card>
                <Card.Body>
                  <Button type="submit" variant="primary" size="lg">
                    Create a Sales Invoice
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <DialogBox
          show={this.state.show}
          title={this.state.tile}
          content={this.state.content}
          closeHandler={this.state.closeWindow}
        />
      </Form>
    );
  }
}
