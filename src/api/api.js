import ApiClient from './apiCore/ApiClient';

export const createApiClient = (clientId, baseUrl, defaults) =>
    new ApiClient(clientId, baseUrl, defaults);
