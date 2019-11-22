function ArgumentDataObject(initValues) {
    this.id = null;
    this.added = false;
    this.argumentText = null;
    this.editMode = false;
    this.prefix = 'argument';

    return Object.assign(this, initValues);
}

function CategoryDataObject(initValues) {
    this.id = null;
    this.title = null;
    this.connectedArguments = [];
    this.isArgumentDefaultList = false;
    this.theme = 'h5p-discussion-category-default';
    this.useNoArgumentsPlaceholder = false;
    this.prefix = 'category';

    return Object.assign(this, initValues);
}

function getDnDId(element) {
    return element.prefix + "-" + element.id;
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

export {
    ArgumentDataObject,
    CategoryDataObject,
    getDnDId,
    debounce,
}