import button from '../button/button';

import './form.css'

export default function form(options) {
    const wrapper = document.createElement('form');
    wrapper.className = "form";
    wrapper.onsubmit = (e) => e.preventDefault();

    for (let i = 0; i < options.length; i++) {
        const element = createInputWrapperElement(options[i], wrapper);
        wrapper.appendChild(element);
    }

    return wrapper;
}

function createInputWrapperElement(option, form) {
    const div = document.createElement('div');
    div.className = "form-control";

    if (option.label != null) {
        const labelElement = createLabelElement(option);
        div.appendChild(labelElement);
    }

    let inputElement = null;

    if (option.type == 'submit')
        inputElement = createSubmitElement(option, form);
    else
        inputElement = createInputElement(option);

    div.appendChild(inputElement);

    return div;
}

function createLabelElement(option) {
    const element = document.createElement('label');
    element.innerHTML = option.label;
    return element;
}

function createInputElement(option) {
    const element = document.createElement('input');

    if (option.name != null)
        element.name = option.name;

    if (option.type != null)
        element.type = option.type;

    if (option.value != null)
        element.value = option.value;

    if (option.placeholder != null)
        element.placeholder = option.placeholder;

    return element;
}

function createSubmitElement(option, form) {
    const _button = button({
        text: option.value,
        className: 'success',
        type: option.type
    });

    if (option.onclick != null)
        _button.onclick = () => {
            const formData = Object.fromEntries(new FormData(form));
            const json = JSON.stringify(formData);
            option.onclick(json);
        };

    return _button;
}