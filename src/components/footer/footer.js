
import './footer.css'

export default function footer(options) {
    const wrapper = createWrapper();
    const container = createContainer();
    container.innerHTML = options.text;

    wrapper.appendChild(container);

    return wrapper;
}   

function createWrapper() {
    const element = document.createElement('footer');
    element.className = `footer`;
    return element;
}

function createContainer() {
    const element = document.createElement('div');
    element.className = `container`;
    return element;
}