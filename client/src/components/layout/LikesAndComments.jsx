import React, { useState, useEffect, useContext } from 'react';
import StatsFormContainer from '../../styled/ImagePost/StatsFormContainer';
// import { SocketContext } from '../../contexts/SocketContext';
import { LanguageContext } from '../../contexts/LanguageContext';
import { connect } from 'react-redux';
import { addComment } from '../../actions/image';
import { like, dislike } from '../../actions/image';
import PropTypes from 'prop-types';
import { sendNotif } from '../../actions/notifs';

function LikesAndComments(props) {
  const [comment, setComment] = useState("")
  const [liked, setLiked] = useState(null)
  // const { socket, playEffect } = useContext(SocketContext)
  const { language } = useContext(LanguageContext)
  const {
    auth: { user },
    addComment,
    image: { images },
    like,
    dislike,
    sendNotif
  } = props

  // useEffect(() => {
  //   socket.on('sentNotif', (notifs) => {
  //     console.log(notifs);
  //   })
  // }, [])

  const setLikability = (val) => {
    const id = images[props.i]._id
    const ownedById = props && props.match && props.match.params && props.match.params.id ? props.match.params.id : images[props.i].user
    const likerId = user._id
    console.log({ id, ownedById, likerId });

    if (liked === val) setLiked(null)
    else setLiked(val)
    switch (val) {
      case "like":
        like(id, ownedById, likerId)
        sendNotif({
          userId: images[props.i].user,
          type: 'like',
          language,
          username: user.username,
          name: `${user.firstName} ${user.lastName}`
        })
        break;
      case "dislike":
        dislike(id, ownedById, likerId)
        sendNotif({
          userId: images[props.i].user,
          type: 'dislike',
          language: localStorage.language,
          username: user.username,
          name: `${user.firstName} ${user.lastName}`
        })
        break;
      default:
        return;
    }
  }

  useEffect(() => {
    if (
      images[props.i].judgements.map(jud => jud.user === user._id).length > 0
    ) {
      setLiked('dislike')
    } else if (
      images[props.i].endorsements.map(end => end.user === user._id).length > 0
    ) {
      setLiked('like')
    }
    // eslint-disable-next-line
  }, [props.i])

  const onSubmit = async (e) => {
    e.preventDefault()
    const id = images[props.i]._id
    const ownedById = props && props.match && props.match.params && props.match.params.id ? props.match.params.id : "mine"
    await addComment({ id, text: comment, ownedById })
    await setComment("")
  }

  return (
    <StatsFormContainer margin={props && props.margin && props.margin} width={props && props.width && props.width}>
      <div className="d-flex">
        <i
          onClick={() => setLikability("like")}
          className={`fas fa-plus fa-2x p-3 pointer ${liked === "like" && "text-success"}`}
        /> <span style={{ fontSize: "2.5rem" }} className="text-success">{images[props.i].endorsements && images[props.i].endorsements.length}</span>
        <i
          onClick={() => setLikability("dislike")}
          className={`fas fa-minus fa-2x p-3 pointer ${liked === "dislike" && "text-danger"}`}
        /> <span style={{ fontSize: "2.5rem" }} className="text-danger">{images[props.i].judgements && images[props.i].judgements.length}</span>
      </div>
      <form className="input-group px-2" onSubmit={onSubmit}>
        <input
          type="text"
          name="comment"
          placeholder="Add a comment"
          className="form-control"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button className="input-group-append btn btn-secondary d-flex align-items-center">
          <i className="fas fa-comments pr-2"></i>
        </button>
      </form>
    </StatsFormContainer>
  )
}

LikesAndComments.propTypes = {
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  sendNotif: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  image: state.image
})

export default connect(
  mapStateToProps,
  { addComment, like, dislike, sendNotif }
)(LikesAndComments);
