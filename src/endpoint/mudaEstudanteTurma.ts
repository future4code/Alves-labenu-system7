import { Request, Response } from "express";
import { selectEstudante } from "../data/estudanteDataBase";
import { atualizarEstudante, buscaTurma } from "../data/turmaDatabase";

 const mudaEstudanteTurma = async(req: Request, res: Response) => {
    try {
        const {IdEstudante, idTurma} = req.body

        if(!IdEstudante ||!idTurma){
            throw new Error("Todos os parâmetros devem ser passados")
        }
       
        const TurmaExiste = await buscaTurma(idTurma)

        if(!TurmaExiste){
            throw new Error(`Turma com o id ${idTurma} não existe`)
        }

        const estudanteExiste = await selectEstudante(IdEstudante)

        if (!estudanteExiste) {
            res.statusCode = 404
            throw new Error(`Estudante com id ${IdEstudante} não existe!`)
        }

        
        await atualizarEstudante(IdEstudante, idTurma)

        res.status(200).send({message:`Estudante alterado para turma ${TurmaExiste.nome} com sucesso!`})
        
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}
export default mudaEstudanteTurma