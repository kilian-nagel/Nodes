import Link from 'next/link';
import { useUser } from "@auth0/nextjs-auth0/client";
import { Profile } from './profile/profile';

const Navbar:React.FunctionComponent = () => {
    const { user, error, isLoading } = useUser();
    if(error) console.log(error);
    if(isLoading) console.log(isLoading);
    
    const username = user?.nickname;
    const picture = user?.picture;

    return (
        <header id="header" className='header'>
            <nav className='nav'>
                <Link href="/" className="logo" aria-label='go to homepage' title='go to homepage'>Nodes</Link>
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
                    {
                        user ? <Profile username={username ? username : 'guest'} pictureUrl={picture ? picture:''}/> 
                        : <Link href="/auth" className='btn-default' aria-label='go to registration page' title='go to registration page'>sign up</Link> 
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar;