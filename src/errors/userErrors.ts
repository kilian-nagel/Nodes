
export class userError extends Error {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

export class addUserError extends userError {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

export class getUserError extends userError {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

export class getUsersError extends userError {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

export class modifyUserError extends userError {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

export function handleUserErrors(err:userError){
    console.error("User Controller error : "+err.message);
}