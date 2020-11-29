const express = require("express");

function index(req, res) {
    res.render("main/index");
}

function sobre(req, res) {
    res.render("main/sobre");
}

function erro404(req, res) {
    res.statusCode = 404;
    res.send("404!");
}

module.exports = {index, sobre, erro404};