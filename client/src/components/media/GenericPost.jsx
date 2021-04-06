import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ImagePostContainer from "../../styled/ImagePost/ImagePostContainer";
import LikesAndComments from "./LikesAndComments";
import Comment from "../layout/Comment";
import axios from "axios";
import { Link } from "react-router-dom";

function GenericPost({ post, i, auth: { user }, match, setIsGenericSlider }) {
  const [owner, setOwner] = useState(null);
  useEffect(() => {
    let mounted = true;
    (async function () {
      try {
        const res = await axios.get(`/api/users/${post.user}`);
        if (mounted) {
          await setOwner(res.data);
        }
      } catch (e) {
        console.warn("Error, dude");
      }
    })();
    return () => (mounted = false);
    // eslint-disable-next-line
  }, []);
  return (
    owner && (
      <article>
        <div className="my-3 d-flex">
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
        <ImagePostContainer className="p-2 my-2 d-flex flex-column">
          {post.isVideo ? (
            <video
              src={post.url}
              onClick={() => setIsGenericSlider([true, i])}
            />
          ) : (
            <img
              src={post.url}
              style={{ cursor: "pointer" }}
              height="auto"
              width="100%"
              alt={`Media uploaded by user ${user.firstName}`}
              onClick={() => setIsGenericSlider([true, i])}
            />
          )}
        </ImagePostContainer>
        <LikesAndComments i={i} match={match} width="100%" />
        <div className="p-2 d-flex flex-column" style={{ margin: "auto" }}>
          {post.comments.map((comm) => (
            <Comment comm={comm} key={comm._id} />
          ))}
        </div>
      </article>
    )
  );
}

GenericPost.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(GenericPost);
