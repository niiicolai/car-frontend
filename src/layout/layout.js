import { render, clearBody } from '../util/util';
import { isAuthenticated } from '../model/authenticated';
import headerBuilder from '../components/header/header';
import createFooter from '../components/footer/footer';

import './layout.css'

export default function layout(renderPage) {
    clearBody();

    renderHeader();
    renderPage();
    renderFooter();
}

function renderHeader() {
    const builder = addPublicLinks();
    if (isAuthenticated()) addAuthenticatedLinks(builder);
    else addUnauthenticatedLinks(builder);
    render(builder.build());
}

function addPublicLinks() {
    return headerBuilder()
        .navLink('Home', '/')
        .navLink('Cars', '/cars');
}

function addAuthenticatedLinks(builder) {
    builder
        .navLink('Reservations', '/reservations')
        .navLink('Profile', '/profile')
        .navLink('Logout', '/logout');
}

function addUnauthenticatedLinks(builder) {
    builder
        .navLink('Signup', '/signup')
        .navLink('Login', '/login');
}

function renderFooter() {
    render(createFooter('Copyright ...'));
}
