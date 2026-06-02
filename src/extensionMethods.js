Array.prototype.remove = function (element) {
    const index = this.indexOf(element);
    if (index !== -1) this.splice(index, 1);
    else return false;
    return true;
};

Array.prototype.random = function () {
    const index = Math.floor(Math.random() * this.length);
    return this[index];
};

HTMLElement.prototype.applyOptions = function (options) {
    if (typeof options !== "object") throw new Error("OPTIONS MUST BE AN OBJECT");
    Object.entries(options).forEach(kvp => {
        if (this[kvp[0]] instanceof DOMTokenList) this[kvp[0]].add(kvp[1]);
        else this[kvp[0]] = kvp[1];
    });
};
