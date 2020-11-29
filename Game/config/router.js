// Módulo de rotas

const express = require('express');
const router = express.Router();

/*router.get("/", function (req, res) {
    res.render("index", {layout: false});
})*/

router.get("/sobre", function (req, res) {
    res.render("sobre", {layout: false});
})

router.use("/img", [
    express.static(`${__dirname}/../public/img`)
])

router.use(function (req, res) {
    res.statusCode = 404;
    res.send("404!");
})

module.exports = router;