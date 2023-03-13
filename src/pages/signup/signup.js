import { render } from '../../util/util';
import { requestPost } from '../../util/api';
import { setAuthenticated } from '../../model/authenticated';
import link from '../../components/link/link';
import toast from '../../components/toast/toast';
import form from '../../components/form/form';
import template from './signup.html';

import './signup.css';

const redirectDelay = 5000;
const toastDisplayTime = 3000;

const formSettings = [
    {name: 'username', type: 'text', placeholder: 'username'},
    {name: 'password', type: 'password', placeholder: 'password'},
    {name: 'confirm-password', type: 'password', placeholder: 'confirm password'},
    {value: 'Signup', type: 'submit', onclick: (data) => {
        requestPost('/signup', data, signupSuccess, signupError);
    }}
];

const linkSettings = {
    className: 'info',
    text: 'Already have an account?',
    href: '/login'
};

export default function signup() {
    const _form = form(formSettings);
    const _link = link(linkSettings);

    render(template);
    document.getElementById('signup').appendChild(_form);
    document.getElementById('signup').appendChild(_link);
}
function signupSuccess(json) {
    const _toast = toast({
        className: 'success',
        text: 'The signup was successful! Redirecting you to your profile.',
        displayTime: toastDisplayTime
    });
    
    document.body.appendChild(_toast);
    setAuthenticated(json);
    redirectToProfile(redirectDelay);
}

function signupError(err) {
    const _toast = toast({
        className: 'danger',
        text: err,
        displayTime: toastDisplayTime
    });
    document.body.appendChild(_toast);
}

function redirectToProfile(delay) {
    setTimeout(() => {
        const host = window.location.host;
        const protocol = window.location.protocol;
        window.location.href = `${protocol}//${host}/profile`;
    }, delay);
}