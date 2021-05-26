import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ImagePostContainer from "../../styled/ImagePost/ImagePostContainer";
// import LikesAndComments from "../layout/LikesAndComments";
import NewLikesAndComments from "./NewLikesAndCommentsImage";
import Comment from "../layout/Comment";
import axios from "axios";
import { Link } from "react-router-dom";

function Post({ image, setIsSlider, auth, i, match }) {
  const { user } = auth;
  const [owner, setOwner] = useState(null);
  const [imgState, setImgState] = useState(image)
  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(`/api/users/${image.user}`);
        await setOwner(res.data);
      } catch (e) {
        console.warn("Error, dude");
      }
    })();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (JSON.stringify(imgState) !== JSON.stringify(image)) {
      setImgState(image)
    }
    // eslint-disable-next-line
  }, [image])
  return (
    imgState && owner && (
      <article style={{ width: "100%" }}>
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
        <div>
          <ImagePostContainer className="p-2 my-2 d-flex flex-column">
            <img
              src={imgState.url}
              style={{ cursor: "pointer" }}
              height="auto"
              width="100%"
              alt={`Media uploaded by user ${user.firstName}`}
              onClick={() => setIsSlider([true, i])}
            />
          </ImagePostContainer>
          <NewLikesAndComments image={image} width="100%" />
          {/*<LikesAndComments i={i} match={match} width="100%" />*/}
        </div>
        <div className="p-2 d-flex flex-column" style={{ margin: "auto" }}>
          {imgState.comments.map((comm) => (
            <Comment comm={comm} key={comm._id} imgId={image._id} />
          ))}
        </div>
      </article>
    )
  );
}

Post.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Post);
