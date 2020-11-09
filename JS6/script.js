(function () {
    let botao = document.getElementById("butao");
    botao.onclick = function () {
        let largura = document.getElementById("l1").value;
        document.getElementById("box").style.width = (largura*5 + 15) + "px";
        for (let i = 1; i <= 5; i++) {
            document.getElementById("div" + i).style.width = largura + "px";
            let altura = document.getElementById("b" + i).value;
            document.getElementById("div" + i).style.height = altura + "px";
        }
    }
})();