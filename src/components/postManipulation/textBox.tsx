
interface props {
    text:string
}

const TextBox:React.FunctionComponent<props> = ({text}) => {
    const style = {
        paddingTop:"var(--spacing-md)",
        maxWidth:"1250px",
        margin:"0 auto"
    }

    return ( 
        <div id="textBox" style={style}>
            <textarea defaultValue={text}></textarea>
        </div>
    );
}

export function getPostContent() : string {
    let textarea = document.querySelector("#textBox textarea") as HTMLTextAreaElement;
    let content = textarea.value;
    return content;
}

export default TextBox;