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

HTMLElement.prototype.applyOptions = function (options, overrideExistingValues = false) {
    if (options === null || typeof options !== "object" || Array.isArray(options)) throw new Error("OPTIONS MUST BE AN OBJECT");
    Object.entries(options).forEach(([key, value]) => {
        if (this[key] instanceof DOMTokenList) {
            if (overrideExistingValues) this[key].value = "";
            if (Array.isArray(value)) {
                value.forEach(e => this[key].add(e));
            } else {
                this[key].add(value);
            }
        }
    });
};
