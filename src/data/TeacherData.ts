import Teacher from "../model/Teachers";
import BaseDataBase from "./BaseDataConection";

class TeacherData extends BaseDataBase {
  async insertTeacher(docente: Teacher) {
    await this.getConnection()
      .insert({
        id: docente.getIdTeacher(),
        nome: docente.getNome(),
        email: docente.getEmail(),
        data_nasc: docente.getDataNascimento(),
        turma_id: docente.getIdTurma(),
      })
      .into("docente");
  }

  async buscarDocentePorId(id: string): Promise<Teacher | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from("docente")
      .where({ id });

    if (!result.length) {
      return undefined;
    }

    return new Teacher(
      result[0].nome,
      result[0].email,
      result[0].data_nascimento,
      result[0].turma_id,
      result[0].id
    );
  }

  async selectTeachers(): Promise<Teacher[]> {
    const result = await this.getConnection().select("*").from("docente");

    const tipagemDocentes = result.map((docente) => {
      return new Teacher(
        docente.nome,
        docente.email,
        docente.data_nasc,
        docente.turma_id,
        docente.id
      );
    });
    return tipagemDocentes;
  }

async changeTeacherClass(id: string, idTurma: string): Promise<void> {
  await this.getConnection()
  .into("docente")
  .where({id})
  .update({turma_id: idTurma})
}
}

export default TeacherData;
