
export const Suggestions:React.FunctionComponent = () => {
    const style:React.CSSProperties = {
        marginTop:"var(--spacing-md)",
        width:"300px"
    }

    return (
        <div id="suggestions" style={style}>
            <h2 className="subtitle-2">Suggestions</h2>
        </div>
    )
}