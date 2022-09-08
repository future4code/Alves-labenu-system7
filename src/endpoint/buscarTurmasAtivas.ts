import { Request, Response } from "express";
import { buscaTurmas } from "../data/turmaDatabase";


const buscarTurmasAtivas = async(req: Request, res: Response) => {
    try {               

        const turmasAtivas = await buscaTurmas()

        res.status(200).send(turmasAtivas)

    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}
export default buscarTurmasAtivas