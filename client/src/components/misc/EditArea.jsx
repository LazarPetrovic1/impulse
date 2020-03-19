import React from 'react';

function EditField(props) {
  const { value, setter } = props
  return (
    <textarea
      className='form-control'
      value={value}
      onChange={(e) => setter(e.target.value)}
    />
  );
}

export default EditField;
