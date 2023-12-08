
interface Iaction {
    ():Promise<undefined>
}

interface props {
    optionLabel:string,
    action:Iaction
}

export interface IOptionMenu {
    label:string,
    action:Iaction
};

export const OptionMenu:React.FC<props> = ({optionLabel,action}) => {
    return (
        <li><button className="text option" onClick={action}>{optionLabel}</button></li>
    );
}