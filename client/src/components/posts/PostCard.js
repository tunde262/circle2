import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostCard = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, title, text, img, img_name, name, user, likes, comments, date },
  showActions
}) => (
    <div className="card">
        <div className="card_content project">
            <Link to={`/profile/${user}`} className="card_author">
                <small>@{name}</small>
            </Link>
            <Moment format='MM/DD/YYYY' className="post-date">{date}</Moment>
        </div>
        {img && (
          <div className="card_image-container">
              <img src={`/api/projects/image/${img_name}`} alt='img' />
          </div>
        )}
        <div className="card_content">
            <h2 className="card_title">
                {title}
            </h2>
            <p>
                {text}
            </p>
            {/* <div className="card_info">
                <p className="text--medium">30 Min read</p>
                <p className="card_price text--medium"><b>Free</b></p>
            </div> */}
        </div>
        <div className="card_stats">
            <div className="stat">
                <div className="value">
                  <i className="far fa-heart" onClick={() => addLike(_id)}></i>
                  {' '}
                  <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                  {' '}
                  <span><i className='fas fa-thumbs-down' onClick={() => removeLike(_id)} /></span>
                </div>
            </div>
            <div className="stat border">
                <div className="value">5123</div>
                <div className="type">views</div>
            </div>
            <div className="stat border">
              <i className="far fa-comment-alt"></i>{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </div>
        </div>
    </div>

);

PostCard.defaultProps = {
  showActions: true
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostCard);