import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import LeftSideNavigation from "../../../styled/Forum/ForumLeftSideNavigation";
import { connect } from "react-redux";
import useWindowSize from "../../../hooks/useWindowSize";

function ForumMenu({ forum: { posts }, auth: { user } }) {
  const { isDarkTheme } = useContext(ThemeContext);
  // eslint-disable-next-line
  const [width, _] = useWindowSize();
  const [favourite, setFavourite] = useState([]);
  useEffect(() => {
    (function () {
      let postsArr = [];
      try {
        for (const post of posts) {
          for (const item of post.savedBy) {
            if (item.user === user._id)
              postsArr.push({ _id: post._id, title: post.title });
          }
        }
        setFavourite(postsArr);
      } catch (e) {
        console.warn(e.message);
      }
    })();
    // eslint-disable-next-line
  }, [posts]);

  return (
    <LeftSideNavigation isDarkTheme={isDarkTheme}>
      <ul>
        <li>
          <Link to="/forum/forum-add-post">
            <i className="fas fa-plus" /> {width > 700 && "New post"}
          </Link>
        </li>
        {favourite &&
          favourite.length > 0 &&
          favourite.map((fav, i) => (
            <li title={width <= 700 ? fav.title : ""} key={fav._id}>
              <Link to={`/forum/forum-post/${fav._id}`}>
                {width > 700 ? fav.title : `#${i + 1}`}
              </Link>
            </li>
          ))}
      </ul>
    </LeftSideNavigation>
  );
}

const mapStateToProps = (state) => ({
  forum: state.forum,
  auth: state.auth,
});

export default connect(mapStateToProps, null)(ForumMenu);
