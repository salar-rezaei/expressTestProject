import { Router , Request , Response } from "express";
import { AuthMiddleware } from "../middlewares";
import { createProduct, deleteOneProduct, getAllProducts, getOneProduct, updateOneProduct } from "./productServices";
import RollMiddleware from "../middlewares/rollMiddleware";
import productDto from "./dtos/createProductDto";

const router = Router();


router.get('/', AuthMiddleware, async (req: Request, res: Response) => {
    try{
        res.send(await getAllProducts())
    }catch(err: any){
        res.status(500).send({"err": err.message})
    }
});

router.get('/:id', AuthMiddleware, async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        res.send(await getOneProduct(id))
    }catch(err: any){
        res.status(500).send({"err": err.message})
    }
});

router.post('/', AuthMiddleware, RollMiddleware, async (req: Request, res: Response) => {
    try{
        const data: productDto = req.body;
        console.log(data)
        res.send(await createProduct(data));
    }catch(err: any){
        res.status(500).send({"error": err.message})
    }
});

router.put('/:id', AuthMiddleware, RollMiddleware, async(req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const params = req.body;
        res.send(await updateOneProduct(id, params))
    }catch(err: any){
        res.status(500).send({"err": err.message})
    }
});

router.delete('/:id',AuthMiddleware, RollMiddleware, async(req: Request, res: Response) => {
    try{
        const id = req.params.id;
        res.send(await deleteOneProduct(id))
    }catch(err: any){
        res.status(500).send({"err": err.message})
    }
});


export default router;