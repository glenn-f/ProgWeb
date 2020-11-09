document.getElementById("butao").onclick = function () {
    let raio = document.getElementById("raio").value;
    let area;
    let circ;
    area = Math.round(Math.PI * (raio*raio)*100)/100;
    circ = Math.round(2 * Math.PI * raio * 100)/100;
    document.getElementById("area").value = area;
    document.getElementById("circ").value = circ;
}