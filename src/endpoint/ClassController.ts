import { Request, Response } from "express";
import ClassData from "../data/ClassData";
import Class from "../model/Class";

class ClassController {
  async creatClass(req: Request, res: Response) {
    try {
      const { nome } = req.body;
      const id: string = Date.now().toString();

      if (!nome) {
        throw new Error("O nome deve ser passado!!");
      }

      const newClass = new Class(id, nome);

      const classData = new ClassData();

      const anwser = await classData.insertClass(newClass);

      res.status(200).send("Turma criada com sucesso");
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async getClassActive(req: Request, res: Response) {
    try {
      const classData = new ClassData();

      const turmasAtivas = await classData.selectClassActiv();

      if (!turmasAtivas?.length) {
        throw new Error("não há turmas ativas");
      }

      res.status(200).send(turmasAtivas);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async changeModule(req: Request, res: Response) {
    try {
      const { turmaId, modulo } = req.body;

      if (!turmaId || !modulo) {
        throw new Error("IdTurma e modulo devem ser passados");
      }

      const classData = new ClassData();

      const TurmaExiste = await classData.selectClassId(turmaId);

      if (!TurmaExiste.length) {
        throw new Error(`Turma com id ${turmaId} não existe`);
      }

      if (
        modulo !== "1" &&
        modulo !== "2" &&
        modulo !== "3" &&
        modulo !== "4" &&
        modulo !== "5" &&
        modulo !== "6"
      ) {
        throw new Error(`Módulo ${modulo} inválido`);
      }

      await classData.updateModule(turmaId, modulo);

      res.status(200).send({ message: "modulo alterado com sucesso" });
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
}
export default ClassController;
