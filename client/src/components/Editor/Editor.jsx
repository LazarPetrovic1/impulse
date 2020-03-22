import React, { useState } from 'react'
import SimpleMDEReact from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

let counter = 1

function Editor () {
  const [textValue, setTextValue] = useState('')
  const extraKeys = () => {
    return {
      Up: function (cm) {
        cm.replaceSelection(' surprise. ')
      },
      Down: function (cm) {
        cm.replaceSelection(' surprise again! ')
      }
    }
  }

  const handleChange = value => {
    setTextValue(value)
  }

  return (
    <div className='container container-narrow'>
      <SimpleMDEReact
        value={textValue}
        onChange={handleChange}
      />
    </div>
  )
}

export default Editor
