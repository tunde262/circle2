import React, { Fragment } from 'react';
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
  project: { _id, title, text, name, user, likes, comments, date },
  showActions
}) => (
    <div className="card">
        <div className="card_content">
            <h2 className="card_title text--medium">
                {title}
            </h2>
        </div>
        <div className="card_image-container">
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiQjEyMDd9&auto=format&fit=crop&w=1200&q=80" />
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