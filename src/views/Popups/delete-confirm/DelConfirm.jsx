import { CButton, CCard, CCardBody, CLabel, CModalFooter } from "@coreui/react";
import UserService from "src/services/user.service";

const DelConfirm = ({ setTrigger, ...props }) => {
  const handleDelete = () => {
    UserService.removeUser(props.id).then((res) => {
      if (res.status === 200) {
        setTrigger(false);
        alert("Success Deleted!!");
        window.location.reload();
      } else {
        alert("Failed Deleted");
      }
    });
  };
  return (
    <CCard>
      <CCardBody>
        <CLabel>Do you want to delete item?</CLabel>
      </CCardBody>
      <CModalFooter>
        <CButton className="btn btn-second">Cancel</CButton>
        <CButton className="btn btn-warning" onClick={handleDelete}>
          OK
        </CButton>
      </CModalFooter>
    </CCard>
  );
};

export default DelConfirm;
