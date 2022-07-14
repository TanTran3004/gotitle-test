import { CCol, CRow, CWidgetBrand } from "@coreui/react";
import ChartLineSimple from "../charts/ChartLineSimple";
// import { map } from "core-js/core/array";
import "./index.scss";
const WidgetsCustom = ({ state, ...props }) => {
  return (
    <div>
      <CRow>
        {state.map((item, idx) => (
          <CCol sm={6} lg={4}>
            <CWidgetBrand
              key={idx}
              rightHeader={
                <div className="title-num">
                  <p className="titleText"> {item.labels} </p>
                  <p className="titleNum"> {item.titleNum} </p>
                </div>
              }
              leftFooter={
                <div className="wrapper-text">
                  <div className="percents"> {item.percents}% </div>
                  <div className="totalTilte">
                    <span> {item.totalTitles}: </span>
                    <span>
                      {item.totalTitle} {item.totalTrans}
                    </span>
                  </div>
                </div>
              }
              leftHeader={
                <ChartLineSimple
                  className="c-chart-wrapper mt-3 mx-3"
                  style={{ height: "100px", width: "auto" }}
                  dataPoints={item.datasets}
                  borderColor={item.borderColor}
                  pointHoverBackgroundColor={item.pointHoverBackgroundColor}
                  label={item.label}
                />
              }
            ></CWidgetBrand>
          </CCol>
        ))}
      </CRow>
    </div>
  );
};
export default WidgetsCustom;
