

import Link from "next/link"
import { Profile } from "./profile/profile";
import { useUser } from "@auth0/nextjs-auth0/client";

export const AsideNavbar:React.FunctionComponent = () => {
    const {user} = useUser();
    const username = user?.nickname;
    const picture = user?.picture;

    const style = {
        width:"300px"
    }

    const titleStyle = {
        marginTop:"var(--spacing-md)"
    }

    return (
        <div style={style}> 
            {
                user ? <Profile username={username?username:'guest'} pictureUrl={picture?picture:''}/> 
                : <h1 className="subtitle-2 font-bold" style={titleStyle}><Link href="/">Nodes</Link></h1>
            }
            <nav className="asideNavbar" id="asideNavbar">
                <ul>
                    <li><Link href="/" className="text-light">HOME</Link></li>
                    <li><Link href="/" className="text-light">ABOUT</Link></li>
                    <li><Link href="/" className="text-light">MESSAGES</Link></li>
                </ul>
            </nav>
        </div>
    )
}