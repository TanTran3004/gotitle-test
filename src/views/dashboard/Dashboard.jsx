import { freeSet } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { addDays, subDays } from "date-fns";
import moment from "moment";
import PropTypes from "prop-types";
import { lazy, useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import DashboardService from "src/services/dashboard.jsx";
import DateRangeFilter from "../filter/DateRangeFilter.jsx";
import WidgetsInformation from "../widgets/WidgetsInformation.jsx";
import WidgetsMonitoring from "../widgets/WidgetsMonitoring.jsx";
import WidgetTitleWork from "../widgets/WidgetTitleWork.jsx";
const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.jsx"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));
const WidgetsCustom = lazy(() => import("../widgets/WidgetsCustom.jsx"));
const WidgetsAbstract = lazy(() => import("../widgets/WidgetsAbstract"));
const WidgetsSubscription = lazy(() =>
  import("../widgets/WidgetsSubscription")
);
const abstract = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "GitHub Commits",
      backgroundColor: "#f87979",
      data: [40, 20, 12, 39, 10, 31.23, 56, 23, 12, 4],
      // stack: "Stack 0",
      // borderWidth: 1,
    },
    {
      label: "reddit",
      backgroundColor: "#34af54",
      data: [34, 54, 12, 2, 20, 20, 33, 67, 46, 7],
      // stack: "Stack 0",
      // borderWidth: 1,
    },
  ],
};

const monitoring = {
  datasets: [
    {
      data: [40, 20, 80, 10],
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
    },
  ],
  labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
};

// const [widgetLayout, setWidgetLayout] = useState("");

const Dashboard = () => {
  const [newTitle, setNewTitle] = useState("");
  const [totalTitle, setTotalTitle] = useState("");
  const [chartTitle, setChartTitle] = useState([]);
  const [transTitle, setTransTitle] = useState(0);
  const [totalInvoice, setTotalInvoice] = useState("");
  const [chartTransaction, setChartTransaction] = useState([]);
  const [available, setAvailable] = useState("");
  const [showOption, setShowOption] = useState(false);
  const [myRequest, setMyRequest] = useState("");
  const [dataInfo, setDataInfo] = useState([]);
  const [dataSubs, setDataSubs] = useState([]);

  const months = [
    { id: 1, month: 1, total: 0 },
    { id: 2, month: 2, total: 0 },
    { id: 3, month: 3, total: 0 },
    { id: 4, month: 4, total: 0 },
    { id: 5, month: 5, total: 0 },
    { id: 6, month: 6, total: 0 },
    { id: 7, month: 7, total: 0 },
    { id: 8, month: 8, total: 0 },
    { id: 9, month: 9, total: 0 },
    { id: 10, month: 10, total: 0 },
    { id: 11, month: 11, total: 0 },
    { id: 12, month: 12, total: 0 },
  ];

  const state = [
    {
      labels: "New Title",
      // datasets: ["# of Votes"],
      datasets: chartTitle,
      borderColor: "rgb(20, 47, 56)",
      pointHoverBackgroundColor: "#2f6e83",
      titleNum: newTitle,
      totalTitle: totalTitle,
      percents: +21,
      totalTitles: "Total title",
      label: "Title",
    },
    {
      labels: "Transaction",
      // datasets: ["# of Votes"],
      datasets: chartTransaction,
      borderColor: "rgba(100, 188, 200, 1)",
      pointHoverBackgroundColor: "#a9a3e3",
      titleNum: transTitle,
      totalTrans: totalInvoice,
      percents: -10,
      totalTitles: "Invoice Total",
      label: "Transaction",
    },
    {
      labels: "Total available",
      datasets: chartTransaction,
      borderColor: "rgba(130,22,111,1)",
      titleNum: `${available}$`,
      totalAvailable: 10,
      percents: +50,
      totalTitles: "WithDraw Now",
      label: "Available",
    },
  ];
  // const titleWork = {
  //   desc: 35,
  // };

  const titleWork = [
    {
      title: "My Requests",
      icon: freeSet.cilCommentBubble,
      backgroundColor: "#139135",
      desc: myRequest,
    },
    {
      title: "NITs Requested",
      icon: freeSet.cilDiamond,
      backgroundColor: "#136191",
      desc: 0,
    },
    {
      title: "My Working NITs",
      icon: freeSet.cilWindowRestore,
      backgroundColor: "#91132a",
      desc: 0,
    },
  ];

  // TODO: Filter
  // const [dates, setDates] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]);

  // ? test

  // const [showPopup, setShowPopup] = useState(false);

  const [state1, setState1] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const startDate = moment(state1[0].startDate).format("YYYY-MM-DD");
  const endDate = moment(state1[0].endDate).format("YYYY-MM-DD");
  const data = { startDate: startDate, endDate: endDate };
  useEffect(() => {
    console.log("state", state1);

    handleSubmitFilter(data);
    getWidget(data);
    numTrans(data);
    getChartTitle(data);
    chartTrans(data);
    totalAvailable(data);
    getInfo(data);
    getSubscription();
    getTotalTitle();
    invoiceTotal();
    getTitleWork();
    // fetch api with start and end date here
  }, [state1]);
  const onChange = (ranges) => {
    setState1([ranges]);
  };

  // const hanldToggleDatePicker = () => {
  //   setShowPopup(!showPopup);
  // };
  const handleOpenOption = () => {
    setShowOption(!showOption);
  };

  // TODO:end filter

  const handleSubmitFilter = (data) => {
    // const data = { startDate: startDate, endDate: endDate };
    DashboardService.getTitleForSale(data).then((res) => {
      console.log("res: ", res.data);
      if (res.status === 200) {
        // setShowOption(false);
      }
    });
  };
  const getChartTitle = (data) => {
    const dataMonths = new Array(12).fill(0);
    const dataDays = new Array(31).fill(0);
    DashboardService.chartTitle(data).then((res) => {
      // console.log("res: ", res.data.data);
      const data = res.data.data;
      const today = new Date();
      const yearCurrent = today.getFullYear();
      console.log("object 211:", data);
      if (res.status === 200) {
        const filterYears = data.filter((fil) => fil.year === yearCurrent);
        filterYears.forEach((item) => {
          dataMonths[item.month - 1] = item.total;
        });
        console.log(dataMonths);
        setChartTitle(dataMonths);
        // const getData = filterYears.map((filYear) => filYear.total_title);
        // console.log("year", getData);
        // setChartTitle(getData);
      } else {
        console.log("get year fails");
      }
    });
  };

  const getWidget = (data) => {
    // const data = { startDate: startDate, endDate: endDate };
    DashboardService.getTotalTitleWithMonth(data).then((res) => {
      if (res.status === 200) {
        console.log("res title 1: ", res.data);
        const title = res.data.data[0].totalWithMonth;
        setNewTitle(title);
      } else {
        console.log("get Data failed");
      }
    });
  };
  const getTotalTitle = () => {
    DashboardService.getTotalTitle().then((res) => {
      // console.log("res title 2: ", res.data.data);
      if (res.status === 200) {
        const total = res.data.data[0].totalAllTitle;
        // console.log(total);
        setTotalTitle(total);
      } else {
        console.log("get Total Title failed");
      }
    });
  };

  const numTrans = (data) => {
    DashboardService.getTitleTransaction(data).then((res) => {
      if (res.status === 200) {
        const total = res.data.data[0].total_price;
        console.log("254:", res);
        if (total === null) {
          setTransTitle(0);
        } else {
          setTransTitle(total);
        }
      } else {
        console.log("get data transaction failed");
      }
    });
  };
  const invoiceTotal = () => {
    DashboardService.getInvoice().then((res) => {
      if (res.status === 200) {
        const total = res.data.data[0].total_price;
        setTotalInvoice(total);
      } else {
        console.log("get invoice total failed");
      }
    });
  };
  const chartTrans = (data) => {
    DashboardService.chartTrans(data).then((res) => {
      const data = res.data.data;
      const today = new Date();
      const yearCurrent = today.getFullYear();
      console.log("first", res);
      if (res.status === 200) {
        console.log("object 284:", data);

        const filterYears = data.filter((fil) => fil.year === yearCurrent);
        filterYears.forEach((item) => {
          months[item.month - 1].total = item.total;
        });
        const total_price = months.map((item) => item.total);
        console.log("object", total_price);
        setChartTransaction(total_price);
      } else {
        console.log("Get Chart Transaction Failed");
      }
    });
  };
  const totalAvailable = (data) => {
    DashboardService.getTotalAvailable(data).then((res) => {
      if (res.status === 200) {
        const total = res.data.data[0].total;
        if (total === null) {
          setAvailable(0);
        } else {
          setAvailable(total);
        }
      } else {
        console.log("get Data failed");
      }
    });
  };
  const getTitleWork = () => {
    DashboardService.getTitleWork().then((res) => {
      const data = res.data.data;
      if (res.status === 200) {
        console.log("332", data);
        const tw_myRequest = data[0].count;
        // const tw_nitsRequest = data.search_type_detail_value;
        // const tw_myWorking = data.title;

        setMyRequest(tw_myRequest);
      } else {
        console.log("Get data title work failed");
      }
      console.log("res: ", data);
    });
  };
  const getSubscription = () => {
    DashboardService.getSubscription().then((res) => {
      const data = res.data.data;
      if (res.status === 200) {
        console.log("348", data);
        setDataSubs(data);
      } else {
        console.log("Get data subscription failed");
      }
    });
  };
  const getInfo = (data) => {
    DashboardService.getTitleInfo(data).then((res) => {
      const data = res.data.data;
      if (res.status === 200) {
        console.log("357", data);

        setDataInfo(data);
      } else {
        console.log("Get data information failed!");
      }
    });
  };
  return (
    <>
      {/* <WidgetsDropdown /> */}
      {/* <WidgetsBrand /> */}
      <div className="filter-container">
        <CButton className="filter-content" onClick={handleOpenOption}>
          <CIcon content={freeSet.cilCalendar} />
          <span className="txt-icon">Filter Option</span>
        </CButton>
        {showOption && (
          <>
            <DateRangeFilter
              onChange={onChange}
              onClose={handleOpenOption}
              dates={state1}
              onHandleSubmit={handleSubmitFilter}
            />
          </>
        )}
      </div>
      <CCard>
        <CCardBody>
          <CRow>
            <div className="wrapper-widgets">
              <WidgetsCustom state={state} />
            </div>

            <CCol>
              <div className="wrapper-contents">
                <div className="wrapper-contents__left">
                  <div className="widget-abstract">
                    <WidgetsAbstract abstract={abstract} />
                    {/* <WidgetsCustom state={state} /> */}
                  </div>
                  <div className="wrapper-contents__left__bottom">
                    <div className="widget-title">
                      <WidgetTitleWork title={titleWork} />
                      {/* <WidgetsCustom state={state} /> */}
                    </div>
                    <div className="widget-subscription">
                      <WidgetsSubscription sub={dataSubs} />
                    </div>
                  </div>
                </div>
                <div className="wrapper-contents__right">
                  <div className="widget-monitoring">
                    {/* <WidgetsCustom state={state} /> */}
                    <WidgetsMonitoring monitoring={monitoring} />
                  </div>
                  <div className="widget-information">
                    <WidgetsInformation information={dataInfo} />
                    {/* <WidgetsCustom state={state} /> */}
                  </div>
                </div>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      {/* <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-muted">November 2017</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download" />
              </CButton>
              <CButtonGroup className="float-right mr-3">
                {["Day", "Month", "Year"].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === "Month"}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample style={{ height: "300px", marginTop: "40px" }} />
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Visits</div>
              <strong>29.703 Users (40%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Unique</div>
              <strong>24.093 Users (20%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Pageviews</div>
              <strong>78.706 Views (60%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">New Users</div>
              <strong>22.123 Users (80%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Bounce Rate</div>
              <strong>Average Rate (40.15%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                value={40}
              />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>

      <WidgetsBrand withCharts />

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Traffic {" & "} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="6" xl="6">
                  <CRow>
                    <CCol sm="6">
                      <CCallout color="info">
                        <small className="text-muted">New Clients</small>
                        <br />
                        <strong className="h4">9,123</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="danger">
                        <small className="text-muted">Recurring Clients</small>
                        <br />
                        <strong className="h4">22,643</strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Monday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="34"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="78"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Tuesday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="56"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="94"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Wednesday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="12"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="67"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Thursday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="43"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="91"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Friday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="22"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="73"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Saturday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="53"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="82"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Sunday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="9"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="69"
                      />
                    </div>
                  </div>
                  <div className="legend text-center">
                    <small>
                      <sup className="px-1">
                        <CBadge shape="pill" color="info">
                          &nbsp;
                        </CBadge>
                      </sup>
                      New clients &nbsp;
                      <sup className="px-1">
                        <CBadge shape="pill" color="danger">
                          &nbsp;
                        </CBadge>
                      </sup>
                      Recurring clients
                    </small>
                  </div>
                </CCol>

                <CCol xs="12" md="6" xl="6">
                  <CRow>
                    <CCol sm="6">
                      <CCallout color="warning">
                        <small className="text-muted">Pageviews</small>
                        <br />
                        <strong className="h4">78,623</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="success">
                        <small className="text-muted">Organic</small>
                        <br />
                        <strong className="h4">49,123</strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user" />
                      <span className="title">Male</span>
                      <span className="ml-auto font-weight-bold">43%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="warning"
                        value="43"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-5">
                    <div className="progress-group-header">
                      <CIcon
                        className="progress-group-icon"
                        name="cil-user-female"
                      />
                      <span className="title">Female</span>
                      <span className="ml-auto font-weight-bold">37%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="warning"
                        value="37"
                      />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon
                        className="progress-group-icon"
                        name="cil-globe-alt"
                      />
                      <span className="title">Organic Search</span>
                      <span className="ml-auto font-weight-bold">
                        191,235 <span className="text-muted small">(56%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="56"
                      />
                    </div>
                  </div>

                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon
                        name="cib-facebook"
                        className="progress-group-icon"
                      />
                      <span className="title">Facebook</span>
                      <span className="ml-auto font-weight-bold">
                        51,223 <span className="text-muted small">(15%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="15"
                      />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon
                        name="cib-twitter"
                        className="progress-group-icon"
                      />
                      <span className="title">Twitter</span>
                      <span className="ml-auto font-weight-bold">
                        37,564 <span className="text-muted small">(11%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="11"
                      />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon
                        name="cib-linkedin"
                        className="progress-group-icon"
                      />
                      <span className="title">LinkedIn</span>
                      <span className="ml-auto font-weight-bold">
                        27,319 <span className="text-muted small">(8%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="8"
                      />
                    </div>
                  </div>
                  <div className="divider text-center">
                    <CButton color="link" size="sm" className="text-muted">
                      <CIcon name="cil-options" />
                    </CButton>
                  </div>
                </CCol>
              </CRow>

              <br />

              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">
                      <CIcon name="cil-people" />
                    </th>
                    <th>User</th>
                    <th className="text-center">Country</th>
                    <th>Usage</th>
                    <th className="text-center">Payment Method</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/1.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Yiorgos Avraamu</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-us" title="us" id="us" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>50%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="50"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-mastercard" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>10 sec ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/2.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-danger"></span>
                      </div>
                    </td>
                    <td>
                      <div>Avram Tarasios</div>
                      <div className="small text-muted">
                        <span>Recurring</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-br" title="br" id="br" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>10%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="10"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-visa" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>5 minutes ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/3.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-warning"></span>
                      </div>
                    </td>
                    <td>
                      <div>Quintin Ed</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-in" title="in" id="in" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>74%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="warning"
                        value="74"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-stripe" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>1 hour ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/4.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-secondary"></span>
                      </div>
                    </td>
                    <td>
                      <div>Enéas Kwadwo</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-fr" title="fr" id="fr" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>98%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="98"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-paypal" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Last month</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/5.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Agapetus Tadeáš</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-es" title="es" id="es" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>22%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="22"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-google-pay" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Last week</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/6.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-danger"></span>
                      </div>
                    </td>
                    <td>
                      <div>Friderik Dávid</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-pl" title="pl" id="pl" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>43%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="43"
                      />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-amex" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Yesterday</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </>
  );
};
Dashboard.propTypes = {
  onChange: PropTypes.func,
};
export default Dashboard;
