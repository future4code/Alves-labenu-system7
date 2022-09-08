import { tipageTurma, Turma, TurmaBancoDeDados } from "../types/turma";
import connection from "./baseDataBase";

export async function InsertTurma(turma:Turma):Promise<void>{
    const {id,nome} = turma

    await connection("turma").insert({
        id,
        nome
    })
}


export async function buscaTurmas():Promise<TurmaBancoDeDados[] | undefined> {
    
    const result = await connection().select("*").from("turma").whereNot("modulo","like","0")

    const tipoTurma = result.map((turma:any)=>{
        return tipageTurma(turma)
    })

    return tipoTurma
}

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