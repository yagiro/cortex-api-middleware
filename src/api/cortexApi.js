import { createApiClient } from './api';

const cortexClient = createApiClient('cortex', 'http://localhost:4444');

const createCortexApiAction = cortexClient.createAction.bind(cortexClient);

const stringifyFormData = (form) => {
    let res = '';
    const entries = Object.entries(form);
    entries.forEach(([ name, value ], i) => {
        res += `${ name }=${ value }`;
        if (i < entries.length - 1) {
            res += '&';
        }
    });
    return res;
};

export const getTokens = (username, password) => createCortexApiAction(
    'AUTH_GET_TOKENS',
    '/oauth2/tokens',
    'POST',
    {
        body: stringifyFormData({
            grant_type: 'password',
            role: 'PUBLIC',
            scope: 'cp',
            username,
            password,
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        normalize: response => {
            return {
                ...response,
                normalizeSays: 'hi!',
            };
        }
    },
    // {
    //     body: JSON.stringify({
    //         test: 1,
    //     }),
    //     headers: { 'Content-Type': 'application/json' },
    // },
);

export const getTokensAndSetAuthHeader = (username, password) => dispatch => {
    return dispatch(getTokens(username, password))
        .then(responseAction => {
            console.log('THEN', responseAction);
            const { access_token } = responseAction.payload;
            cortexClient.setDefaultHeader('Authorization', `Bearer ${ access_token }`);
            return responseAction;
        })
        .catch((responseAction) => { console.log('CATCHHH', responseAction) });
};
