import app from "./app";
import ClassController from "./endpoint/ClassController";
import StudentController from "./endpoint/StudentController";
import TeacherController from "./endpoint/TeacherController";

const classController = new ClassController()
const studentController = new StudentController()
const teacherController = new TeacherController()

app.post('/criar/turma', classController.creatClass)
app.get("/buscar/turmas/ativas", classController.getClassActive)
app.post("/muda/turma/modulo", classController.changeModule)

app.post("/criar/estudante", studentController.creatStudent)
app.get("/estudante/:nome", studentController.getStudentName)
app.post("/muda/estudante/turma", studentController.changeClass)

app.post("/criar/docente", teacherController.creatTeacher)
app.get("/buscar/docentes", teacherController.getAllTeachers)
app.post("/muda/docente/turma", teacherController.changeClass)