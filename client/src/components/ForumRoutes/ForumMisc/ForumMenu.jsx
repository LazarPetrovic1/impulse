import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../../contexts/ThemeContext';
import LeftSideNavigation from '../../../styled/Forum/ForumLeftSideNavigation';
import { connect } from 'react-redux';

function ForumMenu ({ forum: { posts }, auth: { user } }) {
  const { isDarkTheme } = useContext(ThemeContext)
  const [favourite, setFavourite] = useState([])
  useEffect(() => {
    (function() {
      let postsArr = []
      try {
        for (const post of posts) {
          for (const item of post.savedBy) {
            if (item.user === "60118e7bc52e5c0399baec97") postsArr.push({ _id: post._id, title: post.title })
          }
        }
        setFavourite(postsArr)
      } catch(e) {
        console.warn(e.message);
      }
    }());
  }, [posts])

  return (
    <LeftSideNavigation isDarkTheme={isDarkTheme}>
      <ul>
        <li><Link to='/forum/forum-add-post'><i className='fas fa-plus' /> New post</Link></li>
        {favourite && favourite.length > 0 && favourite.map(fav => <li><Link to={`/forum/forum-post/${fav._id}`}>{fav.title}</Link></li>)}
      </ul>
    </LeftSideNavigation>
  )
}

const mapStateToProps = (state) => ({
  forum: state.forum,
  auth: state.auth
})

export default connect(mapStateToProps, null)(ForumMenu)
