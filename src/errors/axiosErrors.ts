import { AxiosError } from "axios";

function handleAxiosErrors(error:AxiosError){
    let errorMessage : string
    errorMessage = "Axios error :\n"

    if (error.request) {
        // Request was but no response was received.
        errorMessage += "request : "+error.request;
    } else {
        // Something during the request setup triggered an error
        errorMessage += "Setup issue : "+error.message;
    }
}