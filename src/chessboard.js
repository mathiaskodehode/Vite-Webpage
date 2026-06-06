import { createElement } from "./helperFunctions";

export class ChessBoard {
    #root = null;
    #squares = Array.from({ length: 8 }, () => Array(8));
    #selectedSquare = null;
    #legalMoves = [];
    #lastMove = null;
    #game = null;
    
    constructor(game) {
        this.#game = game;
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                this.clearSelection();
            }
        });
    }
    
    get squares() {
        return this.#squares;
    }
    
    // TODO: add option for flipping the board (reverse)

    build() {
        this.#root = createElement("div", { classList: "board" });
        for (let y = 7; y >= 0; y--) {
            for (let x = 0; x < 8; x++) {
                const color = (x + y) % 2 === 0 ? "black" : "white";
                const element = createElement(
                    "div",
                    {
                        classList: ["square", color],
                        onclick: () => this.handleSquareClick(this.#squares[x][y]),
                    },
                    this.#root,
                );
                this.#squares[x][y] = new ChessSquare(x, y, element);
            }
        }
        this.renderPosition();
        return this.#root;
    }

    getSquare(notation) {
        const x = notation.charCodeAt(0) - 97;
        const y = Number(notation[1]) - 1;
        return this.#squares[x][y];
    }

    clearLegalMoves() {
        for (const move of this.#legalMoves) {
            this.getSquare(move.to).element.classList.remove("legalMove");
        }
        this.#legalMoves = [];
    }

    showLegalMoves(square) {
        this.clearLegalMoves();
        const moves = this.#game.moves({
            square: square.notation,
            verbose: true,
        });
        this.#legalMoves = moves;
        for (const move of moves) {
            this.getSquare(move.to).element.classList.add("legalMove");
        }
    }

    clearSelection() {
        if (this.#selectedSquare) {
            this.#selectedSquare.element.classList.remove("selected");
        }
        this.clearLegalMoves();
        this.#selectedSquare = null;
    }

    selectSquare(square) {
        this.clearSelection();
        this.#selectedSquare = square;
        square.element.classList.add("selected");
        this.showLegalMoves(square);
    }

    clearLastMoveHighlight() {
        const highlighted = this.#root.querySelectorAll(".lastMove");
        for (const element of highlighted) {
            element.classList.remove("lastMove");
        }
    }

    showLastMove(move) {
        this.clearLastMoveHighlight();
        this.getSquare(move.from).element.classList.add("lastMove");
        this.getSquare(move.to).element.classList.add("lastMove");
        this.#lastMove = move;
    }

    addPiece(piece) {
        piece.square.piece = piece;
    }

    renderPosition() {
        // TODO: only replace what's different from last turn;

        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                const square = this.#squares[x][y];
                square.piece = null;
                square.element.replaceChildren();
            }
        }

        const board = this.#game.board();
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const pieceData = board[y][x];
                if (!pieceData) continue;
                const piece = new ChessPiece(
                    pieceData.type,
                    pieceData.color === "w" ? "white" : "black",
                    this.#squares[x][7 - y],
                );
                this.addPiece(piece);
            }
        }

        if (this.#lastMove) {
            this.showLastMove(this.#lastMove);
        }
    }

    handleSquareClick(square) {
        if (!this.#selectedSquare) {
            if (!square.piece) return;
            this.selectSquare(square);
            return;
        } else if (square === this.#selectedSquare) {
            this.clearSelection();
            return;
        } else if (square.piece && square.piece.color === this.#selectedSquare.piece.color) {
            this.selectSquare(square);
            return;
        }

        let move;
        try {
            move = this.#game.move({
                from: this.#selectedSquare.notation,
                to: square.notation,
                promotion: "q",
            });
        } catch {
            console.log("illegal move attempted");
        }
        this.clearSelection();
        if (!move) return;
        this.showLastMove(move);
        this.renderPosition();
    }
}

class ChessSquare {
    #element;
    #x;
    #y;
    #piece = null;

    constructor(x, y, element) {
        this.#x = x;
        this.#y = y;
        this.#element = element;
    }

    get notation() {
        return ["a", "b", "c", "d", "e", "f", "g", "h"][this.#x] + (this.#y + 1);
    }

    get element() {
        return this.#element;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get piece() {
        return this.#piece;
    }

    set piece(piece) {
        this.#piece = piece;
    }
}

class ChessPiece {
    #type;
    #color;
    #square;
    #element;

    constructor(type, color, square) {
        this.#type = type;
        this.#color = color;
        this.#square = square;

        this.#element = createElement(
            "img",
            {
                src: this.getImagePath(),
                classList: "piece",
                draggable: false,
            },
            square.element,
        );
    }

    get type() {
        return this.#type;
    }

    get color() {
        return this.#color;
    }

    get square() {
        return this.#square;
    }

    get element() {
        return this.#element;
    }

    getImagePath() {
        const names = {
            p: "Pawn",
            n: "Knight",
            b: "Bishop",
            r: "Rook",
            q: "Queen",
            k: "King",
        };

        return `../assets/${this.color}${names[this.type]}.svg`;
    }
}
