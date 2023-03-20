import { render, redirect } from '../../util/util';
import { request, requestOptions } from '../../util/api';
import { setAuthenticated } from '../../model/authenticated';
import { createInfoLink } from '../../components/link/link';
import { formBuilder, getBlankFields } from '../../components/form/form';
import createIconBadge from '../../components/iconBadge/iconBadge';
import ToastHandler from '../../components/toast/toastHandler';
import template from './login.html';

import './login.css';

const redirectDelay = 2000;
const toastHandler = new ToastHandler(3000);
const blankFieldsMessage = "The following fields are required: ";

export default function login() {
    initializeLogin();
}

function initializeLogin() {
    const link = createInfoLink('Doesn\'t have an account yet?', '/signup');
    const form = formBuilder()
        .input('username', 'text', 'username', 'user1')
        .input('password', 'password', 'password', 'pass')
        .submit('Login', (data) => {

            let blankFields = getBlankFields(data);
            if (blankFields.length > 0) {
                toastHandler.secondary(blankFieldsMessage + blankFields.toString());
                return;
            }

            const options = requestOptions('/authenticate', 'POST', data);
            request(options, loginSuccess, toastHandler.secondary.bind(toastHandler));
        })
        .build();

    render(template);
    document.getElementById('login').appendChild(form);
    document.getElementById('login').appendChild(link);
}

function loginSuccess(json) {
    const icon = createIconBadge(2, 'secondary', 'fa-regular fa-circle-check', 'fa-solid fa-circle-notch fa-spin');
    document.getElementById('login').innerHTML = "";
    document.getElementById('login').appendChild(icon);

    setAuthenticated(json);
    redirect('profile', redirectDelay);
    toastHandler.success('The login was successful! Redirecting you to your profile.');
}


