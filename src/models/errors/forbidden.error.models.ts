export default class ForbiddenError extends Error{
    constructor(
        public message: string,
        public erro?: any,
    ){
        super(message);
    }

    
}