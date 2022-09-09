import { Docente, tipagemDocente } from "../types/docente";
import connection from "./baseDataBase";

export const insertDocente = async (docente: Docente): Promise<void> => {
    const { id, nome, email, dataNascimento, turmaId } = docente

    await connection("docente")
        .insert({
            id,
            nome,
            email,
            data_nasc: dataNascimento,
            turma_id: turmaId
        })
}


export const selectDocentes = async (): Promise<Docente[] | undefined > => {

    const result = await connection('docente')
    if (result) {

        const tipagemDocentes = result.map((docente: any) => {
            return tipagemDocente(docente)
        })
        return tipagemDocentes
    } else {
        return undefined
    }
}


export const selectDocente = async(id:string): Promise<Docente | undefined> => {
    
    const [result] = await connection("docente") 
    .select("*")   
    .where({id})

    if (result) {
        const tipoDocente = tipagemDocente(result)
        return tipoDocente
    } else {
        return undefined
    }    
}


export const atualizarDocente = async(IdDocente: string, idTurma: string): Promise<void> => {
    await connection("docente")
    .where({id:IdDocente})
    .update({turma_id: idTurma})
}