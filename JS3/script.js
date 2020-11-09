function counter(inicio) {
    let valor = 0;
    if (typeof inicio === 'number') {
        valor = inicio;
    }
    return function () {
        valor++;
        return valor;
    }
}

let incrementar = counter(1);

console.log('Primeira chamada ' + incrementar());
console.log('Segunda chamada ' + incrementar());
console.log('Terceira chamada ' + incrementar());