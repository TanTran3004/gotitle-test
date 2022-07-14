import { CCardHeader, CModalHeader, CModalTitle } from "@coreui/react";

import { useState } from "react";

const Popup = ({
  children,
  setTrigger,

  ...rest
}) => {
  return (
    <div className="modal">
      {/* {console.log("rest: ", rest)} */}
      <div
        className="modal-dialog"
        style={{ width: rest.widthModal, height: rest.heightModal }}
      >
        <div className="modal-content">
          {/* <div className="modal-header">
            <h5 className="modal-title">Modal</h5>
            <button

              onClick={() => setTrigger(false)}
              type="button"
              className="btn-close"
              // data-coreui-dismiss="modal"
              aria-label="Close"
            ></button>
          </div> */}
          <CModalHeader onClick={() => setTrigger(false)} closeButton>
            <CModalTitle>Modal title</CModalTitle>
          </CModalHeader>
          <div className="modal-body">{children}</div>
          {/* <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-coreui-dismiss="modal"
              //   onClick={() => setA(!a)}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Popup;
