import Link from "next/link";

type option = {
  label:string,
  url:string,
}

interface props {
    options : option[]
}

const DropdownMenu:React.FC<props> = ({ options }) => {
    const style:React.CSSProperties = {
      position:'relative',
      padding:'0 0 0.75rem 0'
    }
  
    return (
      <div className="dropdown-menu" style={style}>
        <button className="options-button">...</button>
        <ul className="options-list">
          {options.map((option) => (
            <li key={crypto.randomUUID()}><Link className="text option" href={option.url}>{option.label}</Link></li>
          ))}
        </ul>
      </div>
    );
  };

export default DropdownMenu