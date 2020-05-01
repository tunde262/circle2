import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProjects } from '../../actions/project';
import Projects from '../projects/Projects';

const ProjectPage = ({getProjects}) => {
    useEffect(() => {
        getProjects();
    }, [getProjects]);
    
    return (
        <main id="home">
            <h1 className="large text-primary">Projects</h1>
            <section id="posts">
                <Projects />
            </section>
        </main>
    );
};

ProjectPage.propTypes = {
    getProjects: PropTypes.func.isRequired,
};

export default connect(null, { getProjects })(ProjectPage);
