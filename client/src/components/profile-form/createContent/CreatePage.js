import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';


const CreatePage = ({ auth: { user }, profile: { loading } }) => {

    return (
        <main id="home">
            {loading ? <Spinner /> : (
                <div className="box-container">
                    <h2>Welcome {user.name}, what would you like to do?</h2>
                    <div>
                        <Link to="/create-project"><div className="largeButton">Create a Project</div></Link>
                        <Link to="/create-post"><div className="largeButton">Write a Blog Post</div></Link>
                    </div>
                </div>
            )}
      </main>
    )
}

CreatePage.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps)(CreatePage);
