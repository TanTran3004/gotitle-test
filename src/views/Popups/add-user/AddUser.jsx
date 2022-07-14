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

import { memo, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "src/services/user.service";
// toast.configure();
const AddUser = ({ setTrigger, getUserList, ...props }) => {
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleClose = (e) => {
    setTrigger(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      name: userName,
      email: email,
      last_name: lastName,
    };

    const user = await UserService.createUser(data);
    if (user.status === 201) {
      const getUser = await UserService.getAllUsers();
      if (getUser.status === 200) {
        getUserList(getUser.data.data);
      } else {
        console.log("get data fails");
      }
      setTrigger(false);
      toast.success("Success Create!");
    } else {
      toast.error("Failed Updated");
    }
  };
  return (
    <div className="addUser">
      <CCard>
        <CCardHeader>Add User</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="name">Name</CLabel>
                <CInput
                  id="name"
                  placeholder="Enter your name"
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="last_name">Last Name</CLabel>
                <CInput
                  id="last_name"
                  placeholder="Enter your name"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="email">Email</CLabel>
                <CInput
                  id="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </CFormGroup>
              {/* <CFormGroup>
                <CLabel htmlFor="password">Password</CLabel>
                <CInput
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
              </CFormGroup> */}
              <CModalFooter>
                <CButton onClick={handleClose} className="btn btn-second">
                  Cancel
                </CButton>
                <CButton onClick={handleSubmit} className="btn btn-warning">
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

export default memo(AddUser);
