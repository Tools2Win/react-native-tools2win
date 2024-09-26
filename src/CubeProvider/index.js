import React from "react";
import { CubeProvider as CubeJSProvider } from '@cubejs-client/react';
import cube from 'tools2win-core/src/cube';

const CubeProvider = ({ children }) => {
    return (
        <CubeJSProvider cubejsApi={cube}>
            {children}
        </CubeJSProvider>
    )
}

export default CubeProvider;