import React, { useState } from 'react';
import thumbnail from '../../img/thumbsmall.jpg';

const Navbar = () => {

    const [showMenu, setMenu] = useState(false);

    const toggleMenu = e => {
        const menuBtn = document.querySelector('.menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        const menuNav = document.querySelector('.nav-menu-nav');
        const menuPortrait = document.querySelector('.nav-menu-portrait');

        const navItems = document.querySelectorAll('.nav-item');

        if(!showMenu) {
            menuBtn.classList.add('close');
            navMenu.classList.add('show');
            menuNav.classList.add('show');
            menuPortrait.classList.add('show');
            navItems.forEach(item => item.classList.add('show'));
    
            // Set Menu State
            setMenu(!showMenu);
        } else {
            menuBtn.classList.remove('close');
            navMenu.classList.remove('show');
            menuNav.classList.remove('show');
            menuPortrait.classList.remove('show');
            navItems.forEach(item => item.classList.remove('show'));
    
            // Set Menu State
            setMenu(!showMenu);
        }
    }

    return (
        <header className="nav">
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <h1 className="logo">Circle2</h1>
                <div className="social-container">
                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
            <div>
                <div className="nav-bar">
                    <nav>
                        <ul className="nav-links">
                            <li><a href="#">Projects</a></li>
                            <li><a href="#">Chat</a></li>
                            <li><a href="#">Blogs</a></li>
                            <li><a href="#">Jobs</a></li>
                            <a className="cta" href="#"><button>Sign Up</button></a>
                        </ul>
                    </nav>
                </div>
                
                <div className="menu-btn" onClick={e => toggleMenu(e)}>
                    <div className="btn-line"></div>
                    <div className="btn-line"></div>
                    <div className="btn-line"></div>
                </div>

                <nav className="nav-menu">
                    <div className="nav-menu-portrait">
                        <div className="portrait">
                            <img src={thumbnail} />
                        </div>
                    </div>
                    <ul className="nav-menu-nav">
                        <div>
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
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;
