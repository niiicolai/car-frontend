const path = "https://api.bergandersen.com/api/v1";
let authorizationToken = "";

export function setAuthorizationToken(token) {
    authorizationToken = token;
}

export async function requestGet(endpoint, callback, errorCallback) {
    const uri = `${path}${endpoint}`;
    const opt = options('GET');
    const response = await fetch(uri, opt);

    handleResponse(response, callback, errorCallback);
};

export async function requestPost(endpoint, data, callback, errorCallback) {
    const uri = `${path}${endpoint}`;
    const opt = options('POST', JSON.stringify(data));
    const response = await fetch(uri, opt);

    handleResponse(response, callback, errorCallback);
};

export async function requestPatch(endpoint, data, callback, errorCallback) {
    const uri = `${path}${endpoint}`;
    const opt = options('PATCH', JSON.stringify(data));
    const response = await fetch(uri, opt);

    handleResponse(response, callback, errorCallback);
};

export async function requestDelete(endpoint, callback, errorCallback) {
    const uri = `${path}${endpoint}`;
    const opt = options('DELETE', JSON.stringify(data));
    const response = await fetch(uri, opt);

    handleResponse(response, callback, errorCallback);
};

function headers() {
    return {
        'Content-Type': "application/json",
        'Authorization': authorizationToken != "" ? `Bearer ${Api.authorizationToken}` : ""
    };
}

function options(method, body) {
    const _options = {method: method, headers: headers()}
    if (body != null) _options.body = body;
    return _options;
}

async function handleResponse(response, callback, errorCallback) {
    if (!response.ok) {
        errorCallback(await response.json())
    } else {
        callback(await response.json());
    }
}