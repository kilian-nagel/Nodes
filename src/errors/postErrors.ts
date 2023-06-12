
class postError extends Error {
    constructor(errorMessage:string){
        super(errorMessage)
    }
}

class addPostError extends postError {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

class getPostError extends postError {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

class modifyPostError extends postError {
    constructor(errorMessage:string){
        super(errorMessage);
    }
}

const handlePostsErrors = (error:postError) => {
    console.error("Post controller error : "+error.message);
}