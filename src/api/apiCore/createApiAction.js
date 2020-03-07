import { createAction, getJSON, ApiError } from 'redux-api-middleware';

const identityFunc = x => x;

export default function createApiAction(type, url, method = 'GET', settings) {
    
    const { body, headers, options, normalize = identityFunc } = settings || {};

    return createAction({
        endpoint: url,
        method,
        body,
        headers,

        /** 
         * Fetch API options object 
         * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
         * */
        options,
        
        types: [
            {
                type: `${ type }_REQUEST`,
            },
            {
                type: `${ type }_SUCCESS`,
                payload: (action, state, res) => {
                    return getJSON(res).then(normalize);
                },
            },
            {
                type: `${ type }_FAILURE`,
            },
        ],
    });
};