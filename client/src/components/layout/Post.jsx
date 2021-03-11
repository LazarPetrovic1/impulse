import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import ImagePostContainer from '../../styled/ImagePost/ImagePostContainer';
import LikesAndComments from './LikesAndComments';
import Comment from './Comment';

function Post({ image, setIsSlider, auth, i, match }) {
  const { user } = auth
  const { url, comments } = image

  return (
    <div style={{ width: "100%" }}>
      <div>
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
      </div>
      <div className="p-2 d-flex flex-column" style={{ width: "80%", margin: "auto" }}>
        {comments.map(comm => <Comment comm={comm} key={comm._id} />)}
      </div>
    </div>
  )
}

Post.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Post);
