import React, { useState, Fragment } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
// import DeleteGroupCheck from "./DeleteGroupCheck";
// import LeaveGroupCheck from "./LeaveGroupCheck";
import PropTypes from "prop-types";
// import DeleteIcon from "../../utils/icons/DeleteIcon";
import { connect } from "react-redux";
import GenericIcon from "../../utils/icons/GenericIcon";
import arrowData from "../../../animations/generic/right_arrow.json";

function GroupItem({ group, auth: { user } }) {
  const [isHover, setIsHover] = useState(false);
  // const [showDelete, setShowDelete] = useState(false);
  // const [showLeaveGroup, setShowLeaveGroup] = useState(false);
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
    <Fragment>
      <article
        style={{ maxWidth: "200px" }}
        className="border mt-4 position-relative"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isHover && (
          <Fragment>
            <Link
              to={`/groups/${_id}`}
              className="btn btn-primary position-absolute p-0 m-0"
              style={{ top: "-1px", right: "-1px" }}
            >
              <GenericIcon width={40} height={40} data={arrowData} />
            </Link>
            {/*group.admin === user._id ? (
              <button
                className="btn btn-danger position-absolute p-0 m-0"
                style={{ top: "-1px", right: "-1px" }}
                onClick={() => setShowDelete(true)}
              >
                <DeleteIcon width={40} height={40} />
              </button>
            ) : (
              <button
                className="btn btn-danger position-absolute p-0 m-0"
                style={{ top: "-1px", right: "-1px" }}
                onClick={() => setShowLeaveGroup(true)}
              >
                <DeleteIcon width={40} height={40} />
              </button>
            )*/}
          </Fragment>
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
      </article>
      {/*<DeleteGroupCheck
        show={showDelete}
        onClose={() => setShowDelete(false)}
        groupId={group._id}
        groupname={group.name}
      />
      <LeaveGroupCheck
        show={showLeaveGroup}
        onClose={() => setShowLeaveGroup(false)}
        groupId={group._id}
        groupname={group.name}
      />*/}
    </Fragment>
  );
}

GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(GroupItem);
