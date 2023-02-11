import Link from 'next/link';
import * as React from 'react';

const Navbar:React.FunctionComponent = () => {
    return (
        <header id="header" className='header'>
            <nav className='nav'>
                <p><Link href="/home" className="logo">Nodes</Link></p>
                <div className="right">
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
                    <Link href="/home" className='btn-default'>sign up</Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;