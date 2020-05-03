import React from 'react'
import { Link } from 'react-router-dom';

const Actions = ({ profile: {
    user: { _id },
    } 
}) => {
    return (
        <div className="dash-buttons">
            <Link to={`/profile/${_id}`} className="btn btn-light">
                View Profile
            </Link>
            
            <Link to="/edit-profile" className="btn btn-light">
                Edit Profile
            </Link>

            <Link to="/add-experience" className="btn btn-light">
                Add Experience
            </Link>
            
            <Link to="/add-education" className="btn btn-light">
                Add Education
            </Link>
        </div>
    )
}

export default Actions;
