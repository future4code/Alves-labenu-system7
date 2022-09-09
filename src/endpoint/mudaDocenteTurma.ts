import { Request, Response } from "express";
import { atualizarDocente, selectDocente } from "../data/docenteDataBase";
import { buscaTurma } from "../data/turmaDatabase";

const mudaDocenteTurma = async(req:Request,res:Response) => {
    try {
        const {IdDocente, idTurma} = req.body

        if(!IdDocente ||!idTurma){
            throw new Error("Todos os parâmetros devem ser passados")
        }
       
        const TurmaExiste = await buscaTurma(idTurma)

        if(!TurmaExiste){
            throw new Error(`Turma com o id ${idTurma} não existe`)
        }

        const docenteExiste = await selectDocente(IdDocente)

        if (!docenteExiste) {
            res.statusCode = 404
            throw new Error(`Docente com id ${IdDocente} não existe!`)
        }


        
        await atualizarDocente(IdDocente, idTurma)

        res.status(200).send({message:`Docente alterado para turma ${TurmaExiste.nome} com sucesso!`})

    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}

export default mudaDocenteTurma