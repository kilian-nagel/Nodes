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
        console.error("Date error : "+err.message);
    }
    if(err instanceof DbConnectionError){
        console.error("Database connection error : "+err.message);
    }
}