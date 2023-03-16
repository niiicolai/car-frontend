
const USERNAME = 'USERNAME';
const TOKEN = 'TOKEN';
const ROLES = 'ROLES';

export function ADMIN() {
    return 'ADMIN';
}

export function MEMBER() {
    return 'MEMBER';
}

export function clearAuthenticated() {
    localStorage.removeItem(USERNAME);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(ROLES);
}

export function setAuthenticated(auth) {
    localStorage.setItem(USERNAME, auth.username);
    localStorage.setItem(TOKEN, auth.token);
    localStorage.setItem(ROLES, auth.roles);
}

export function getAuthenticated() {
    const username = localStorage.getItem(USERNAME);
    const token = localStorage.getItem(TOKEN);
    const roles = localStorage.getItem(ROLES);
    if (token == null) return null;
    return {username, token, roles}
}

export function isAuthenticated() {
    return getAuthenticated() != null;
}

export function hasRole(role) {
    return isAuthenticated() && getAuthenticated().roles.includes(role);
}
