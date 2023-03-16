import createLink from "../link/link";

import './header.css'

export default function headerBuilder() {
    const builder = {};
    const options = {title: 'No-title', links: []};

    builder.title = function(title) {
        options.title = title;
        return builder;
    };

    builder.navLink = function(text, href) {
        options.links.push({text, href});
        return builder;
    };

    builder.build = function() {
        return header(options);
    }

    return builder;
}

function header(options) {
    const wrapper = createWrapper();
    const container = createContainer();
    const title = createTitle(options.title);
    const nav = createNavigation(options.links);

    container.appendChild(title);
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

function createTitle(title) {
    const element = document.createElement('h2');
    element.innerText = title;
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