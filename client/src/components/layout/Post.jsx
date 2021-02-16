import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import ImagePostContainer from '../../styled/ImagePost/ImagePostContainer';
import LikesAndComments from './LikesAndComments';

function Post({ image, setIsSlider, auth, i, match }) {
  const { user } = auth
  const { url } = image

  return (
    <Fragment>
      <ImagePostContainer className="p-2 my-2 d-flex flex-column">
        <img
          src={url}
          style={{ cursor: 'pointer' }}
          height="auto"
          width="80%"
          alt={`Media uploaded by user ${user.firstName}`}
          onClick={() => setIsSlider([true, i])}
        />
      </ImagePostContainer>
      <LikesAndComments i={i} match={match} />
    </Fragment>
  )
}

Post.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Post);
