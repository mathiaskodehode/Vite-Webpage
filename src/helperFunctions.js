import "./extensionMethods.js";

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
