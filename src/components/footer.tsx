import * as React from 'react';
import { Component } from 'react';

function Footer() {
    return ( 
        <footer id="footer">
            <div className="links">
                <div className="column">
                    <h3 className="text">Legal</h3>
                    <ul className="items">
                        <li className="item"><a href="#" className="link text">Privacy Policy</a></li>
                        <li className="item"><a href="#" className="link text">Terms of service</a></li>
                        <li className="item"><a href="#" className="link text">Cookie Policy</a></li>
                        <li className="item"><a href="#" className="link text"></a></li>
                    </ul>
                </div>
                <div className="column">
                    <h3 className="text">Products</h3>
                    <ul className="items">
                        <li className="item"><a href="#" className="link text">Teams</a></li>
                        <li className="item"><a href="#" className="link text">Advertising</a></li>
                        <li className="item"><a href="#" className="link text">Collectives</a></li>
                        <li className="item"><a href="#" className="link text">Talents</a></li>
                    </ul>
                </div>
                <div className="column">
                    <h3 className="text">Social</h3>
                    <ul className="items">
                        <li className="item"><a href="#" className="link text">Twitter</a></li>
                        <li className="item"><a href="#" className="link text">Mastodon</a></li>
                        <li className="item"><a href="#" className="link text">Discord</a></li>
                        <li className="item"><a href="#" className="link text">Contact us</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;