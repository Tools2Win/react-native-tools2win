import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import useApi from './useApi';

export const useSalesmanSelection = () => {
    const { get, post } = useApi();
    const [salesmen, setSalesmen] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getSalesmen = async () => {
        setLoading(true);
        try {
            const response = await get('salesman');
            setSalesmen(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const selectSalesman = async (SalesmanCode) => {
        setLoading(true);
        try {
            await post('usersalesman', { ID: SalesmanCode });
            auth.currentUser.getIdTokenResult(true)
        } catch (err) {
            console.log(err)
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSalesmen();
    }, []);

    return {
        salesmen,
        loading,
        error,
        selectSalesman
    };
};