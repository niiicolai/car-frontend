
import './link.css'

export default function link(options) {
    const element = document.createElement('a');
    element.className = `link ${options.className}`;
    element.innerText = options.text;
    element.href = options.href;

    return element;
}
