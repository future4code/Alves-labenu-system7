import { Request, Response } from "express";
import { buscaTurma, updateModulo } from "../data/turmaDatabase";

 const mudaTurmaModulo = async (req:Request,res:Response) => {
    try {        
        const {IdTurma, modulo} = req.body

        if(!IdTurma ||!modulo){
            throw new Error("IdTurma e modulo devem ser passados")
        }
       
        const TurmaExiste = await buscaTurma(IdTurma)

        if(!TurmaExiste){
            throw new Error(`Turma com id ${IdTurma} não existe`)
        }

        if(modulo === "0") {
            throw new Error ("não é possivel alterar uma turma para o modulo 0")
        }

        await updateModulo(IdTurma,modulo)

        res.status(200).send({message:"modulo alterado com sucesso"})

    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}
export default mudaTurmaModulo