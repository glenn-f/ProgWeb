// Módulo de rotas
const express = require('express');
const router = express.Router();
const mainController = require("../app/controllers/main");
const areaController = require("../app/controllers/area");
const cursoController = require("../app/controllers/curso");
//Main
router.get("/", mainController.index);
router.get("/game", mainController.game);
router.get("/sobre", mainController.sobre);
router.get("/ui", mainController.ui);
//Area
router.get("/area", areaController.index);
//Curso
router.get("/curso", cursoController.index)
router.get("/curso/create", cursoController.create)
router.post("/curso/create", cursoController.create)
router.get('/curso/:id' , cursoController.read);
router.get('/curso/update/:id' , cursoController.update);
router.post('/curso/update/:id' , cursoController.update);
router.get('/curso/remove/:id' , cursoController.remove);

//Outros
router.use(mainController.erro404);

module.exports = router;