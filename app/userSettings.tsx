import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Alert, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { UserContext } from '@/contexts/UserContext';
import { updateUser, updateAvatar } from '@/api/userApi';

export default function UserSettings() {
  const router = useRouter();
  const { user, token, setUserData } = useContext(UserContext)!;
  
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  const handleUpdate = async () => {
    if (!token) {
      Alert.alert("Error", "User is not authenticated. Please log in again.");
      return;
    }

    if (newPassword && newPassword !== password) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      const updatedData = { username, email, password, newPassword };
      await updateUser(user.id, updatedData, token);

      if (avatar && avatar !== user?.avatar) {
        const imageFile = {
          uri: avatar,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        };

        await updateAvatar(user.id, imageFile, token); 
      }

      const updatedUser = { ...user, username: updatedData.username, email: updatedData.email, avatar: avatar || user?.avatar };
      setUserData(updatedUser, token); 

      Alert.alert("Success", "Profile updated successfully!");
      setIsProfileUpdated(false);
      router.push('/profile');
    } catch (error) {
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      setIsProfileUpdated(true);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "username" && value !== user?.username) setIsProfileUpdated(true);
    if (field === "email" && value !== user?.email) setIsProfileUpdated(true);
    if (field === "password" && value) setIsProfileUpdated(true);
    if (field === "newPassword" && value) setIsProfileUpdated(true);

    if (field === "username") setUsername(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "newPassword") setNewPassword(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.backText} onPress={() => router.push('/profile')}>&lt; Back</Text>
          <Text style={styles.title}>Personal info</Text>
          <Text style={styles.doneText} onPress={handleUpdate} disabled={!isProfileUpdated}>Done</Text>
        </View>
      </View>
      <View style={styles.headerSeparator} />

      <View style={styles.section}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: avatar || user.avatar }} style={styles.profilePicture}/>
          <TouchableOpacity style={styles.editButton} onPress={pickAvatar}>
            <Ionicons name="pencil" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={username} onChangeText={(value) => handleInputChange('username', value)} placeholder="Username"/>

        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} value={email} onChangeText={(value) => handleInputChange('email', value)} placeholder="Email"/>

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={(value) => handleInputChange('password', value)} placeholder="*******" secureTextEntry/>

        <Text style={styles.label}>Confirm your new password</Text>
        <TextInput style={styles.input} value={newPassword} onChangeText={(value) => handleInputChange('newPassword', value)} placeholder="*******" secureTextEntry/>
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
});
