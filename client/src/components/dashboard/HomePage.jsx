import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { getFriendsMediaInBulk } from "../../utils/friends";
import { POST_DELIMITER } from "../../utils/nonReduxConstants";
import GenericSlider from "../media/GenericSlider";
import GenericPost from "../media/GenericPost";
import DashCenter from "../../styled/DashCenter";
import { setBulkMedia, wipeAllMedia } from "../../actions/allmedia.js";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import HomePageAdditionalControls from "./utilcomps/HomePageAdditionalControls";
import AddGroup from "./utilcomps/AddGroup";

function HomePage({
  auth: { user, loading, isAuthenticated },
  setBulkMedia,
  allmedia,
  wipeAllMedia,
}) {
  const [friends, setFriends] = useState(null);
  useEffect(() => () => setFriends(user.friends), /*eslint-disable-line*/ []);
  const [friendsMedia, setFriendsMedia] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isGenericSlider, setIsGenericSlider] = useState([false, 0]);
  const [show, setShow] = useState(false);
  const observer = useRef();
  const infiniteScrollPost = useCallback(
    (node) => {
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
      // eslint-disable-next-line
    },
    [hasMore]
  );

  useEffect(() => {
    (async function () {
      try {
        await gettingAllUserMedia();
      } catch (e) {
        console.warn("Error, dude!");
      }
    })();
    // eslint-disable-next-line
  }, [page, friends]);

  useEffect(() => {
    if (user && user.friends) {
      setFriends(user.friends);
    }
  }, [user]);

  useEffect(() => {
    wipeAllMedia();
    // eslint-disable-next-line
  }, []);

  // ADD TO LikesAndComments
  const gettingAllUserMedia = async () => {
    try {
      if (Array.isArray(friends) && friends.length > 0 && hasMore) {
        const res = await getFriendsMediaInBulk(friends, page, POST_DELIMITER);
        await setHasMore(res.next.hasMore);
        await setFriendsMedia([...friendsMedia, ...res.results]);
        await setBulkMedia([...res.results]);
      }
    } catch (e) {
      console.warn(e.message);
    }
  };

  return !loading && friends && isAuthenticated ? (
    <div style={{ pointerEvents: "all" }}>
      <DashCenter
        justification="center"
        maxw="1300px"
        className="mt-5 mb-3"
        flexDir="column"
        style={{ pointerEvents: "all" }}
      >
        <div className="my-3 d-flex" style={{ alignSelf: "flex-start" }}>
          <div>
            <img
              src={
                user && user.profileImages && user.profileImages.length > 0
                  ? user.profileImages[user.profileImages.length - 1].url
                  : `https://robohash.org/${user._id}?set=set4&size=22x22`
              }
              width={32}
              height={32}
              className="rounded-circle"
              alt={`${user.username}'s avatar`}
            />
          </div>
          <h2 className="ml-4">
            <Link className="text-primary" to={`/dashboard`}>
              {user.firstName} {user.lastName}
            </Link>
          </h2>
        </div>
        <HomePageAdditionalControls setShow={setShow} />
        <AddGroup
          title="Add a Group!"
          show={show}
          setShow={setShow}
          onClose={() => setShow(false)}
        />
      </DashCenter>
      <div className="row">
        <div className="col-md-3 col-sm-5 col-xs-7">
          <SideMenu />
        </div>
      </div>
      {allmedia.media.length > 0 &&
        friendsMedia &&
        friendsMedia.length > 0 &&
        friendsMedia.length === allmedia.media.length && (
          <DashCenter
            display="block"
            maxw="1300px"
            style={{ pointerEvents: "all" }}
          >
            {friendsMedia &&
              friendsMedia.map((post, i) => (
                <GenericPost
                  post={post}
                  i={i}
                  setIsGenericSlider={setIsGenericSlider}
                  key={post._id}
                />
              ))}
            <div ref={infiniteScrollPost} />
          </DashCenter>
        )}
      {friendsMedia && friendsMedia.length > 0 && isGenericSlider[0] && (
        <GenericSlider
          media={friendsMedia}
          i={isGenericSlider[1]}
          setIsGenericSlider={setIsGenericSlider}
        />
      )}
    </div>
  ) : (
    <Spinner />
  );
}

HomePage.propTypes = {
  auth: PropTypes.object.isRequired,
  setBulkMedia: PropTypes.func.isRequired,
  wipeAllMedia: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  allmedia: state.allmedia,
});

export default connect(mapStateToProps, {
  setBulkMedia,
  wipeAllMedia,
})(HomePage);
