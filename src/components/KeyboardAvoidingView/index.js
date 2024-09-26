import React from 'react';
import { KeyboardAvoidingView as RNKeyboardAvoidingView , StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';

const KeyboardAvoidingView = ({ children }) => {
    const { theme } = useTheme();
    return (
        <RNKeyboardAvoidingView behavior="padding" style={[{ backgroundColor: theme.colors.background }, styles.container]}>
            {children}
        </RNKeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
});

export default KeyboardAvoidingView;
