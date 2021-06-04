import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";
import axios from "axios";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";
import ImageSlider from "../media/ImageSlider";
import DashCenter from "../../styled/DashCenter";
import Post from "../media/Post";
import { connect } from "react-redux";
import { getImages, wipeImages } from "../../actions/image";
import { sendNotif, sendFriendRequest } from "../../actions/notifs";
import { LanguageContext } from "../../contexts/LanguageContext";
import PropTypes from "prop-types";
import { POST_DELIMITER } from "../../utils/nonReduxConstants";
import GuestMoreOptions from "./utilcomps/GuestMoreOptions";

function GuestDashboard(props) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const {
    getImages,
    image: { images },
    match,
    auth,
    sendNotif,
    sendFriendRequest,
    wipeImages,
    history,
  } = props;
  const { language } = useContext(LanguageContext);
  const [isSlider, setIsSlider] = useState([false, 0]);
  const [guest, setGuest] = useState({});
  const [isFriends, setIsFriends] = useState(false);
  const [showAdditionalActions, setShowAdditionalActions] = useState(false);
  const observer = useRef();

  const infiniteScrollPost = useCallback(
    (node) => {
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
          console.log("Visible");
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
        if (
          auth.user.blockedPeople.find(
            (person) => person.user.toString() === match.params.id.toString()
          )
        ) {
          history.push("/");
        }
        const isPending = await auth.user.friendRequestsSent.find(
          (user) => user.user === match.params.id
        );
        const isFriend = await auth.user.friends.find(
          (fr) => fr.user === match.params.id
        );
        if (isPending) setIsFriends("pending");
        else if (isFriend) setIsFriends("friends");
      } catch (e) {
        console.warn("Error, dude", e.message);
      }
    })();
    // eslint-disable-next-line
  }, [auth, match.params.id]);

  const gettingImages = async () => {
    try {
      if (hasMore) {
        const hasMoreValue = await getImages(
          match.params.id,
          page,
          POST_DELIMITER
        );
        await setHasMore(hasMoreValue);
      }
    } catch (e) {
      console.warn(e.message);
    }
  };

  const getGuest = async (id) => {
    try {
      const res = await axios.get(`/api/users/${id}`);
      await setGuest(res.data);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    if (guest) {
      gettingImages();
    }
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (match.params.id === auth.user._id) {
      props.history.push("/");
    } else {
      wipeImages();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getGuest(match.params.id);
    // eslint-disable-next-line
  }, []);

  const addFriend = (e) => {
    sendNotif({
      userId: match.params.id,
      type: "friendrequest",
      language,
      username: auth.user.username,
      name: `${auth.user.firstName} ${auth.user.lastName}`,
      url: `/social/profile/${auth.user._id}`,
    });
    sendFriendRequest({ senderId: auth.user._id, accepterId: match.params.id });
  };

  return Object.keys(guest).length > 0 ? (
    <div className="container pt-5" style={{ pointerEvents: "all" }}>
      <div className="text-center">
        <img
          className="rounded-circle"
          src={`https://robohash.org/${guest._id}?set=set4&size=350x350`}
          alt={`${guest.firstName}'s avatar`}
        />
      </div>
      <div className="text-center mt-3">
        <h3>
          {guest.firstName} {guest.lastName}
        </h3>
        <h4 className="text-muted">(@{guest.username})</h4>
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-secondary"
          onClick={() => setShowAdditionalActions(true)}
        >
          {isFriends === "pending" ? (
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : isFriends === "friends" ? (
            <i className="fas fa-check-double" />
          ) : (
            <i className="fas fa-user-plus" />
          )}
        </button>
      </div>
      <div className="p-5">
        {guest &&
        guest.hidden &&
        !guest.hidden.includes("zip") &&
        !guest.hidden.includes("country") &&
        !guest.hidden.includes("city") ? (
          <h4 className="my-3">
            <i className="fas fa-map-marker pr-3" />
            From: {guest.hidden.includes("zip") ? "" : `${guest.zip},`}
            {guest.hidden.includes("city") ? "" : `${guest.city},`}
            {guest.hidden.includes("country") ? "" : guest.country}
          </h4>
        ) : null}
        {guest.hidden && guest.hidden.includes("email") ? null : (
          <h4 className="my-3">
            <i className="fas fa-envelope pr-3"></i>E-mail: {guest.email}
          </h4>
        )}
        {guest.hidden >= 0 && guest.hidden.includes("sex") ? null : (
          <h4 className="my-3">
            <i
              className={`pr-3 fas fa-${
                guest.sex === "m"
                  ? "mars"
                  : guest.sex === "f"
                  ? "venus"
                  : "genderless"
              }`}
            />
            Sex:{" "}
            {guest.sex === "m"
              ? "Male"
              : guest.sex === "f"
              ? "Female"
              : "<Redacted>"}
          </h4>
        )}
        {guest.hidden >= 0 && guest.hidden.includes("dob") ? null : (
          <h4 className="my-3">
            <i className="fas fa-birthday-cake pr-3"></i>
            Date of birth: <Moment format="DD.MM.YYYY">{guest.dob}</Moment>
          </h4>
        )}
        {guest.hidden >= 0 && guest.hidden.includes("bio") ? null : (
          <h4 className="my-3">
            <i className="fas fa-info-circle pr-3"></i>
            Bio: {guest.bio}
          </h4>
        )}
      </div>
      <DashCenter
        display="block"
        maxw="1300px"
        style={{ pointerEvents: "all" }}
      >
        {images &&
          images.length > 0 &&
          images.map((image, i) => (
            <Post
              image={image}
              setIsSlider={setIsSlider}
              key={image._id}
              i={i}
              match={match}
            />
          ))}
        <div ref={infiniteScrollPost} />
      </DashCenter>
      {images && images.length > 0 && isSlider[0] && (
        <ImageSlider
          images={images}
          i={isSlider[1]}
          setIsSlider={setIsSlider}
        />
      )}
      <GuestMoreOptions
        title="Additional actions"
        show={showAdditionalActions}
        onClose={() => setShowAdditionalActions(false)}
        addFriend={addFriend}
        isFriends={isFriends}
        blockedId={match.params.id}
      />
    </div>
  ) : (
    <Spinner />
  );
}

GuestDashboard.propTypes = {
  getImages: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  sendNotif: PropTypes.func.isRequired,
  sendFriendRequest: PropTypes.func.isRequired,
  wipeImages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  image: state.image,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getImages,
  sendNotif,
  sendFriendRequest,
  wipeImages,
})(GuestDashboard);
