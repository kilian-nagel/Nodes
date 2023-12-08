import { IOptionMenu, OptionMenu } from "./optionMenu";

interface props {
    options:IOptionMenu[]
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
          {
            options.map(option=>{
              return <OptionMenu key={crypto.randomUUID()} optionLabel={option.label} action={option.action}/>
            })
          }
        </ul>
      </div>
    );
  };

export default DropdownMenu