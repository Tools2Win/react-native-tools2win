import { useEffect, useState } from 'react';
import useApi from './useApi';

export const useSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const { get } = useApi();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSubscriptions = async () => {
            const response = await get('subscriptions');
            setSubscriptions(response);
            setLoading(false);
        }

        getSubscriptions();
    }, []);

    return {
        subscriptions,
        loading
    };
};
