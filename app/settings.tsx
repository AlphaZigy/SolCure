import { Header } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [tempUnit, setTempUnit] = React.useState('celsius'); // celsius or fahrenheit
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [smsAlerts, setSmsAlerts] = React.useState(false);
  const [language, setLanguage] = React.useState('english');
  const [darkMode, setDarkMode] = React.useState(false);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    Alert.alert("Language Changed", `App language changed to ${newLanguage}`);
  };

  const handleTempUnitChange = () => {
    const newUnit = tempUnit === 'celsius' ? 'fahrenheit' : 'celsius';
    setTempUnit(newUnit);
    Alert.alert("Temperature Unit", `Temperature display changed to ${newUnit === 'celsius' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}`);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => {
          Alert.alert("Logged Out", "You have been successfully logged out.");
        }}
      ]
    );
  };

  const handleDataBackup = () => {
    Alert.alert("Data Backup", "Your farm data has been backed up to cloud storage.");
  };

  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'shona', name: 'Shona', flag: '🇿🇼' },
    { code: 'ndebele', name: 'Ndebele', flag: '🇿🇼' },
    { code: 'portuguese', name: 'Português', flag: '🇵🇹' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#cfd5cfff", "#8a8b8aff", "#c8c7c7ff"]}
        style={styles.background}>
        
        <Header
          centerComponent={{
            text: "Settings & Profile",
            style: styles.headerTitle,
          }}
          backgroundColor="rgba(46, 125, 50, 0.95)"
          containerStyle={styles.headerContainer}
        />

        <ScrollView contentContainerStyle={styles.container}>
          {/* User Profile */}
          <Card style={styles.cardLarge}>
            <Card.Content>
              <Text style={styles.cardTitle}>👤 User Profile</Text>
              
              <View style={styles.profileSection}>
                <View style={styles.profileAvatar}>
                  <Text style={styles.avatarText}>JD</Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>John Doe</Text>
                  <Text style={styles.profileEmail}>john.doe@solcure.com</Text>
                  <Text style={styles.profileRole}>Farm Manager</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.editProfileButton}>
                <Text style={styles.editProfileText}>✏️ Edit Profile</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>

          {/* Language & Units */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>🌍 Language & Units</Text>
              
              <View style={styles.sectionItem}>
                <Text style={styles.sectionLabel}>Language</Text>
                <View style={styles.languageGrid}>
                  {languages.map((lang) => (
                    <TouchableOpacity
                      key={lang.code}
                      style={[
                        styles.languageButton,
                        language === lang.code && styles.languageButtonActive
                      ]}
                      onPress={() => handleLanguageChange(lang.code)}
                    >
                      <Text style={styles.languageFlag}>{lang.flag}</Text>
                      <Text style={[
                        styles.languageText,
                        language === lang.code && styles.languageTextActive
                      ]}>
                        {lang.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.sectionItem}>
                <View style={styles.unitRow}>
                  <Text style={styles.sectionLabel}>Temperature Unit</Text>
                  <TouchableOpacity style={styles.unitToggle} onPress={handleTempUnitChange}>
                    <Text style={[
                      styles.unitOption,
                      tempUnit === 'celsius' && styles.unitOptionActive
                    ]}>°C</Text>
                    <Text style={[
                      styles.unitOption,
                      tempUnit === 'fahrenheit' && styles.unitOptionActive
                    ]}>°F</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Notifications */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>🔔 Notification Preferences</Text>
              
              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationTitle}>Push Notifications</Text>
                  <Text style={styles.notificationDesc}>Receive alerts on your device</Text>
                </View>
                <Switch
                  value={pushNotifications}
                  onValueChange={setPushNotifications}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={pushNotifications ? "#4caf50" : "#f4f3f4"}
                />
              </View>

              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationTitle}>Email Notifications</Text>
                  <Text style={styles.notificationDesc}>Daily reports and summaries</Text>
                </View>
                <Switch
                  value={emailNotifications}
                  onValueChange={setEmailNotifications}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={emailNotifications ? "#4caf50" : "#f4f3f4"}
                />
              </View>

              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationTitle}>SMS Alerts</Text>
                  <Text style={styles.notificationDesc}>Critical alerts via SMS</Text>
                </View>
                <Switch
                  value={smsAlerts}
                  onValueChange={setSmsAlerts}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={smsAlerts ? "#4caf50" : "#f4f3f4"}
                />
              </View>
            </Card.Content>
          </Card>

          {/* App Preferences */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>⚙️ App Preferences</Text>
              
              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationTitle}>Dark Mode</Text>
                  <Text style={styles.notificationDesc}>Use dark theme</Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={darkMode ? "#4caf50" : "#f4f3f4"}
                />
              </View>

              <TouchableOpacity style={styles.settingButton} onPress={handleDataBackup}>
                <Text style={styles.settingButtonText}>☁️ Backup Data</Text>
                <Text style={styles.settingButtonDesc}>Last backup: Today, 2:30 PM</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>🔄 Sync Settings</Text>
                <Text style={styles.settingButtonDesc}>Sync across all devices</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>

          {/* Account Management */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>🔐 Account Management</Text>
              
              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>🔑 Change Password</Text>
                <Text style={styles.settingButtonDesc}>Update your password</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>🛡️ Privacy Settings</Text>
                <Text style={styles.settingButtonDesc}>Manage data sharing</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>📱 Connected Devices</Text>
                <Text style={styles.settingButtonDesc}>Manage authorized devices</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.settingButton, styles.logoutButton]} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>🚪 Logout</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>

          {/* App Info */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>ℹ️ App Information</Text>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Version</Text>
                <Text style={styles.infoValue}>2.1.0</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Build</Text>
                <Text style={styles.infoValue}>20250127</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Last Updated</Text>
                <Text style={styles.infoValue}>January 27, 2025</Text>
              </View>

              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>📋 Terms of Service</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingButton}>
                <Text style={styles.settingButtonText}>🔒 Privacy Policy</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1B5E20',
  },
  background: {
    flex: 1,
  },
  headerContainer: {
    borderBottomWidth: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderTopColor: 'rgba(255,255,255,0.8)',
    borderLeftColor: 'rgba(255,255,255,0.8)',
  },
  cardLarge: {
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.98)",
    borderRadius: 20,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderTopColor: 'rgba(255,255,255,0.9)',
    borderLeftColor: 'rgba(255,255,255,0.9)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 16,
    fontFamily: "Poppins-Bold",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins-Bold",
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
    marginVertical: 2,
    fontFamily: "Poppins-Regular",
  },
  profileRole: {
    fontSize: 12,
    color: "#4caf50",
    fontFamily: "Poppins-Regular",
  },
  editProfileButton: {
    backgroundColor: "#2196f3",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  editProfileText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  sectionItem: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  languageButton: {
    width: "48%",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e9ecef",
    alignItems: "center",
    marginBottom: 8,
  },
  languageButtonActive: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  languageFlag: {
    fontSize: 20,
    marginBottom: 4,
  },
  languageText: {
    fontSize: 12,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  languageTextActive: {
    color: "white",
    fontWeight: "bold",
  },
  unitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  unitToggle: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 4,
  },
  unitOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  unitOptionActive: {
    backgroundColor: "#4caf50",
    color: "white",
    borderRadius: 8,
    fontWeight: "bold",
  },
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  notificationDesc: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    fontFamily: "Poppins-Regular",
  },
  settingButton: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingButtonText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  settingButtonDesc: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    fontFamily: "Poppins-Regular",
  },
  logoutButton: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#f44336",
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
});
