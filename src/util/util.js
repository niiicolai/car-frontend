
export function redirect(to, delay = 0) {
    setTimeout(() => {
         const host = window.location.host;
         const protocol = window.location.protocol;
         window.location.href = `${protocol}//${host}/${to}`;
    }, delay);
}

export function render(template) {
    _render(template);
}

export function renderCollection(templates) {
    for (let i = 0; i < templates.length; i++) {
        _render(templates[i]);
    }
}

function _render(template) {
    if (typeof template == "object")
        document.body.appendChild(template);
    else {
        const element = document.createElement('div');
        element.innerHTML = template;
        document.body.appendChild(element);
    }
}
