export enum DataType {
    POST = 'post',
    USER = 'user',
    MESSAGE = 'message',
}
  
export enum ActionType {
  ADD = 'add',
  MODIFY = 'modify',
  DELETE = 'delete',
  GET = 'get',
}

/**
 * Generates an error message based on the specified data and action enums.
 * 
 * @param data - An enum describing the type of data (e.g., POST, MESSAGE, USER).
 * @param action - An enum describing the action (e.g., ADD, MODIFY, DELETE, GET).
 * @returns A string representing the error message in the format:
 * "Internal error: Failed to <action> the <data>"
 */
export function generateErrorMessage(data: DataType, action: ActionType): string {
    const errorMessage = `Internal error: Failed to ${action.toLowerCase()} the ${data.toLowerCase()}`;
    return errorMessage;
}
  