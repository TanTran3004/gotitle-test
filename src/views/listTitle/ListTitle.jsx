import React, { useState, useEffect } from "react";
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
import TitleService from "src/services/title.service";
import Popup from "../Popups/Popup";
import AddTitle from "../Popups/add-title/AddTitle";

const ListTitle = () => {
  const [titles, setTitles] = useState([]);
  const [addTitle, setAddTitle] = useState(false);
  // const [items, setItems] = useState(usersData)
  useEffect(() => {
    getDataTitle();
  }, []);
  const getDataTitle = () => {
    TitleService.getAllTitle().then((res) => {
      if (res.status === 200) {
        setTitles(res.data.data);
      } else {
        console.log("Get list title failed!");
      }
    });
  };
  const handleCreatePopup = (e) => {
    setAddTitle(true);
  };
  const toggleDetails = (index) => {
    const position = titles.indexOf(index);
    let newDetails = titles.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...titles, index];
    }
    setTitles(newDetails);
  };

  const fields = [
    { key: "id" },
    { key: "condo_name", label: "Title" },
    { key: "price" },

    { key: "source" },
    // { key: "user" },
    { key: "date_search" },
    { key: "legal_address" },

    // {
    //   key: "action",
    //   label: "",
    //   filter: false,
    // },
    // "registered",
    // {
    //   key: "show_details",
    //   label: "",
    //   _style: { width: "1%" },
    //   filter: false,
    // },
  ];
  const csvContent = titles
    .map((item) => Object.values(item).join(","))
    .join("\n");

  const csvCode =
    "data:text/csv;charset=utf-8,SEP=,%0A" + encodeURIComponent(csvContent);
  const getBadge = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };
  return (
    <CCard>
      <CCardHeader>List Title</CCardHeader>
      <CCardBody>
        <CButton
          color="primary"
          className="mb-2"
          href={csvCode}
          download="title-list.csv"
          target="_blank"
        >
          Download current items (.csv)
        </CButton>
        <CButton
          onClick={handleCreatePopup}
          color="success"
          className="mb-2  ml-1"
        >
          Add Title
        </CButton>
        <CDataTable
          items={titles}
          fields={fields}
          columnFilter
          tableFilter
          cleaner
          itemsPerPageSelect
          itemsPerPage={10}
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
          // scopedSlots={{
          //   action: (item) => {
          //     return (
          //       <td className="py-2">
          //         <CButton size="sm" color="info">
          //           Edit
          //         </CButton>

          //         <CButton size="sm" color="danger" className="ml-1">
          //           Delete
          //         </CButton>
          //       </td>
          //     );
          //   },
          // }}
        />
      </CCardBody>
      {addTitle && (
        <Popup
          widthModal={"60%"}
          heightModal={"fitContent"}
          setTrigger={setAddTitle}
        >
          <AddTitle setTrigger={setAddTitle} />
        </Popup>
      )}
    </CCard>
  );
};

export default ListTitle;
