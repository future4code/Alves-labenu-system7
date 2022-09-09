import { Request, Response } from "express";
import {insertEstudante} from "../data/estudanteDataBase";
import { buscaTurma } from "../data/turmaDatabase";
import {Estudante} from "../types/estudante"

const criarEstudante = async (req: Request, res: Response) => {
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

    const estudante: Estudante = {
        id: Date.now().toString(),
        nome,
	    email,
        dataNascimento ,
        turmaId
    }    
    await insertEstudante(estudante)

    res.status(201).send("Estudante cirado com sucesso!")
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};
export default criarEstudante;
