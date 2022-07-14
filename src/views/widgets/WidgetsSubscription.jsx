import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";
import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";

const WidgetsSubscription = ({ sub }) => {
  console.log("aaa", sub);
  return (
    <CCard>
      <CCardHeader>
        <h4 className="title">subscription</h4>
        <p className="subTitle">Your subscription ends on August 10, 2022</p>
      </CCardHeader>
      <CCardBody>
        <div className="content-subscription">
          <div className="content-subscription__wrapper">
            {sub.map((item, idx) => (
              <div className="content-subscription__wrapper__item">
                <div className="title-content">
                  <p className="txt-title">Plan Name:</p>
                  <span className="">{item.name}</span>
                </div>
                <div className="number-content">
                  <p className="txt-member">Member: </p>
                  <span>{item.role_users.length}</span>
                </div>
              </div>
            ))}
            {/* <div className="content-subscription__wrapper__item">
              <span className="txt-title">Plan Name:</span>
              <span> Aug 10, 2021</span>
            </div>
            <div className="content-subscription__wrapper__item">
              <span className="txt-title">Plan Name:</span>
              <span> Aug 10, 2022</span>
            </div>
            <div className="content-subscription__wrapper__item">
              <span className="txt-title">Plan Name:</span>
              <span> $5.00 USD/month</span>
            </div> */}
          </div>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default WidgetsSubscription;
