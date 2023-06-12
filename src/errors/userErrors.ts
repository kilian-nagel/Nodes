
class userError extends Error {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

class addUserError extends userError {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

class getUserError extends userError {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

class getUsersError extends userError {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

class modifyUserError extends userError {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

function handleUserErrors(err:userError){
    console.error("User Controller error : "+err.message);
}