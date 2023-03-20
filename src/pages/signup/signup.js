import { render, redirect } from '../../util/util';
import { request, requestOptions } from '../../util/api';
import { createInfoLink } from '../../components/link/link';
import createIconBadge from '../../components/iconBadge/iconBadge';
import ToastHandler from '../../components/toast/toastHandler';
import { formBuilder, getBlankFields } from '../../components/form/form';
import template from './signup.html';

import './signup.css';

const redirectDelay = 5000;
const toastHandler = new ToastHandler(3000);

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
const mailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

const blankFieldsMessage = "The following fields are required: ";
const invalidMailMessage = "The e-mail is invalid!";
const weakPasswordMessage = "\
Password must contain: \
    small letters (a-z); \
    Big letters (A-Z); \
    Numbers (0-9); \
    Special characters (!, @, #, etc.);";

export default function signup() {
    const link = createInfoLink('Already have an account?', '/login');
    const form = formBuilder()
        .input('username', 'text', 'username')
        .input('password', 'password', 'password')
        .input('email', 'text', 'e-mail')
        .input('firstName', 'text', 'first name')
        .input('lastName', 'text', 'last name')
        .input('street', 'text', 'street')
        .input('city', 'text', 'city')
        .input('zip', 'text', 'zip')
        .submit('Signup', (data) => {

            let blankFields = getBlankFields(data);
            if (blankFields.length > 0) {
                toastHandler.secondary(blankFieldsMessage + blankFields.toString());
                return;
            }

            if (isPasswordWeak(data)) {
                toastHandler.secondary(weakPasswordMessage);
                return;
            }

            if (isEmailInvalid(data)) {
                toastHandler.secondary(invalidMailMessage);
                return;
            }

            const options = requestOptions('/members', 'POST', data);
            request(options, signupSuccess, toastHandler.secondary.bind(toastHandler));
        })
        .build();

    render(template);
    document.getElementById('signup').appendChild(form);
    document.getElementById('signup').appendChild(link);
}

function isPasswordWeak(data) {
    const password = JSON.parse(data).password;
    return !passwordRegex.test(password);
}

function isEmailInvalid(data) {
    const email = JSON.parse(data).email;
    return !mailRegex.test(email);
}

function signupSuccess(json) {
    const icon = createIconBadge(3, 'secondary', 'fa-regular fa-circle-check', 'fa-solid fa-circle-notch fa-spin');
    document.getElementById('signup').innerHTML = "";
    document.getElementById('signup').appendChild(icon);

    redirect('login', redirectDelay);
    toastHandler.success('The signup was successful! Redirecting you to login.');
}

