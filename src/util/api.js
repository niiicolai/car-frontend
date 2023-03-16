import { isAuthenticated, getAuthenticated } from '../model/authenticated';

const path = "https://api.bergandersen.com/api/v1";
//const path = "http://localhost:8080/api/v1";

export async function request(options, callback = (e) => alert(e), errorCallback = (e) => alert(e)) {
    const uri = _uri(options);
    const opt = _opt(options);
    const response = await fetch(uri, opt);
    if (response.ok) callback(await response.json());
    else errorCallback((response.message != null ? response.message : 'Something went wrong!'));
}

export function requestOptions(endpoint, method, data) {
    return {endpoint, method, data};
}

function _uri(options) {
    return `${path}${options.endpoint}`;
}

function _headers() {
    const headers = {'Content-Type': 'application/json'};
    
    if (isAuthenticated()) {
        headers['Authorization'] = `Bearer ${getAuthenticated().token}`;
    }
    
    return headers;
}

function _opt(options) {
    const headers = _headers();
    const opt = {method: options.method, headers};
    if (options.data != null) opt.body = options.data;
    return opt;
}