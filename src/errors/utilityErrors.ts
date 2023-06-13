import { log } from "console";

export class dateError extends Error {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

export class DbConnectionError extends Error {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

export function handleUtilityErrors(err:Error){
    if(err instanceof dateError){
        log("date error : "+err.message);
    }
}