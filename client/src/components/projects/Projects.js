import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProjectCard from './ProjectCard';
import { getProjects } from '../../actions/project';
import auth from '../../reducers/auth';

const Projects = ({ getProjects, auth, profile: {profile}, project: { projects } }) => {

  let content;

  if(projects.length > 0) {
    content = projects.map((project) => (
      <ProjectCard key={project._id} project={project} />
    ))
  } else {
    content = <Fragment>
        <p>No projects</p>
        {!auth.loading && auth.user !== null && profile.user._id === auth.user._id && (
          <Link to='/create-project' className="btn btn-primary my-1">
              Add Project
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

Projects.propTypes = {
  getProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProjects })(Projects);