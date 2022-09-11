import Class from "../model/Class";
import BaseDataBase from "./BaseDataConection";

class ClassData extends BaseDataBase {
  async insertClass(turma: Class): Promise<void> {
    await this.getConnection()
      .insert({
        id: turma.getIdClass(),
        nome: turma.getNome(),
      })
      .into("turma");
  }

  async selectClassActiv(): Promise<Class[]> {
    const result = await this.getConnection()
      .select("*")
      .from("turma")
      .whereNot("modulo", "like", "0");

    const tipoTurma = result.map((turma) => {
      return new Class(turma.nome, turma.id, turma.modulo);
    });
    return tipoTurma;
  }

  async selectClassId(IdTurma: string) {
    const result = await this.getConnection()
      .select("*")
      .from("turma")
      .where("id", `${IdTurma}`);

    return result;
  }

  async updateModule(turmaId: string, modulo: string) {
    await this.getConnection()
      .into("turma")
      .update({ modulo })
      .where("id", `${turmaId}`);
  }
}

export default ClassData;
