import React from "react";

export default class InvoiceListing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      invoicesData: [],
    };
  }

  componentDidMount() {
    //this method runs automatically
    fetch("/api/readinvoice/all", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          //everything is working
          return response.json();
          console.log(response.json());
        } else {
          //if something is not working
          console.log("problems when reading the info");
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
    return <h1>Hello from InvoicesListing!!!</h1>;
  }
}
