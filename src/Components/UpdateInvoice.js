import React from "react";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import CustomCard from "./CustomCard";
import CustomTextArea from "./CustomTextArea.js";
import CustomTextField from "./CustomTextField.js";
import ProductsAndPrices from "./ProductsAndPricesListing.js";
import DescriptionAndPrice from "./InputDescriptionAndPrice.js";
import FinalPrice from "./FinalPrice.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DialogWindow from "./DialogWindow";
import ButtonAllInvoices from "./ButtonToInvoicesListing.js";
import ButtonToInvoicesListing from "./ButtonToInvoicesListing.js";

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
      descriptionVal: "",
      priceVal: "",
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
    //final price
    const currentItems = this.state.itemsListing;
    let finalPrice = 0;
    currentItems.map((product, index) => {
      finalPrice = finalPrice + product.price;
    });

    const data = {
      sellerName: this.state.sellerName,
      sellerAddress: this.state.sellerAddress,
      customerName: this.state.customerName,
      customerAddress: this.state.customerAddress,
      invoiceDescription: this.state.invoiceDescription,
      terms: this.state.termsAndConditions,
      items: this.state.itemsListing,
      finalPrice: finalPrice,
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
          //The information was updated
          return response.json();
        } else {
          //Problems
          throw new Error();
        }
      })
      .then((responseAsJson) => {
        this.setState({
          show: true,
          title: "SUCCESS!",
          content: "The information was updated successfully",
        });
        console.log("SUCCESS!!!");
      })
      .catch(() => {
        this.setState({
          show: true,
          title: "ERROR!",
          content: "Problems when updating the information!!!",
        });
        console.log("Error when updating!");
      });

    event.preventDefault();
    //Prevents webpage from reloading
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
          //if something goes wrong
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
          finalPrice: finalPrice,
        });
        console.log("The information was read");
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
      //If something goes wrong when reading the information from the database
      return (
        <Jumbotron>
          <Card bg="dark" text="white">
            <Card.Header as="h3" style={{ textAlign: "center" }}>
              Update Invoice
            </Card.Header>
            <Card.Body style={{ color: "black" }}>
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
                          val={this.state.termsAndConditions}
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
                              Update Invoice
                            </Button>
                            <ButtonToInvoicesListing />
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
          <Card.Body>ID: {this.props.invoiceId}</Card.Body>
        </Card>
      </Jumbotron>
    );
  }
}
