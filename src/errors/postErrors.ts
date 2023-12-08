
export class postError extends Error {
    constructor(errorMessage:string){
        super(errorMessage)
    }
}

export class addPostError extends postError {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

export class getPostError extends postError {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

export class modifyPostError extends postError {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

export class deletePostError extends postError {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

export const handlePostsErrors = (error:postError) => {
    console.error("Post controller error : "+error.message);
}