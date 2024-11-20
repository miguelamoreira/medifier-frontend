import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/medifier.png')} style={styles.medifierImage}></Image>

      <Image source={require('../assets/images/star.png')} style={styles.starImage} />

      <Text style={styles.subtitle}>It’s time to prioritize</Text>
      <Text style={styles.healthText}>your health</Text>

      <Text style={styles.description}>
        Sign in to keep your health on track with easy scheduling and progress tracking.
      </Text>

      <TouchableOpacity style={styles.createAccountButton} onPress={() => router.push('/register')}>
        <Text style={styles.createAccountText}>CREATE ACCOUNT</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.loginText}>LOG IN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9F1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  medifierImage: {
    marginBottom: 40,
  },
  starImage: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    color: '#292A2A',
    marginTop: 10,
    fontFamily: 'OpenSans_600SemiBold'
  },
  healthText: {
    fontSize: 48,
    color: '#292A2A',
    marginTop: -15,
    fontFamily: 'OpenSans_600SemiBold',
  },
  description: {
    fontSize: 16,
    color: '#282828',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
    fontFamily: 'OpenSans_400Regular',
    lineHeight: 24,
  },
  createAccountButton: {
    backgroundColor: '#839ADE',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  createAccountText: {
    color: '#FAFAFC',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'OpenSans_600SemiBold'
  },
  loginText: {
    color: '#839ADE',
    fontSize: 16,
    marginTop: 15,
    fontFamily: 'OpenSans_700Bold'
  },
});
