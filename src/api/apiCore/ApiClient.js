import createApiAction from './createApiAction';

export default class ApiClient {
    constructor(clientId, baseUrl, defaults) {
        this.clientId = clientId;
        this.baseUrl = baseUrl;
        this.defaults = defaults || {};
    }

    createAction(type, relativeUrl, method, settings) {
        /** we return a redux-thunk action to allow future behavior changes (e.g. intercptors) */
        return (dispatch) => {
            const url = this.baseUrl + relativeUrl;
            const mergedSettings = this.mergeSettings(settings);
            const apiAction = createApiAction(type, url, method, mergedSettings);
            return dispatch(apiAction)
                .then(responseAction => {
                    if (responseAction.error) return Promise.reject(responseAction);
                    return responseAction;
                });
        };
    }

    setDefaultHeader(name, value) {
        this.defaults.headers = {
            ...this.defaults.headers,
            [name]: value,
        };
    }

    mergeSettings(requestSettings) {

        const { headers, options, ...otherSettings } = requestSettings || {};
    
        const mergedOptions = {
            ...this.defaults.options,
            ...options,
        };
    
        const mergedHeaders = {
            ...this.defaults.headers,
            ...headers,
        };
    
        return {
            headers: mergedHeaders,
            options: mergedOptions,
            ...otherSettings,
        };
    }
}