import { library } from '@fortawesome/fontawesome-svg-core';
import { faBarsStaggered , faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faBarsStaggered);

import Link from 'next/link';
import * as React from 'react';
function Navbar(){
    return(
        <header id="header" className='header'>
            <nav className='nav'>
                <p><Link href="/home" className="logo">Nodes</Link></p>
                <div className='right'>
                    <ul className="links">
                        <li className="item">
                            <Link href="/home" className="link">Home</Link>
                        </li>
                        <li className="item">
                            <Link href="/Messages" className="link">About</Link>
                        </li>
                        <li className="item">
                            <Link href="" className="link">Contact</Link>
                        </li>
                    </ul>
                    <button className='btn-default'>Sign up</button>
                </div>
            </nav>           
        </header>
    )
}

export default Navbar;