const express = require("express");

function index(req, res) {
    res.render("main/index");
}

function game(req, res) {
    res.render("main/game");
}

function sobre(req, res) {
    res.render("main/sobre");
}

function ui(req, res) {
    res.render("main/ui");
}

function erro404(req, res) {
    res.statusCode = 404;
    res.render("main/404", {layout: false});
}

module.exports = {index, sobre, ui, game, erro404};