import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Credentials from './Credentials';
import Posts from '../posts/Posts';
import Projects from '../projects/Projects';
import ProfileGithub from '../profile/ProfileGithub';

const Table = ({about, profile: {githubusername}}) => {

    const [tableShow, setTableShow] = useState('about');

    let tableContent;

    if(tableShow === 'about') {
        tableContent = <Credentials about={about} />;
    } else if (tableShow === 'projects') {
        tableContent = <Projects /> 
    } else if(tableShow === 'posts') {
        tableContent = <Posts /> 
    } else if(tableShow === 'repos') {
        if(githubusername) {
            tableContent = <ProfileGithub username={githubusername} />
        }
    }

    return (
        <Fragment>
            <div className="thead">
                <nav>
                    <ul className="nav-links">
                        <li><h2><a onClick={e => setTableShow('about')}>About</a></h2></li>
                        <li><h2><a onClick={e => setTableShow('projects')}>Projects</a></h2></li>
                        <li><h2><a onClick={e => setTableShow('posts')}>Blog Posts</a></h2></li>
                        <li><h2><a onClick={e => setTableShow('repos')}>Repositories</a></h2></li>
                    </ul>
                </nav>
            </div>
            {tableContent}
            
        </Fragment>
    )
}

Table.propTypes = {

}

export default Table;

