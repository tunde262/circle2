import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

    // const [showMenu, setMenu] = useState(false);

    // const toggleMenu = e => {
    //     const menuBtn = document.querySelector('.menu-btn');
    //     const navMenu = document.querySelector('.nav-menu');
    //     const menuNav = document.querySelector('.nav-menu-nav');
    //     const menuPortrait = document.querySelector('.nav-menu-portrait');

    //     const navItems = document.querySelectorAll('.nav-item');

    //     if(!showMenu) {
    //         menuBtn.classList.add('close');
    //         navMenu.classList.add('show');
    //         menuNav.classList.add('show');
    //         menuPortrait.classList.add('show');
    //         navItems.forEach(item => item.classList.add('show'));
    
    //         // Set Menu State
    //         setMenu(!showMenu);
    //     } else {
    //         menuBtn.classList.remove('close');
    //         navMenu.classList.remove('show');
    //         menuNav.classList.remove('show');
    //         menuPortrait.classList.remove('show');
    //         navItems.forEach(item => item.classList.remove('show'));
    
    //         // Set Menu State
    //         setMenu(!showMenu);
    //     }
    // }

    const authLinks = (
        <Fragment>
            {/* <li><a href="#"><i className="far fa-heart"></i></a></li>
            <li><a href="#"><i className="far fa-comment-alt"></i></a></li>
            <li><a href="#"><i className="fas fa-ellipsis-h"></i></a></li> */}
            <li><Link to="/dashboard">Portfolio</Link></li>
            <li>
                <Link onClick={logout} to="/">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Logout</span>
                </Link>
            </li>
            <li><Link className="cta" to="/create"><button>Create Something...</button></Link></li>
        </Fragment>
    );

    const guestLinks = (
        <Link className="cta" to="/"><button>Sign Up</button></Link>
    );

    return (
        <header>
            <div className="nav">
                <Link to="/"><h1 className="logo">Circle2</h1></Link>
                <div className="social-container">
                    <a href="https://facebook.com/circle2" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://twitter.com/circle2" className="social"><i className="fab fa-twitter"></i></a>
                    <a href="https://instagram.com/circle2" className="social"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
            <div>
                <div className="nav-bar">
                    <nav>
                        <ul className="nav-links">
                            <li><Link to="/projects">Projects</Link></li>
                            <li><Link to="/posts">Blogs</Link></li>
                            {/* <li><Link to="/chat">Chat</Link></li>
                            <li><Link to="/jobs">Jobs</Link></li> */}
                            { !loading && ( isAuthenticated ? authLinks : guestLinks )}
                        </ul>
                    </nav>
                </div>

                {/* { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}

                <nav className="nav-menu">
                    <div className="nav-menu-portrait">
                        <div className="portrait">
                            <img src={thumbnail} />
                        </div>
                    </div>
                    <ul className="nav-menu-nav">
                        <div className="mobile">
                            <li className="nav-item">
                                <a href="about.html" className="nav-link">
                                Projects</a>
                            </li>
                            <li className="nav-item">
                                <a href="work.html" className="nav-link">
                                Blogs</a>
                            </li>
                            <li className="nav-item">
                                <a href="contact.html" className="nav-link">
                                Chat</a>
                            </li>
                            <li className="nav-item">
                                <a href="contact.html" className="nav-link">
                                Jobs</a>
                            </li>
                        </div>
                        <li className="nav-item current">
                            <a href="index.html" className="nav-link">
                            Portfolio</a>
                        </li>
                        <li className="nav-item">
                            <a href="contact.html" className="nav-link">
                            Saved</a>
                        </li>
                        <li className="nav-item">
                            <a href="contact.html" className="nav-link">
                            Messages</a>
                        </li>
                        <li className="nav-item">
                            <a href="index.html" className="nav-link">
                            Wallet</a>
                        </li>
                        <li>
                            <a onClick={logout} href="#!">
                                <i className="fas fa-sign-out-alt"></i>{' '}
                                <span className="hide-sm">Logout</span>
                            </a>
                        </li>
                    </ul>
                </nav> */}
            </div>
        </header>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
