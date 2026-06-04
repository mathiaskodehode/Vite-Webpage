import { createElement } from "./helperFunctions.js";
import { Chess } from "chess.js";
import { ChessBoard } from "./chessboard.js";

export function Init() {
    const board = new ChessBoard();
    board.build();
}
