import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TabBar from '../components/TabBar';

export default function Dashboard() {
  const [selectedDay, setSelectedDay] = useState(4);

  const medicationData = {
    0: [
      { time: '8:00 AM', name: 'Vitamin C', details: '500mg - with water', color: '#E8F0FE' },
      { time: '9:00 PM', name: 'Melatonin', details: '10mg - before sleep', color: '#FFF6D8' },
    ],
    4: [
      { time: '9:00 AM', name: 'Azithromycin', details: '200mg - after food', color: '#E8F0FE' },
      { time: '12:00 PM', name: 'CardioActive', details: '20ml - 1 capsule', color: '#FFF6D8' },
      { time: '6:00 PM', name: 'Synthroid', details: '150mg - 1/2 capsule', color: '#FEE9E9' },
      { time: '9:00 PM', name: 'Azithromycin', details: '200mg - after food', color: '#E8F0FE' },
    ],
    5: [
      { time: '7:00 AM', name: 'Iron Supplement', details: '300mg - with breakfast', color: '#FEE9E9' },
      { time: '5:00 PM', name: 'Multivitamin', details: '1 tablet - with water', color: '#FFF6D8' },
    ],
  };

  const renderMedications = () => {
    const meds = medicationData[selectedDay] || [];
    return meds.map((med, index) => (
      <View key={index} style={styles.reminderItem}>
        <Text style={styles.timeText}>{med.time}</Text>
        <View style={[styles.medicationCard, { backgroundColor: med.color }]}>
          <Text style={styles.medicationName}>{med.name}</Text>
          <Text style={styles.medicationDetails}>{med.details}</Text>
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Sara 👋</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="notifications-outline" size={24} color="#333" style={styles.icon} />
          <View style={styles.profilePicture}></View>
        </View>
      </View>

      <Text style={styles.subtitle}>November 2024</Text>
      <Text style={styles.title}>Today’s reminders</Text>

      <View style={styles.calendar}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedDay(index)}>
            <View style={styles.calendarDay}>
              <Text
                style={[
                  styles.calendarDayText,
                  index === selectedDay && styles.selectedDayText, 
                ]}
              >
                {day}
              </Text>
              <View
                style={[
                  styles.calendarDateCircle,
                  index === selectedDay && styles.selectedDateCircle, 
                ]}
              >
                <Text
                  style={[
                    styles.calendarDateText,
                    index === selectedDay && styles.selectedDateText,
                  ]}
                >
                  {4 + index}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.reminderSection}>
        <View style={styles.labels}>
          <Text style={styles.labelText}>Time</Text>
          <Text style={styles.labelText}>Medication</Text>
        </View>

        <ScrollView>{renderMedications()}</ScrollView>
      </View>

      <TabBar></TabBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
    paddingTop: 60,
    fontFamily: 'OpenSans_400Regular'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#292A2A',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
    padding: 15,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 1,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DDD',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'OpenSans_600SemiBold',
    color: '#C7C8C4',
    marginBottom: 5,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'OpenSans_700Bold',
    color: '#292A2A',
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 16,
  },
  calendarDay: {
    alignItems: 'center',
  },
  calendarDayText: {
    fontSize: 14,
    color: '#ACADA9',
    marginBottom: 5,
  },
  selectedDayText: {
    color: '#839ADE', 
    fontWeight: 'bold',
  },
  calendarDateCircle: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  selectedDateCircle: {
    backgroundColor: '#292A2A', 
  },
  calendarDateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ACADA9',
  },
  selectedDateText: {
    color: '#FFFEFF',
    fontWeight: 'bold',
  },
  reminderSection: {
    flex: 1,
    backgroundColor: '#FFFEFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: -10,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'OpenSans_600SemiBold',
    color: '#ACADA9',
  },
  reminderItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 14,
    color: '#424443',
    marginRight: 20,
    textAlign: 'right',
    width: 50,
  },
  medicationCard: {
    flex: 1,
    height: 80, 
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  medicationName: {
    fontSize: 16,
    fontFamily: 'OpenSans_600SemiBold',
    color: '#5C5E5D',
    marginBottom: 5,
  },
  medicationDetails: {
    fontSize: 14,
    color: '#5C5E5D',
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
