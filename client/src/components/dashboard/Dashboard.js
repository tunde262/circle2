import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

import About from './About';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return (
        <main id="home">
            <div id="breadcrumb">
                <nav className="breadcrumb">
                    <ol>
                        <li><b>My Portfolio</b></li>
                    </ol>
                </nav>
            </div>
            {loading && profile === null ? <Spinner /> : <div className="portfolio">
                <section className="portfolio-block">
                    <img src="https://www.hardiagedcare.com.au/wp-content/uploads/2019/02/default-avatar-profile-icon-vector-18942381.jpg" className="round-img" />
                    {profile !== null && (
                        <About profile={profile} />
                    )}
                </section>
                <section className="portfolio-header">
                    {/* <p><i className="fas fa-user"></i> Welcome { user && user.name }</p> */}
                </section>
                <section className="portfolio-work">
                    <div className="thead">
                        <nav>
                            <ul className="nav-links">
                                <li><h2><a href="#">About</a></h2></li>
                                <li><h2><a href="#">Projects</a></h2></li>
                                <li><h2><a href="#">Blog Posts</a></h2></li>
                                <li><h2><a href="#">Repositories</a></h2></li>
                            </ul>
                        </nav>
                    </div>
                    {profile !== null ? (
                        <Fragment>
                            <Experience experience={profile.experience} />
                            <Education education={profile.education} />

                            <div className="my-2">
                                <button onClick={() => deleteAccount()}>
                                    <i className="fas fa-user-minus"></i> Delete My Account
                                </button>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <p>You have not setup a profile, please add some info</p>
                            <Link to='/create-profile' className="btn btn-primary my-1">
                                Create Profile
                            </Link>
                        </Fragment>
                    )}
                </section>
            </div>
        }
    </main>
    );
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
