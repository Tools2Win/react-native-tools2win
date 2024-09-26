import React, { useState } from 'react';
import {
    Alert
} from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../../../firebase';
import { Button, Input, Image } from '@rneui/themed';
import KeyboardAvoidingView from '../../../components/KeyboardAvoidingView';
const image = require('../../../../assets/art_signup.jpg');

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const signUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        if (email === '' || password === '') {
            Alert.alert('Error', 'Email and password are mandatory.');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
                await sendEmailVerification(userCredential.user);
            }).catch((error) => {
                Alert.alert("Error", error.message);
            });
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <KeyboardAvoidingView>
            <Image source={image} />
            <Input value={email} onChangeText={setEmail} placeholder='Email' autoCapitalize="none" leftIcon={{ type: 'material', name: 'mail' }} />
            <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry leftIcon={{ type: 'material', name: 'lock' }} />
            <Input value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm Password" secureTextEntry leftIcon={{ type: 'material', name: 'lock' }} />
            <Button type='solid' title='Sign Up' onPress={signUp} />
        </KeyboardAvoidingView>
    );
};

export default SignUpScreen;