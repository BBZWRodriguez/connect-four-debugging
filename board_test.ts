import { assertEquals } from "@std/assert";
import { Board, Player } from "./board.ts";

Deno.test("column full: winner() should not crash when makeMove returns -1", () => {
  const board = new Board();

  // Spalte 0 komplett füllen (6 Zeilen)
  for (let i = 0; i < 6; i++) {
    const p = i % 2 === 0 ? Player.PlayerX : Player.PlayerO;
    const row = board.makeMove(p, 0);
    assertEquals(row, 5 - i); // fällt von unten nach oben
  }

  // 7. Stein in gleiche Spalte => ungültig
  const row = board.makeMove(Player.PlayerX, 0);
  assertEquals(row, -1);

  // BUG: Das wirft aktuell eine Exception (und crasht damit das Spiel)
  let threw = false;
  try {
    const w = board.winner(Player.PlayerX, row, 0);
    assertEquals(w, Player.Nobody);
  } catch (_e) {
    threw = true;
  }
  assertEquals(threw, false);
});