import moment from "moment"

export type Estudante = {
    id: string
    nome: string
    email: string
    dataNascimento: string
    turmaId: string
}

export function tipageEstudante(estudante:any){
    const tipoEstudante:Estudante ={
        id:estudante.id,
        nome:estudante.nome,
        email: estudante.email,
        dataNascimento:moment(estudante.data_nasc, "YYYY-MM-DD").format("DD/MM/YYYY"),
        turmaId: estudante.turma_id
    }

    return tipoEstudante
}