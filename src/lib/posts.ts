
/**
 * Check if the content of a post complies with the rules.
 * 
 * @param content
 */
export function isPostContentValid(content:string):boolean {
    return content.length > 0 && content.length <= 300;
}

/**
 * Create a new post using arguments that describe the post.
 * 
 * @param content 
 * @param category 
 */
export function createNewPost(content:string,category:string){
    // temporary
    return {
        uid:'1',
        content:content,
        category:category,
        source:{
            uid:"-1",
            username:"guest",
            picture:"",
            friends:[],
            messages:[],
            posts:[],
        },
        time:new Date(),
    }
  }