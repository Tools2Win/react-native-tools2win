import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import ErrorMessage from './ErrorMessage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebase';
import { Image, Input, Button } from '@rneui/themed';
import KeyboardAvoidingView from '../../../components/KeyboardAvoidingView';
const logo = require('../../../../assets/logo.png');

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleSignIn = async () => {
    setEmailError(null)
    setPasswordError(null)

    if (email === '' || password === '') {
      if (email === '')
        setEmailError('email is required')
      if (password === '')
        setPasswordError('password is required')
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === 'auth/user-not-found')
        setEmailError('User not found')
      else if (error.code === 'auth/invalid-email')
        setEmailError('Invalid email, please try again')
      else if (error.code === 'auth/wrong-password')
        setPasswordError('Incorrect password, please try again')
      else
        setError(error.message)
    }
  }

  return (
    <KeyboardAvoidingView>
      <Image source={logo} />
      {!!error && <ErrorMessage message={error} />}
      <Input autoCapitalize='none'
        value={email}
        onChangeText={setEmail}
        placeholder='Email'
        leftIcon={{ type: 'material', name: 'mail' }}
        errorMessage={emailError}
      />
      <Input
        autoCapitalize='none'
        secureTextEntry value={password}
        onChangeText={setPassword}
        placeholder='Password'
        leftIcon={{ type: 'material', name: 'lock' }}
        errorMessage={passwordError}
      />
      <Button title="Login" onPress={handleSignIn} />

      <Button type='clear' title="Forgot Password?" onPress={() => navigation.navigate('ForgotPassword')} />
      <Button type='clear' title="New User? Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </KeyboardAvoidingView>
  );
};

export default SignIn;
