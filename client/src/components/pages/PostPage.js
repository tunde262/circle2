import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPosts } from '../../actions/post';
import Posts from '../posts/Posts';

const PostPage = ({getPosts}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <main id="home">
            <h1 className="large text-primary">Stories</h1>
            <section id="posts">
                <Posts />
            </section>
        </main>
    );
};

PostPage.propTypes = {
    getPosts: PropTypes.func.isRequired,
};

export default connect(null, { getPosts })(PostPage);