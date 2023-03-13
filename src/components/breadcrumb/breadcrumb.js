import './breadcrumb.css'

export default function breadcrumb(options) {
    const wrapper = document.createElement('div');
    wrapper.className = "breadcrumb container";

    for (let i = 0; i < options.length; i++) {
        const element = createElement(options[i]);
        wrapper.appendChild(element);

        if (options.length > 1 && i != options.length - 1) {
            const divider = createDividerElement();
            wrapper.appendChild(divider);
        }
    }

    return wrapper;
}

function createElement(option) {
    if (option.isCurrentPage) {
        return createCurrentElement(option.text);
    } else {
        return createAnchorElement(option.src, option.text);
    }
}

function createCurrentElement(text) {
    const element = document.createElement('span');
    element.className = "current";
    element.innerHTML = text;
    return element;
}

function createAnchorElement(src, text) {
    const element = document.createElement('a');
    element.href = src;
    element.innerHTML = text;
    return element;
}

function createDividerElement() {
    const element = document.createElement('span');
    element.className = "divider";
    element.innerHTML = "/";
    return element;
}