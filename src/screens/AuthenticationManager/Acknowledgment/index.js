import React, { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from 'tools2win-core/src/firebase';
import { Text, useTheme, Button, Image } from '@rneui/themed';
import View from '../../../components/View';
const art = require('../../../../assets/art_verificationlink.jpg');

const Acknowledgment = ({ navigation }) => {
    const { theme } = useTheme();
    const [isVerifying, setIsVerifying] = useState(false);

    const handleRefreshToken = useCallback(async () => {
        try {
            setIsVerifying(true);
            const idTokenResult = await auth.currentUser.getIdTokenResult(true);
            if (!idTokenResult.claims.email_verified) {
                Alert.alert("Error", "Email not yet verified. Please check your email and click on the verification link.");
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setIsVerifying(false);
        }
    }, [navigation]);

    const handleResendVerification = async () => {
        try {
            await sendEmailVerification(auth.currentUser);
            Alert.alert("Success", "Verification email resent. Please check your inbox.");
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };


    return (
        <View>
            <Image source={art} />
            <Text h4 >Please check your email for a verification link</Text>
            <Text >If you can't find the email, check your spam folder</Text>
            <Button title="I've verified my email" onPress={handleRefreshToken} disabled={isVerifying} />
            <Button type='outline' title='Resend Verification Email' onPress={handleResendVerification} />
        </View >
    );
};

export default Acknowledgment;
