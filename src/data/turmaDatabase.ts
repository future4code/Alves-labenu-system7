import { tipageTurma, Turma, TurmaBancoDeDados } from "../types/turma";
import connection from "./baseDataBase";


export async function buscaTurma(IdTurma:string):Promise<TurmaBancoDeDados | undefined> {
    const [result] = await connection("turma").where("id",`${IdTurma}`)
    
    if(result){

        return tipageTurma(result)

    } else {

        return undefined
    }
}


export async function updateModulo(IdTurma:string,modulo:string):Promise<void> {

    await connection("turma").where("id",`${IdTurma}`).update({modulo})
    
}

export const atualizarEstudante = async(idEstudante: string, idTurma: string): Promise<void> => {
    await connection("estudante")
    .where({id:idEstudante})
    .update({turma_id: idTurma})
}