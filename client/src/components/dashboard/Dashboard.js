import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getMyProjects } from '../../actions/project';
import { getMyPosts } from '../../actions/post';

import Actions from './Actions';
import About from './About';
import Table from '../table/Table';

const Dashboard = ({ getCurrentProfile, deleteAccount, getMyProjects, getMyPosts, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
        getMyProjects();
        getMyPosts();
    }, [getCurrentProfile, getMyProjects, getMyPosts]);

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
                    {profile !== null && profile.img ? (
                        <img src={`/api/profile/image/${profile.img_name}`} alt='img' className="round-img" />
                    ) : (
                        <img src="https://www.hardiagedcare.com.au/wp-content/uploads/2019/02/default-avatar-profile-icon-vector-18942381.jpg" alt='img' className="round-img" />
                    )}
                    {profile !== null ? (
                        <Fragment>
                            <Actions profile={profile} />
                            <About profile={profile} />
                            <div className="my-2">
                                <button className="ghost2" onClick={() => deleteAccount()}>
                                    <i className="fas fa-user-minus"></i> Delete My Account
                                </button>
                            </div>
                        </Fragment>
                    ): (
                        <h2>{user.name}</h2>
                    )}
                </section>
                <section className="portfolio-header">
                    {/* <p><i className="fas fa-user"></i> Welcome { user && user.name }</p> */}
                </section>
                <section className="portfolio-work">
                    {profile !== null ? (
                        <Table about={false} profile={profile}/>
                    ) :(
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
    getMyProjects: PropTypes.func.isRequired,
    getMyPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, getMyProjects, getMyPosts })(Dashboard);
