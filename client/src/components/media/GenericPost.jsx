import React, { useState, useEffect, /*useContext,*/ Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import ImagePostContainer from "../../styled/ImagePost/ImagePostContainer";
// import LikesAndComments from "./LikesAndComments";
// import Comment from "../layout/Comment";
import axios from "axios";
// import { Link } from "react-router-dom";
// import { ColourContext } from "../../contexts/ColourContext";
import StatusPost from "./StatusPost";
import ImagePost from "./Post";
import Video from "../VideoRoutes/Video";

function GenericPost({ post, i, auth: { user }, match, setIsGenericSlider }) {
  // eslint-disable-next-line
  const [owner, setOwner] = useState(null);
  // const { background } = useContext(ColourContext);
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
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line
  }, []);
  return (
    post &&
    user && (
      <Fragment>
        {post.type && post.type === "textual" ? (
          <StatusPost status={post} />
        ) : !post.isVideo && post.url ? (
          <ImagePost
            image={post}
            setIsSlider={setIsGenericSlider}
            i={i}
            match={match}
            backupImage={post}
          />
        ) : post.isVideo && post.url ? (
          <Video match={match} video={post} />
        ) : null}
      </Fragment>
    )
  );
}

GenericPost.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// return (
//   owner &&
//   post && (
//     <article style={{ background }}>
//       <div className="my-3 d-flex">
//         <div>
//           <img
//             src={
//               owner && owner.profileImages && owner.profileImages.length > 0
//                 ? owner.profileImages[owner.profileImages.length - 1].url
//                 : `https://robohash.org/${owner._id}?set=set4&size=22x22`
//             }
//             width={32}
//             height={32}
//             alt={`${owner.username}'s avatar`}
//             className="rounded-circle"
//           />
//         </div>
//         <h2 className="ml-4">
//           <Link className="text-primary" to={`/social/profile/${owner._id}`}>
//             {owner.firstName} {owner.lastName}
//           </Link>
//         </h2>
//       </div>
//       <ImagePostContainer className="p-2 my-2 d-flex flex-column">
//         {post.isVideo ? (
//           <video
//             src={post.url}
//             onClick={() => setIsGenericSlider([true, i])}
//           />
//         ) : (
//           <img
//             src={post.url}
//             style={{ cursor: "pointer" }}
//             height="auto"
//             width="100%"
//             alt={`Media uploaded by user ${user.firstName}`}
//             onClick={() => setIsGenericSlider([true, i])}
//           />
//         )}
//       </ImagePostContainer>
//       <LikesAndComments i={i} match={match} width="100%" />
//       <div className="p-2 d-flex flex-column" style={{ margin: "auto" }}>
//         {post.comments.length > 0 && post.comments.map((comm) => (
//           <Comment comm={comm} key={comm._id} imgId={post._id} />
//         ))}
//       </div>
//     </article>
//   )
// );

export default connect(mapStateToProps, null)(GenericPost);
