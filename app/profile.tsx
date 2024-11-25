import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TabBar from '../components/TabBar'
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBackground}>
        <View style={styles.profileSection}>
          <View style={styles.profilePicture}></View>
          <Text style={styles.profileName}>Sara Lopes</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <TouchableOpacity style={styles.option} onPress={() => router.push('/userSettings')}>
            <View style={styles.row}>
              <Ionicons name="person-outline" size={20} style={styles.icon} />
              <Text style={styles.optionText}>Personal Info</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <View style={styles.row}>
              <Ionicons name="shield-checkmark-outline" size={20} style={styles.icon} />
              <Text style={styles.optionText}>Login & Security</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Preferences</Text>
          <TouchableOpacity style={styles.option} onPress={() => router.push('/notificationsSettings')}>
            <View style={styles.row}>
              <Ionicons name="notifications-outline" size={20} style={styles.icon} />
              <Text style={styles.optionText}>Notification Settings</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <View style={styles.row}>
              <Ionicons name="time-outline" size={20} style={styles.icon} />
              <Text style={styles.optionText}>Reminder Customization</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.option} onPress={() => router.push('/onboarding')}>
            <View style={styles.row}>
              <Ionicons name="log-out-outline" size={20} style={styles.icon} />
              <Text style={styles.optionText}>Log out</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => router.push('/onboarding')}>
            <View style={styles.row}>
              <Ionicons name="trash-outline" size={20} style={styles.icon} />
              <Text style={styles.optionText}>Delete Account</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TabBar></TabBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
    fontFamily: 'OpenSans_400Regular'
  },
  headerBackground: {
    height: 200,
    backgroundColor: '#DAD5FD',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 160,
    borderBottomRightRadius: 160,
    marginBottom: 10,
  },
  profileSection: {
    marginTop: 160,
  },
  profilePicture: {
    width: 190,
    height: 190,
    borderRadius: 100,
    backgroundColor: '#DDD',
  },
  profileName: {
    fontSize: 28,
    fontFamily: 'OpenSans_600SemiBold',
    color: '#303030',
    alignSelf: 'center'
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 100,
    marginTop: 80 
  },
  subtitle: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 20,
    paddingVertical: 8
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    color: '#ACADA9'
  },
  optionText: {
    fontSize: 16,
    color: '#292A2A',
  },
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
