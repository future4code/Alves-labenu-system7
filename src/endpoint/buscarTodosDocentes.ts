import { Request, Response } from "express";
import { selectDocentes } from "../data/docenteDataBase";

const buscarTodosDocentes = async(req: Request, res: Response) => {
    try {
        
        const todosDocentes = await selectDocentes()

        if(!todosDocentes?.length){
            throw new Error("não há docentes cadastrados")
        }

        res.status(200).send(todosDocentes)

    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}
export default buscarTodosDocentes