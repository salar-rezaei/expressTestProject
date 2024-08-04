import { Request , Response , NextFunction , ErrorRequestHandler} from "express";
import ServerError from "../errors/serverErrors";

const ErrorHandlingMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ServerError){
        res.status(error.status).send({
            message: error.message
        })
    }else{
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

export default ErrorHandlingMiddleware;