import { createElement, realToRegexRange } from "./helperFunctions.js";

export function Init() {
    createElement("h1", { innerText: "Open the console" });

    // package used https://www.npmjs.com/package/to-regex-range
    console.log("using regex checking numbers from 0 to 20 to see which ones are between 5 (inclusive) and 15 (inclusive)");
    for (let i = 0; i <= 20; i++) {
        console.log(i, realToRegexRange(5, 15).test(i));
    }
}
