import Link from 'next/link';
import * as React from 'react';
function Navbar(){
    return(
        <header id="header" className='header'>
            <nav className='nav'>
                <p><Link href="/home" className="logo">Nodes</Link></p>
                <ul className="links">
                    <li className="item">
                        <Link href="/home" className="link">Home</Link>
                    </li>
                    <li className="item">
                        <Link href="/Messages" className="link">Messages</Link>
                    </li>
                    <li className="item">
                        <Link href="" className="link">Settings</Link>
                    </li>
                </ul>
            </nav>           
        </header>
    )
}

export default Navbar;