import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TabBar from '../components/TabBar';
import { UserContext } from '@/contexts/UserContext';
import { fetchAgenda } from '@/api/userApi';

interface Time {
  time: string;
  amount: string
}

interface Medication {
  medication: string;
  startDate: Date;
  endDate: Date;
  times: Time[];
}

interface GroupedAgenda {
  [key: number]: Medication[];
}

export default function Dashboard() {
  const { user, token } = useContext(UserContext);
  const date = new Date();
  const today = date.getDay();
  const [selectedDay, setSelectedDay] = useState<number>(today === 0 ? 6 : today - 1);
  const [agenda, setAgenda] = useState<GroupedAgenda>({});

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
  };
  
  const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + 1));
  const daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const weekDates: number[] = daysOfWeek.map((_, index) => {
    const newDate = new Date(startOfWeek);
    newDate.setDate(startOfWeek.getDate() + index);
    return newDate.getDate();
  });

  const formattedDate: string = date.toLocaleDateString(undefined, options);

  useEffect(() => {
    const loadAgenda = async () => {
      try {
        const fetchedData = await fetchAgenda(user.id, token);
        console.log('Fetched Data:', fetchedData); // Check the raw data from the API
        
        const agendaItems: Medication[] = fetchedData.flatMap(entry => entry.items);
        console.log('Agenda Items:', agendaItems); // Check the items, specifically the "times" array
  
        const agendaByDay: GroupedAgenda = groupAgendaByDay(agendaItems);
        setAgenda(agendaByDay);
      } catch (error) {
        console.error('Error loading agenda:', error);
      }
    };
  
    loadAgenda();
  }, [user, token]);
  

  const groupAgendaByDay = (agendaItems: Medication[]): GroupedAgenda => {
    const grouped: GroupedAgenda = {};

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    agendaItems.forEach((item) => {
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      for (
        let currentDate = new Date(startDate);
        currentDate <= endDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        const dayIndex = Math.floor((currentDate.getTime() - startOfWeek.getTime()) / (24 * 60 * 60 * 1000));

        if (dayIndex >= 0 && dayIndex < 7) {
          if (!grouped[dayIndex]) grouped[dayIndex] = [];
          grouped[dayIndex].push(item);
        }
      }
    });    
    return grouped;
  };

  const renderMedications = () => {
    const meds = agenda[selectedDay] || [];
    meds.forEach(m => console.log(m.times))
    return meds.map((med, index) => (
      <View key={index} style={styles.reminderItem}>
        <Text style={styles.timeText}>{med.time}</Text>
        <View style={[styles.medicationCard, { backgroundColor: '#E8F0FE' }]}>
          <Text style={styles.medicationName}>{med.medication}</Text>
          <Text style={styles.medicationDetails}>{`${med.amount} - from ${new Date(med.startDate).toLocaleDateString()} to ${new Date(med.endDate).toLocaleDateString()}`}</Text>
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.username} 👋</Text>
        <View style={styles.headerIcons}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#333"
            style={styles.icon}
          />
          <View style={styles.profilePictureContainer}>
            <Image source={{ uri: user?.avatar }} style={styles.profilePicture} />
          </View>
        </View>
      </View>

      <Text style={styles.subtitle}>{formattedDate}</Text>
      <Text style={styles.title}>Today’s reminders</Text>

      <View style={styles.calendar}>
        {daysOfWeek.map((day, index) => (
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
                  {weekDates[index]}
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

      <TabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
    paddingTop: 60,
    fontFamily: 'OpenSans_400Regular',
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
  profilePictureContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
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
});
