import { Request, Response } from "express";
import { insertDocente } from "../data/docenteDataBase";
import { buscaTurma } from "../data/turmaDatabase";
import {Docente} from "../types/docente"

const criarDocente = async(req: Request, res: Response) => {
    try {

        const { nome, email, dataNascimento, turmaId } = req.body;
        if (!nome || !email || !dataNascimento || !turmaId) {
            req.statusCode = 400;
            throw new Error("Todos os campos devem ser preenchidos!");
          }

        const TurmaExiste = await buscaTurma(turmaId)

        if(!TurmaExiste){
            throw new Error(`Turma com id ${turmaId} não existe`)
        }

        const NovoDocente: Docente = {
            id: Date.now().toString(),
            nome,
            email,
            dataNascimento ,
            turmaId
        }

        await insertDocente(NovoDocente)

        res.status(201).send("Docente criado com sucesso!")

    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}
export default criarDocente