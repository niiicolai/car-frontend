
import './button.css'

const PRIMARY_KEY = 'primary';
const SECONDARY_KEY = 'secondary';
const SUCCESS_KEY = 'success';
const INFO_KEY = 'info';
const WARNING_KEY = 'warning';
const DANGER_KEY = 'danger';

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

export function createButton(className, text, type = null, onclick = null) {
    return button({
        text: text,
        className: className,
        type: type,
        onclick: onclick
    });
}

export function createPrimaryButton(text, type = null, onclick = null) {
    return createButton(PRIMARY_KEY, text, type, onclick);
}

export function createSecondaryButton(text, type = null, onclick = null) {
    return createButton(SECONDARY_KEY, text, type, onclick);
}

export function createSuccessButton(text, type = null, onclick = null) {
    return createButton(SUCCESS_KEY, text, type, onclick);
}

export function createInfoButton(text, type = null, onclick = null) {
    return createButton(INFO_KEY, text, type, onclick);
}

export function createWarningButton(text, type = null, onclick = null) {
    return createButton(WARNING_KEY, text, type, onclick);
}

export function createDangerButton(text, type = null, onclick = null) {
    return createButton(DANGER_KEY, text, type, onclick);
}
