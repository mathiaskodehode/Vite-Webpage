import { createElement } from "./helperFunctions";

export class chessBoard {
    #root = null;

    build() {
        this.#root = createElement("div", { classList: "board" });
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                console.log(x, y);
                const isWhite = (x + y) % 2 === 0;
                const square = createElement("div", { classList: ["square", isWhite ? "white" : "black"] }, this.#root);
            }
        }
    }
}
