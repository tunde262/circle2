import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register, login } from '../../actions/auth';
import PropTypes from 'prop-types';


const Landing = ({ setAlert, register,login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [rightPanelActive, setPanel] = useState(false);

    const { name, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    const signIn = async e => {
        e.preventDefault();
            login({ email, password });
    }

    const signUp = async e => {
        e.preventDefault();
        register({ name, email, password });
    }

    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    const formChange = e => {
        const jumbotron = document.getElementById('jumbotron');

        if(!rightPanelActive) {
            jumbotron.classList.add('right-panel-active');
    
            // Set Active Form State
            setPanel(!rightPanelActive);
        } else {
            jumbotron.classList.remove('right-panel-active');
    
            // Set Active Form State
            setPanel(!rightPanelActive);
        }
    }

    return (
        <main id="home">
            <div className="jumbotron" id="jumbotron">
                <div className="form-container sign-in-container">
                    <form id="auth-form" onSubmit={e => signIn(e)}>
                        <h1>Sign In</h1>
                        <span>Welcome back to our Circle :)</span>
                        <input type="email" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} />
                        <input type="password" placeholder="Password" name="password" minLength="6" value={password} onChange={e => onChange(e)}/>
                        <button type="submit">Sign In</button>
                        <div className="mobile">
                            <span style={{cursor: "pointer"}} onClick={e => formChange(e)}>Don't have an account?</span>
                        </div>
                    </form>
                </div>
                <div className="form-container sign-up-container" id="sign-up-container">
                    <form id="auth-form" onSubmit={e => signUp(e)}>
                        <h1>Create Account</h1>
                        <span>Welcome to our Circle!</span>
                        <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} />
                        <input type="email" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} />
                        <input type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} />
                        <button type="submit">Sign Up</button>
                        <div className="mobile">
                            <span style={{cursor: "pointer"}} onClick={e => formChange(e)}>Already have an account?</span>
                        </div>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>
                                Continue to stay connected within the hacker community.
                            </p>
                            <div className="desktop">
                                <button className="ghost" id="signUp" onClick={e => formChange(e)}>Sign Up</button>
                            </div>
                            <div className="mobile">
                                <button className="ghost" id="exploreBtn">Sign In</button>
                                <span style={{cursor: "pointer"}} onClick={e => formChange(e)}>Don't have an account?</span>
                            </div>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Discover, Share, & Communicate with Developers!</h1>
                            <p>
                                We are an online community for developers to discover & share ideas.
                            </p>
                            <button className="fill" id="exploreBtn">Explore Projects</button>
                            <div className="desktop">
                                <button className="ghost" id="signUp" onClick={e => formChange(e)}>Sign In</button>
                            </div>
                            <div className="mobile">
                                <a href="#sign-up-container"><button className="ghost" id="signUp">Sign Up</button></a>
                                <span style={{cursor: "pointer"}} onClick={e => formChange(e)}>Already have an account?</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

Landing.propTypes ={
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register, login })(Landing);
