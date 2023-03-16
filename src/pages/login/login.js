import { render, redirect } from '../../util/util';
import { request, requestOptions } from '../../util/api';
import { setAuthenticated } from '../../model/authenticated';
import ToastHandler from '../../components/toast/toastHandler';
import createLink from '../../components/link/link';
import formBuilder from '../../components/form/form';
import template from './login.html';

import './login.css';

const redirectDelay = 5000;

const toastHandler = new ToastHandler(3000);

export default function login() {
    const link = createLink('info', 'Doesn\'t have an account yet?', '/signup');
    const form = formBuilder()
        .input('username', 'text', 'username')
        .input('password', 'password', 'password')
        .submit('Login', (data) => {
            const options = requestOptions('/authenticate', 'POST', data);
            request(options, loginSuccess, toastHandler.danger.bind(toastHandler));
        })
        .build();


    render(template);
    document.getElementById('login').appendChild(form);
    document.getElementById('login').appendChild(link);
}

function loginSuccess(json) {
    setAuthenticated(json);
    redirect('profile', redirectDelay);
    toastHandler.success('The login was successful! Redirecting you to your profile.');
}

