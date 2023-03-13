import link from '../link/link';

import './header.css'

export default function header(options) {
    const wrapper = createWrapper();
    const container = createContainer();
    const nav = createNavigation(options);

    container.appendChild(nav);
    wrapper.appendChild(container);

    return wrapper;
}

function createWrapper() {
    const element = document.createElement('header');
    element.className = `header`;
    return element;
}

function createContainer() {
    const element = document.createElement('div');
    element.className = `container`;
    return element;
}

function createNavigation(options) {
    const element = document.createElement('nav');
    for (let i = 0; i < options.links.length; i++) {
        const _link = link({
            className: 'info',
            text: options.links[i].text,
            href: options.links[i].href
        });
        element.appendChild(_link);
    }
    return element;
}