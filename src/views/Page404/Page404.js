import React, {Component} from 'react';
import {Container, Row, Col, Button, Input, InputGroupAddon, InputGroup, InputGroupText} from 'reactstrap';

class Page404 extends Component {
  render() {
    return (
      <div className="align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">404</h1>
                <h4 className="pt-3">Oops! You're lost.</h4>
                <p className="text-muted float-left">You don't have previlige for this page.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page404;
