import { render, clearBody } from '../util/util';
import { isAuthenticated, hasRole, ADMIN } from '../model/authenticated';
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
    const builder = headerBuilder().title('Cars-r-us');
    publicLinks(builder);

    if (hasRole(ADMIN())) adminLinks(builder);
    if (isAuthenticated()) authenticatedLinks(builder);
    else unauthenticatedLinks(builder);
    
    render(builder.build());
}

function publicLinks(builder) {
    builder
        .navLink('Home', '/')
        .navLink('Cars', '/cars');
}

function adminLinks(builder) {
    builder
        .navLink('Members', '/members');
}

function authenticatedLinks(builder) {
    builder
        .navLink('Reservations', '/reservations')
        .navLink('Profile', '/profile')
        .navLink('Logout', '/logout');
}

function unauthenticatedLinks(builder) {
    builder
        .navLink('Signup', '/signup')
        .navLink('Login', '/login');
}


function renderFooter() {
    render(createFooter('Copyright cars-r-us © 2023'));
}
