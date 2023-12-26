
export class FlashMessage {
    private message:string;
    private type:string;
    // type will determine the appearance of the flash message component

    constructor(message:string,success:boolean){
        this.message = message;
        if(success===true){
            this.type = "success";
        } else {
            this.type = "danger";
        }
    }
    
    public getMessage():string {
        return this.message;
    }

    public getType():string {
        return this.type;
    }

    public toString():string {
        const str = JSON.stringify({
            "message":this.message,
            "type":this.type
        });
        return str;
    }
}