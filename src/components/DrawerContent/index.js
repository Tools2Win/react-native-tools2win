import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import useAuthContext from '../../../hooks/useAuthContext';
import { useTheme, Button, Icon, Text } from '@rneui/themed';

const DrawerContent = ({ props, children, version }) => {
    const { theme } = useTheme();
    const { user, signOut } = useAuthContext();

    return (
        <>
            <DrawerContentScrollView {...props}>
                <View style={styles.userInfoSection}>
                    <Text h4>{user.displayName}</Text>
                    <Text style={{ color: 'grey' }}>{user.email}</Text>
                </View>

                <View>
                    {children}
                </View>
            </DrawerContentScrollView>

            <View style={styles.footer}>
                {version && <Text style={styles.versionStyle}>{`v${version}`}</Text>}

                <Button
                    type='outline'
                    icon={() => <Icon name="launch" size={20} style={{ marginRight: 5 }} color={theme.colors.primary} />}
                    title='Release Notes'
                    onPress={() => Linking.openURL('https://tools2win.releasenotes.io')}
                    buttonStyle={{ marginBottom: 10 }}
                />
                <Button title='Logout' onPress={signOut} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    userInfoSection: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        alignItems: 'center',
    },
    footer: {
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    versionStyle: {
        color: 'lightgray',
        marginBottom: 10,
        alignSelf: 'center'
    },
});

export default DrawerContent;
