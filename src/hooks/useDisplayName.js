import { useState } from 'react';
import { auth } from '../firebase';
import useApi from './useApi';

export const useDisplayName = () => {
    const { put } = useApi();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateDisplayName = async (displayName) => {
        setLoading(true);
        try {
            await put('displayname', displayName)
            await auth.currentUser.getIdTokenResult(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        updateDisplayName,
        loading,
        error
    };
};
