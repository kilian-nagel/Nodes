import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface props {
    handleClick:Function
}

const PostHeader:React.FunctionComponent<props> = ({handleClick}) => {
    const routeur = useRouter();
    const style = {
        display:"flex",
        maxWidth:"1250px",
        margin:"var(--spacing-sm) auto 0 auto",
    }

    const BackButtonstyle = {
        fontWeight:"700"
    }

    return ( 
        <header id="postHeader" className='flex-spaceBetween-center' style={style}>
            <Link href="../"  style={BackButtonstyle} className="back-btn" aria-label='go back' title='go back'>back</Link>
            <button className='btn-default'  onClick={()=>{
                handleClick();
                routeur.push("/home");
            }} aria-label='send the post' title='send the post'>send</button>
        </header>
    );
}

export default PostHeader ;