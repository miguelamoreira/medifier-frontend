// Navbar.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Navbar() {
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.newPillButton} onPress={() => router.push('/newPill')}>
        <Ionicons name="add" size={24} color="#424443" />
        <Text style={styles.newPillText}>New Pill</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/dashboard')}>
        <Ionicons name="home-outline" size={28} color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={28} color="#FFF" onPress={() => router.push('/profile')}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#303030',
    paddingVertical: 10,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    shadowColor: '#303030',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  newPillButton: {
    backgroundColor: '#839ADE',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newPillText: {
    color: '#424443',
    fontSize: 16,
    marginLeft: 5,
  },
});
