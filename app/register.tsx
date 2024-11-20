import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import CheckBox from 'expo-checkbox';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Register() {
  const [isChecked, setChecked] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Fill your information below or register with your social account.</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#C4C4C4"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          placeholderTextColor="#C4C4C4"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="************"
          placeholderTextColor="#C4C4C4"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.termsContainer}>
        <CheckBox
          value={isChecked}
          onValueChange={setChecked}
          style={styles.checkbox}
        />
        <Text style={styles.termsText}>
          Agree with <Text style={styles.termsLink}>Terms & Conditions</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText} onPress={() => router.push('/dashboard')}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>──────── Or sign up with ────────</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.signInText}>
          Already have an Account? <Text style={styles.signInLink} onPress={() => router.push('/login')}>Sign In</Text>
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
    margin: 16,
    fontFamily: 'OpenSans_400Regular'
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 5,
    color: '#292A2A',
    fontFamily: 'Montaigne-Regular'
  },
  subtitle: {
    fontSize: 14,
    color: '#C7C8C4',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'OpenSans_600SemiBold',
    color: '#292A2A',
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: '#C7C8C4',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#292A2A',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  checkbox: {
    marginRight: 8,
  },
  termsText: {
    fontSize: 14,
    color: '#000000',
  },
  termsLink: {
    color: '#839ADE',
  },
  signUpButton: {
    backgroundColor: '#839ADE',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#FAFAFC',
    fontSize: 16,
    fontFamily: 'OpenSans_700Bold'
  },
  orText: {
    color: '#ACADA9',
    marginVertical: 20,
    fontSize: 12,
    textAlign: 'center',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 40,
  },
  socialButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    fontSize: 14,
    color: '#424443'
  },
  signInLink: {
    color: '#839ADE',
    fontWeight: '600',
    fontFamily: 'OpenSans_600SemiBold'
  },
});
