import { Request, Response } from "express";
import { InsertTurma } from "../data/turmaDatabase";
import { Turma } from "../types/turma";



const criarTurma = async(req: Request, res: Response) => {
    try {

        const {nome} = req.body

        if(!nome){
            throw new Error("O nome deve ser passado!!")
        }

        const novaTurma:Turma = {
            id: Date.now().toString(),
            nome 
        }
        
        await InsertTurma(novaTurma)

        res.status(200).send("Turma criada com sucesso")
        
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}

export default criarTurma