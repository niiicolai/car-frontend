
import './button.css'

export default function button(options) {
    const element = document.createElement('button');
    element.className = `button ${options.className}`;
    element.innerText = options.text;

    if (options.onclick != null)
        element.onclick = options.onclick;

    if (options.type != null)
        element.type = options.type;

    return element;
}
