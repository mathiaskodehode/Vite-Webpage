import { createElement } from "./helperFunctions.js";
import { Chess } from "chess.js";
import { ChessBoard } from "./chessboard.js";

export function Init() {
    const game = new Chess();
    const board = new ChessBoard(game);
    board.build();
}
