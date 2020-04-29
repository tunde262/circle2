import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const About = ({ profile: {
    user: { _id, name },
    bio,
    status,
    company, 
    location, 
    skills
    } 
}) => {
    return (
        <Fragment>
            <div className="dash-buttons">
                <Link to="/edit-profile" className="btn btn-light">
                    <i className="fas fa-user-circle text-primary"></i> 
                    Edit Profile
                </Link>

                <Link to={`/profile/${_id}`} className="btn btn-light">
                    <i className="fas fa-graduation-cap text-primary"></i> 
                    View Profile
                </Link>

                <Link to="/add-experience" className="btn btn-light">
                    <i className="fab fa-black-tie text-primary"></i> 
                    Add Experience
                </Link>
                
                <Link to="/add-education" className="btn btn-light">
                    <i className="fas fa-graduation-cap text-primary"></i> 
                    Add Education
                </Link>
            </div>
            <div className="bg-light p-2">
                <h2 className="text-primary">Skill Set</h2>
                <div className="skills">
                    {skills.map( (skill, index) => (  
                        <div key={index} className="p-1">
                            <i className="fas fa-check"></i> {skill}
                        </div>
                        )

                    )}
                </div>
                <div className="line"></div>
                {bio && (
                    <Fragment>
                        <h2 className="text-primary">My Bio</h2>
                        <p>
                            {bio}
                        </p>
                    </Fragment>
                )}
            </div>
        </Fragment>
    )
}

About.propTypes = {

}

export default About
