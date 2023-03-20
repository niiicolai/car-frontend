import { createSecondaryButton } from '../button/button';

import './form.css'

export function formBuilder() {
    const builder = {};
    const elements = [];
    const form = createFormElement();

    builder.input = function(name, type, placeholder = null, value = null, label = null) {
        const inputElement = createInputWrapperElement({name, type, value, placeholder, label});
        elements.push(inputElement);
        return builder;
    };

    builder.submit = function(value, onclick) {
        const submitElement = createSubmitElement({value, onclick, type: 'submit'}, form);
        elements.push(submitElement);
        return builder;
    }

    builder.build = function() {
        for (let i = 0; i < elements.length; i++) {
            form.appendChild(elements[i]);
        }

        return form;
    }

    return builder;
}

export function clearForm(form) {
    const inputs = form.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

export function getBlankFields(data) {
    data = JSON.parse(data);
    let fields = [];
    for (let key in data) {
        if (data[key] == null ||
            data[key] == "") {
            fields.push(key);
        }
    }
    return fields;
}

function createFormElement() {
    const form = document.createElement('form');
    form.className = "form";
    form.onsubmit = (e) => e.preventDefault();
    return form;
}

function createInputWrapperElement(option) {
    const div = document.createElement('div');
    div.className = "form-control";

    if (option.label != null) {
        const labelElement = createLabelElement(option);
        div.appendChild(labelElement);
    }

    const inputElement = createInputElement(option);

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
    const button = createSecondaryButton(option.value, option.type);

    if (option.onclick != null)
        button.onclick = () => {
            const formData = Object.fromEntries(new FormData(form));
            const json = JSON.stringify(formData);
            option.onclick(json);
        };

    return button;
}