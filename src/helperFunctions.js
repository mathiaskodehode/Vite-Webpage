import "./extensionMethods.js";
import toRegexRange from "to-regex-range";

export function createElement(tag, options = {}, parent = null) {
    if (typeof options !== "object") throw new Error("OPTIONS MUST BE AN OBJECT");
    const element = document.createElement(tag);
    if (parent instanceof HTMLElement) {
        parent.appendChild(element);
    } else {
        document.body.appendChild(element);
    }
    element.applyOptions(options);
    return element;
}

export function realToRegexRange(min, max = null) {
    return new RegExp(`^${toRegexRange(min, max)}$`);
}
