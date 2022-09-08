import { Request, Response } from "express";

const buscarTodosDocentes = async(req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}
export default buscarTodosDocentes