import React from 'react';
import { View as RNView, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';

const View = ({ children }) => {
    const { theme } = useTheme();
    return (
        <RNView style={[{ backgroundColor: theme.colors.background }, styles.container]}>
            {children}
        </RNView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
});

export default View;
