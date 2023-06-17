import Link from "next/link";
import { useMemo } from "react";
import { v4 as uuidv4 } from 'uuid';

type option = {
  label:string,
  url:string,
}

interface props {
    options : option[]
}

const DropdownMenu:React.FC<props> = ({ options }) => {
    const uids = useMemo(()=> options.map(()=>uuidv4()),options);

    const style:React.CSSProperties = {
      position:'relative',
      padding:'0 0 0.75rem 0'
    }
  
    return (
      <div className="dropdown-menu" style={style}>
        <button className="options-button">...</button>
        <ul className="options-list">
          {options.map((option,index:number) => (
            <li key={uids[index]}><Link className="text option" href={option.url}>{option.label}</Link></li>
          ))}
        </ul>
      </div>
    );
  };

export default DropdownMenu