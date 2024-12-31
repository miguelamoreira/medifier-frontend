import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function NotificationsSettings() {
  const router = useRouter();

  const [preferences, setPreferences] = React.useState({
    medicationReminders: false,
    missedDoseAlerts: false,
    dailySummary: false,
    pushNotifications: false,
    smsNotifications: false,
  });

  const toggleSwitch = (key: any) => {
    setPreferences((prevState: any) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.backText} onPress={() => router.push('/profile')}>&lt; Back</Text>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.doneText} onPress={() => router.push('/profile')}>Done</Text>
        </View>
      </View>
      <View style={styles.headerSeparator} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.optionBox}>
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Medication Reminders</Text>
            <Switch
              value={preferences.medicationReminders}
              onValueChange={() => toggleSwitch("medicationReminders")}
            />
          </View>
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Missed Dose Alerts</Text>
            <Switch
              value={preferences.missedDoseAlerts}
              onValueChange={() => toggleSwitch("missedDoseAlerts")}
            />
          </View>
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Daily Summary</Text>
            <Switch
              value={preferences.dailySummary}
              onValueChange={() => toggleSwitch("dailySummary")}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Types</Text>
        <View style={styles.optionBox}>
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Push Notifications</Text>
            <Switch
              value={preferences.pushNotifications}
              onValueChange={() => toggleSwitch("pushNotifications")}
            />
          </View>
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>SMS Notifications</Text>
            <Switch
              value={preferences.smsNotifications}
              onValueChange={() => toggleSwitch("smsNotifications")}
            />
          </View>
        </View>
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
});
