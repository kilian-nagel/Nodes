

const Footer:React.FunctionComponent = () => {
    return ( 
        <footer id="footer">
            <div className="links">
                <div className="column">
                    <h3 className="text">Legal</h3>
                    <ul className="items">
                        <li className="item"><a href="#" className="link text" aria-label='go to privacy policy page' title='go to privacy policy page'>Privacy Policy</a></li>
                        <li className="item"><a href="#" className="link text" aria-label='go to terms of service page' title='go to terms of service page'>Terms of service</a></li>
                        <li className="item"><a href="#" className="link text" aria-label='go to cookie policy page' title='go to cookie policy page'>Cookie Policy</a></li>
                    </ul>
                </div>
                <div className="column">
                    <h3 className="text">Products</h3>
                    <ul className="items">
                        <li className="item"><a href="#" className="link text" aria-label='go to team presentation page' title='go to team presentation page'>Teams</a></li>
                        <li className="item"><a href="#" className="link text" aria-label='go to advertising page' title='go to advertising page'>Advertising</a></li>
                        <li className="item"><a href="#" className="link text" aria-label='go to collectives page' title='go to collectives page'>Collectives</a></li>
                        <li className="item"><a href="#" className="link text" aria-label='go to talents page' title='go to talents page'>Talents</a></li>
                    </ul>
                </div>
                <div className="column">
                    <h3 className="text">Social</h3>
                    <ul className="items">
                        <li className="item"><a href="#" className="link text" aria-label='go to nodes twitter page' title='go to nodes twitter page'>Twitter</a></li>
                        <li className="item"><a href="#" className="link text" aria-label='go to nodes mastodon page' title='go to nodes mastodon page'>Mastodon</a></li>
                        <li className="item"><a href="#" className="link text" aria-label='go to nodes discord page' title='go to nodes discord page'>Discord</a></li>
                        <li className="item"><a href="#" className="link text" aria-label='go to contact page' title='go to contact page'>Contact us</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;