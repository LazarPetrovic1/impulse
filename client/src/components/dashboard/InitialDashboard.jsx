import React, { useState, useEffect, useContext, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SideMenu from './SideMenu'
import DashCenter from '../../styled/DashCenter';
import ImageSlider from '../layout/ImageSlider'
import { LanguageContext } from '../../contexts/LanguageContext'
import { getImages, createImage, wipeImages } from '../../actions/image';
import { uploadProfileImage } from '../../actions/auth';
import AddMediaButton from '../../styled/AddMediaButton';
import AddMediaModal from '../layout/AddMediaModal';
import Post from '../layout/Post';
import { dashboardcomponent } from '../../utils/langObject';
import { POST_DELIMITER } from '../../utils/nonReduxConstants';
import ProfileImage from './utilcomps/ProfileImage';
import Selection from './utilcomps/Selection';
import { getUsersVideo } from '../../actions/video.js';
import VideoList from '../VideoRoutes/VideoMisc/VideoList';
import VideoGrid from '../VideoRoutes/VideoMisc/VideoGrid';

const {
  // _welcome,
  _yourinformation,
  _yourmedia,
} = dashboardcomponent

function InitialDashboard (props) {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
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
    video: { videos }
  } = props
  const { language } = useContext(LanguageContext)

  useEffect(() => {
    wipeImages()
    getUsersVideo("mine")
    // eslint-disable-next-line
  }, [])

  const gettingImages = async () => {
    try {
      if (hasMore) {
        const hasMoreValue = await getImages("mine", page, POST_DELIMITER)
        await setHasMore(hasMoreValue);
      }
    } catch(e) {
      console.warn(e.message);
    }
  }

  useEffect(() => {
    gettingImages()
    // eslint-disable-next-line
  }, [page])

  const [isGrid, setIsGrid] = useState(true)
  const [selectedFile, setSelectedFile] = useState()
  const [selectedToShow, setSelectedToShow] = useState("images")
  // eslint-disable-next-line
  const [isSelected, setIsSelected] = useState(false)
  const [previewSource, setPreviewSource] = useState('')
  const [isSlider, setIsSlider] = useState([false, 0])
  const [addFilesModal, setAddFilesModal] = useState(false)
  const [content, setContent] = useState("")
  const [fn, setFn] = useState("")
  const [profileUploadButton, setProfileUploadButton] = useState(false)
  const [profileSlider, setProfileSlider] = useState([false, 0])
  const [status, setStatus] = useState("")
  const observer = useRef()

  const infiniteScrollPost = useCallback((node) => {
    if (!hasMore) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
    // eslint-disable-next-line
  }, [hasMore])

  const onImageUpload = (e) => {
		setSelectedFile(e.target.files[0])
		setIsSelected(true)
	}

  const onSubmit = (e, fn) => {
    e.preventDefault()
    if (!selectedFile) return
    const reader = new FileReader()
    reader.readAsDataURL(selectedFile)
    reader.onloadend = () => uploadImage(reader.result, fn)
    reader.onerror = () => console.error('AHHHHHHHH!!')
    setAddFilesModal(false)
  }

  const uploadImage = async (base64EncodedImage, fn) => {
    try {
      await fn(base64EncodedImage, content)
      await setSelectedFile('')
      await setPreviewSource('')
      await history.push("/")
    } catch (err) {
      console.error(err)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => setPreviewSource(reader.result)
  }

  const submitStatus = (e) => {
    e.preventDefault()
    // Handle status here
    setStatus("")
  }

  return loading ? (
    <Spinner />
  ) : user ? (
    <div>
      <ProfileImage
        setProfileUploadButton={setProfileUploadButton}
        setProfileSlider={setProfileSlider}
        setFn={setFn}
        profileUploadButton={profileUploadButton}
        setAddFilesModal={setAddFilesModal}
      />
      <div className='row'>
        <div className='col-md-3 col-sm-5 col-xs-7'><SideMenu /></div>
      </div>
      <DashCenter justification="flex-end" maxw="1300px" style={{ pointerEvents: "all" }}>
        <Link className="btn btn-secondary pt-2 mr-2" to="/profile-overview">
          <i className="fas fa-id-card pr-2"></i> {_yourinformation[language]}
        </Link>
        <AddMediaButton
          className="btn btn-secondary ml-2"
          title="Add Files"
          onClick={() => { setFn("post"); setAddFilesModal(true) }}
        >
          <i className="fas fa-plus"></i>
        </AddMediaButton>
      </DashCenter>
      <DashCenter justification="flex-start" maxw="1300px" style={{ pointerEvents: "all" }}>
        <Selection selectedToShow={selectedToShow} setSelectedToShow={setSelectedToShow} />
      </DashCenter>
      {selectedToShow === "videos" && (
        <DashCenter justification="flex-end" maxw="1300px" style={{ pointerEvents: "all" }}>
          <button
            title="Grid view"
            className={`mr-2 btn btn-${isGrid ? "primary" : "secondary"} btn-lg`}
            onClick={() => setIsGrid(true)}
          >
            <i className="fas fa-th" />
          </button>
          <button
            title="List view"
            className={`ml-2 btn btn-${isGrid ? "secondary" : "primary"} btn-lg`}
            onClick={() => setIsGrid(false)}
          >
            <i className="fas fa-list" />
          </button>
        </DashCenter>
      )}
      <DashCenter justification="center" maxw="1300px" className="mt-5" style={{ pointerEvents: "all" }}>
        <form onSubmit={submitStatus} style={{ width: "80%" }}>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="What's on your mind?"
            value={status}
            onChange={e => setStatus(e.target.value)}
          />
        </form>
      </DashCenter>
      <h1 className="text-center">{_yourmedia[language]}</h1>
        {
          selectedToShow === "images" &&
          images &&
          images.length > 0 && (
            <DashCenter justification="flex-start" maxw="1300px" style={{ pointerEvents: "all" }}>
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
          )
        }
        {
          selectedToShow === "videos" &&
          videos &&
          videos.length > 0 && (
            <section className={isGrid ? "d-flex flex-wrap" : ""} style={{ pointerEvents: "all", maxWidth: "1300px", margin: "auto" }}>
              {videos.map(video => isGrid ? (
                <VideoGrid key={video._id} video={{ ...video }} />
              ) : (
                <VideoList key={video._id} video={{ ...video }} />
              ))}
            </section>
          )
        }
        {
          images &&
          images.length > 0 &&
          isSlider[0] && (
            <ImageSlider images={images} i={isSlider[1]} setIsSlider={setIsSlider} />
          )
        }
        {
          user.profileImages &&
          user.profileImages.length > 0 &&
          profileSlider[0] && (
            <ImageSlider images={user.profileImages} i={profileSlider[1]} setIsSlider={setProfileSlider} />
          )
        }
        {
          addFilesModal && (
            <div style={{ pointerEvents: "all" }}>
              <AddMediaModal
                content={content}
                setContent={setContent}
                setAddFilesModal={setAddFilesModal}
                previewSource={previewSource}
                onImageUpload={onImageUpload}
                onSubmit={onSubmit}
                previewFile={previewFile}
                selectedFile={selectedFile}
                fn={fn}
              />
            </div>
          )
        }
    </div>
  ) : <Spinner />
}

InitialDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getImages: PropTypes.func.isRequired,
  createImage: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
  wipeImages: PropTypes.func.isRequired,
  getUsersVideo: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  image: state.image,
  video: state.video
})

export default connect(
  mapStateToProps,
  { getImages, createImage, uploadProfileImage, wipeImages, getUsersVideo }
)(InitialDashboard)
