// Módulo de rotas

const express = require('express');
const mainController = require("../app/controllers/main");
const router = express.Router();

router.get("/", mainController.index);

router.get("/sobre", mainController.sobre);

router.use(mainController.erro404);

module.exports = router;