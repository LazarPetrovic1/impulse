import React, { useState } from 'react'
import ForumSearchBarCloseButton from '../../../styled/Forum/ForumSearchBarCloseButton';

function ForumSearchBar ({ search, reset }) {
  const [val, setVal] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    search(val)
  }

  return (
    <form
      onSubmit={onSubmit}
      className='form-inline my-2 my-lg-0 justify-content-center'
    >
      <span className='position-relative'>
        <input
          type='text'
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder='Search'
          className='form-control mr-sm-2'
          aria-label='Search'
      />
        {
      val && (
        <ForumSearchBarCloseButton onClick={() => reset(setVal)} />
      )
    }
      </span>
      <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>
        <i className='fas fa-search' />&nbsp;&nbsp;
        Search
      </button>
    </form>
  )
}

export default ForumSearchBar