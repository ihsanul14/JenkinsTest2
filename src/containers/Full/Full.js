import React, { Component } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import Header from "../../components/Header/";
import Sidebar from "../../components/Sidebar/";
import Breadcrumb from "../../components/Breadcrumb/";
import Aside from "../../components/Aside/";
import Footer from "../../components/Footer/";

// Components
import SummaryReport from "../../views/SummaryReport/SummaryReport";
import Tes from "../../views/SummaryReport/Tes";
import Create from "../../Create";
import Edit from "../../Edit";
import Details from "../../Details";

class Full extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route
                  path="/summary-report"
                  name="Summary Report"
                  component={SummaryReport}
                />
                <Route
                  path="/detail-report"
                  name="Detail Report"
                  component={SummaryReport}
                />
                <Route
                  path="/customer-info"
                  name="Customer Info"
                  component={Tes}
                />
                <Route path="/create" name="Create" component={Create} />
                <Route path="/edit/:id" name="Edit" component={Edit} />
                <Route path="/detail/:id" name="Details" component={Details} />
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
