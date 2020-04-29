import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProjectCard from './ProjectCard';
import { getProjects } from '../../actions/project';

const Projects = ({ getProjects, project: { projects } }) => {
  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return (
    <main id="home">
      <h1 className="large text-primary">Projects</h1>
      <section id="posts">
        <div className="cards">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>
    </main>
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