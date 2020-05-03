import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deleteProject } from '../../actions/project';

const ProjectCard = ({
  addLike,
  removeLike,
  deleteProject,
  auth,
  project: { _id, title, img, img_name, name, user, likes, comments, date, githublink },
  showActions
}) => (
    <div className="card">
        <div className="card_content project">
          <Link to={`/profile/${user}`} className="card_author">
            <small>@{name}</small>
          </Link>
          <Moment format='MM/DD/YYYY' className="post-date">{date}</Moment>
          <a href={githublink} target="_blank">
            <h2 className="card_title text--medium">
                {title}
            </h2>
          </a>
        </div>
        {img && (
            
            <div className="card_image-container">
                <a href={githublink} target="_blank">
                  <img src={`/api/projects/image/${img_name}`} alt='img' />
                </a>
            </div>
        )}
        <div className="card_stats">
            <div className="stat">
                <div className="value">
                  <i className="far fa-comment-alt"></i>{' '}
                  {comments.length > 0 && (
                    <span className='comment-count'>{comments.length}</span>
                  )}
                </div>
            </div>
            <div className="stat border">
                <div className="value">5123</div>
                <div className="type">views</div>
            </div>
            <div className="stat border">
              <div className="value">
                <i className="far fa-heart" onClick={() => addLike(_id)}></i>
                {' '}
                <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
              </div>
            </div>
        </div>
    </div>
);

ProjectCard.defaultProps = {
  showActions: true
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deleteProject }
)(ProjectCard);