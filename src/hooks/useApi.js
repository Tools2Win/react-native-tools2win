import { useCallback, useState } from 'react';
import * as api from '../api';

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiRequest = useCallback(async (requestType, resource, data, params) => {
        try {
            setLoading(true);
            setError(null);
            const responseData = await api.default[requestType](resource, data, params);
            return responseData;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const clearError = () => {
        setError(null);
    };

    const apiMethods = {
        get: useCallback((resource, params) => apiRequest('get', resource, undefined, params), [apiRequest]),
        post: useCallback((resource, data) => apiRequest('post', resource, data), [apiRequest]),
        put: useCallback((resource, data) => apiRequest('put', resource, data), [apiRequest]),
        delete: useCallback((resource, params) => apiRequest('delete', resource, undefined, params), [apiRequest]),
    };

    return { ...apiMethods, loading, error, clearError };
};

export default useApi;