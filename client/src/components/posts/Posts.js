import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostCard from './PostCard';
import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, auth, profile: {profile}, post: { posts } }) => {
  let content;
  if(posts.length > 0) {
    content = posts.map((post) => (
      <PostCard key={post._id} post={post} />
    ))
  } else {
    content = <Fragment>
        <p>No posts</p>
        {!auth.loading && auth.user !== null && profile.user._id === auth.user._id && (
          <Link to='/create-posts' className="btn btn-primary my-1">
              Write Post
          </Link>
        )}
    </Fragment>
  }

  return (
    <div className="cards">
      {content}
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(Posts);