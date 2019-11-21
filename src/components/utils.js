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

export {
    ArgumentDataObject,
    CategoryDataObject,
    getDnDId,
}