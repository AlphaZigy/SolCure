import CustomGauge from '@/components/CustomGauge';
import { Header } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

export default function BarnDetailScreen() {
  const [manualMode, setManualMode] = React.useState(false);
  const [ventilationOverride, setVentilationOverride] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#cfd5cfff", "#8a8b8aff", "#c8c7c7ff"]}
        style={styles.background}>
        
        <Header
          centerComponent={{
            text: "Barn Detail - Plot 7A",
            style: styles.headerTitle,
          }}
          backgroundColor="rgba(46, 125, 50, 0.95)"
          containerStyle={styles.headerContainer}
        />

        <ScrollView contentContainerStyle={styles.container}>
          {/* Barn Overview */}
          <Card style={styles.cardLarge}>
            <Card.Content>
              <Text style={styles.cardTitle}>Barn Overview</Text>
              
              <View style={styles.overviewGrid}>
                <View style={styles.overviewItem}>
                  <Text style={styles.overviewLabel}>Status</Text>
                  <Text style={[styles.overviewValue, styles.active]}>Active Curing</Text>
                </View>
                <View style={styles.overviewItem}>
                  <Text style={styles.overviewLabel}>Current Phase</Text>
                  <Text style={styles.overviewValue}>Yellowing (Day 3)</Text>
                </View>
                <View style={styles.overviewItem}>
                  <Text style={styles.overviewLabel}>Leaf Type</Text>
                  <Text style={styles.overviewValue}>Virginia Gold</Text>
                </View>
                <View style={styles.overviewItem}>
                  <Text style={styles.overviewLabel}>Batch Size</Text>
                  <Text style={styles.overviewValue}>2.5 tons</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Real-time Monitoring */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>Current Conditions</Text>
              
              <View style={styles.gaugeRow}>
                <CustomGauge
                  value={68}
                  maxValue={100}
                  minValue={0}
                  title="Temperature"
                  unit="°C"
                  size={100}
                />
                <CustomGauge
                  value={65}
                  maxValue={100}
                  minValue={0}
                  title="Humidity"
                  unit="%"
                  size={100}
                />
                <CustomGauge
                  value={75}
                  maxValue={100}
                  minValue={0}
                  title="Air Flow"
                  unit="%"
                  size={100}
                />
              </View>
            </Card.Content>
          </Card>

          {/* Historical Trends */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>24-Hour Temperature Trend</Text>
              <LineChart
                data={{
                  labels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
                  datasets: [
                    { 
                      data: [62, 65, 68, 70, 67],
                      color: () => "#4caf50",
                      strokeWidth: 3
                    }
                  ],
                }}
                width={screenWidth - 48}
                height={220}
                chartConfig={{
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                  labelColor: () => "#000",
                  strokeWidth: 2,
                  decimalPlaces: 0,
                }}
                style={styles.chart}
              />
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>24-Hour Humidity Trend</Text>
              <LineChart
                data={{
                  labels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
                  datasets: [
                    { 
                      data: [70, 68, 65, 62, 64],
                      color: () => "#2196f3",
                      strokeWidth: 3
                    }
                  ],
                }}
                width={screenWidth - 48}
                height={220}
                chartConfig={{
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
                  labelColor: () => "#000",
                  strokeWidth: 2,
                  decimalPlaces: 0,
                }}
                style={styles.chart}
              />
            </Card.Content>
          </Card>

          {/* Manual Controls */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>Manual Override Controls</Text>
              
              <View style={styles.controlRow}>
                <Text style={styles.controlLabel}>Manual Mode</Text>
                <Switch
                  value={manualMode}
                  onValueChange={setManualMode}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={manualMode ? "#4caf50" : "#f4f3f4"}
                />
              </View>

              {manualMode && (
                <>
                  <View style={styles.controlRow}>
                    <Text style={styles.controlLabel}>Ventilation Override</Text>
                    <Switch
                      value={ventilationOverride}
                      onValueChange={setVentilationOverride}
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={ventilationOverride ? "#4caf50" : "#f4f3f4"}
                    />
                  </View>
                  
                  <Text style={styles.warningText}>
                    ⚠️ Manual mode overrides automatic curing controls. Monitor conditions closely.
                  </Text>
                </>
              )}
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
  overviewGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  overviewItem: {
    width: "48%",
    marginBottom: 12,
  },
  overviewLabel: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  overviewValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins-Bold",
  },
  active: {
    color: "#4caf50",
  },
  gaugeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  controlRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  controlLabel: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  warningText: {
    fontSize: 14,
    color: "#ff9800",
    fontFamily: "Poppins-Regular",
    marginTop: 12,
    padding: 12,
    backgroundColor: "#fff3e0",
    borderRadius: 8,
  },
});
