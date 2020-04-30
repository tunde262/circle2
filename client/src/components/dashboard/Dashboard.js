import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

import Actions from './Actions';
import About from './About';
import Table from '../table/Table';

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
            {loading || profile === null ? <Spinner /> : <div className="portfolio">
                <section className="portfolio-block">
                    <img src="https://www.hardiagedcare.com.au/wp-content/uploads/2019/02/default-avatar-profile-icon-vector-18942381.jpg" alt='img' className="round-img" />
                    {profile !== null && (
                        <Fragment>
                            <Actions profile={profile} />
                            <About profile={profile} />
                            <div className="my-2">
                                <button className="ghost2" onClick={() => deleteAccount()}>
                                    <i className="fas fa-user-minus"></i> Delete My Account
                                </button>
                            </div>
                        </Fragment>
                    )}
                </section>
                <section className="portfolio-header">
                    {/* <p><i className="fas fa-user"></i> Welcome { user && user.name }</p> */}
                </section>
                <section className="portfolio-work">
                    <Table about={false} profile={profile}/>
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
