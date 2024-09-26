
import { createStackNavigator } from '@react-navigation/stack';
import useAuth from 'tools2win-core/src/hooks/useAuth';
import { NavigationContainer } from '@react-navigation/native';
import Acknowledgment from 'tools2win-core/src/react-native/screens/AuthenticationManager/Acknowledgment';
import NoDisplayName from 'tools2win-core/src/react-native/screens/AuthenticationManager/NoDisplayName';
import NoClient from 'tools2win-core/src/react-native/screens/AuthenticationManager/NoClient';
import SalesmanSelection from 'tools2win-core/src/react-native/screens/AuthenticationManager/SalesmanSelection';
import SignIn from 'tools2win-core/src/react-native/screens/AuthenticationManager/SignIn';
import ForgotPassword from 'tools2win-core/src/react-native/screens/AuthenticationManager/ForgotPassword';
import SignUp from 'tools2win-core/src/react-native/screens/AuthenticationManager/SignUp';
import AuthContext from 'tools2win-core/src/contexts/AuthContext';
import colors from 'tools2win-core/src/themes/colors';
import { ThemeProvider, createTheme } from '@rneui/themed';

const theme = createTheme({
    lightColors: {
        primary: colors.primary.main,
        secondary: colors.secondary.main,
        background: colors.background.default,
    },
    mode: 'light',
    components: {
        Text: {
            style: {
                textAlign: 'center',
                marginBottom: 30,
                color: colors.text.primary
            },
            h4Style: {
                marginBottom: 10,
                fontWeight: 'bold'
            }
        },
        Image: {
            resizeMode: 'contain',
            containerStyle: {
                alignSelf: 'center',
            },
            style: {
                width: 250,
                height: 250,
            }
        },
        Input: {
            leftIcon: {
                size: 20
            }
        },
        Button: {
            style: {
                marginBottom: 20
            }
        }
    }
})

const Stack = createStackNavigator();

const AuthenticationManager = ({ children }) => {
    const { loading, user, signOut } = useAuth();

    const userHasAllowedRole = (allowedRoles) => {
        if (!allowedRoles) return true;
        return allowedRoles.some(allowedRole => user.roles?.includes(allowedRole));
    };

    if (loading) return null;

    if (!user) {
        return (
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Sign In', headerShown: false }} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Forgot Password' }} />
                        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        );
    }

    if (!user.emailVerified) return <ThemeProvider theme={theme}><Acknowledgment /></ThemeProvider>;
    if (!user.displayName) return <ThemeProvider theme={theme}><NoDisplayName /></ThemeProvider>;
    if (!user.clientID) return <ThemeProvider theme={theme}><NoClient /></ThemeProvider>;
    if (!user.salesmanCode) return <ThemeProvider theme={theme}><SalesmanSelection /></ThemeProvider>;

    return (
        <AuthContext.Provider value={{ user, signOut, userHasAllowedRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthenticationManager;