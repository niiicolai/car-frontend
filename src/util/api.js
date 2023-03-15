import { isAuthenticated, getAuthenticated } from '../model/authenticated';

const path = "https://api.bergandersen.com/api/v1";
//const path = "http://localhost:8080/api/v1";

export async function requestGet(endpoint, callback, errorCallback) {
    const uri = `${path}${endpoint}`;
    const opt = options('GET');
    const response = await fetch(uri, opt);

    handleResponse(response, callback, errorCallback);
};

export async function requestPost(endpoint, data, callback, errorCallback) {
    const uri = `${path}${endpoint}`;
    const opt = options('POST', data);
    const response = await fetch(uri, opt);

    handleResponse(response, callback, errorCallback);
};

export async function requestPatch(endpoint, data, callback, errorCallback) {
    const uri = `${path}${endpoint}`;
    const opt = options('PATCH', data);
    const response = await fetch(uri, opt);

    handleResponse(response, callback, errorCallback);
};

export async function requestDelete(endpoint, callback, errorCallback) {
    const uri = `${path}${endpoint}`;
    const opt = options('DELETE', data);
    const response = await fetch(uri, opt);

    handleResponse(response, callback, errorCallback);
};

function _headers() {
    const headers = {};
    headers['Content-Type'] = 'application/json';
    
    if (isAuthenticated()) {
        headers['Authorization'] = `Bearer ${getAuthenticated().token}`;
    }
    
    return headers;
}

function options(method, body) {
    const headers = _headers();
    const _options = {method, headers}
    if (body != null) _options.body = body;
    return _options;
}

async function handleResponse(response, callback, errorCallback) {
    if (!response.ok) {
        errorCallback(await response)
    } else {
        callback(await response.json());
    }
}
