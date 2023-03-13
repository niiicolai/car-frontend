
import './toast.css'

export default function toast(options) {
    const element = document.createElement('div');
    element.className = `toast ${options.className} show`;
    element.innerText = options.text;

    // Initiate self-destructions.
    setTimeout(() => {
        element.className = `toast ${options.className} hide`;
        setTimeout(() => {
            element.remove();
        }, 500);
    }, options.displayTime);

    return element;
}
