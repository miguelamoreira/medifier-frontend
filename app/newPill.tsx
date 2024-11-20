import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Modal } from "react-native";
import { useRouter } from 'expo-router';
import { Picker } from "@react-native-picker/picker";

export default function NewPill() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(true);
  const [times, setTimes] = useState([
    { id: 1, time: '9:00 AM', capsules: '1 Capsule' },
    { id: 2, time: '9:00 PM', capsules: '2 Capsules' },
  ]);
  const [frequencyModalVisible, setFrequencyModalVisible] = useState(false);
  const [frequency, setFrequency] = useState('Every Day');

  const addTimeSlot = () => {
    const newTime = { id: Date.now(), time: '', capsules: '' };
    setTimes([...times, newTime]);
  };

  const removeTimeSlot = (id) => {
    setTimes(times.filter(item => item.id !== id));
  };

  const updateTimeSlot = (id, key, value) => {
    setTimes(times.map(item => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const handleFrequencyChange = (newFrequency) => {
    setFrequency(newFrequency);
    setFrequencyModalVisible(false);
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => router.push('/dashboard')}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Pill Form</Text>
          <TouchableOpacity onPress={() => router.push('/dashboard')}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.modalBody}>
          <Text style={styles.label}>Pill Name</Text>
          <TextInput style={styles.input} placeholder="Add Pill Name" />

          <Text style={styles.label}>Strength (mg)</Text>
          <TextInput style={styles.input} placeholder="Add Strength" keyboardType="numeric" />

          <Text style={styles.sectionTitle}>When will you take this?</Text>
          <TouchableOpacity style={styles.frequencyContainer} onPress={() => setFrequencyModalVisible(true)}>
            <Text style={styles.frequencyLabel}>Frequency</Text>
            <Text style={styles.frequencyText}>{frequency}</Text>
          </TouchableOpacity>

          <Text style={styles.timesTitle}>Times</Text>
          <FlatList
            data={times}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View key={item.id} style={styles.timeRow}>
                <TouchableOpacity onPress={() => removeTimeSlot(item.id)}>
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.timeInput}
                  placeholder="Time (e.g., 9:00 AM)"
                  value={item.time}
                  onChangeText={(value) => updateTimeSlot(item.id, 'time', value)}
                />
                <TextInput
                  style={styles.capsuleInput}
                  placeholder="Capsules"
                  value={item.capsules}
                  onChangeText={(value) => updateTimeSlot(item.id, 'capsules', value)}
                />
              </View>
            )}
          />
          <TouchableOpacity onPress={addTimeSlot}>
            <Text style={styles.addTimeText}>+ Add a Time</Text>
          </TouchableOpacity>
        </View>
      </View>

      {frequencyModalVisible && <FrequencyModal onFrequencyChange={handleFrequencyChange} />}
    </Modal>
  );
}

const FrequencyModal = ({ onFrequencyChange }) => {
  const [selectedFrequency, setSelectedFrequency] = useState("At regular intervals");
  const [selectedInterval, setSelectedInterval] = useState("Every Day");
  const [selectedDays, setSelectedDays] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2024-11-04"));
  const [endDate, setEndDate] = useState(new Date("2025-02-04"));
  const [showDatePicker, setShowDatePicker] = useState(null);

  const daysOfWeek = [
    { short: "M", label: "Mon" },
    { short: "T", label: "Tue" },
    { short: "W", label: "Wed" },
    { short: "T", label: "Thu" },
    { short: "F", label: "Fri" },
    { short: "S", label: "Sat" },
    { short: "S", label: "Sun" },
  ];

  const toggleDay = (dayIndex) => {
    if (selectedDays.includes(dayIndex)) {
      setSelectedDays(selectedDays.filter((index) => index !== dayIndex));
    } else {
      setSelectedDays([...selectedDays, dayIndex]);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (showDatePicker === "start" && selectedDate) {
      setStartDate(selectedDate);
    } else if (showDatePicker === "end" && selectedDate) {
      setEndDate(selectedDate);
    }
    setShowDatePicker(null);
  };

  return (
    <Modal visible={true} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => onFrequencyChange(null)}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Frequency</Text>
          <TouchableOpacity onPress={() => onFrequencyChange(selectedFrequency)}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.modalBody}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedFrequency}
              style={styles.picker}
              dropdownIconColor="#839ADE"
              onValueChange={(itemValue) => setSelectedFrequency(itemValue)}
            >
              <Picker.Item
                label="At regular intervals"
                value="At regular intervals"
              />
              <Picker.Item
                label="On specific days of the week"
                value="On specific days of the week"
              />
            </Picker>
          </View>

          {selectedFrequency === "At regular intervals" && (
            <>
              <Text style={styles.sectionLabel}>Choose interval</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedInterval}
                  style={styles.picker}
                  dropdownIconColor="#839ADE"
                  onValueChange={(itemValue) => setSelectedInterval(itemValue)}
                >
                  <Picker.Item label="Every Day" value="Every Day" />
                  <Picker.Item label="Every Week" value="Every Week" />
                  <Picker.Item label="Every Month" value="Every Month" />
                </Picker>
              </View>
            </>
          )}

          {selectedFrequency === "On specific days of the week" && (
            <>
              <Text style={styles.sectionLabel}>Choose days</Text>
              <View style={styles.daysContainer}>
                {daysOfWeek.map((day, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dayButton,
                      selectedDays.includes(index) && styles.dayButtonSelected,
                    ]}
                    onPress={() => toggleDay(index)}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        selectedDays.includes(index) && styles.dayTextSelected,
                      ]}
                    >
                      {day.short}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.selectedDaysText}>
                {selectedDays.length > 0
                  ? selectedDays
                      .map((index) => daysOfWeek[index].label)
                      .join(", ")
                  : "No days selected"}
              </Text>
            </>
          )}

          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Start Date</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker("start")}
              style={styles.dateInput}
            >
              <Text style={styles.dateText}>
                {startDate.toLocaleDateString("en-GB")}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>End Date</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker("end")}
              style={styles.dateInput}
            >
              <Text style={styles.dateText}>
                {endDate.toLocaleDateString("en-GB")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={showDatePicker === "start" ? startDate : endDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#F1F4FF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cancelText: {
    fontSize: 16,
    color: "#839ADE",
    paddingHorizontal: 4,
  },
  headerText: {
    fontSize: 18,
    fontFamily: "OpenSans_600SemiBold",
    color: "#292A2A",
  },
  doneText: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    color: "#839ADE",
    paddingHorizontal: 4,
  },
  modalBody: {
    borderRadius: 12,
    paddingBottom: 20,
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
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'OpenSans_600SemiBold',
    marginTop: 20,
  },
  frequencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  frequencyLabel: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
  },
  frequencyText: {
    fontSize: 14,
    color: "#839ADE",
    fontFamily: "OpenSans_400Regular",
  },
  timesTitle: {
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    marginTop: 20,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  removeText: {
    fontSize: 16,
    color: "#FF0000",
    marginRight: 10,
  },
  timeInput: {
    flex: 1,
    backgroundColor: "#D8DFF4",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    marginRight: 10,
  },
  capsuleInput: {
    width: 100,
    backgroundColor: "#D8DFF4",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
  },
  addTimeText: {
    color: "#839ADE",
    marginTop: 10,
    fontFamily: "OpenSans_400Regular",
  },
  sectionLabel: {
    fontSize: 16,
    color: "#929491",
    marginBottom: 12
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 20,
    height: 50,
    justifyContent: "center",
  },
  picker: {
    color: "#292A2A",
    height: 50,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  dayButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#839ADE",
  },
  dayButtonSelected: {
    backgroundColor: "#839ADE",
    borderWidth: 0,
  },
  dayText: {
    color: "#839ADE",
  },
  dayTextSelected: {
    color: "#FFFFFF",
  },
  selectedDaysText: {
    textAlign: "center",
    fontSize: 16,
    color: "#929491",
    marginBottom: 12
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 16,
    color: "#9C9C9C",
    marginBottom: 5,
  },
  dateInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
  },
  dateText: {
    fontSize: 16,
  },
});
