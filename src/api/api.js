import { createAction } from 'redux-api-middleware';

export const setDefaultHeader = (contextId, name, value) => {
    const context = getContext(contextId);
    context.defaults.headers = {
        ...context.defaults.headers,
        [name]: value,
    };
};

const contexts = {
    cortex: {
        url: 'http://localhost:4444',
        defaults: {

            /** 
             * Fetch API options object 
             * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
             * */
            options: {
                // mode: 'no-cors',
            }

        }
    }
};

const getContext = contextId => contexts[contextId];

const createApiAction = (contextId, type, method, endpoint, settings) => {
    const context = getContext(contextId);
    settings = settings || {};

    const { options, headers, ...otherSettings } = settings;

    const mergedOptions = {
        ...context.defaults.options,
        ...options,
    };

    const mergedHeaders = {
        ...context.defaults.headers,
        ...headers,
    };

    return createAction({
        endpoint: context.url + endpoint,
        method,
        types: [
            {
                type: `${ type }_REQUEST`,
            },
            {
                type: `${ type }_RESPONSE`,
            },
            {
                type: `${ type }_FAILURE`,
            },
        ],
        options: mergedOptions,
        headers: mergedHeaders,
        ...otherSettings,
    });
};

const createCortexApiAction = (...args) => {
    return createApiAction('cortex', ...args);
};

const stringifyFormData = (form) => {
    // const formData = new FormData();
    let res = '';
    const entries = Object.entries(form);
    entries.forEach(([ name, value ], i) => {
        // formData.append(name, value);
        res += `${ name }=${ value }`;
        if (i < entries.length - 1) {
            res += '&';
        }
    });
    return res;
};

export const getTokensPure = (username, password) => createCortexApiAction(
    'AUTH_GET_TOKENS',
    'POST',
    '/oauth2/tokens',
    {
        body: stringifyFormData({
            grant_type: 'password',
            role: 'PUBLIC',
            scope: 'cp',
            username,
            password,
        }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
    // {
    //     body: JSON.stringify({
    //         test: 1,
    //     }),
    //     headers: { 'Content-Type': 'application/json' },
    // },
);

export const promisifyApiAction = (apiActionCreator) => (...args) => (dispatch) => {
    return dispatch(apiActionCreator(...args))
        .then(responseAction => {
            if (responseAction.error) throw responseAction
            return responseAction;
        });
};

const getTokensPurePromisified = promisifyApiAction(getTokensPure)

export const getTokens = (username, password) => dispatch => {
    return dispatch(
        getTokensPurePromisified(username, password)
    ).then(responseAction => {
        const { access_token } = responseAction.payload;
        setDefaultHeader('cortex', 'Authorization', `Bearer ${ access_token }`);
    });
};