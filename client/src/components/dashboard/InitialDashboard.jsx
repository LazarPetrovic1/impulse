import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SideMenu from './SideMenu'
import DashCenter from '../../styled/DashCenter';
import ImageSlider from '../layout/ImageSlider'
import { LanguageContext } from '../../contexts/LanguageContext'
import { getImages, createImage } from '../../actions/image';
import AddMediaButton from '../../styled/AddMediaButton';
import AddMediaModal from '../layout/AddMediaModal';
import Post from '../layout/Post';
import { dashboardcomponent } from '../../utils/langObject';

const {
  _welcome,
  _yourinformation,
  _yourmedia
} = dashboardcomponent

function InitialDashboard (props) {
  const {
    auth: { user, loading },
    history,
    getImages,
    createImage,
    image: { images }
  } = props
  const { language } = useContext(LanguageContext)

  useEffect(() => {
    (async function() {
      try {
        getImages("mine")
      } catch(e) {
        console.warn(e.message);
      }
    }());
    // eslint-disable-next-line
  }, [])

  const [selectedFile, setSelectedFile] = useState()
  // eslint-disable-next-line
  const [isSelected, setIsSelected] = useState(false)
  const [previewSource, setPreviewSource] = useState('')
  const [isSlider, setIsSlider] = useState([false, 0])
  const [addFilesModal, setAddFilesModal] = useState(false)
  const [content, setContent] = useState("")

  const onImageUpload = (e) => {
		setSelectedFile(e.target.files[0])
		setIsSelected(true)
	}

  const onSubmit = (e) => {
    e.preventDefault()
    if (!selectedFile) return
    const reader = new FileReader()
    reader.readAsDataURL(selectedFile)
    reader.onloadend = () => uploadImage(reader.result)
    reader.onerror = () => console.error('AHHHHHHHH!!')
    setAddFilesModal(false)
  }

  const uploadImage = async (base64EncodedImage) => {
    try {
      await createImage(base64EncodedImage, content)
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
        <h1 className='text-primary text-center display-4'>{_welcome[language]}, {user.firstName}</h1>
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
          onClick={() => setAddFilesModal(true)}
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
      </DashCenter>
      {
        images &&
        images.length > 0 &&
        isSlider[0] && (
          <ImageSlider images={images} i={isSlider[1]} setIsSlider={setIsSlider} />
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
}

const mapStateToProps = state => ({
  auth: state.auth,
  image: state.image
})

export default connect(
  mapStateToProps,
  { getImages, createImage }
)(InitialDashboard)
