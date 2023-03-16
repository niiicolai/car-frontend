import { render, redirect } from '../../util/util';
import { request, requestOptions } from '../../util/api';
import { setAuthenticated } from '../../model/authenticated';
import ToastHandler from '../../components/toast/toastHandler';
import createLink from '../../components/link/link';
import formBuilder from '../../components/form/form';
import template from './signup.html';

import './signup.css';

const redirectDelay = 5000;
const toastHandler = new ToastHandler(3000);


export default function signup() {
    const link = createLink('info', 'Already have an account?', '/login');
    const form = formBuilder()
        .input('username', 'text', 'username')
        .input('password', 'password', 'password')
        .input('email', 'email', 'e-mail')
        .input('firstName', 'text', 'first name')
        .input('lastName', 'text', 'last name')
        .input('street', 'text', 'street')
        .input('city', 'text', 'city')
        .input('zip', 'text', 'zip')
        .submit('Login', (data) => {
            const options = requestOptions('/members', 'POST', data);
            request(options, signupSuccess, toastHandler.danger.bind(toastHandler));
        })
        .build();

    render(template);
    document.getElementById('signup').appendChild(form);
    document.getElementById('signup').appendChild(link);
}
function signupSuccess(json) {
    setAuthenticated(json);
    redirect('login', redirectDelay);
    toastHandler.success('The signup was successful! Redirecting you to login.');
}

