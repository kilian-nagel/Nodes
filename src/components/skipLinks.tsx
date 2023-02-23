
interface props {
    path:string
}

const SkipLinks:React.FunctionComponent<props> = ({path})=>{
    return ( 
        <a id='skip-link' aria-label='skip to main content' title='skip to main content' href={path}>skip to main content</a>
    );
}

export default SkipLinks;