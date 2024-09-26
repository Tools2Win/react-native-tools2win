import { useState, useEffect } from 'react';
import { auth } from '../firebase';

const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const signOut = async () => {
        await auth.signOut();
    }

    const refreshAuth = async () => {
        await auth.currentUser.getIdTokenResult(true).then(idTokenResult => {
            const newUser = {
                ...user,
                clientID: idTokenResult.claims.clientID,
                clientName: idTokenResult.claims.clientName,
                salesmanCode: idTokenResult.claims.salesmanCode,
                roles: idTokenResult.claims.roles ? idTokenResult.claims.roles : [],
                emailVerified: idTokenResult.claims.email_verified,
                displayName: idTokenResult.claims.name
            };

            setUser(newUser);
        });
    };

    useEffect(() => {
        return auth.onIdTokenChanged(async user => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult(true);
                const newUser = {
                    ...user,
                    clientID: idTokenResult.claims.clientID,
                    clientName: idTokenResult.claims.clientName,
                    salesmanCode: idTokenResult.claims.salesmanCode,
                    roles: idTokenResult.claims.roles ? idTokenResult.claims.roles : [],
                    emailVerified: idTokenResult.claims.email_verified,
                    displayName: idTokenResult.claims.name
                };
                setUser(newUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
    }, []);

    return { loading, user, signOut, refreshAuth };
};

export default useAuth;
