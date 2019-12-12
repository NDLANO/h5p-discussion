export function getBreakpoints() {
    return [
        {
            "className": "h5p-medium-tablet-size",
            "shouldAdd": width => width >= 500 && width < 768
        },
        {
            "className": "h5p-large-tablet-size",
            "shouldAdd": width => width >= 768 && width < 1024
        },
        {
            "className": "h5p-large-size",
            "shouldAdd": width => width >= 1024
        },
    ];
}

export function ArgumentDataObject(initValues) {
    this.id = null;
    this.added = false;
    this.argumentText = null;
    this.editMode = false;
    this.prefix = 'argument';

    return Object.assign(this, initValues);
}

export function CategoryDataObject(initValues) {
    this.id = null;
    this.title = null;
    this.connectedArguments = [];
    this.isArgumentDefaultList = false;
    this.theme = 'h5p-discussion-category-default';
    this.useNoArgumentsPlaceholder = false;
    this.prefix = 'category';
    this.actionTargetContainer = false;

    return Object.assign(this, initValues);
}

export function ActionMenuDataObject(initValues) {
    this.id = null;
    this.title = null;
    this.activeCategory = null;
    this.onSelect = null;
    this.type = null;
    this.label = null;

    return Object.assign(this, initValues);
}

export function getDnDId(element) {
    return element.prefix + "-" + element.id;
}

export function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export function stripHTML(html) {
    if (html) {
        const elm = document.createElement('span');
        elm.innerHTML = html;
        return elm.textContent.trim();
    }

    return html;
}

export function sanitizeParams(params) {
    const filterResourceList = element => Object.keys(element).length !== 0 && element.constructor === Object;
    const handleObject = sourceObject => {
        if( sourceObject === undefined || sourceObject === null || !filterResourceList(sourceObject)){
            return sourceObject;
        }
        return Object.keys(sourceObject).reduce((aggregated, current) => {
            aggregated[current] = stripHTML(sourceObject[current]);
            return aggregated;
        }, {});
    };

    let {
        header,
        description,
        argumentsList,
        summary,
        summaryHeader,
        summaryInstruction,
        l10n,
        resourceReport,
        resources,
    } = params;

    if( Array.isArray(argumentsList) ){
        argumentsList = argumentsList.map(argument => stripHTML(argument));
    }

    if (resources.params.resourceList && resources.params.resourceList.filter(filterResourceList).length > 0) {
        resources.params = {
            ...resources.params,
            l10n: handleObject(resources.params.l10n),
            resourceList: resources.params.resourceList.filter(filterResourceList).map(resource => {
                const {
                    title,
                    introduction,
                } = resource;
                return {
                    ...resource,
                    title: stripHTML(title),
                    introduction: stripHTML(introduction),
                };
            })
        }
    }

    return {
        ...params,
        argumentsList,
        resources,
        header: stripHTML(header),
        description: stripHTML(description),
        summary: stripHTML(summary),
        summaryHeader: stripHTML(summaryHeader),
        summaryInstruction: stripHTML(summaryInstruction),
        l10n: handleObject(l10n),
        resourceReport: handleObject(resourceReport),
    }
}
