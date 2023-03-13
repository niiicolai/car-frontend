import { setAuthorizationToken } from '../util/api';

let authenticated = null;

export function setAuthenticated(auth) {
    authenticated = auth;
    setAuthorizationToken(auth.token);
}

export function getAuthenticated() {
    return authenticated;
}

export function isAuthenticated() {
    return authenticated != null;
}

export function hasRole(role) {
    return isAuthenticated() && authenticated.roles.includes(role);
}