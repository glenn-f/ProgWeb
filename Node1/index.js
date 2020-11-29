const http = require('http');
const fs = require('fs');
const diretorio = process.argv[2];
const server = http.createServer(function(req,res) {
    if (diretorio !== undefined) {
        fs.readdir(diretorio, (err, files) => {
            if (err) {
                res.write(`Diretorio '${diretorio}' nao encontrado.`);
            }
            else {
                res.write(`Diretorio '${diretorio}':\n`);
                files.forEach(file => {
                    res.write(`${file}\n`);
                });
            }
            res.end();
        });
    } else {
        res.write("Nenhum diretorio a exibir.");
        res.end();
    }
});

server.listen(3000);