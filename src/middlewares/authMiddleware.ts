import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../utils/jwt';

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send({message: "Unauthorized"})
    token = token.split(" ")[1]
    try{
        const data = decodeToken(token);
        next()
    }catch(err: any){
        res.status(401).send({message: "Unauthorized"})
    }
}

export default AuthMiddleware;