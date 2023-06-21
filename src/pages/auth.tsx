import Link from "next/link";
import { NextPage } from "next/types";
 
const auth:NextPage = () => {
    return ( 
        <div className="btns">
            <Link href="/api/auth/signup">sign up</Link>
            <Link href="/api/auth/login">sign in</Link>
            <Link href="/api/auth/logout">log out</Link>
        </div>
    );
}
 
export default auth;