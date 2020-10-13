import React from "react";
import InvoicesTable from "./InvoicesTable.js";
import DialogBox from "./DialogWindow.js";

export default class InvoicesListing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      invoicesData: [],
      show: false,
      title: "",
      content: "",
    };

    this.closeWindow = this.closeWindow.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
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
        //the invoice was removed
        this.setState({
          show: true,
          title: "SUCCESS!!!",
          content: "The invoice was removed successfully",
        });

        const invoicesCopy = this.state.invoicesData;

        //Removing id and description
        this.state.invoicesData.map((item, index) => {
          if (item.id === invoiceId) {
            //Removing the invoice from the listing on the screen
            invoicesCopy.splice(index, 1);
            this.setState({
              invoicesData: invoicesCopy,
            });
          }
        });
      } else {
        //something went wrong
        this.setState({
          show: true,
          title: "ERROR!!!",
          content: "Problems when removing the invoice.",
        });
      }
    });
    console.log("You want to delete invoice " + invoiceId);
  }

  componentDidMount() {
    //This method runs automatically one time
    fetch("/api/readinvoice/all", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          //Everything is working
          return response.json();
          console.log(response.json());
        } else {
          //if everything is not working
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
        <DialogBox
          show={this.state.show}
          title={this.state.tile}
          content={this.state.content}
          closeHandler={this.state.closeWindow}
        />
      </div>
    );
  }
}
