import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditDatePicker(props) {
  const { setter, value } = props;
  const dob = new Date(value);

  return (
    <DatePicker
      name="dob"
      id="dob"
      showYearDropdown
      yearDropdownItemNumber={150}
      dateFormat="dd.MM.yyyy."
      scrollableYearDropdown
      className="form-control"
      value={dob}
      selected={dob}
      onChange={setter}
    />
  );
}

export default EditDatePicker;
