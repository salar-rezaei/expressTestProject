import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../utils/jwt';

const RollMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send({message: "Unauthorized"})
    token = token.split(" ")[1]
    try{
        const data = decodeToken(token);
        if(data.roll !== 'admin'){
            return res.status(403).send({message: "You do not have permission"})
        }
        next()
    }catch(err: any){
        return res.status(403).send({message: "Unauthorized"})
    }
}

export default RollMiddleware;
