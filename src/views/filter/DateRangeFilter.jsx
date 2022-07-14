import { CButton } from "@coreui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";

const DateRangeFilter = ({ onChange, dates, onClose }) => {
  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    onChange(selection);
  };

  const onHandleSubmit = () => {
    onClose();
  };

  return (
    <>
      <DateRangePicker
        onChange={handleOnChange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={dates}
        direction="horizontal"
      />
      <CButton
        onClick={onHandleSubmit}
        style={{
          right: "44rem",
          backgroundColor: "#3d91ff",
          color: "#fff",
          position: "absolute",
          top: "532px",
          zIndex: 1000,
          width: "206px",
        }}
      >
        Close
      </CButton>
      {/* <button onClick={handleOnClose}>Close</button> */}
    </>
  );
};

DateRangeFilter.propTypes = {
  onChange: PropTypes.func,
};

export default DateRangeFilter;
