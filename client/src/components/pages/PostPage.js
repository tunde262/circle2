import React from 'react';

import Posts from '../posts/Posts';

const PostPage = () => (
    <main id="home">
        <h1 className="large text-primary">Stories</h1>
        <section id="posts">
            <Posts />
        </section>
    </main>
);

export default PostPage;