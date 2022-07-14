import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CChartDoughnut } from "@coreui/react-chartjs";

const WidgetsMonitoring = ({ monitoring }) => {
  return (
    <CCard>
      <CCardHeader>
        <div className="wrapper-txt">
          <h4 className="title"> App Monitoring </h4>{" "}
          <p className="subTitle"> Application activity in the last hours </p>{" "}
        </div>{" "}
      </CCardHeader>{" "}
      <CCardBody>
        <CChartDoughnut
          datasets={monitoring.datasets}
          labels={monitoring.labels}
        />{" "}
      </CCardBody>{" "}
    </CCard>
  );
};

export default WidgetsMonitoring;
