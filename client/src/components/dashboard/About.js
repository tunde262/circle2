import React, { Fragment } from 'react'
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

export default About
