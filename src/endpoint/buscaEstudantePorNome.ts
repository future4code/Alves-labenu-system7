import { Request, Response } from "express"

const buscaEstudantePorNome = async(req: Request, res: Response) => {
    try {

    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}
export default buscaEstudantePorNome