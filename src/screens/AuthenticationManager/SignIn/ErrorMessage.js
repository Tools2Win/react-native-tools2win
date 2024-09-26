import { StyleSheet, Text, View } from "react-native";

const ErrorMessage = ({ message }) => (
    <View style={styles.error}><Text>{message}</Text></View>
);

const styles = StyleSheet.create({
    error: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'red',
    }
});

export default ErrorMessage;