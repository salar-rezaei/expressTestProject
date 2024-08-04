import { Router , Request , Response , NextFunction } from "express";
import { ValidateMiddleware } from "../middlewares"
import registerDto from "./dtos/registerDto";
import { login, register } from "./authServices";
import loginDto from "./dtos/loginDto";


const router = Router();


router.post('/register', ValidateMiddleware(registerDto), async (req: Request, res: Response, next: NextFunction) => {
    try{
        const body: registerDto = req.body;
        res.send(await register(body));
    }catch(err: any){
        next(err)
    }
});

router.post('/login', ValidateMiddleware(loginDto), async (req: Request, res: Response, next: NextFunction) => {
    try{
        const body = req.body;
        res.send(await login(body))
    }catch(err: any){
        next(err)
    }
});


export default router;