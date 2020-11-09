const arr = ["Pedra", "Papel", "Tesoura"];
const jokenpo = [[0,-1, 1],[1,0,-1],[-1, 1,0]];
let vitorias = 0;
let rodadas = 1;
let scan;
let computador;
do {
    console.log("Escolha sua jogada:\n1 - Pedra\n2 - Papel\n3 - Tesoura");
    scan = parseInt(prompt(`Rodada nº ${rodadas}
Escolha sua jogada:
1 - Pedra
2 - Papel
3 - Tesoura`));
    if (scan == NaN || scan > 3 || scan < 1) {
        console.log("Você digitou um valor inválido. Fim de jogo!");
        break;
    }
    computador = Math.ceil(Math.random() * 3);
    scan--;
    computador--;
    console.log("Você jogou " + arr[scan] + ".");
    console.log("O computador jogou " + arr[computador] + ".");
    if (scan == computador) {
        console.log("A rodada empatou!");
    } else if (jokenpo[scan][computador] == 1) {
        console.log("Voce ganhou!");
        vitorias++;
    } else {
        break;
    }
    rodadas++;
} while (true);
console.log("Você perdeu! Total de vitórias:", vitorias);