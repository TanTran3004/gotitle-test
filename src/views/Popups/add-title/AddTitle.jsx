import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CModalFooter,
  CRow,
} from "@coreui/react";
import { useState } from "react";
import TitleService from "src/services/title.service";

const AddTitle = ({ setTrigger, ...props }) => {
  console.log(setTrigger);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [source, setSource] = useState("");
  const [legalAddress, setLegalAddress] = useState("");

  const handleCreate = (e) => {
    let data = {
      condo_name: title,
      price: price,
      source: source,
      legal_address: legalAddress,
    };
    console.log(data);
    TitleService.createTitle(data).then((res) => {
      if (res.status === 200) {
        alert("Create Title Successful!!!");
        setTrigger(false);
        window.location.reload();
      } else {
        alert("Create Title Failed!!!");
      }
    });
  };
  const handleClose = (e) => {
    setTrigger(false);
  };
  return (
    <div className="addTitle">
      <CCard>
        <CCardHeader>Add Title</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="title">Title</CLabel>
                <CInput
                  id="title"
                  placeholder="Enter title name"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="price">Price</CLabel>
                <CInput
                  id="price"
                  placeholder="Enter price title"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="source">Source</CLabel>
                <CInput
                  id="source"
                  placeholder="Enter source"
                  onChange={(e) => setSource(e.target.value)}
                  required
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="address">Legal Address</CLabel>
                <CInput
                  id="address"
                  placeholder="Enter your address"
                  onChange={(e) => setLegalAddress(e.target.value)}
                  required
                />
              </CFormGroup>

              <CModalFooter>
                <CButton onClick={handleClose} className="btn btn-second">
                  Cancel
                </CButton>
                <CButton onClick={handleCreate} className="btn btn-warning">
                  OK
                </CButton>
              </CModalFooter>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default AddTitle;
