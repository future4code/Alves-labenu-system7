import Students from "../model/Student";
import { tipageEstudante } from "../types/estudante";
import BaseDataBase from "./BaseDataConection";

class StudentData extends BaseDataBase {
  async insertStudent(estudante: Students) {
    await this.getConnection()
      .insert({
        id: estudante.getIdEstudante(),
        nome: estudante.getNome(),
        email: estudante.getEmail(),
        data_nasc: estudante.getDataNascimento(),
        turma_id: estudante.getIdTurma(),
      })
      .into("estudante");
  }

  async selectStudentNameOrId(search: string) {
    const [result] = await this.getConnection() 
    .from("estudante")
    .select("*")   
    .where({nome: search})
    .orWhere({id: search})

    if (result) {
        const tipoEstudante = tipageEstudante(result)
        return tipoEstudante
    } else {
        return undefined
    }    
    
  }

  async changeStudentClass(idEstudante: string, idTurma: string): Promise<void> {
    await this.getConnection()
    .into("estudante")
    .where({id:idEstudante})
    .update({turma_id: idTurma})
}
}

export default StudentData;
