import Link from "next/link"

export const AsideNavbar:React.FunctionComponent = () => {

    const style = {
        width:"300px"
    }

    const titleStyle = {
        marginTop:"var(--spacing-md)"
    }

    return (
        <div style={style}>
            <h1 className="subtitle-2" style={titleStyle}><Link href="/">Nodes</Link></h1>
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