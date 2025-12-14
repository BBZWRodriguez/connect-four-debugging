import { Board, Player } from "./board.ts";

const board = new Board();
let player = Player.PlayerX;

board.output();

while (true) {
  const input = prompt(`Player ${player}:`) || "";
  const col = Number.parseInt(input);
  const row = board.makeMove(player, col);

if (row === -1) {
  console.log("Ungültiger Zug (Spalte voll oder ungültige Spalte). Bitte erneut versuchen.");
  continue; // gleicher Spieler nochmal
}

board.output();
console.log();

const winner = board.winner(player, row, col);
if (winner != Player.Nobody) {
  console.log(`Player ${player}: A winner is you!`);
  break;
}
player = player == Player.PlayerX ? Player.PlayerO : Player.PlayerX;

}
