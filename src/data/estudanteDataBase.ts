import { Estudante, tipageEstudante } from "../types/estudante";
import connection from "./baseDataBase";

export const insertEstudante = async(estudante: Estudante): Promise<void> => {
    const {id, nome, email, dataNascimento, turmaId} = estudante

    await connection("estudante")
    .insert({
        id,
        nome,
        email,
        data_nasc: dataNascimento,
        turma_id: turmaId
    })
}


export const selectEstudante = async(nome: string, idEstudante?: string): Promise<Estudante | undefined> => {
    
    const [result] = await connection("estudante") 
    .select("*")   
    .where({nome})
    .orWhere({id: idEstudante})

    if (result) {
        const tipoEstudante = tipageEstudante(result)
        return tipoEstudante
    } else {
        return undefined
    }    
}

