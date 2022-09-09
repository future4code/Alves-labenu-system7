import moment from "moment"

export type Docente ={
    id: string
    nome: string
    email: string
    dataNascimento: string
    turmaId: string
}


export function tipagemDocente(docente:any){
    const tipoDocente:Docente ={
        id:docente.id,
        nome:docente.nome,
        email: docente.email,
        dataNascimento:moment(docente.data_nasc, "YYYY-MM-DD").format("DD/MM/YYYY"),
        turmaId: docente.turma_id
    }

    return tipoDocente
}
