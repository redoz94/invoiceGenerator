import React from "react";
import { render } from "react-dom";
import InvoicesTable from "./InvoicesTable.js";
import DialogWindow from "./DialogWindow.js";

export default class InvoicesListing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      invoicesData: [],
      show: false,
      title: "",
      content: "",
    };

    this.deleteHandler = this.deleteHandler.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }

  closeWindow() {
    this.setState({
      show: false,
    });
  }

  deleteHandler(invoiceId) {
    fetch("/api/deleteinvoice/" + invoiceId, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        //Everything was ok
        this.setState({
          show: true,
          title: "SUCCESS!!!",
          content: "The invoice was removed, successfully...",
        });

        const invoicesCopy = this.state.invoicesData;
        //Removing id and descriptions
        this.state.invoicesData.map((item, index) => {
          if (item.id === invoiceId) {
            //Removing invoice from the listing on the screen
            invoicesCopy.splice(index, 1);
            this.setState({
              invoicesData: invoicesCopy,
            });
          } else {
          }
        });
      } else {
        //If there's something wrong
        this.setState({
          show: true,
          title: "ERRORRRR!!!",
          content: "Problems when removing the invoice...",
        });
      }
    });
    console.log("You want to delete invoice: " + invoiceId);
  }

  componentDidMount() {
    //This runs automatically
    fetch("/api/readinvoice/all", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          //If everythings ok
          return response.json();
          console.log(response.json());
        } else {
          //If somethings not working

          console.log("Problems when reading the information");
        }
      })
      .then((responseAsJson) => {
        let invoicesInfo = [];
        responseAsJson.map((invoice, index) => {
          invoicesInfo.push({
            id: invoice._id,
            description: invoice.invoiceDescription,
          });
        });
        this.setState((state, props) => {
          return {
            invoicesData: state.invoicesData.concat(invoicesInfo),
          };
        });

        console.log(this.state.invoicesData);
      });
  }

  render() {
    return (
      <div>
        <InvoicesTable
          invoicesData={this.state.invoicesData}
          handleDelete={this.deleteHandler}
        />
        <DialogWindow
          show={this.state.show}
          title={this.state.title}
          content={this.state.content}
          closeHandler={this.closeWindow}
        />
      </div>
    );
  }
}
