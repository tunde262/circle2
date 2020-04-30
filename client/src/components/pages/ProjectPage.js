import React from 'react';

import Projects from '../projects/Projects';

const ProjectPage = () => (
    <main id="home">
        <h1 className="large text-primary">Projects</h1>
        <section id="posts">
            <Projects />
        </section>
    </main>
);

export default ProjectPage;