import { FlashMessage } from "./flashMessage";

export class FlashMessageFactory {
    static createFlashMessage(message:string,success:boolean):FlashMessage{
        return new FlashMessage(message,success);
    }
}