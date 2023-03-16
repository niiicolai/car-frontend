
import './card.css'

export function card(options) {
    const wrapper = createWrapper(options);

    if (options.header) {
        const header = createHeader(options.header);
        wrapper.appendChild(header);
    }

    if (options.body) {
        const body = createBody(options.body);
        wrapper.appendChild(body);
    }

    if (options.footer) {
        const footer = createFooter(options.footer);
        wrapper.appendChild(footer);
    }
    return wrapper;
}

export default function cardBuilder() {
    const builder = {};
    const options = {header: {}, body: {}, footer: {}};

    builder.className = function(className) {
        options.className = className;
        return builder;
    };

    builder.title = function(title) {
        options.header.text = title;
        return builder;
    };

    builder.image = function(src, alt) {
        options.body.imgSrc = src;
        options.body.imgAlt = alt;
        return builder;
    };

    builder.text = function(text) {
        options.body.text = text;
        return builder;
    };

    builder.footer = function(text) {
        options.footer.text = text;
        return builder;
    };

    builder.build = function() {
        return card(options);
    }

    return builder;
}

function createWrapper(options) {
    const element = document.createElement('div');
    element.className = `card ${options.className}`;
    return element;
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

    if (option.imgSrc != null) {
        const img = document.createElement('img');
        img.src = option.imgSrc;
        img.alt = option.imgAlt;
        body.appendChild(img);
    }

    if (option.text != null) {
        const p = document.createElement('p');
        p.innerHTML = option.text;
        body.appendChild(p);
    }

    return body;
}

function createFooter(option) {
    const footer = document.createElement('footer');
    const p = document.createElement('p');
    p.innerHTML = option.text;
    footer.appendChild(p);
    return footer;
}