
import './link.css'

const PRIMARY_KEY = 'primary';
const SECONDARY_KEY = 'secondary';
const SUCCESS_KEY = 'success';
const INFO_KEY = 'info';
const WARNING_KEY = 'warning';
const DANGER_KEY = 'danger';


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

export function createPrimaryLink(text, href) {
    return createLink(PRIMARY_KEY, text, href);
}

export function createSecondaryLink(text, href) {
    return createLink(SECONDARY_KEY, text, href);
}

export function createSuccessLink(text, href) {
    return createLink(SUCCESS_KEY, text, href);
}

export function createInfoLink(text, href) {
    return createLink(INFO_KEY, text, href);
}

export function createWarningLink(text, href) {
    return createLink(WARNING_KEY, text, href);
}

export function createDangerLink(text, href) {
    return createLink(DANGER_KEY, text, href);
}
