import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CustomTextField from "./CustomTextField";
import CustomTextArea from "./CustomTextArea.js";
import ProductsAndPrices from "./ProductsAndPricesListing.js";
import FinalPrice from "./FinalPrice.js";
import DescriptionAndPrice from "./InputDescriptionAndPrice.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DialogWindow from "./DialogWindow.js";
import CustomCard from "./CustomCard.js";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToHomepage from "./ButtonToHomePage";

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
    };
    this.textFieldsHandler = this.textFieldsHandler.bind(this);
    this.buttonHandler = this.buttonHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }

  buttonHandler() {}

  closeWindow() {
    this.setState({
      show: false,
    });
    console.log("You want to close this dialogbox");
  }

  handleSubmit(event) {
    //final price
    const currentItems = this.state.itemsListing;
    let finalPrice = 0;
    currentItems.map((product, index) => {
      finalPrice = finalPrice + product.price;
    });

    //Sales Invoice
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
        //If everything is working
        this.setState({
          show: true,
          title: "SUCCESS!!!",
          content: "The invoice was created successfully",
        });
        console.log("The Invoice was saved");
      } else {
        //When something wrong happens
        this.setState({
          show: true,
          title: "ERROR!!!",
          content: "Problems when creating the invoice, try again",
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
      console.log("Terms And Conditions: " + this.state.termsAndConditions);
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
      console.log("customer name: " + this.state.customerName);
    }

    if (event.target.name === "customerAddress") {
      this.setState({
        customerAddress: event.target.value,
      });
      console.log("customer address: " + this.state.customerAddress);
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
              <CustomCard head="Seller's information">
                <CustomTextField
                  customId="seller-name"
                  name="sellerName"
                  label="Seller's name"
                  placeholder="Type in the name"
                  val={this.state.sellerName}
                  inputHandler={this.textFieldsHandler}
                  text="Enter the full name"
                />

                <CustomTextField
                  customId="seller-address"
                  name="sellerAddress"
                  label="Seller's address"
                  placeholder="Type in the address"
                  val={this.state.sellerAddress}
                  inputHandler={this.textFieldsHandler}
                  text="Enter the full address"
                />
              </CustomCard>
            </Col>
            <Col>
              <CustomCard head="Customer's Information">
                <CustomTextField
                  customId="customer-name"
                  name="customerName"
                  label="Customer's name"
                  placeholder="Type in the name"
                  val={this.state.customerName}
                  inputHandler={this.textFieldsHandler}
                  text="Enter the full name"
                />

                <CustomTextField
                  customId="customer-address"
                  name="customerAddress"
                  label="Customer's address"
                  placeholder="Type in the address"
                  val={this.state.customerAddress}
                  inputHandler={this.textFieldsHandler}
                  text="Enter the full address"
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
              <CustomCard head="Terms And Conditions">
                <CustomTextArea
                  label="Terms and Conditions"
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
                  <ButtonGroup>
                    <Button type="submit" variant="primary" size="lg">
                      Create a sales Invoice
                    </Button>
                    <ButtonToHomepage />
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <DialogWindow
          show={this.state.show}
          title={this.state.title}
          content={this.state.content}
          closeHandler={this.closeWindow}
        />
      </Form>
    );
  }
}
