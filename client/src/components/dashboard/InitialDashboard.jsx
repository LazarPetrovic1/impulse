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
import AddProfileImage from '../../styled/ImagePost/AddProfileImage';
import AddMediaModal from '../layout/AddMediaModal';
import Post from '../layout/Post';
import { dashboardcomponent } from '../../utils/langObject';
import { POST_DELIMITER } from '../../utils/nonReduxConstants';

const {
  // _welcome,
  _yourinformation,
  _yourmedia,
  _placeholder
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
    image: { images }
  } = props
  const { language } = useContext(LanguageContext)

  useEffect(() => {
    wipeImages()
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

  const [selectedFile, setSelectedFile] = useState()
  // eslint-disable-next-line
  const [isSelected, setIsSelected] = useState(false)
  const [previewSource, setPreviewSource] = useState('')
  const [isSlider, setIsSlider] = useState([false, 0])
  const [addFilesModal, setAddFilesModal] = useState(false)
  const [content, setContent] = useState("")
  const [fn, setFn] = useState("")
  const [profileUploadButton, setProfileUploadButton] = useState(false)
  const [profileSlider, setProfileSlider] = useState([false, 0])
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

  return loading ? (
    <Spinner />
  ) : user ? (
    <div>
      <div className='container'>
        <div className="text-center" style={{ pointerEvents: "all" }}>
          <div className="d-inline-block position-relative rounded-circle" style={{ overflow: "hidden" }}>
            {user.profileImages.length > 0 ? (
              <img
                alt="Featured on profile"
                style={{ userSelect: "none", width: "350px", height: "350px", cursor: "pointer" }}
                src={user.profileImages[user.profileImages.length - 1].url}
                onMouseEnter={() => setProfileUploadButton(true)}
                onMouseLeave={() => setProfileUploadButton(false)}
                onClick={() => setProfileSlider([true, 0])}
              />
            ) : (
              <img
                style={{ userSelect: "none" }}
                src={`https://robohash.org/${user._id}?set=set4&size=350x350`}
                alt={_placeholder[language]}
                onMouseEnter={() => setProfileUploadButton(true)}
                onMouseLeave={() => setProfileUploadButton(false)}
              />
            )}
            {profileUploadButton && (
              <AddProfileImage
                className="btn btn-secondary btn-block"
                onMouseEnter={() => setProfileUploadButton(true)}
                onMouseLeave={() => setProfileUploadButton(false)}
                onClick={() => { setFn("profile"); setAddFilesModal(true) }}
              >
                <i className="fas fa-plus fa-2x" />
              </AddProfileImage>
            )}
          </div>
        </div>
        <h1 className='text-primary text-center display-4 mt-3'>{user.firstName} {user.lastName}</h1>
      </div>
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
      <h1 className="text-center">{_yourmedia[language]}</h1>
      <DashCenter justification="flex-start" maxw="1300px" style={{ pointerEvents: "all" }}>
        {
          images && images.length > 0 && images.map((image, i) => (
            <Post
              image={image}
              setIsSlider={setIsSlider}
              key={image._id}
              i={i}
            />
          ))
        }
        <div ref={infiniteScrollPost} />
      </DashCenter>
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
  wipeImages: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  image: state.image
})

export default connect(
  mapStateToProps,
  { getImages, createImage, uploadProfileImage, wipeImages }
)(InitialDashboard)
