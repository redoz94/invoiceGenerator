import React from "react";
import CustomTextField from "./CustomTextField.js";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerName: "",
      sellerAddress: "",
      customerName: "",
      customerAddress: "",
    };

    this.textFieldsHandler = this.textFieldsHandler.bind(this);
  }

  textFieldsHandler(event) {
    this.setState({
      val: event.target.value,
    });

    console.log("Text Field: " + this.state.val);
  }

  render() {
    return (
      <div>
        <CustomTextField
          customId="seller-name"
          label="Seller's Name"
          placeholder="Type in the name..."
          name="sellerName"
          val={this.state.sellerName}
          inputHandler={this.textFieldsHandler}
          text="Enter the full name..."
        />
        ,
        <CustomTextField
          customId="seller-address"
          label="Seller's Address"
          placeholder="Type in the Address..."
          name="sellerAddress"
          val={this.state.sellerAddress}
          inputHandler={this.textFieldsHandler}
          text="Enter the full address..."
        />
        ,
        <CustomTextField
          customId="customer-name"
          label="Customer's Name"
          placeholder="Type in the name..."
          name="customerName"
          val={this.state.customerName}
          inputHandler={this.textFieldsHandler}
          text="Enter the full name..."
        />
        ,
        <CustomTextField
          customId="customer-address"
          label="Customer's address"
          placeholder="Type in the name..."
          name="customerAddress"
          val={this.state.customerAddress}
          inputHandler={this.textFieldsHandler}
          text="Enter the full customer address..."
        />
      </div>
    );
  }
}
