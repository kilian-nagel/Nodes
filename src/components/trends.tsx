
export const Trends:React.FunctionComponent = () => {
    const style:React.CSSProperties = {
        display:"flex",
        flexDirection:"column",
        gap:"var(--spacing-sm)"
    }

    return (
        <div className="trends" id="trends" style={style}>
            <h2 className="title">Trends</h2>
            <div className="trend">
                <h3>Vacations</h3>
                <p className="text text-light">20k posts</p>
            </div>
            <div className="trend">
                <h3>Champions League</h3>
                <p className="text text-light">7K posts</p>
            </div>
            <div className="trend">
                <h3>Elections</h3>
                <p className="text text-light">3K posts</p>
            </div>
        </div>
    )
}