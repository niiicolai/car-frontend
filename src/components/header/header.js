import createLink from "../link/link";

import './header.css'

export default function headerBuilder() {
    const builder = {};
    const links = [];

    builder.navLink = function(text, href) {
        links.push({text, href});
        return builder;
    };

    builder.callback = function(callback) {
        callback(builder);
        return builder;
    };

    builder.build = function() {
        return header(links);
    }

    return builder;
}

function header(links) {
    const wrapper = createWrapper();
    const container = createContainer();
    const nav = createNavigation(links);

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

function createNavigation(links) {
    const element = document.createElement('nav');
    for (let i = 0; i < links.length; i++) {
        const link = createLink('info', links[i].text, links[i].href);
        element.appendChild(link);
    }
    return element;
}