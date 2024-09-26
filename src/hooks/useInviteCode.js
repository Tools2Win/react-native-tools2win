import { useState } from 'react';
import useApi from './useApi';

export const useInviteCode = () => {
    const { post, get } = useApi();
    const [inviteCode, setInviteCode] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createInviteCode = async () => {
        setLoading(true);
        try {
            const response = await post('invitecode');
            setInviteCode(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const consumeInviteCode = async (inviteCode) => {
        setLoading(true);
        try {
            await get('invitecode', { InviteCode: inviteCode });
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        inviteCode,
        loading,
        error,
        createInviteCode,
        consumeInviteCode
    };
};
