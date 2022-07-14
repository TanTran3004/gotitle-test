import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import { useEffect, useState } from "react";
import UserService from "src/services/user.service";
import { toast } from "react-toastify";
const EditUser = ({ setTrigger, getUserList, ...props }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUserById();
  }, []);
  const getUserById = () => {
    UserService.getUserById(props.id).then((res) => {
      if (res.status === 200) {
        // console.log(res.data.data);
        setName(res.data.data.name);
        setLastName(res.data.data.last_name);
        setEmail(res.data.data.email);
      } else {
        console.log("get data by id fails");
      }
    });
  };

  console.log("name", name);
  const handleSubmit = async (e) => {
    let data = {
      name: name,
      email: email,
      last_name: lastName,
    };

    const updateUser = await UserService.updateUser(props.id, data);
    if (updateUser.status === 200) {
      const getList = await UserService.getAllUsers();
      if (getList.status === 200) {
        getUserList(getList.data.data);
      } else {
        console.log("get data fails");
      }
      toast.success("Successfully Updated");
      setTrigger(false);
    } else {
      toast.error("Failed Updated");
    }
  };

  // if (!item) return null;
  return (
    <div className="editUser">
      <CCard>
        <CCardHeader>Edit User</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="name">Name</CLabel>
                <CInput
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="last_name">Last Name</CLabel>
                <CInput
                  id="last_name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="email">Email</CLabel>
                <CInput
                  id="email"
                  // placeholder={item.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </CFormGroup>
            </CCol>
          </CRow>
        </CCardBody>
        <CButton className="btn btn-primary" onClick={handleSubmit}>
          Update
        </CButton>
      </CCard>
    </div>
  );
};

export default EditUser;
