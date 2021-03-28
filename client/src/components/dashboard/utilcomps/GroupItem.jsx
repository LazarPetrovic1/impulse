import React, { useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DeleteGroupCheck from "./DeleteGroupCheck";
import PropTypes from "prop-types";

function GroupItem({ group }) {
  const [isHover, setIsHover] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const {
    groupImage,
    name,
    about,
    people,
    requiresAdmin,
    isSeen,
    date,
    _id,
  } = group;
  return (
    <article
      style={{ maxWidth: "200px" }}
      className="border mt-4 position-relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && (
        <button
          className="btn btn-danger position-absolute"
          style={{ top: 0, right: 0 }}
          onClick={() => setShowDelete(true)}
        >
          <i className="fas fa-trash-alt" />
        </button>
      )}
      <img
        src={groupImage}
        alt={`${name} profile`}
        width="200px"
        height="160px"
      />
      <div className="p-2">
        <h2 className="text-primary text-center">
          <Link to={`/groups/${_id}`}>{name}</Link>
        </h2>
        <p className="m-0">{about}</p>
        <p className="m-0">{people.length} people</p>
        <p className="m-0">{requiresAdmin ? "Authoritarian" : "Relaxed"}</p>
        <p className="m-0">{isSeen ? "Public" : "Private"}</p>
        <p className="m-0">
          Created on <Moment format="DD. MM. YYYY.">{date}</Moment>
        </p>
      </div>
      <DeleteGroupCheck
        show={showDelete}
        onClose={() => setShowDelete(false)}
        groupId={group._id}
        groupname={group.name}
      />
    </article>
  );
}

GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupItem;
