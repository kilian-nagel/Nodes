
import { timeSincePosted } from "@/lib/date";

interface props {
    date:Date
}

const PostInfo:React.FunctionComponent<props> = ({date}) => {
    const text = "- ";

    const style:React.CSSProperties = {
        paddingLeft:"5px",
    }

    return (
        <div className="post-info">
            <p className="text-light" style={style}>{date ? text + timeSincePosted(date) : ""}</p>
        </div>
    )
}

export default PostInfo;