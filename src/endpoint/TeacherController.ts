import { Request, Response } from "express";
import moment from "moment";
import ClassData from "../data/ClassData";
import TeacherData from "../data/TeacherData";
import Teacher from "../model/Teachers";

class TeacherController {
  async creatTeacher(req: Request, res: Response) {
    try {
      const { nome, email, dataNascimento, turmaId } = req.body;
      const id = Date.now().toString();
      const newDate = moment(dataNascimento, "DD/MM/YYYY").format("YYYY-MM-DD");

      if (!nome || !email || !dataNascimento || !turmaId) {
        req.statusCode = 400;
        throw new Error("Todos os campos devem ser preenchidos!");
      }
      const newTeacher = new Teacher(nome, email, newDate, turmaId, id);
      const classData = new ClassData();

      const TurmaExiste = await classData.selectClassId(turmaId);

      if (!TurmaExiste.length) {
        throw new Error(`Turma com id ${turmaId} não existe`);
      }
      const teacherData = new TeacherData();

      await teacherData.insertTeacher(newTeacher);

      res.status(201).send(`Docente ${nome} criado com sucesso!`);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }
  async getAllTeachers(req: Request, res: Response) {
    try {
      const teacherData = new TeacherData();

      const todosDocentes = await teacherData.selectTeachers();

      if (!todosDocentes?.length) {
        throw new Error("não há docentes cadastrados");
      }

      res.status(200).send(todosDocentes);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  async changeClass(req: Request, res: Response) {
    try {        
      const {IdDocente, turmaId} = req.body

      if(!IdDocente ||!turmaId){
          throw new Error("IdTurma e IdDocente devem ser passados")
      }
     
      const teacherData = new TeacherData()

      const docenteExiste = await teacherData.buscarDocentePorId(IdDocente)

      if(!docenteExiste) {
        res.statusCode = 404
        throw new Error("Usuario não cadastrado")
      }

      const classData = new ClassData();

      const turmaExiste = await classData.selectClassId(turmaId);      

      if (!turmaExiste.length) {
        throw new Error(`Turma com id ${turmaId} não existe`);
      }

     
      await teacherData.changeTeacherClass(IdDocente, turmaId)

      res.status(200).send(`Docente atualizado para nova turma`)

  } catch (error: any) {
      res.status(500).send({ message: error.message })
  }
  }
}
export default TeacherController;
