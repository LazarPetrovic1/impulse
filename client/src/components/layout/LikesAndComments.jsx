import React, { useState, useEffect, useContext } from 'react';
import StatsFormContainer from '../../styled/ImagePost/StatsFormContainer';
import { LanguageContext } from '../../contexts/LanguageContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { connect } from 'react-redux';
import { addComment } from '../../actions/image';
import { like, dislike, impulsify } from '../../actions/image';
import PropTypes from 'prop-types';
import ShortLogo from '../../styled/Logo/ShortLogo';
import StatsNames from '../../styled/Stats/StatsNames';
import { sendNotif } from '../../actions/notifs';
import axios from 'axios'

function LikesAndComments(props) {
  const [comment, setComment] = useState("")
  const [liked, setLiked] = useState(null)
  const [allWhoLiked, setAllWhoLiked] = useState([])
  const [allWhoDisliked, setAllWhoDisliked] = useState([])
  const [allWhoImpulsed, setAllWhoImpulsed] = useState([])
  const { language } = useContext(LanguageContext)
  const { isDarkTheme } = useContext(ThemeContext)
  const {
    auth: { user },
    addComment,
    image: { images },
    like,
    dislike,
    impulsify,
    sendNotif
  } = props

  const getStatOnHover = async (id, type) => {
    try {
      const res = await axios.get(`/api/imageposts/${id}/${type}`)
      await console.log("RES.DATA", res.data);
      switch (type) {
        case "impulse":
          await setAllWhoImpulsed(res.data)
          break;
        case "like":
          await setAllWhoLiked(res.data)
          break;
        case "dislike":
          await setAllWhoDisliked(res.data)
          break;
        default:
          console.log("Hello");
      }
    } catch (e) {
      console.warn(e.message);
    }
  }

  const setLikability = (val) => {
    const id = images[props.i]._id
    const ownedById = props && props.match && props.match.params && props.match.params.id ? props.match.params.id : images[props.i].user
    const likerId = user._id
    if (liked === val) setLiked(null)
    else setLiked(val)
    switch (val) {
      case "like":
        like(id, ownedById, likerId)
        if (ownedById !== likerId) {
          sendNotif({
            userId: images[props.i].user,
            type: 'like',
            language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`
          })
        }
        break;
      case "dislike":
        dislike(id, ownedById, likerId)
        if (ownedById !== likerId) {
          sendNotif({
            userId: images[props.i].user,
            type: 'dislike',
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`
          })
        }
        break;
      case "impulse":
        impulsify(id, ownedById, likerId)
        if (ownedById !== likerId) {
          sendNotif({
            userId: images[props.i].user,
            type: 'impulse',
            language: localStorage.language,
            username: user.username,
            name: `${user.firstName} ${user.lastName}`
          })
        }
        break;
      default:
        return;
    }
  }

  useEffect(() => {
    if (
      images[props.i].judgements.filter(jud => jud.user === user._id).length > 0
    ) {
      setLiked('dislike')
    } else if (
      images[props.i].endorsements.filter(end => end.user === user._id).length > 0
    ) {
      setLiked('like')
    } else if (
      images[props.i].impulsions.filter(imp => imp.user === user._id).length > 0
    ) {
      setLiked('impulse')
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
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div
            className="position-relative"
            onMouseEnter={() => getStatOnHover(images[props.i]._id, 'like')}
            onMouseLeave={() => setAllWhoLiked([])}
          >
            <i
              onClick={() => setLikability("like")}
              className={`fas fa-plus fa-2x p-3 pointer ${liked === "like" && "text-success"}`}
            />
            <span
              style={{ fontSize: "2.5rem" }}
              className="text-success"
            >
              {images[props.i].endorsements && images[props.i].endorsements.length}
            </span>
            {allWhoLiked.length > 0 && (
              <StatsNames isDarkTheme={isDarkTheme}>
                {allWhoLiked.map(awl => <p key={awl}>{awl}</p>)}
              </StatsNames>
            )}
          </div>
          <div
            className="position-relative"
            onMouseEnter={() => getStatOnHover(images[props.i]._id, "dislike")}
            onMouseLeave={() => setAllWhoDisliked([])}
          >
            <i
              onClick={() => setLikability("dislike")}
              className={`fas fa-minus fa-2x p-3 pointer ${liked === "dislike" && "text-danger"}`}
            />
            <span
              style={{ fontSize: "2.5rem" }}
              className="text-danger"
            >
              {images[props.i].judgements && images[props.i].judgements.length}
            </span>
            {allWhoDisliked.length > 0 && (
              <StatsNames isDarkTheme={isDarkTheme}>
                {allWhoDisliked.map(awd => <p key={awd}>{awd}</p>)}
              </StatsNames>
            )}
          </div>
        </div>
        <div
          className="d-flex position-relative"
          onMouseEnter={() => getStatOnHover(images[props.i]._id, "impulse")}
          onMouseLeave={() => setAllWhoImpulsed([])}
        >
          <ShortLogo
            onClick={() => setLikability("impulse")}
            liked={liked}
            className={`p-3 pointer`}
          />
          <span
            style={{ fontSize: "2.5rem" }}
            className="text-primary"
          >
            {images[props.i].impulsions && images[props.i].impulsions.length}
          </span>
          {allWhoImpulsed.length > 0 && (
            <StatsNames isDarkTheme={isDarkTheme}>
              {allWhoImpulsed.map(awi => <p key={awi}>{awi}</p>)}
            </StatsNames>
          )}
        </div>
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
          <i className="fas fa-comments"></i>
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
  impulsify: PropTypes.func.isRequired,
  sendNotif: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  image: state.image
})

export default connect(
  mapStateToProps,
  { addComment, like, dislike, sendNotif, impulsify }
)(LikesAndComments);
