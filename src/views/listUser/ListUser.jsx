import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
} from "@coreui/react";
import { useCallback, useEffect, useState } from "react";
// import usersData from "../users/UsersData";
import UserService from "../../services/user.service";
import EditUser from "../Popups/edit-user/editUser";
import DelConfirm from "../Popups/delete-confirm/DelConfirm";
import Popup from "../Popups/Popup";
import AddUser from "../Popups/add-user/AddUser";

const ListUser = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [editPopup, setEditPopup] = useState(false);
  const [id, setId] = useState(null);
  const [delPopup, setDelPopup] = useState(false);
  const [addUser, setAddUser] = useState(false);

  useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = async () => {
    const getData = await UserService.getAllUsers();
    if (getData.status === 200) {
      // console.log("listUsers ", res.data.data);
      const users = getData.data.data;
      let newData = users.map((user, index) => {
        return {
          index: index,
          id: user.id,
          name: user.name,
          email: user.email,
          last_name: user.last_name,
          created_at: user.created_at,
        };
      });
      setListUsers(newData);
    } else {
      console.log("get data fails");
    }
  };
  // useCallback;
  const handleCreatePopup = (e) => {
    setAddUser(true);
  };
  const handlePopup = (e) => {
    setEditPopup(true);
    setId(e.currentTarget.id);
    // console.log("id: ", e.currentTarget.id);
  };

  const handleDelPopup = (e) => {
    setDelPopup(true);
    setId(e.id);
    // console.log("setIdDel: ", e.id);
  };

  const csvContent = listUsers
    .map((item) => Object.values(item).join(","))
    .join("\n");

  const csvCode =
    "data:text/csv;charset=utf-8,SEP=,%0A" + encodeURIComponent(csvContent);
  const fields = [
    { key: "index", label: "Id" },
    { key: "name" },
    { key: "last_name" },
    { key: "created_at", label: "Date Time" },
    { key: "email" },
    {
      key: "action",
      label: "",
      filter: false,
    },

    // "registered",
    // {
    //   key: "show_details",
    //   label: "",
    //   _style: { width: "1%" },
    //   filter: false,
    // },
  ];

  return (
    <CCard>
      <CCardHeader>List Users</CCardHeader>
      <CCardBody>
        <CButton
          color="primary"
          className="mb-2"
          href={csvCode}
          download="user.csv"
          target="_blank"
        >
          Download current items (.csv)
        </CButton>
        <CButton
          color="success"
          className="mb-2 ml-1"
          onClick={handleCreatePopup}
        >
          Add User
        </CButton>
        <CDataTable
          fields={fields}
          items={listUsers}
          id={listUsers.id}
          columnFilter
          // itemsPerPage={5}
          hover
          sorter
          onFilteredItemsChange={setListUsers}
          scopedSlots={{
            action: (item) => {
              return (
                <>
                  {/* {console.log("item", item)} */}
                  <td className="py-2">
                    <CButton
                      id={item.id}
                      size="sm"
                      color="info"
                      onClick={handlePopup}
                    >
                      Edit
                    </CButton>
                    <CButton
                      size="sm"
                      color="danger"
                      className="ml-1"
                      onClick={() => {
                        handleDelPopup(item);
                      }}
                    >
                      Delete
                    </CButton>
                  </td>
                  {editPopup && (
                    <Popup
                      widthModal={"55%"}
                      heightModal={"50%"}
                      setTrigger={setEditPopup}
                    >
                      <EditUser
                        setTrigger={setEditPopup}
                        item={item}
                        id={id}
                        getUserList={getDataUser}
                      />
                    </Popup>
                  )}
                  :
                  {delPopup && (
                    <Popup
                      setTrigger={setDelPopup}
                      widthModal={"55%"}
                      heightModal={"30%"}
                    >
                      <DelConfirm
                        setTrigger={setDelPopup}
                        item={item}
                        id={id}
                      />
                    </Popup>
                  )}
                </>
              );
            },
          }}
        />
        {addUser && (
          <Popup
            setTrigger={setAddUser}
            widthModal={"60%"}
            heightModal={"fitContent"}
          >
            <AddUser setTrigger={setAddUser} getUserList={getDataUser} />
          </Popup>
        )}
      </CCardBody>
    </CCard>
  );
};

export default ListUser;
