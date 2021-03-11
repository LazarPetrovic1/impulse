import React, { useState } from "react"
import SimpleMDEReact from "react-simplemde-editor"
import 'easymde/dist/easymde.min.css';
import placeholder from '../../utils/markdown';

function Autosaving(props) {
  const { options, id, onChange, ...rest } = props
  const [value] = useState(props.value)
  return (
    <SimpleMDEReact
      {...rest}
      onChange={onChange}
      id={id}
      style={{ background: "#ddd" }}
      value={value}
      options={{
        placeholder,
        autofocus: true,
        minHeight: '550px',
        autosave: {
          enabled: true,
          uniqueId: id,
          delay: 1000,
        },
        ...options
      }}
    />
  )
}

export default Autosaving
