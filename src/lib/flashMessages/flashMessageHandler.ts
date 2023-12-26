import { FlashMessage } from "./flashMessage";
import { FlashMessageFactory } from "./flashMessageFactory";

class FlashMessageHandler {
    static addFlashMessage(flashMessage: FlashMessage): void {
      console.log(flashMessage.toString());
      sessionStorage.setItem('flashMessage', flashMessage.toString());
    }
  
    static getFlashMessage(): FlashMessage | null {
      const data = sessionStorage.getItem('flashMessage');
      console.log(data);
      if(data===null) return data;

      const flashMessageJson = JSON.parse(data);
      const flashMessage = FlashMessageFactory.createFlashMessage(flashMessageJson.message,flashMessageJson.type);
      return flashMessage;
    }
  
    static clearFlashMessage(): void {
      sessionStorage.removeItem('flashMessage');
    }
  }
  
  export default FlashMessageHandler;
  