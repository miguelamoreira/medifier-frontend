import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import CheckBox from 'expo-checkbox';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUser } from '../api/userApi';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
  });
  const [isChecked, setChecked] = useState(false);
  const router = useRouter();

  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!isChecked) {
      Alert.alert('Please agree to the terms and conditions');
      return;
    }

    try {
      const response = await createUser(formData);
      router.push('/login');
    } catch (error) {
      Alert.alert('Registration Failed', 'Something went wrong!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Fill in your details below or register with your social account.</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#C4C4C4"
          value={formData.username}
          onChangeText={(text) => handleChange('username', text)}
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
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="************"
          placeholderTextColor="#C4C4C4"
          secureTextEntry={true}
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
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

      <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

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
