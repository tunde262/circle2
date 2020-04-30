import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import About from '../dashboard/About';
import Experience from '../dashboard/Experience';
import Education from '../dashboard/Education';
import ProfileEducation from '../profile/ProfileEducation';
import ProfileExperience from '../profile/ProfileExperience';

import { deleteAccount } from '../../actions/profile';

const Credentials = ({deleteAccount, about, profile: {profile}}) => {
    return (
        <Fragment>
            {about && (
                <div style={{ marginTop: "1rem" }}>
                    <About profile={profile} />
                </div>
            )}
            {profile !== null ? (
                <Fragment>
                    {about ? (
                        <div className="profile-creds">
                            <div className="profile-exp bg-white p-2">
                                <h2 className="text-primary">Experience</h2>
                                {profile.experience.length > 0 ? (<Fragment>
                                    {profile.experience.map(experience => (
                                        <ProfileExperience key={experience._id} experience={experience} />
                                    ))}
                                </Fragment>) : (<h4>No experience credentials</h4>)}
                            </div>

                            <div className="profile-edu bg-white p-2">
                                <h2 className="text-primary">Education</h2>
                                {profile.education.length > 0 ? (<Fragment>
                                    {profile.education.map(education => (
                                        <ProfileEducation key={education._id} education={education} />
                                    ))}
                                </Fragment>) : (<h4>No education credentials</h4>)}
                            </div>
                        </div>
                    ) : (
                        <Fragment>
                            <Experience experience={profile.experience} />
                            <Education education={profile.education} />
                        </Fragment>
                    )}
                </Fragment>
            ) : (
                <Fragment>
                    <p>You have not setup a profile, please add some info</p>
                    <Link to='/create-profile' className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </Fragment>
            )}
        </Fragment>
    )
}

Credentials.propTypes = {
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { deleteAccount })(Credentials);
