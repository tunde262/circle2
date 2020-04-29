import React, { Fragment } from 'react';
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
  post: { _id, title, text, name, user, likes, comments, date },
  showActions
}) => (
    <div className="card">
        <div className="card_image-container">
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiQjEyMDd9&auto=format&fit=crop&w=1200&q=80" />
        </div>
        <div className="card_content">
            <h2 className="card_title text--medium">
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
                <div className="value">4<sup>m</sup></div>
                <div className="type">read</div>
            </div>
            <div className="stat border">
                <div className="value">5123</div>
                <div className="type">views</div>
            </div>
            <div className="stat border">
                <div className="value">32</div>
                <div className="type">comments</div>
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