import React from 'react';
import { Text, Image } from '@rneui/themed';
import { View } from 'react-native';
const art = require('../../../../assets/art_lock.jpg');

const NoSubscription = () => {
    return (
        <View style={{ marginTop: '50%' }}>
            <Image source={art} />
            <Text h4>Subscription Not Found</Text>
            <Text>Please contact the Tools2Win® team</Text>
        </View>
    );
};

export default NoSubscription;