
import sanitizeHtml from 'sanitize-html';
import sanitize from "mongo-sanitize";

/**
 * Sanitize a given input
 * 
 * @param input corresponds to the input that will be sanitized
 * @returns 
 */
export function sanitizeInput(input:string):string{
    const sanitizedQuery = sanitizeHtml(input)
    return sanitizedQuery;
}

/**
 * Sanitize a given mongodb query
 * 
 * @param input corresponds to the query that will be sanitized
 * @returns 
 */
export function sanitizeMongoQuery(query:string):string{
    const sanitizedQuery = sanitize(query);
    return sanitizedQuery;
}