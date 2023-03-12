
export function render(template) {
    const element = document.createElement('div');
    element.innerHTML = template.trim();
    document.body.appendChild(element);
}