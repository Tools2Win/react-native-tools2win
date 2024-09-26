import React from "react";
import { CubeProvider as CubeJSProvider } from '@cubejs-client/react';
import cube from 'react-native-tools2win/src/cube';

const CubeProvider = ({ children }) => {
    return (
        <CubeJSProvider cubejsApi={cube}>
            {children}
        </CubeJSProvider>
    )
}

export default CubeProvider;