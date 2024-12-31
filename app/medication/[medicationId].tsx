import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function MedicationPage() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.backText}>&lt; Pills</Text>
          <Text style={styles.title}>Roaccutane</Text>
        </View>
      </View>

      <View style={styles.headerSeparator} />

      <View style={styles.section}>
        <View style={styles.scheduleHeader}>
          <Text style={styles.sectionTitle}>Schedule</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.scheduleBox}>
        <View style={styles.scheduleRow}>
        <Text style={styles.scheduleTime}>Every Day</Text>
          </View>
          <View style={styles.scheduleRow}>
            <Text style={styles.scheduleTime}>12:00 PM</Text>
            <Text style={styles.dosage}>30 mg</Text>
          </View>
          <View style={styles.scheduleRow}>
            <Text style={styles.scheduleTime}>12:00 AM</Text>
            <Text style={styles.dosage}>30 mg</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.optionsTitle}>Options</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.archiveText}>Archive Medication</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.deleteText}>Delete Medication</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.newPillButton}>
          <Ionicons name="add" size={18} color="#424443" />
          <Text style={styles.newPillText}>New Pill</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
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
    marginRight: 40,
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
  scheduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'OpenSans_600SemiBold'
  },
  editText: {
    color: "#839ADE",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  scheduleBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#C7C8C4",
  },
  scheduleTime: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
  },
  dosage: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  optionsTitle: {
    fontSize: 20,
    fontFamily: 'OpenSans_600SemiBold',
    marginBottom: 12
  },
  option: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12
  },
  archiveText: {
    fontSize: 16,
    color: "#839ADE", 
    fontFamily: "OpenSans_600SemiBold",
  },
  deleteText: {
    fontSize: 16,
    color: "#FF0000",
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
