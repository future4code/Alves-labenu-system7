import app from "./app";
import buscaEstudantePorNome from "./endpoint/buscaEstudantePorNome";
import buscarTodosDocentes from "./endpoint/buscarTodosDocentes";
import criarDocente from "./endpoint/criarDocente";
import criarEstudante from "./endpoint/criarEstudante";
import criarTurma from "./endpoint/criarTurma";
import mudaDocenteTurma from "./endpoint/mudaDocenteTurma";
import mudaEstudanteTurma from "./endpoint/mudaEstudanteTurma";
import mudaTurmaModulo from "./endpoint/mudaTurmaModulo";
import buscarTurmasAtivas from "./endpoint/buscarTurmasAtivas";

app.post('/criar/turma',criarTurma)
app.get("/buscar/turmas/ativas",buscarTurmasAtivas)
app.post("/muda/turma/modulo",mudaTurmaModulo)

app.post("/criar/estudante",criarEstudante)
app.get("/estudante/:nome",buscaEstudantePorNome)
app.post("/muda/estudante/turma",mudaEstudanteTurma)

app.post("/criar/docente",criarDocente)
app.get("/buscar/docentes",buscarTodosDocentes)
app.post("/muda/docente/turma",mudaDocenteTurma)