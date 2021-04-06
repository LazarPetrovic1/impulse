// _id(pin):"6065b9350fb7eb236df0bdc2"
// user(pin):"60118e7bc52e5c0399baec97"
// body(pin):"Hello!"
// date(pin):"2021-04-01T12:14:45.605Z"
// comments(pin):
// endorsements(pin):
// judgements(pin):
// impulsions(pin):
// __v(pin):0

import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DashCenter from "../../styled/DashCenter";

function StatusPost({ status }) {
  const [owner, setOwner] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(`/api/users/${status.user}`);
        await setOwner(res.data);
      } catch (e) {
        console.warn("Error, dude");
      }
    })();
    // eslint-disable-next-line
  }, []);
  return (
    owner && (
      <DashCenter
        display="block"
        maxw="1300px"
        style={{ pointerEvents: "all" }}
        className="border rounded my-3"
      >
        <div className="mb-3 d-flex pl-4 pt-4">
          <div>
            <img
              src={
                owner && owner.profileImages && owner.profileImages.length > 0
                  ? owner.profileImages[owner.profileImages.length - 1].url
                  : `https://robohash.org/${owner._id}?set=set4&size=22x22`
              }
              width={32}
              height={32}
              alt={`${owner.username}'s avatar`}
              className="rounded-circle"
            />
          </div>
          <h2 className="ml-4">
            <Link className="text-primary" to={`/social/profile/${owner._id}`}>
              {owner.firstName} {owner.lastName}
            </Link>
          </h2>
        </div>
        <div className="display-4 px-4">{status.body}</div>
        <div className="d-flex justify-content-end pr-4 pb-4">
          On &nbsp;<Moment format="DD. MM. YYYY.">{status.date}</Moment>
        </div>
      </DashCenter>
    )
  );
}

export default StatusPost;
