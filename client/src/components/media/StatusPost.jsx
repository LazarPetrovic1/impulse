// _id(pin):"6065b9350fb7eb236df0bdc2"
// user(pin):"60118e7bc52e5c0399baec97"
// body(pin):"Hello!"
// date(pin):"2021-04-01T12:14:45.605Z"
// comments(pin):
// endorsements(pin):
// judgements(pin):
// impulsions(pin):
// __v(pin):0

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DashCenter from "../../styled/DashCenter";
import StatusModal from "./StatusModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendNotif } from "../../actions/notifs";
import {
  like,
  dislike,
  impulsify,
  addCommentToStatus,
} from "../../actions/status";
import { LanguageContext } from "../../contexts/LanguageContext";
import ShortLogo from "../../styled/Logo/ShortLogo";
import StatusPostComment from "./utils/StatusPostComment";

function StatusPost({
  status,
  auth: { user },
  sendNotif,
  like,
  dislike,
  impulsify,
  addCommentToStatus,
}) {
  const [owner, setOwner] = useState(null);
  const [liked, setLiked] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const [comment, setComment] = useState("");
  const [more, setMore] = useState(false);
  const { language } = useContext(LanguageContext);
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
  useEffect(() => {
    if (status) {
      if (status.judgements.filter((jud) => jud.user === user._id).length > 0) {
        setLiked("dislike");
      } else if (
        status.endorsements.filter((end) => end.user === user._id).length > 0
      ) {
        setLiked("like");
      } else if (
        status.impulsions.filter((imp) => imp.user === user._id).length > 0
      ) {
        setLiked("impulse");
      }
    }
    // eslint-disable-next-line
  }, [status]);
  const setLikability = (val) => {
    const id = status._id;
    const likerId = user._id;
    console.log({ id, likerId });
    const ownedById = status.user;

    if (liked === val) setLiked(null);
    else setLiked(val);
    switch (val) {
      case "like":
        like(id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: status.user,
            type: "like",
            language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/textpost/${status._id}`,
          });
        }
        break;
      case "dislike":
        dislike(id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: status.user,
            type: "dislike",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/textpost/${status._id}`,
          });
        }
        break;
      case "impulse":
        impulsify(id, likerId);
        if (ownedById !== likerId) {
          sendNotif({
            userId: status.user,
            type: "impulse",
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`,
            url: `/textpost/${status._id}`,
          });
        }
        break;
      default:
        return;
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await addCommentToStatus(comment, status._id);
    await setComment("");
  };
  return (
    owner && (
      <div className="pt-3 pb-5">
        <DashCenter
          display="block"
          maxw="1300px"
          style={{ pointerEvents: "all" }}
          className="border rounded my-3"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="mb-3 d-flex pl-4 pt-4 position-relative">
            {isHover && (
              <button
                className="position-absolute btn btn-primary mt-4 mr-4"
                style={{ top: 0, right: 0 }}
                onClick={() => setMore(true)}
              >
                <i className="fas fa-ellipsis-h" />
              </button>
            )}
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
              <Link
                className="text-primary"
                to={`/social/profile/${owner._id}`}
              >
                {owner.firstName} {owner.lastName}
              </Link>
            </h2>
          </div>
          <div className="display-4 px-4">{status.body}</div>
          <div className="d-flex justify-content-end pr-4 pb-4">
            On &nbsp;<Moment format="DD. MM. YYYY.">{status.date}</Moment>
          </div>
        </DashCenter>
        <DashCenter
          display="block"
          maxw="1300px"
          style={{ pointerEvents: "all" }}
        >
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div className="position-relative">
                <i
                  onClick={() => setLikability("like")}
                  className={`fas fa-plus fa-2x p-3 pointer ${
                    liked === "like" && "text-success"
                  }`}
                />
                <span style={{ fontSize: "2.5rem" }} className="text-success">
                  {status.endorsements && status.endorsements.length}
                </span>
              </div>
              <div className="position-relative">
                <i
                  onClick={() => setLikability("dislike")}
                  className={`fas fa-minus fa-2x p-3 pointer ${
                    liked === "dislike" && "text-danger"
                  }`}
                />
                <span style={{ fontSize: "2.5rem" }} className="text-danger">
                  {status.judgements && status.judgements.length}
                </span>
              </div>
            </div>
            <div className="position-relative">
              <ShortLogo
                className={`px-3 pb-3 pointer`}
                onClick={() => setLikability("impulse")}
                liked={liked}
              />
              <span style={{ fontSize: "2.5rem" }} className="text-primary">
                {status.impulsions && status.impulsions.length}
              </span>
            </div>
          </div>
        </DashCenter>
        <DashCenter
          display="block"
          maxw="1300px"
          className="m-auto"
          style={{ pointerEvents: "all" }}
        >
          <form onSubmit={onSubmit} className="d-flex mt-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="form-control"
              placeholder="Type a message"
            />
            <button className="btn btn-secondary" type="submit">
              <i className="fas fa-paper-plane" />
            </button>
          </form>
        </DashCenter>
        <DashCenter
          display="block"
          maxw="1300px"
          className="m-auto"
          style={{ pointerEvents: "all" }}
        >
          {status &&
            status.comments &&
            status.comments.length > 0 &&
            status.comments.map((comm) => (
              <StatusPostComment
                key={comm._id}
                comment={comm}
                statusId={status._id}
              />
            ))}
        </DashCenter>
        <StatusModal
          show={more}
          onClose={() => setMore(false)}
          statusitem={status}
        />
      </div>
    )
  );
}

StatusPost.propTypes = {
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  impulsify: PropTypes.func.isRequired,
  sendNotif: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addCommentToStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  sendNotif,
  like,
  dislike,
  impulsify,
  addCommentToStatus,
})(StatusPost);
