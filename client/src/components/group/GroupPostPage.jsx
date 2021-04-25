import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import GroupPost from "./GroupPost";

function GroupPostPage({ match, group: { groups } }) {
  const [post, setPost] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        const realGroup = await groups.find((gr) => gr._id === match.params.id);
        const realPost = await realGroup.posts.find(
          (ps) => ps._id === match.params.post_id
        );
        await setPost(realPost);
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, []);
  return post ? (
    <GroupPost groupid={match.params.id} post={post} />
  ) : (
    <Spinner />
  );
}

const mapStateToProps = (state) => ({
  group: state.group,
});

export default connect(mapStateToProps, null)(GroupPostPage);
