
import { render, redirect } from '../../util/util';
import { request, requestOptions } from '../../util/api';
import { getAuthenticated } from '../../model/authenticated';
import createIconBadge from '../../components/iconBadge/iconBadge';
import ToastHandler from '../../components/toast/toastHandler';
import formBuilder from '../../components/form/form';
import template from './editProfile.html';

import './editProfile.css';

const redirectDelay = 5000;
const toastHandler = new ToastHandler(3000);

export default function editProfile() {
    render(template);

    const authenticated = getAuthenticated();
    const options = requestOptions(`/members/${authenticated.username}`, 'GET');
    request(options, createForm, toastHandler.secondary.bind(toastHandler));
}

function createForm(member) {
    const form = formBuilder()
        .input('username', 'hidden', null, member.username)
        .input('email', 'email', 'e-mail', member.email)
        .input('firstName', 'text', 'first name', member.firstName)
        .input('lastName', 'text', 'last name', member.lastName)
        .input('street', 'text', 'street', member.street)
        .input('city', 'text', 'city', member.city)
        .input('zip', 'text', 'zip', member.zip)
        .submit('Update', (data) => {
            const options = requestOptions('/members', 'PATCH', data);
            request(options, updateSuccess, toastHandler.secondary.bind(toastHandler));
        })
        .build();


    document.getElementById('editProfile').appendChild(form);
}

function updateSuccess(json) {
    const icon = createIconBadge(3, 'secondary', 'fa-regular fa-circle-check', 'fa-solid fa-circle-notch fa-spin');
    document.getElementById('editProfile').innerHTML = "";
    document.getElementById('editProfile').appendChild(icon);

    redirect('profile', redirectDelay);
    toastHandler.success('Your changes was saved! Redirecting you to your profile.');
}

