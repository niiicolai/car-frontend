
import './link.css'

export function link(options) {
    const element = document.createElement('a');
    element.className = `link ${options.className}`;
    element.innerText = options.text;
    element.href = options.href;
    element.setAttribute('data-navigo', '');

    return element;
}


export default function createLink(className, text, href) {
    return link({
        className: className,
        text: text,
        href: href
    });
}
