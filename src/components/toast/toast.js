
import './toast.css'

function toast(options) {
    const element = document.createElement('div');
    element.className = `toast ${options.className} show`;
    element.innerText = options.text;

    // Initiate self-destructions.
    setTimeout(() => {
        element.className = `toast ${options.className} hide`;
        setTimeout(() => element.remove(), 500);
    }, options.displayTime);

    return element;
}

export default function insertToast(className, text, displayTime) {
    const _toast = toast({
        className: className,
        text: text,
        displayTime: displayTime
    });

    document.body.appendChild(_toast);
}