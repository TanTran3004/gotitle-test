import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { CChartBar } from "@coreui/react-chartjs";
import { Link } from "react-router-dom";
const WidgetsAbstract = ({ abstract }) => {
  console.log(abstract);

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            display: true,
            // stacked: true,
          },
        ],
        yAxes: [
          {
            display: true,
            // stacked: true,
          },
        ],
      },
    };
  })();
  return (
    <div>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="wrapper-txt">
                <h4 className="title">
                  Abstract <Link className="title-link">(Title for Sales)</Link>
                </h4>
                <p className="subTitle">
                  Use your mouse to see statistics from particular day
                </p>
              </div>
              <div className="wrapper-icons">
                {/* <CIcon content={freeSet.cilAvTimer}></CIcon>
                <span>SELECT RANGE</span>
                <CIcon content={freeSet.cilChevronBottom}></CIcon> */}
              </div>
            </CCardHeader>
            <CCardBody className="chart-bar">
              <CChartBar
                style={{ height: "260px" }}
                options={defaultOptions}
                datasets={abstract.datasets}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

WidgetsAbstract.propTypes = {};
WidgetsAbstract.defaultProps = {
  backgroundColor: "rgba(0,0,0,.2)",
  //   dataPoints: {abstract.datasets.data},
  label: "Sales",
};

export default WidgetsAbstract;
