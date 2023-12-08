import Image, { ImageLoader } from "next/image";

interface props {
    pictureUrl:string
}

const imageLoader : ImageLoader = ({ src, width, quality }) => {
    return `${src}?w=${44}&q=${quality || 75}`
}

const ProfilePicture : React.FunctionComponent<props> = ({pictureUrl}) =>{
    const style = {
        borderRadius:"25px",
        background:"var(--light-gray)",
        width:"44px",
        height:"44px"
    };
    return (
        <div className="profile-picture" style={style}>
            {
                pictureUrl !== "" ? <Image loader={imageLoader} src={pictureUrl} width={44} height={44} alt="profile picture" className="rounded-full" /> : <div style={style}></div>
            }
        </div>
    )
}

export default ProfilePicture;