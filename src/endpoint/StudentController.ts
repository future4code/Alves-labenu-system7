import { Request, Response } from "express";
import moment from "moment";
import ClassData from "../data/ClassData";
import StudentData from "../data/studentsData";
import Class from "../model/Class";
import Students from "../model/Student";

class StudentController {
  async creatStudent(req: Request, res: Response) {
    try {
      const { nome, email, dataNascimento, turmaId } = req.body;
      const id = Date.now().toString();
      const newDate = moment(dataNascimento, "DD/MM/YYYY").format("YYYY-MM-DD");

      if (!nome || !email || !dataNascimento || !turmaId) {
        req.statusCode = 400;
        throw new Error("Todos os campos devem ser preenchidos!");
      }
      const newStudent = new Students(nome, email, newDate, turmaId, id);
      const classData = new ClassData();

      const TurmaExiste = await classData.selectClassId(turmaId);

      if (!TurmaExiste.length) {
        throw new Error(`Turma com id ${turmaId} não existe`);
      }
      const studentsData = new StudentData();

      await studentsData.insertStudent(newStudent);

      res.status(201).send("Estudante criado com sucesso!");
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
  async getStudentName(req: Request, res: Response) {
    try {
      const { nome } = req.params;
      const studentsData = new StudentData();

      const students = await studentsData.selectStudentNameOrId(nome);

      if (!students) {
        res.statusCode = 404;
        throw new Error(`Estudante ${nome} não existe!`);
      }      
      res.status(200).send(students);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async changeClass(req: Request, res: Response) {
    try {
      const { IdEstudante, turmaId } = req.body;

      if (!IdEstudante || !turmaId) {
        throw new Error("IdTurma e IdEstudante devem ser passados");
      }

      const studentsData = new StudentData();

      const estudanteExiste = await studentsData.selectStudentNameOrId(
        IdEstudante
      );

      if (!estudanteExiste) {
        res.statusCode = 404;
        throw new Error("Usuario não cadastrado");
      }

      const classData = new ClassData();

      const turmaExiste = await classData.selectClassId(turmaId);

      if (!turmaExiste.length) {
        throw new Error(`Turma com id ${turmaId} não existe`);
      }

      await studentsData.changeStudentClass(IdEstudante, turmaId);

      res
        .status(200)
        .send(`estudante ${estudanteExiste.nome} atualizado para nova turma`);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
}
export default StudentController;
