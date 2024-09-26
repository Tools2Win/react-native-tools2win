import React, { useState } from 'react';
import { useDisplayName } from '../../../../hooks/useDisplayName';
import { auth } from '../../../../firebase';
import { Text, Input, Button, Image } from '@rneui/themed';
import KeyboardAvoidingView from '../../../components/KeyboardAvoidingView';
const art = require('../../../../assets/art_displayname.jpg');

const NoDisplayName = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const { updateDisplayName, loading, error } = useDisplayName();

    const handleSubmit = async () => {
        const fullName = `${firstName} ${lastName}`;
        await updateDisplayName(fullName);
        await auth.currentUser.getIdTokenResult(true);
    };

    const handleLogout = async () => {
        await auth.signOut();
    };

    return (
        <KeyboardAvoidingView>
            <Image source={art} />
            <Text h4>Display Name</Text>
            <Input placeholder="First Name" value={firstName} onChangeText={setFirstName} />
            <Input placeholder="Last Name" value={lastName} onChangeText={setLastName} />
            <Button title='Continue' onPress={handleSubmit} />
            <Button type='outline' title='Logout' onPress={handleLogout} disabled={loading} />
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </KeyboardAvoidingView>
    );
};

export default NoDisplayName;