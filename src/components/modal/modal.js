import { createSecondaryButton } from '../button/button';

import './modal.css'

export function modal(options) {
    const closeMethod = () => {
        toggleVisibility(document.getElementById(options.id));
    };

    const wrapper = createWrapper(options);
    const _modal = createModalElement(options, closeMethod);
    const _overlay = createOverlay(closeMethod);

    wrapper.appendChild(_overlay);
    wrapper.appendChild(_modal);

    return {element: wrapper, closeMethod: closeMethod};
}

export default function createModal(id, text, body) {
    const header = { text };
    return modal({id, header, body});
}

function createWrapper(options) {
    const wrapper = document.createElement('div');
    wrapper.id = options.id;
    wrapper.className = "modal-wrapper";
    wrapper.setAttribute('visibility', false);
    return wrapper;
}

function createOverlay(closeMethod) {
    const overlay = document.createElement('div');
    overlay.className = "overlay";
    overlay.onclick = closeMethod;
    return overlay;
}

function createModalElement(options, closeMethod) {
    const _modal = document.createElement('div');
    _modal.className = "modal";

    if (options.header != null) {
        const header = createHeader(options.header);
        _modal.appendChild(header);
    }
        
    if (options.body != null) {
        const body = createBody(options.body);
        _modal.appendChild(body);
    }

    const footer = createFooter(closeMethod);
    _modal.appendChild(footer);

    return _modal;
}

function createHeader(option) {
    const header = document.createElement('header');
    const title = document.createElement('h2');
    title.innerHTML = option.text;
    header.appendChild(title);
    return header;
}

function createBody(option) {
    const body = document.createElement('div');
    body.className = "body";
    body.appendChild(option);
    return body;
}

function createFooter(onclick) {
    const footer = document.createElement('footer');
    const button = createSecondaryButton('Close');
    button.onclick = onclick;
    footer.appendChild(button);
    return footer;
}

function toggleVisibility(e) {
    const state = e.getAttribute('visibility');
    const newState = (state == 'false' ? true : false);
    e.setAttribute('visibility', newState);
}

