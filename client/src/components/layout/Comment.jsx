import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import CommentContainer from '../../styled/Comment/CommentContainer';
import { Link } from 'react-router-dom';
import axios from 'axios'

function Comment({ comm }) {
  const [user, setUser] = useState({})
  useEffect(() => {
    (async function() {
      try {
        const res = await axios.get(`/api/users/${comm.user}`)
        await setUser(res.data)
      } catch(e) {
        console.warn("Error, dude");
      }
    }());
    // eslint-disable-next-line
  }, [])
  return (
    <CommentContainer className="border">
      <div name="information">
        <img
          src={
            user && user.profileImages && user.profileImages.length > 0 ?
            user.profileImages[0].url :
            `https://robohash.org/${comm.user}?set=set4&size=22x22`
          }
          style={{ width: 22, height: 22, borderRadius: "50%" }}
          alt={`${comm.name}'s avatar`}
        />
        <p className="mb-0 ml-3">
          <Link to={`/social/profile/${comm.user}`}>@{comm.name}</Link>
        </p>
      </div>
      <div name="content" className="my-2">
        <p className="m-0">{comm.text}</p>
        <p className="m-0" name="date" style={{ fontSize: "12px" }}>
          On <Moment format="DD.MM.YYYY">{comm.date}</Moment>
        </p>
      </div>
    </CommentContainer>
  )
}

export default Comment;
