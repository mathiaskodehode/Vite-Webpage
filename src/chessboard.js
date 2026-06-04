import { createElement } from "./helperFunctions";

export class ChessBoard {
    #root = null;
    #squares = Array.from({ length: 8 }, () => Array(8));
    #pieces = [];
    #selectedPiece = null;

    get squares() {
        return this.#squares;
    }

    // add option for flipping the board (reverse)
    build() {
        this.#root = createElement("div", { classList: "board" });
        for (let y = 0; y < 8; y++) {
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
        console.log(this.#squares);
        this.setupPosition();
        return this.#root;
    }

    addPiece(piece) {
        this.#pieces.push(piece);
        piece.square.piece = piece;
    }

    setupPosition() {
        for (let x = 0; x < 8; x++) {
            this.addPiece(new ChessPawn("white", this.#squares[x][6]));
            this.addPiece(new ChessPawn("black", this.#squares[x][1]));
        }
        this.addPiece(new ChessRook("black", this.#squares[0][0]));
        this.addPiece(new ChessRook("black", this.#squares[7][0]));
        this.addPiece(new ChessRook("white", this.#squares[0][7]));
        this.addPiece(new ChessRook("white", this.#squares[7][7]));

        this.addPiece(new ChessKnight("black", this.#squares[1][0]));
        this.addPiece(new ChessKnight("black", this.#squares[6][0]));
        this.addPiece(new ChessKnight("white", this.#squares[1][7]));
        this.addPiece(new ChessKnight("white", this.#squares[6][7]));

        this.addPiece(new ChessBishop("black", this.#squares[2][0]));
        this.addPiece(new ChessBishop("black", this.#squares[5][0]));
        this.addPiece(new ChessBishop("white", this.#squares[2][7]));
        this.addPiece(new ChessBishop("white", this.#squares[5][7]));

        this.addPiece(new ChessQueen("black", this.#squares[3][0]));
        this.addPiece(new ChessQueen("white", this.#squares[3][7]));

        this.addPiece(new ChessKing("black", this.#squares[4][0]));
        this.addPiece(new ChessKing("white", this.#squares[4][7]));
    }

    handleSquareClick(square) {
        if (this.#selectedPiece) {
            this.#selectedPiece.square.element.classList.remove("selected");
            this.#selectedPiece.move(square);
            // TODO: make sure this is a legal move
            // TODO: handle special rules
            this.#selectedPiece = null;
        } else if (square.piece) {
            this.#selectedPiece = square.piece;
            square.element.classList.add("selected");
        }
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
        // TODO: make sure this is legal
        this.#piece = piece;
    }
}

class ChessPiece {
    #color;
    #square;
    #element;

    constructor(color, square) {
        this.#color = color;
        this.#square = square;
        this.#element = createElement(
            "img",
            {
                src: this.getImagePath(),
                classList: "piece",
                draggable: false,
            },
            this.#square.element,
        );
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

    capture() {
        this.#element.remove();
        this.#square.piece = null;
        this.#square = null;
    }

    move(targetSquare) {
        // TODO: handle castling or w/e
        this.#square.piece = null;
        if (targetSquare.piece) {
            targetSquare.piece.capture();
        }
        targetSquare.element.appendChild(this.#element);
        this.#square = targetSquare;
        targetSquare.piece = this;
    }

    getImagePath() {
        throw new Error('Abstract function \"getImagePath\" must be implemented by subclass!');
    }
}

class ChessPawn extends ChessPiece {
    getImagePath() {
        return `../assets/${this.color}Pawn.svg`;
    }
}

class ChessKnight extends ChessPiece {
    getImagePath() {
        return `../assets/${this.color}Knight.svg`;
    }
}

class ChessBishop extends ChessPiece {
    getImagePath() {
        return `../assets/${this.color}Bishop.svg`;
    }
}

class ChessRook extends ChessPiece {
    getImagePath() {
        return `../assets/${this.color}Rook.svg`;
    }
}

class ChessQueen extends ChessPiece {
    getImagePath() {
        return `../assets/${this.color}Queen.svg`;
    }
}

class ChessKing extends ChessPiece {
    getImagePath() {
        return `../assets/${this.color}King.svg`;
    }
}
