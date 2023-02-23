import Link from 'next/link';

const Navbar:React.FunctionComponent = () => {
    return (
        <header id="header" className='header'>
            <nav className='nav'>
                <Link href="/home" className="logo" aria-label='go to homepage' title='go to homepage'>Nodes</Link>
                <div className="right">
                    <ul className="links">
                        <li className="item">
                            <Link href="/home" className="link" aria-label='go to homepage' title='go to homepage'>home</Link>
                        </li>
                        <li className="item">
                            <Link href="/Messages" className="link" aria-label='go to about page' title='go to about page'>about</Link>
                        </li>
                        <li className="item">
                            <Link href="" className="link" aria-label="go to contact page" title='go to contact page'>contact</Link>
                        </li>
                    </ul>
                    <Link href="/home" className='btn-default' aria-label='go to registration page' title='go to registration page'>sign up</Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;