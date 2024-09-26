import React, { useState } from 'react';
import { useInviteCode } from '../../../../hooks/useInviteCode';
import { auth } from '../../../../firebase';
import { Text, Input, Button, Image } from '@rneui/themed';
import KeyboardAvoidingView from '../../../components/KeyboardAvoidingView';
const art = require('../../../../assets/art_organization.jpg');

const NoClient = () => {
    const [enteredInviteCode, setEnteredInviteCode] = useState('');

    const { loading, error, consumeInviteCode } = useInviteCode();

    const handleConsumeInviteCode = async () => {
        await consumeInviteCode(enteredInviteCode);
        auth.currentUser.getIdTokenResult(true);
    };

    const handleLogout = () => {
        auth.signOut();
    }

    return (
        <KeyboardAvoidingView>
            <Image source={art} />
            <Text h4>Join an Organization</Text>
            <Input placeholder="Invite Code" value={enteredInviteCode} onChangeText={setEnteredInviteCode} />
            <Button title='Submit' onPress={handleConsumeInviteCode} disabled={loading} />
            <Button type='outline' title='Logout' onPress={handleLogout} disabled={loading} />
            {error && <Text style={{ color: 'red' }}>{error.message || 'An error occurred while joining the client.'}</Text>}
        </KeyboardAvoidingView>
    );
};

export default NoClient;
