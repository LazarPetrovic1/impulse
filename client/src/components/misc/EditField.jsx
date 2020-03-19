import React from 'react';

function EditField(props) {
  const { value, setter, type } = props
  return (
    <input
      type={type}
      onChange={(e) => setter(e.target.value)}
      value={value}
      className="d-block form-control"
      required
    />
  );
}

export default EditField;
