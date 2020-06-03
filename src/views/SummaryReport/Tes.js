import React from "react";
import { Link } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import { callAPI, downloadCSV } from "../../functions/api.js";
import {
  Badge,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  ButtonDropdown,
  Label,
  Input,
  Table,
} from "reactstrap";

const brandPrimary = "#20a8d8";
const brandSuccess = "#4dbd74";
const brandInfo = "#63c2de";
const brandWarning = "#f8cb00";
const brandDanger = "#f86c6b";

const cardChartData1 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandPrimary,
      borderColor: "rgba(255,255,255,.55)",
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent",
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent",
        },
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      },
    ],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 2
const cardChartData2 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandInfo,
      borderColor: "rgba(255,255,255,.55)",
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent",
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent",
        },
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      },
    ],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,255,255,.2)",
      borderColor: "rgba(255,255,255,.55)",
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,255,255,.3)",
      borderColor: "transparent",
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: "facebook" },
  { data: [1, 13, 9, 17, 34, 41, 38], label: "twitter" },
  { data: [78, 81, 80, 45, 34, 12, 40], label: "linkedin" },
  { data: [35, 23, 56, 22, 97, 23, 64], label: "google" },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        backgroundColor: "rgba(255,255,255,.1)",
        borderColor: "rgba(255,255,255,.55)",
        pointHoverBackgroundColor: "#fff",
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: "New Clients",
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: "Recurring Clients",
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: "Pageviews",
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: "Organic",
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: "CTR",
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: "Bounce Rate",
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        backgroundColor: "transparent",
        borderColor: variant ? variant : "#c2cfd6",
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const sparklineChartOpts = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

// Main Chart

// convert Hex to RGBA
function convertHex(hex, opacity) {
  hex = hex.replace("#", "");
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  var result = "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
  return result;
}

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

// callAPI('https://jsonplaceholder.typicode.com/posts', (response) => {
//   // // 'bri360/summary-dashboard/top-produk'
//   // 'http://127.0.0.1:8260/bri360/churn-analysis/churn'
//   // var response = {
//   //   "status" : 200,
//   //   "data" : {
//   //     "Britama" : 200,
//   //     "Simpedes": 900,
//   //     "Briguna": 800,
//   //     "Junio" : 600
//   //   },
//   //   "period_date": ["201803","201902"],
//   //   "modified_date": "2019-12-16 14:23:45"
//   // }

//   var periode_date = ""
//   if (response.period_date.length == 2){
//     var year_start_period = response.period_date[0].substr(0,4)
//     var year_end_period = response.period_date[1].substr(0,4)
//     if (year_start_period == year_end_period){
//       periode_date = this.state.months[response.period_date[0].substr(4)]+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
//     }else{
//       periode_date = this.state.months[response.period_date[0].substr(4)]+' '+year_start_period+' - '+this.state.months[response.period_date[1].substr(4)]+ ' '+year_end_period
//     }
//   }

//   this.setState({
//     label_produk : Object.keys(response.data),
//     data_produk: Object.values(response.data),
//     modif_date_produk: moment(response.modified_date).format("DD MMMM YYYY HH:mm:ss"),
//     period_date_produk: periode_date
for (var i = 0; i <= elements; i++) {
  data1.push(180);
  data2.push(random(80, 100));
  data3.push(65);
}

//   })

// }

const mainChart = {
  labels: [
    "M",
    "T",
    "W",
    "T",
    "F",
    "S",
    "S",
    "M",
    "T",
    "W",
    "T",
    "F",
    "S",
    "S",
    "M",
    "T",
    "W",
    "T",
    "F",
    "S",
    "S",
    "M",
    "T",
    "W",
    "T",
    "F",
    "S",
    "S",
  ],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: convertHex(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data1,
    },
    {
      label: "My Second dataset",
      backgroundColor: "transparent",
      borderColor: brandSuccess,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data2,
    },
    {
      label: "My Third dataset",
      backgroundColor: "transparent",
      borderColor: brandDanger,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      },
    ],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class Tes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
    };
    this.loadPortofolio = this.loadPortofolio.bind(this);
  }
  componentDidMount() {
    //   // https://jsonplaceholder.typicode.com/posts
    //   fetch('http://127.0.0.1:8090/customerinfo')
    //     .then(res => res.json())
    //     .then(json => {
    //       this.setState ({
    //         datas: json,
    //         load: true
    //       })
    //     });

    this.loadPortofolio();
  }

  // deleteContact(id) {
  //   // <-- declare id parameter
  //   axios
  //     .delete(`http://127.0.0.1:8000/${id}`) // <-- remove ;
  //     .then((res) => {
  //       const users = res.data;
  //       this.setState({ users });
  //     });
  // }

  loadPortofolio() {
    console.log("load portofolio");
    callAPI(
      "http://192.168.100.63:8090/customerinfo",
      (response) => {
        console.log(response.data);
        this.setState({
          datas: response,
          load: true,
        });
      },
      "GET",
      JSON.stringify({})
    );
  }

  render() {
    var { datas, load } = this.state;
    // mainChart.datasets[0].data = datas.map(dat => dat.id * 10)
    // var exp = datas.map(dat => dat.id)

    if (!load) {
      return (
        <div>
          <div>Tes Menu .....</div>
          <p>{datas.data}</p>
        </div>
      );
    } else {
      return (
        <div>
          Tes Menu
          <div className="animated fadeIn">
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <Row>
                      <Col sm="5">
                        <CardTitle className="mb-0">Tes Traffic</CardTitle>
                        <div className="small text-muted">November 2015</div>
                      </Col>
                      <Col sm="7" className="d-none d-sm-inline-block">
                        <Button color="primary" className="float-right">
                          <i className="icon-cloud-download"></i>
                        </Button>
                        {/* <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                          <ButtonGroup className="mr-3" aria-label="First group">
                            <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Day</Button>
                            <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Month</Button>
                            <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>
                          </ButtonGroup>
                        </ButtonToolbar> */}
                      </Col>
                    </Row>
                    <div
                      className="chart-wrapper"
                      style={{ height: 300 + "px", marginTop: 40 + "px" }}
                    >
                      <Line
                        data={mainChart}
                        options={mainChartOpts}
                        height={300}
                      />
                      {/* <ul>
                      <li>{datas.id}</li>
                      <li>{datas.title}</li>
                      </ul> */}
                    </div>
                  </CardBody>
                  <CardFooter>
                    <ul>
                      <li>
                        <div className="text-muted">Visits</div>
                        <strong>20,097 Users (40%)</strong>
                        <Progress
                          className="progress-xs mt-2"
                          color="success"
                          value="40"
                        />
                      </li>
                      <li className="d-none d-md-table-cell">
                        <div className="text-muted">Unique</div>
                        <strong>24.093 Users (20%)</strong>
                        <Progress
                          className="progress-xs mt-2"
                          color="info"
                          value="20"
                        />
                      </li>
                      <li>
                        <div className="text-muted">Pageviews</div>
                        <strong>78.706 Views (60%)</strong>
                        <Progress
                          className="progress-xs mt-2"
                          color="warning"
                          value="60"
                        />
                      </li>
                      <li className="d-none d-md-table-cell">
                        <div className="text-muted">New Users</div>
                        <strong>22.123 Users (80%)</strong>
                        <Progress
                          className="progress-xs mt-2"
                          color="danger"
                          value="80"
                        />
                      </li>
                      <li className="d-none d-md-table-cell">
                        <div className="text-muted">Bounce Rate</div>
                        <strong>Average 40.15%</strong>
                        <Progress
                          className="progress-xs mt-2"
                          color="primary"
                          value="40"
                        />
                      </li>
                    </ul>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </div>
          <a href="/#/create" className="btn btn-primary">
            Create Data
          </a>
          <table
            className="table table-hover"
            style={{ backgroundColor: "white" }}
          >
            <thead>
              <tr>
                <td>Cifno</td>
                <td>Nama</td>
                <td>Kewarganegaraan</td>
                <td>Aksi</td>
              </tr>
            </thead>
            <tbody>
              {datas.data.map((dat) => (
                <tr>
                  <td>{dat.cifno}</td>
                  <td>{dat.nama_sesuai_id}</td>
                  <td>{dat.kewarganegaraan}</td>
                  <td>
                    {/* <a href="#/edit">Edit</a> || */}
                    <Link to={`/detail/${dat.cifno}`}>Details</Link> ||
                    <Link to={`/edit/${dat.cifno}`}> Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Tes;
