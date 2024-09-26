import { createContext } from 'react';

const AuthContext = createContext({
    user: null,
    refreshAuth: () => { },
    signOut: () => { },
});

export default AuthContext;
