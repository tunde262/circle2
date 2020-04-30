import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProjectCard from './ProjectCard';
import { getProjects } from '../../actions/project';

const Projects = ({ getProjects, project: { projects } }) => {
  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return (
    <div className="cards">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

Projects.propTypes = {
  getProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  project: state.project
});

export default connect(mapStateToProps, { getProjects })(Projects);