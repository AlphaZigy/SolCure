import { Header } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FarmSetupScreen() {
  const [barnName, setBarnName] = React.useState('');
  const [barnLocation, setBarnLocation] = React.useState('');
  const [leafType, setLeafType] = React.useState('');
  const [barnSize, setBarnSize] = React.useState('');

  const curingProfiles = [
    {
      id: 1,
      name: "Virginia Gold Standard",
      description: "Optimized for Virginia tobacco varieties",
      phases: "4 phases, 7-10 days total",
      temp: "32-65°C",
      humidity: "85-60%"
    },
    {
      id: 2,
      name: "Burley Quick Cure",
      description: "Fast curing for Burley tobacco",
      phases: "3 phases, 5-7 days total", 
      temp: "35-70°C",
      humidity: "80-55%"
    },
    {
      id: 3,
      name: "Oriental Premium",
      description: "Gentle curing for Oriental varieties",
      phases: "5 phases, 10-14 days total",
      temp: "30-60°C",
      humidity: "90-65%"
    }
  ];

  const handleAddBarn = () => {
    if (!barnName || !barnLocation || !leafType || !barnSize) {
      Alert.alert("Missing Information", "Please fill in all fields to register the barn.");
      return;
    }
    
    Alert.alert(
      "Barn Registered",
      `${barnName} has been successfully registered and is ready for curing operations.`,
      [{ text: "OK", onPress: () => {
        setBarnName('');
        setBarnLocation('');
        setLeafType('');
        setBarnSize('');
      }}]
    );
  };

  const handleSelectProfile = (profileName: string) => {
    Alert.alert(
      "Profile Selected",
      `${profileName} has been set as the default curing profile for new barns.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#cfd5cfff", "#8a8b8aff", "#c8c7c7ff"]}
        style={styles.background}>
        
        <Header
          centerComponent={{
            text: "Farm Setup",
            style: styles.headerTitle,
          }}
          backgroundColor="rgba(46, 125, 50, 0.95)"
          containerStyle={styles.headerContainer}
        />

        <ScrollView contentContainerStyle={styles.container}>
          {/* Add New Barn */}
          <Card style={styles.cardLarge}>
            <Card.Content>
              <Text style={styles.cardTitle}>🏗️ Register New Barn</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Barn Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={barnName}
                  onChangeText={setBarnName}
                  placeholder="e.g., Barn 8B"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Location/Plot</Text>
                <TextInput
                  style={styles.textInput}
                  value={barnLocation}
                  onChangeText={setBarnLocation}
                  placeholder="e.g., Plot 12A, Murehwa"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputRow}>
                <View style={styles.inputGroupHalf}>
                  <Text style={styles.inputLabel}>Leaf Type</Text>
                  <TextInput
                    style={styles.textInput}
                    value={leafType}
                    onChangeText={setLeafType}
                    placeholder="e.g., Virginia"
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.inputGroupHalf}>
                  <Text style={styles.inputLabel}>Capacity (tons)</Text>
                  <TextInput
                    style={styles.textInput}
                    value={barnSize}
                    onChangeText={setBarnSize}
                    placeholder="e.g., 2.5"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.addButton} onPress={handleAddBarn}>
                <Text style={styles.addButtonText}>📍 Register Barn</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>

          {/* Curing Profiles */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>⚙️ Curing Profiles</Text>
              <Text style={styles.sectionDescription}>
                Select optimized curing profiles for different tobacco varieties
              </Text>
              
              {curingProfiles.map((profile) => (
                <TouchableOpacity 
                  key={profile.id} 
                  style={styles.profileItem}
                  onPress={() => handleSelectProfile(profile.name)}
                >
                  <View style={styles.profileHeader}>
                    <Text style={styles.profileName}>{profile.name}</Text>
                    <View style={styles.selectButton}>
                      <Text style={styles.selectButtonText}>Select</Text>
                    </View>
                  </View>
                  <Text style={styles.profileDescription}>{profile.description}</Text>
                  
                  <View style={styles.profileSpecs}>
                    <View style={styles.specItem}>
                      <Text style={styles.specLabel}>Duration:</Text>
                      <Text style={styles.specValue}>{profile.phases}</Text>
                    </View>
                    <View style={styles.specItem}>
                      <Text style={styles.specLabel}>Temperature:</Text>
                      <Text style={styles.specValue}>{profile.temp}</Text>
                    </View>
                    <View style={styles.specItem}>
                      <Text style={styles.specLabel}>Humidity:</Text>
                      <Text style={styles.specValue}>{profile.humidity}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </Card.Content>
          </Card>

          {/* Farm Overview */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>🗺️ Farm Overview</Text>
              
              <View style={styles.farmStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>7</Text>
                  <Text style={styles.statLabel}>Active Barns</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>12.5</Text>
                  <Text style={styles.statLabel}>Total Capacity (tons)</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>3</Text>
                  <Text style={styles.statLabel}>Currently Curing</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.mapButton}>
                <Text style={styles.mapButtonText}>🗺️ View Farm Map</Text>
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
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    fontFamily: "Poppins-Regular",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  inputGroupHalf: {
    width: "48%",
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    backgroundColor: "#fafafa",
  },
  addButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  profileItem: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins-Bold",
    flex: 1,
  },
  selectButton: {
    backgroundColor: "#2196f3",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  profileDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    fontFamily: "Poppins-Regular",
  },
  profileSpecs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  specItem: {
    flex: 1,
  },
  specLabel: {
    fontSize: 12,
    color: "#999",
    fontFamily: "Poppins-Regular",
  },
  specValue: {
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  farmStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4caf50",
    fontFamily: "Poppins-Bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  mapButton: {
    backgroundColor: "#ff9800",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  mapButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
});
