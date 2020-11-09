class IntegerSet {
    constructor (max) {
        this.max = max;
        this.arr = new Array(max+1);
        this.arr.fill(false);
    }
    inserir (valor) {
        if (valor <= this.max && valor >= 0) {
            this.arr[valor] = true;
        }
    }
    excluir (valor) {
        if (valor <= this.max && valor >= 0) {
            this.arr[valor] = false;
        }
    }
    conversaoString () {
        let str = "{";
        this.arr.forEach(function (e, i) {
            if (e) {
                str = str + i + ", ";
            }
        })
        if (str.length > 1) {
            str = str.slice(0, str.length - 2);
        }
        str = str + "}";
        return str;
    }
    static uniao (a, b) {
        let conjFinal;
        if (a.max > b.max) {
            conjFinal = new IntegerSet(a.max);
        } else {
            conjFinal = new IntegerSet(b.max);
        }
        a.arr.forEach(function (e, i) {
            if (e) {
                conjFinal.inserir(i);
            }
        })
        b.arr.forEach(function (e, i) {
            if (e) {
                conjFinal.inserir(i);
            }
        })
        return conjFinal;
    }
    static intersecao (a, b) {
        let conjFinal;
        if (a.max > b.max) {
            conjFinal = new IntegerSet(a.max);
        } else {
            conjFinal = new IntegerSet(b.max);
        }
        a.arr.forEach(function (e, i) {
            if (e && b.arr[i] === true) {
                conjFinal.inserir(i);
            }
        })
        return conjFinal;
    }
    static diferenca (a, b) {
        let conjFinal = new IntegerSet(a.max);
        a.arr.forEach(function (e, i) {
            if (e && (b.arr[i] === false || b.max < i)) {
                conjFinal.inserir(i);
            }
        })
        return conjFinal;
    }
}

let A = new IntegerSet(5);
let B = new IntegerSet(7);
let C;
//
A.inserir(0);
A.inserir(1);
A.inserir(5);
//
B.inserir(1);
B.inserir(2);
B.inserir(6);
B.inserir(7);
//
console.log("Conjunto A:", A.conversaoString());
console.log(A);
console.log("Conjunto B:", B.conversaoString());
console.log(B);
C = IntegerSet.diferenca(B,A);
console.log("Diferença (B - A):", C.conversaoString());
C = IntegerSet.diferenca(A,B);
console.log("Diferença (A - B):", C.conversaoString());
C = IntegerSet.uniao(A,B);
console.log("União (A + B):", C.conversaoString());
C = IntegerSet.uniao(B,A);
console.log("União (B + A):", C.conversaoString());
C = IntegerSet.intersecao(A,B);
console.log("Interseção (A, B):", C.conversaoString());
C = IntegerSet.intersecao(B,A);
console.log("Interseção (B, A):", C.conversaoString());