import { useState, useEffect } from "react";
import {
  CCardBody,
  CBadge,
  CButton,
  CCollapse,
  CDataTable,
  CCardHeader,
  CCard,
} from "@coreui/react";
import usersData from "../users/UsersData";
import UserService from "../../services/user.service";

const ShowErr = () => {
  const [err, setErr] = useState([]);
  useEffect(() => {
    getUserErr();
  }, []);
  const getUserErr = () => {
    UserService.getErr().then((res) => {
      if (res.status === 200) {
        const err = res.data.data;
        setErr(err);
        console.log(err);
      } else {
        console.log("Get Error User failed!");
      }
    });
  };

  // const toggleErr = (index) => {
  //   const position = err.indexOf(index);
  //   let newDetails = err.slice();
  //   if (position !== -1) {
  //     newDetails.splice(position, 1);
  //   } else {
  //     setErr = [...err, index];
  //   }
  //   setErr(newDetails);
  // };
  const fields = [
    { key: "id" },
    { key: "userId" },
    { key: "date" },
    { key: "action", _style: { width: "30%" } },
    { key: "error" },
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
      <CCardHeader>List Title</CCardHeader>
      <CCardBody>
        <CDataTable
          items={err}
          fields={fields}
          columnFilter
          tableFilter
          cleaner
          itemsPerPageSelect
          itemsPerPage={5}
          hover
          sorter
          pagination
          // loading
          // onRowClick={(item,index,col,e) => console.log(item,index,col,e)}
          // onPageChange={(val) => console.log('new page:', val)}
          // onPagesChange={(val) => console.log('new pages:', val)}
          // onPaginationChange={(val) => console.log('new pagination:', val)}
          // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
          // onSorterValueChange={(val) => console.log('new sorter value:', val)}
          // onTableFilterChange={(val) => console.log('new table filter:', val)}
          // onColumnFilterChange={(val) => console.log('new column filter:', val)}
          scopedSlots={
            {
              // status: (item) => (
              //   <td>
              //     <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
              //   </td>
              // ),
              // show_details: (item) => {
              //   return (
              //     <td className="py-2">
              //       <CButton
              //         color="primary"
              //         variant="outline"
              //         shape="square"
              //         size="sm"
              //         onClick={() => {
              //           // toggleErr(item.id);
              //         }}
              //       >
              //         {err.includes(item.id) ? "Hide" : "Show"}
              //       </CButton>
              //     </td>
              //   );
              // },
              // details: (item) => {
              //   return (
              //     <CCollapse show={err.includes(item.id)}>
              //       <CCardBody>
              //         <h4>{item.username}</h4>
              //         <p className="text-muted">User since: {item.registered}</p>
              //         <CButton size="sm" color="info">
              //           User Settings
              //         </CButton>
              //         <CButton size="sm" color="danger" className="ml-1">
              //           Delete
              //         </CButton>
              //       </CCardBody>
              //     </CCollapse>
              //   );
              // },
            }
          }
        />
      </CCardBody>
    </CCard>
  );
};

export default ShowErr;
