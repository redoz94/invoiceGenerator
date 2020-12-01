import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ViewInvoiceButton from "./ViewInvoiceButton.js";
import UpdateInvoiceButton from "./ButtonUpdateInvoice.js";
import ButtonToHomepage from "./ButtonToHomePage";

export default class InvoicesTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const idsAndDescription = this.props.invoicesData;
    let htmlMarkUp = [];

    idsAndDescription.map((invoice, index) => {
      htmlMarkUp.push(
        <Row key={"index- " + index}>
          <Col>
            <h5>{invoice.id}</h5>
          </Col>
          <Col>
            <h5>{invoice.description}</h5>
          </Col>
          <Col>
            <ButtonGroup>
              <Button
                variant="danger"
                onClick={() => {
                  this.props.handleDelete(invoice.id);
                }}
              >
                Delete
              </Button>
              <ViewInvoiceButton invoiceId={invoice.id} />
              <UpdateInvoiceButton invoiceId={invoice.id} />
            </ButtonGroup>
          </Col>
        </Row>
      );
    });
    return (
      <Container>
        <Row>
          <Col>
            <h4>Invoice ID</h4>
          </Col>
          <Col>
            <h4>Description</h4>
          </Col>
          <Col>
            <h4>Actions</h4>
          </Col>
        </Row>
        {htmlMarkUp}
        <ButtonToHomepage />
      </Container>
    );
  }
}
