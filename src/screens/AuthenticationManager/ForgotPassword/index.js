import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'tools2win-core/src/firebase';
import { Input, Button, Image, useTheme } from '@rneui/themed';
import KeyboardAvoidingView from '../../../components/KeyboardAvoidingView';
const art = require('../../../../assets/art_lock.jpg');

const ForgotPassword = ({ navigation }) => {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');

    const resetPassword = () => {
        sendPasswordResetEmail(auth, email).then(() => {
            Alert.alert("Password reset email sent!");
            navigation.navigate('Signin')
        }).catch((error) => {
            Alert.alert("Error", error.message);
        });
    };

    return (
        <KeyboardAvoidingView>
            <Image source={art} />
            <Input autoCapitalize='none' value={email} onChangeText={setEmail} placeholder='Email' leftIcon={{ type: 'material', name: 'mail' }} />
            <Button title="Reset Password" onPress={resetPassword} />
        </KeyboardAvoidingView>
    );
};

export default ForgotPassword;
