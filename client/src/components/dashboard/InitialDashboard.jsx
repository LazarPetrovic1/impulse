import React, { useState, useEffect, useRef, useCallback } from "react";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SideMenu from "./SideMenu";
import DashCenter from "../../styled/DashCenter";
import ImageSlider from "../media/ImageSlider";
import GenericSlider from "../media/GenericSlider";
import { getImages, createImage, wipeImages } from "../../actions/image";
import { getPersonsStatuses } from "../../actions/status";
import { uploadProfileImage } from "../../actions/auth";
import AddMediaButton from "../../styled/AddMediaButton";
import AddMediaModal from "../layout/AddMediaModal";
import Post from "../media/Post";
import GenericPost from "../media/GenericPost";
import { POST_DELIMITER } from "../../utils/nonReduxConstants";
import ProfileImage from "./utilcomps/ProfileImage";
import Selection from "./utilcomps/Selection";
import { getUsersVideo } from "../../actions/video.js";
import VideoList from "../VideoRoutes/VideoMisc/VideoList";
import VideoGrid from "../VideoRoutes/VideoMisc/VideoGrid";
import { getAllUsersMedia, wipeAllMedia } from "../../actions/allmedia.js";
import StatusPost from "../media/StatusPost";
import addbutton from "../../animations/addbutton.json";
import GenericIcon from "../utils/icons/GenericIcon";

function InitialDashboard(props) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedToShow, setSelectedToShow] = useState("all");
  const {
    auth: { user, loading },
    history,
    getImages,
    // eslint-disable-next-line
    createImage,
    // eslint-disable-next-line
    uploadProfileImage,
    wipeImages,
    image: { images },
    getUsersVideo,
    video: { videos },
    getAllUsersMedia,
    wipeAllMedia,
    allmedia,
    getPersonsStatuses,
    status,
  } = props;
  const { media } = allmedia;

  useEffect(() => {
    wipeImages();
    wipeAllMedia();
    // eslint-disable-next-line
  }, []);

  const gettingImages = async () => {
    try {
      if (hasMore) {
        const hasMoreValue = await getImages("mine", page, POST_DELIMITER);
        await setHasMore(hasMoreValue);
      }
    } catch (e) {
      console.warn(e.message);
    }
  };

  const gettingAllUserMedia = async () => {
    try {
      if (hasMore) {
        const hasMoreValue = await getAllUsersMedia(
          "mine",
          page,
          POST_DELIMITER
        );
        await setHasMore(hasMoreValue);
      }
    } catch (e) {
      console.warn(e.message);
    }
  };

  useEffect(() => {
    if (selectedToShow === "images") {
      gettingImages();
    } else if (selectedToShow === "textual") {
      getPersonsStatuses("mine");
    } else if (selectedToShow === "videos") {
      getUsersVideo("mine");
    } else {
      gettingAllUserMedia();
    }
    // else if (selectedToShow === "all") {
    //   gettingAllUserMedia();
    // }
    // eslint-disable-next-line
  }, [page, selectedToShow]);

  const [isGrid, setIsGrid] = useState(true);
  const [selectedFile, setSelectedFile] = useState();
  // eslint-disable-next-line
  const [isSelected, setIsSelected] = useState(false);
  const [previewSource, setPreviewSource] = useState("");
  const [isSlider, setIsSlider] = useState([false, 0]);
  const [isGenericSlider, setIsGenericSlider] = useState([false, 0]);
  const [addFilesModal, setAddFilesModal] = useState(false);
  const [content, setContent] = useState("");
  const [fn, setFn] = useState("");
  const [profileUploadButton, setProfileUploadButton] = useState(false);
  const [profileSlider, setProfileSlider] = useState([false, 0]);
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

  const onImageUpload = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsSelected(true);
  };

  const onSubmit = (e, fn) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => uploadImage(reader.result, fn);
    reader.onerror = () => console.error("AHHHHHHHH!!");
    setAddFilesModal(false);
  };

  const uploadImage = async (base64EncodedImage, fn) => {
    try {
      await fn(base64EncodedImage, content);
      await setSelectedFile("");
      await setPreviewSource("");
      await history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewSource(reader.result);
  };

  return !loading && user ? (
    <div>
      <ProfileImage
        setProfileUploadButton={setProfileUploadButton}
        setProfileSlider={setProfileSlider}
        setFn={setFn}
        profileUploadButton={profileUploadButton}
        setAddFilesModal={setAddFilesModal}
      />
      <div className="row">
        <div className="col-md-3 col-sm-5 col-xs-7">
          <SideMenu />
        </div>
      </div>
      <DashCenter
        justification="flex-end"
        maxw="1300px"
        style={{ pointerEvents: "all" }}
      >
        <AddMediaButton
          className="btn btn-secondary ml-2"
          title="Add Files"
          onClick={() => {
            setFn("post");
            setAddFilesModal(true);
          }}
        >
          <GenericIcon width={24} height={36} data={addbutton} />
        </AddMediaButton>
      </DashCenter>
      <DashCenter
        justification="flex-start"
        maxw="1300px"
        style={{ pointerEvents: "all" }}
      >
        <Selection
          selectedToShow={selectedToShow}
          setSelectedToShow={setSelectedToShow}
          setPage={setPage}
          setHasMore={setHasMore}
        />
      </DashCenter>
      {selectedToShow === "videos" && (
        <DashCenter
          justification="flex-end"
          maxw="1300px"
          style={{ pointerEvents: "all" }}
        >
          <button
            title="Grid view"
            className={`mr-2 btn btn-${
              isGrid ? "primary" : "secondary"
            } btn-lg`}
            onClick={() => setIsGrid(true)}
          >
            <i className="fas fa-th" />
          </button>
          <button
            title="List view"
            className={`ml-2 btn btn-${
              isGrid ? "secondary" : "primary"
            } btn-lg`}
            onClick={() => setIsGrid(false)}
          >
            <i className="fas fa-list" />
          </button>
        </DashCenter>
      )}
      {selectedToShow === "all" && Array.isArray(media) && media.length > 0 && (
        <DashCenter
          display="block"
          maxw="1300px"
          style={{ pointerEvents: "all" }}
        >
          {allmedia &&
            media &&
            media.map((post, i) =>
              post.url && post.url.length > 0 ? (
                <GenericPost
                  post={post}
                  i={i}
                  setIsGenericSlider={setIsGenericSlider}
                  key={post._id}
                />
              ) : (
                <StatusPost status={post} key={post._id} />
              )
            )}
          <div ref={infiniteScrollPost} />
        </DashCenter>
      )}
      {selectedToShow === "images" && images && images.length > 0 && (
        <DashCenter
          justification="flex-start"
          maxw="1300px"
          style={{ pointerEvents: "all" }}
        >
          {images.map((image, i) => (
            <Post
              image={image}
              setIsSlider={setIsSlider}
              key={image._id}
              i={i}
            />
          ))}
          <div ref={infiniteScrollPost} />
        </DashCenter>
      )}
      {selectedToShow === "videos" && videos && videos.length > 0 && (
        <section
          className={isGrid ? "d-flex flex-wrap" : ""}
          style={{
            pointerEvents: "all",
            maxWidth: "1300px",
            margin: "auto",
          }}
        >
          {videos.map((video) =>
            isGrid ? (
              <VideoGrid key={video._id} video={{ ...video }} />
            ) : (
              <VideoList key={video._id} video={{ ...video }} />
            )
          )}
        </section>
      )}
      {selectedToShow === "textual" &&
        status.statuses &&
        Array.isArray(status.statuses) &&
        status.statuses.map((stat) => (
          <StatusPost key={stat._id} status={stat} />
        ))}
      {images && images.length > 0 && isSlider[0] && (
        <ImageSlider
          images={images}
          i={isSlider[1]}
          setIsSlider={setIsSlider}
        />
      )}
      {media && media.length > 0 && isGenericSlider[0] && (
        <GenericSlider
          media={media}
          i={isGenericSlider[1]}
          setIsGenericSlider={setIsGenericSlider}
        />
      )}
      {user.profileImages &&
        user.profileImages.length > 0 &&
        profileSlider[0] && (
          <ImageSlider
            images={user.profileImages}
            i={profileSlider[1]}
            setIsSlider={setProfileSlider}
          />
        )}
      {addFilesModal && (
        <div style={{ pointerEvents: "all" }}>
          <AddMediaModal
            content={content}
            setContent={setContent}
            previewSource={previewSource}
            onImageUpload={onImageUpload}
            onSubmit={onSubmit}
            previewFile={previewFile}
            selectedFile={selectedFile}
            fn={fn}
            show={addFilesModal}
            onClose={() => setAddFilesModal(false)}
          />
        </div>
      )}
    </div>
  ) : (
    <Spinner />
  );
}

InitialDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
  allmedia: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  getImages: PropTypes.func.isRequired,
  createImage: PropTypes.func.isRequired,
  wipeImages: PropTypes.func.isRequired,
  getUsersVideo: PropTypes.func.isRequired,
  getAllUsersMedia: PropTypes.func.isRequired,
  wipeAllMedia: PropTypes.func.isRequired,
  getPersonsStatuses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  image: state.image,
  video: state.video,
  allmedia: state.allmedia,
  status: state.status,
});

export default connect(mapStateToProps, {
  getImages,
  createImage,
  uploadProfileImage,
  wipeImages,
  getUsersVideo,
  getAllUsersMedia,
  wipeAllMedia,
  getPersonsStatuses,
})(InitialDashboard);
