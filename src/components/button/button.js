
import './button.css'

export function button(options) {
    const element = document.createElement('button');
    element.className = `button ${options.className}`;
    element.innerText = options.text;

    if (options.onclick != null)
        element.onclick = options.onclick;

    if (options.type != null)
        element.type = options.type;

    return element;
}

export default function createButton(className, text, type = null, onclick = null) {
    return button({
        text: text,
        className: className,
        type: type,
        onclick: onclick
    });
}