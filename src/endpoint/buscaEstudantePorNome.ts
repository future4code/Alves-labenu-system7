import { Request, Response } from "express"
import {selectEstudante} from "../data/estudanteDataBase"

const buscaEstudantePorNome = async(req: Request, res: Response) => {
    try {
        const {nome} = req.params

        const estudante = await selectEstudante(nome)

        if (!estudante) {
            res.statusCode = 404
            throw new Error(`Estudante ${nome} não existe!`)
        }

        res.status(200).send(estudante)

    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}
export default buscaEstudantePorNome