import { createElement } from "./helperFunctions.js";
import { Chess } from "chess.js";
import { chessBoard } from "./chessboard.js";

export function Init() {
    const board = new chessBoard();
    board.build();
}
