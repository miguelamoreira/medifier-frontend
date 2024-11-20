import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function NotificationPage() {
  const router = useRouter();

  const [preferences, setPreferences] = React.useState({
    medicationReminders: false,
    missedDoseAlerts: false,
    dailySummary: false,
    pushNotifications: false,
    smsNotifications: false,
  });

  const toggleSwitch = (key) => {
    setPreferences((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.backText} onPress={() => router.push('/profile')}>&lt; Back</Text>
          <Text style={styles.title}>Personal info</Text>
          <Text style={styles.doneText} onPress={() => router.push('/profile')}>Done</Text>
        </View>
      </View>
      <View style={styles.headerSeparator} />

      <View style={styles.section}>
        <View style={styles.profileContainer}>
          <View style={styles.profilePicture}></View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Sara Lopes"/>

        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} placeholder="saralopes@email.com"/>

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="*******"/>

        <Text style={styles.label}>Confirm your new password</Text>
        <TextInput style={styles.input} placeholder="*******"/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F4FF",
    color: '#292A2A'
  },
  header: {
    paddingBottom: 12,
    paddingHorizontal: 20,
    marginTop: 40
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backText: {
    color: "#839ADE",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontFamily: "OpenSans_600SemiBold",
    textAlign: "center",
    marginRight: 20,
  },
  doneText: {
    color: "#839ADE",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  headerSeparator: {
    marginTop: 10,
    height: 10,
    backgroundColor: "#FFFFFF",
  },
  section: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'OpenSans_600SemiBold',
    marginBottom: 12,
  },
  profileContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 160,
    height: 160,
    borderRadius: 100,
    backgroundColor: '#DDD',
  },
  editButton: {
    position: 'absolute',
    right: 110,
    backgroundColor: '#839ADE',
    borderRadius: 24,
    padding: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    marginTop: 20,
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#D8DFF4",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
  },
  optionBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#C7C8C4",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
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
