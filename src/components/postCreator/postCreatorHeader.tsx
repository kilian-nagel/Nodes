import Link from 'next/link';

interface props {
    handleClick:Function
}

const PostHeader:React.FunctionComponent<props> = ({handleClick}) => {
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
            <Link href="./home" className='btn-default'  onClick={()=>handleClick()} aria-label='send the post' title='send the post'>send</Link>
        </header>
    );
}

export default PostHeader ;