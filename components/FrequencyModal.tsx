import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Modal } from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker, { DateTimePickerEvent, Event } from "@react-native-community/datetimepicker";
import { addAgendaItem } from "../api/userApi";
import { UserContext } from "@/contexts/UserContext";

export default function FrequencyModal({ onFrequencyChange }: { onFrequencyChange: (newFrequency: any | null) => void }) {
  const [selectedFrequency, setSelectedFrequency] = useState<string>("At regular intervals");
  const [selectedInterval, setSelectedInterval] = useState<string>("Every Day");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // For validation errors

  const daysOfWeek = [
    { short: "M", label: "Mon" },
    { short: "T", label: "Tue" },
    { short: "W", label: "Wed" },
    { short: "T", label: "Thu" },
    { short: "F", label: "Fri" },
    { short: "S", label: "Sat" },
    { short: "S", label: "Sun" },
  ];
  
  const renderSelectedDays = () => {
    if (selectedDays.length > 0) {
      return selectedDays.map((dayIndex) => daysOfWeek[dayIndex].label).join(", ");
    } else {
      return "No days selected";
    }
  };  

  const toggleDay = (dayIndex: number): void => {
    if (selectedDays.includes(dayIndex)) {
      setSelectedDays(selectedDays.filter((index) => index !== dayIndex)); // Remove the day if it's already selected
    } else {
      setSelectedDays([...selectedDays, dayIndex]); // Add the day if it's not selected
    }
    setError(null); // Clear error on day selection
  };  

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date): void => {
    if (showDatePicker === "start" && selectedDate) {
      setStartDate(selectedDate);
    } else if (showDatePicker === "end" && selectedDate) {
      setEndDate(selectedDate);
    }
    setShowDatePicker(null); // Close the date picker
  };

  const handleDone = () => {
    if (selectedFrequency === "On specific days of the week" && selectedDays.length === 0) {
      setError("Please select at least one day of the week.");
      return;
    }

    const frequencyData = {
      frequency: selectedFrequency,
      interval: selectedInterval,
      startDate,
      endDate,
      selectedDays: selectedFrequency === "On specific days of the week" ? selectedDays : undefined,
    };

    console.log('Frequency Data:', frequencyData);  // Log frequency data

    onFrequencyChange(frequencyData); // Pass the frequency data back to the parent
  };

  const handleCancel = () => {
    onFrequencyChange(null); // Notify the parent to close the modal
  };

  return (
    <Modal visible={true} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Frequency</Text>
          <TouchableOpacity onPress={handleDone}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.modalBody}>
          {/* Frequency selection logic */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedFrequency}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setSelectedFrequency(itemValue);
                setError(null); // Clear any existing errors when changing frequency
              }}
            >
              <Picker.Item label="At regular intervals" value="At regular intervals" />
              <Picker.Item label="On specific days of the week" value="On specific days of the week" />
            </Picker>
          </View>

          {selectedFrequency === "At regular intervals" && (
            <>
              <Text style={styles.sectionLabel}>Choose interval</Text>
              <Picker
                selectedValue={selectedInterval}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedInterval(itemValue)}
              >
                <Picker.Item label="Every Day" value="Every Day" />
                <Picker.Item label="Every Week" value="Every Week" />
                <Picker.Item label="Every Month" value="Every Month" />
              </Picker>
            </>
          )}

          {selectedFrequency === "On specific days of the week" && (
            <>
              <Text style={styles.sectionLabel}>Choose days</Text>
              <View style={styles.daysContainer}>
                {daysOfWeek.map((day, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.dayButton, selectedDays.includes(index) && styles.dayButtonSelected]}
                    onPress={() => toggleDay(index)}
                  >
                    <Text
                      style={[styles.dayText, selectedDays.includes(index) && styles.dayTextSelected]}
                    >
                      {day.short}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.selectedDaysText}>
                {selectedDays.length > 0
                  ? selectedDays.map((index) => daysOfWeek[index].label).join(", ")
                  : "No days selected"}
              </Text>
            </>
          )}

          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Start Date</Text>
            <TouchableOpacity onPress={() => setShowDatePicker("start")} style={styles.dateInput}>
              <Text style={styles.dateText}>{startDate.toLocaleDateString("en-GB")}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>End Date</Text>
            <TouchableOpacity onPress={() => setShowDatePicker("end")} style={styles.dateInput}>
              <Text style={styles.dateText}>{endDate.toLocaleDateString("en-GB")}</Text>
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
        paddingTop: 80,
        paddingHorizontal: 20,
        paddingBottom: 0,
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
    pickerContainer: {
        backgroundColor: "#D8DFF4",
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    picker: {
        color: "#292A2A",
    },
    sectionLabel: {
        fontSize: 16,
        fontFamily: "OpenSans_600SemiBold",
        marginBottom: 8,
    },
    daysContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    dayButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D8DFF4",
        margin: 4,
    },
    dayButtonSelected: {
        backgroundColor: "#839ADE",
    },
    dayText: {
        fontSize: 16,
        fontFamily: "OpenSans_400Regular",
        color: "#292A2A",
      },
    dayTextSelected: {
        color: "#FFFFFF",
    },
    selectedDaysText: {
        fontSize: 14,
        fontFamily: "OpenSans_400Regular",
        color: "#292A2A",
        marginBottom: 20,
    },
    dateContainer: {
        marginBottom: 12,
    },
    dateLabel: {
        fontSize: 16,
        fontFamily: "OpenSans_600SemiBold",
        marginBottom: 8,
    },
    dateInput: {
        backgroundColor: "#D8DFF4",
        borderRadius: 10,
        padding: 12,
    },
    dateText: {
        fontSize: 14,
        fontFamily: "OpenSans_400Regular",
        color: "#292A2A",
    },
})