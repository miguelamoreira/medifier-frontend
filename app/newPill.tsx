import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Modal } from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker, { DateTimePickerEvent, Event } from "@react-native-community/datetimepicker";
import { addAgendaItem } from "../api/userApi";
import { UserContext } from "@/contexts/UserContext";

export default function NewPill() {
  const router = useRouter();
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext is not provided. Please wrap the component with UserContext.Provider.");
  }

  const { user, token, clearUser } = userContext;

  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [times, setTimes] = useState<{ id: number; time: Date; capsules: number }[]>([
    { id: 1, time: new Date(0, 0, 0, 9, 0), capsules: 1 },
    { id: 2, time: new Date(0, 0, 0, 21, 0), capsules: 2 },
  ]);
  const [frequencyModalVisible, setFrequencyModalVisible] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<string>("Every Day");
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<number | null>(null);
  const [pillName, setPillName] = useState<string>("");
  const [pillStrength, setPillStrength] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const addTimeSlot = (): void => {
    const newTime = { id: Date.now(), time: new Date(), capsules: 1 };
    setTimes([...times, newTime]);
  };

  const removeTimeSlot = (id: number): void => {
    setTimes(times.filter((item) => item.id !== id));
  };

  const updateTimeSlot = (id: number, key: "time" | "capsules", value: any): void => {
    setTimes(times.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const handleTimeChange = (event: DateTimePickerEvent, date?: Date): void => {
    if (event.type === "set" && date && selectedTimeSlotId !== null) {
      updateTimeSlot(selectedTimeSlotId, "time", date); // Update the selected time slot's time
    }
    setShowTimePicker(false); 
  };

  const handleFrequencyChange = (frequencyData: any): void => {
    if (frequencyData) {
      setFrequency(frequencyData.frequency || "Every Day");
      setStartDate(frequencyData.startDate || new Date());
      setEndDate(frequencyData.endDate || new Date());
      if (frequencyData.selectedDays) setSelectedDays(frequencyData.selectedDays);
    }
  };

  const handleDone = async (): Promise<void> => {
    if (times.length === 0) {
      console.warn("Times array is empty!");
    } else {
      times.forEach((timeSlot, index) => {
        console.log(`Time Slot ${index + 1}:`, {
          time: timeSlot.time,
          capsules: timeSlot.capsules,
        });
      });
    }
  
    const pillData = {
      medication: pillName,
      strength: pillStrength,
      frequency,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      times: times.map((timeSlot) => {
        return {
          time: timeSlot.time.toISOString().split('T')[1].substring(0, 5),
          amount: timeSlot.capsules,
        };
      }),      
      selectedDays: frequency === "On specific days of the week" ? selectedDays : undefined,
    };

    console.log("Pill Data to be submitted:", pillData);
  
    try {
      await addAgendaItem(pillData, token);
      alert("Pill added successfully!");
      setModalVisible(false);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error occurred while adding pill:", error);
      alert("An error occurred while adding the pill. Please try again.");
    }
  };
  

  const handleCancel = (): void => {
    setModalVisible(false);
    router.push("/dashboard");
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Pill Form</Text>
          <TouchableOpacity onPress={handleDone}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.modalBody}>
          <Text style={styles.label}>Pill Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Add Pill Name"
            value={pillName}
            onChangeText={setPillName}
          />

          <Text style={styles.label}>Strength (mg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Add Strength"
            keyboardType="numeric"
            value={pillStrength}
            onChangeText={setPillStrength}
          />

          <Text style={styles.sectionTitle}>When will you take this?</Text>
          <TouchableOpacity
            style={styles.frequencyContainer}
            onPress={() => setFrequencyModalVisible(true)}
          >
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
                <TouchableOpacity
                  onPress={() => {
                    setSelectedTimeSlotId(item.id);
                    setShowTimePicker(true);
                  }}
                >
                  <Text style={styles.timeText}>
                    {item.time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </TouchableOpacity>
                <TextInput
                  keyboardType="numeric"
                  placeholder="Capsules"
                  value={item.capsules.toString()}
                  onChangeText={(text) =>
                    updateTimeSlot(item.id, "capsules", parseInt(text) || 0)
                  }
                  style={styles.capsuleInput}
                />
              </View>
            )}
          />
          <TouchableOpacity onPress={addTimeSlot}>
            <Text style={styles.addTimeText}>+ Add a Time</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={times.find((item) => item.id === selectedTimeSlotId)?.time || new Date()}
          onChange={handleTimeChange}
        />
      )}

      {frequencyModalVisible && (
        <FrequencyModal
          onFrequencyChange={(frequencyData) => {
            if (frequencyData) {
              handleFrequencyChange(frequencyData); // Update frequency data
            }
            setFrequencyModalVisible(false); // Close the modal
          }}
        />
      )}
    </Modal>
  );
}


const FrequencyModal = ({ onFrequencyChange }: { onFrequencyChange: (newFrequency: any | null) => void }) => {
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

  const toggleDay = (dayIndex: number): void => {
    if (selectedDays.includes(dayIndex)) {
      setSelectedDays(selectedDays.filter((index) => index !== dayIndex));
    } else {
      setSelectedDays([...selectedDays, dayIndex]);
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
              {error && <Text>{error}</Text>}
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
    marginBottom: 8,
  },
  frequencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#D8DFF4",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  frequencyLabel: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    color: "#292A2A",
  },
  frequencyText: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    color: "#839ADE",
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
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: "#D8DFF4",
  },
  dateTimePickerContainer: {
    flex: 1, 
    justifyContent: "center"
  },
  removeText: {
    color: "#FF6B6B",
    fontSize: 16,
    marginRight: 8,
  },
  timeText: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    marginHorizontal: 8,
    color: "#292A2A",
  },
  capsuleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  capsuleInput: {
    width: 50,
    height: 40,
    backgroundColor: "#D8DFF4",
    borderRadius: 10,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    textAlign: "center",
    marginRight: 8,
  },
  capsuleLabel: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    color: "#292A2A",
  },
  addTimeText: {
    color: "#839ADE",
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    marginTop: 12,
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
});