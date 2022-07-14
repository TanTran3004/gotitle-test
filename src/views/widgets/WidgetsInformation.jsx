import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import moment from "moment";
import { useState } from "react";

const WidgetsInformation = ({ information }) => {
  const [limit, setLimit] = useState(3);
  return (
    <CCard>
      <CCardHeader>
        <h4 className="title">information</h4>
        <p className="subTitle">Purchased Titles</p>
      </CCardHeader>
      <CCardBody>
        <div className="content-information__wrapper">
          {information.length > 3 ? (
            <>
              {information
                .slice(0, limit ? limit : information.length)
                .map((item, idx) => (
                  <div key={idx} className="content-information__wrapper__item">
                    <div className="content-information__wrapper__item__info">
                      <div className="address">{item.legal_address}</div>
                      <div className="date-time">
                        {moment(item.created_at).format("MMMM, Do, YY")}
                      </div>
                    </div>
                    <div className="content-information__wrapper__item__action-price">
                      {item.price > 0 ? <> ${item.price}</> : ""}
                    </div>
                  </div>
                ))}
              <CButton color="primary">More Info</CButton>
            </>
          ) : (
            <>
              {information.map((item, idx) => (
                <div key={idx} className="content-information__wrapper__item">
                  <div className="content-information__wrapper__item__info">
                    <div className="address">{item.legal_address}</div>
                    <div className="date-time">
                      {moment(item.created_at).format("MMMM, Do, YY")}
                    </div>
                  </div>
                  <div className="content-information__wrapper__item__action-price">
                    {item.price > 0 ? <> ${item.price}</> : ""}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </CCardBody>
    </CCard>
  );
};

export default WidgetsInformation;
