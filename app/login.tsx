import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { login } from '../api/userApi';
import { UserContext } from '@/contexts/UserContext';

export default function Login() {
  const { setUserData, setToken } = useContext(UserContext)!;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      console.log("Response:", response);

      if (response.user && response.token) {
        setUserData(response.user, response.token);
        
        router.push("/dashboard");
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Login Failed", "An error occurred, please try again.");
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.subtitle}>Hi! Welcome back, you've been missed</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          placeholderTextColor="#C4C4C4"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="************"
          placeholderTextColor="#C4C4C4"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.signUpText}>
          Don’t have an Account? <Text style={styles.signUpLink} onPress={() => router.push('/register')}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    fontFamily: 'OpenSans_400Regular'
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 10,
    color: '#292A2A',
    fontFamily: 'Montaigne-Regular'
  },
  subtitle: {
    fontSize: 14,
    color: '#C7C8C4',
    marginBottom: 60,
    fontFamily: 'OpenSans_600SemiBold'
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#292A2A',
    marginBottom: 5,
    fontFamily: 'OpenSans_600SemiBold'
  },
  input: {
    height: 45,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#292A2A',
  },
  signInButton: {
    backgroundColor: '#839ADE',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  signInButtonText: {
    color: '#FAFAFC',
    fontSize: 16,
    fontFamily: 'OpenSans_700Bold'
  },
  signUpText: {
    fontSize: 14,
    color: '#424443',
  },
  signUpLink: {
    color: '#839ADE',
    fontWeight: '600',
    fontFamily: 'OpenSans_600SemiBold'
  },
});
