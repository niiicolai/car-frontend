import { render, redirect } from '../../util/util';
import { request, requestOptions } from '../../util/api';
import { setAuthenticated } from '../../model/authenticated';
import { createInfoLink } from '../../components/link/link';
import createIconBadge from '../../components/iconBadge/iconBadge';
import ToastHandler from '../../components/toast/toastHandler';
import formBuilder from '../../components/form/form';
import template from './signup.html';

import './signup.css';

const redirectDelay = 5000;
const toastHandler = new ToastHandler(3000);

export default function signup() {
    const link = createInfoLink('Already have an account?', '/login');
    const form = formBuilder()
        .input('username', 'text', 'username')
        .input('password', 'password', 'password')
        .input('email', 'email', 'e-mail')
        .input('firstName', 'text', 'first name')
        .input('lastName', 'text', 'last name')
        .input('street', 'text', 'street')
        .input('city', 'text', 'city')
        .input('zip', 'text', 'zip')
        .submit('Signup', (data) => {
            const options = requestOptions('/members', 'POST', data);
            request(options, signupSuccess, toastHandler.secondary.bind(toastHandler));
        })
        .build();

    render(template);
    document.getElementById('signup').appendChild(form);
    document.getElementById('signup').appendChild(link);
}
function signupSuccess(json) {
    const icon = createIconBadge(3, 'secondary', 'fa-regular fa-circle-check', 'fa-solid fa-circle-notch fa-spin');
    document.getElementById('signup').innerHTML = "";
    document.getElementById('signup').appendChild(icon);

    redirect('login', redirectDelay);
    toastHandler.success('The signup was successful! Redirecting you to login.');
}

