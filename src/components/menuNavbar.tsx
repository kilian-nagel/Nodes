import Link from "next/link"
import { useUser } from "@auth0/nextjs-auth0/client";
import ProfilePicture from "./profile/profilePicture";

export const MenuNavbar:React.FunctionComponent = () => {
    const {user} = useUser();
    const username = user?.nickname;
    const picture = user?.picture;

    return (
        <div id="menuNavbar" className="mt-2 flex justify-items-end"> 
            {
                user ? <ProfilePicture pictureUrl={picture?picture:'./default-userPicture.svg'}></ProfilePicture> 
                : <h1 className="subtitle-2 font-bold"><Link href="/">Nodes</Link></h1>
            }
        </div>
    )
}