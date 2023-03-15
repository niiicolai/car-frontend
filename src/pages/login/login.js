import { render } from '../../util/util';
import { requestPost } from '../../util/api';
import { setAuthenticated } from '../../model/authenticated';
import link from '../../components/link/link';
import toast from '../../components/toast/toast';
import form from '../../components/form/form';
import template from './login.html';

import './login.css';

const redirectDelay = 5000;
const toastDisplayTime = 3000;

const formSettings = [
    {name: 'username', type: 'text', placeholder: 'username'},
    {name: 'password', type: 'password', placeholder: 'password'},
    {value: 'Login', type: 'submit', onclick: (data) => {
        requestPost('/authenticate', data, loginSuccess, loginError);
    }}
];

const linkSettings = {
    className: 'info',
    text: 'Doesn\'t have an account yet?',
    href: '/signup'
};

export default function login() {
    const _form = form(formSettings);
    const _link = link(linkSettings);
    
    render(template);
    document.getElementById('login').appendChild(_form);
    document.getElementById('login').appendChild(_link);
}

function loginSuccess(json) {
    const _toast = toast({
        className: 'success',
        text: 'The login was successful! Redirecting you to your profile.',
        displayTime: toastDisplayTime
    });
    render(_toast);
    setAuthenticated(json);
    redirectToProfile(redirectDelay);
}

function loginError(err) {
    const msg = (err.message != null ? err.message : 'Something went wrong!');
    const _toast = toast({
        className: 'danger',
        text: msg,
        displayTime: toastDisplayTime
    });
    render(_toast);
}

function redirectToProfile(delay) {
    setTimeout(() => {
        const host = window.location.host;
        const protocol = window.location.protocol;
        window.location.href = `${protocol}//${host}/profile`;
    }, delay);
}
