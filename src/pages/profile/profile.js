import { render } from '../../util/util';
import { getAuthenticated } from '../../model/authenticated';
import template from './profile.html';

export default function profile() {
    render(template);
    const authenticated = getAuthenticated();
    document.getElementById('username').innerHTML = (authenticated.username);
    document.getElementById('roles').innerHTML = (authenticated.roles);
}
