(function mouseDots() {
    let intervaloAtualizar = 100;
    let lastChange = (new Date()).getTime();
    window.addEventListener("mousemove", (e) => {
        let timeNow = (new Date()).getTime();
        if (timeNow - lastChange > intervaloAtualizar) {
            if (document.getElementsByTagName("div").length > 7) {
                document.body.removeChild(document.getElementsByTagName("div")[0]);
            }
            div = document.createElement("div");
            div.setAttribute("class", "dot");
            div.style.left = `${e.clientX}px`;
            div.style.top = `${e.clientY}px`;
            document.body.appendChild(div);
            lastChange = timeNow;
        }
    });
})();