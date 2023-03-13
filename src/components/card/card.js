
import './card.css'

export default function card(options) {
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
        p.innerText = option.text;
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