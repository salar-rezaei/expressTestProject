import { Router , Request , Response } from "express";
import { ValidateMiddleware, AuthMiddleware } from "../middlewares"
import { createNewUser, deleteOneUser, getAllUsers, getOneUser, updateOneUser } from "./userServices";
import CreateUserDto from './dtos/createUserDto'
import User from "./dtos/userDto";

const router = Router();


router.get('/', AuthMiddleware, async (req: Request, res: Response) => {
    try{
        res.send(await getAllUsers())
    }catch(err: any){
        res.status(500).send({"err": err.message})
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        res.send(await getOneUser(id))
    }catch(err: any){
        res.status(500).send({"err": err.message})
    }
});

router.post('/', ValidateMiddleware(CreateUserDto), async(req: Request, res: Response) => {
    try{
        const body: User = req.body
    const user: any = await createNewUser(body)
    return res.send(user)
    }catch(err: any){
        res.status(500).send({"message": err.message})
    }
    
});

router.put('/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const params = req.body;
        res.send(await updateOneUser(id, params))
    }catch(err: any){
        res.status(500).send({"message": err.message})
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        return res.send(await deleteOneUser(id))
    }catch(err: any){
        res.status(500).send({"message": err.message})
    }
});


export default router;