import { render } from '../../util/util';
import { request, requestOptions } from '../../util/api';
import { getAuthenticated } from '../../model/authenticated';
import { createInfoLink } from "../../components/link/link";
import ToastHandler from '../../components/toast/toastHandler';
import template from './profile.html';

import './profile.css';

const toastHandler = new ToastHandler(3000);

export default function profile() {
    render(template);

    const infoLink = createInfoLink('Edit', '/profile-edit');
    document.querySelector('.profile .profile-header').appendChild(infoLink);

    const authenticated = getAuthenticated();
    const options = requestOptions(`/members/${authenticated.username}`, 'GET');
    request(options, onFetchMember, toastHandler.secondary.bind(toastHandler));
}

function onFetchMember(member) {
    const authenticated = getAuthenticated();
    document.getElementById('username').innerHTML = (member.username);
    document.getElementById('roles').innerHTML = (authenticated.roles);
    document.getElementById('first-name').innerHTML = (member.firstName);
    document.getElementById('last-name').innerHTML = (member.lastName);
    document.getElementById('e-mail').innerHTML = (member.email);
    document.getElementById('street').innerHTML = (member.street);
    document.getElementById('city').innerHTML = (member.city);
    document.getElementById('zip').innerHTML = (member.zip);
}