import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import * as React from 'react';
function Navbar(){
    return(
        <header id="header" className='header'>
            <nav className='nav'>
                <p><Link href="/home" className="logo">N_</Link></p>
                <ul className="links">
                    <li className="item">
                        <Link href="/home" className="link">home</Link>
                    </li>
                    <li className="item">
                        <Link href="/Messages" className="link">about</Link>
                    </li>
                    <li className="item">
                        <Link href="" className="link">contact</Link>
                    </li>
                </ul>
                <FontAwesomeIcon className="menu-btn" icon={['fas','bars-staggered']}/>
            </nav>           
        </header>
    )
}

export default Navbar;