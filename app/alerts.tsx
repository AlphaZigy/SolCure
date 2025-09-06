import { Header } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AlertsScreen() {
  const criticalAlerts = [
    {
      id: 1,
      type: "critical",
      title: "Temperature High Alert",
      message: "Barn 7A temperature exceeded 75°C for 15 minutes",
      time: "2 minutes ago",
      action: "Open vents immediately"
    },
    {
      id: 2,
      type: "warning",
      title: "Humidity Sensor Offline",
      message: "Barn 3B humidity sensor not responding",
      time: "1 hour ago",
      action: "Check sensor connection"
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: "Optimize Airflow",
      message: "Consider reducing ventilation by 15% to maintain target humidity",
      barn: "Barn 7A",
      priority: "medium"
    },
    {
      id: 2,
      title: "Phase Transition Ready",
      message: "Yellowing phase complete. Ready to switch to leaf drying phase",
      barn: "Barn 5C",
      priority: "high"
    },
    {
      id: 3,
      title: "Energy Optimization",
      message: "Solar panel efficiency at 95%. Good time for high-energy operations",
      barn: "All Barns",
      priority: "low"
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return "🚨";
      case "warning":
        return "⚠️";
      default:
        return "ℹ️";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#f44336";
      case "medium":
        return "#ff9800";
      case "low":
        return "#4caf50";
      default:
        return "#666";
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#cfd5cfff", "#8a8b8aff", "#c8c7c7ff"]}
        style={styles.background}>
        
        <Header
          centerComponent={{
            text: "Alerts & Notifications",
            style: styles.headerTitle,
          }}
          backgroundColor="rgba(46, 125, 50, 0.95)"
          containerStyle={styles.headerContainer}
        />

        <ScrollView contentContainerStyle={styles.container}>
          {/* Critical Alerts */}
          <Card style={styles.cardLarge}>
            <Card.Content>
              <Text style={styles.cardTitle}>🚨 Critical Alerts</Text>
              
              {criticalAlerts.map((alert) => (
                <TouchableOpacity key={alert.id} style={styles.alertItem}>
                  <View style={styles.alertHeader}>
                    <Text style={styles.alertIcon}>{getAlertIcon(alert.type)}</Text>
                    <View style={styles.alertContent}>
                      <Text style={styles.alertTitle}>{alert.title}</Text>
                      <Text style={styles.alertMessage}>{alert.message}</Text>
                      <Text style={styles.alertTime}>{alert.time}</Text>
                    </View>
                  </View>
                  <View style={styles.alertAction}>
                    <Text style={styles.actionText}>{alert.action}</Text>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>Take Action</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}

              {criticalAlerts.length === 0 && (
                <View style={styles.noAlerts}>
                  <Text style={styles.noAlertsText}>✅ No critical alerts</Text>
                  <Text style={styles.noAlertsSubtext}>All systems operating normally</Text>
                </View>
              )}
            </Card.Content>
          </Card>

          {/* AI Recommendations */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>🤖 AI Recommendations</Text>
              
              {recommendations.map((rec) => (
                <View key={rec.id} style={styles.recommendationItem}>
                  <View style={styles.recHeader}>
                    <Text style={styles.recTitle}>{rec.title}</Text>
                    <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(rec.priority) }]}>
                      <Text style={styles.priorityText}>{rec.priority.toUpperCase()}</Text>
                    </View>
                  </View>
                  <Text style={styles.recMessage}>{rec.message}</Text>
                  <Text style={styles.recBarn}>📍 {rec.barn}</Text>
                  
                  <View style={styles.recActions}>
                    <TouchableOpacity style={styles.acceptButton}>
                      <Text style={styles.acceptButtonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dismissButton}>
                      <Text style={styles.dismissButtonText}>Dismiss</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* Notification Settings */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>🔔 Notification Settings</Text>
              
              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingLabel}>Critical Alerts</Text>
                <Text style={styles.settingValue}>Immediate Push + SMS</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingLabel}>Recommendations</Text>
                <Text style={styles.settingValue}>Daily Digest</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingLabel}>System Updates</Text>
                <Text style={styles.settingValue}>Weekly Report</Text>
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
  alertItem: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#fff5f5",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#f44336",
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  alertIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins-Bold",
  },
  alertMessage: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
    fontFamily: "Poppins-Regular",
  },
  alertTime: {
    fontSize: 12,
    color: "#999",
    fontFamily: "Poppins-Regular",
  },
  alertAction: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  actionText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontFamily: "Poppins-Regular",
  },
  actionButton: {
    backgroundColor: "#f44336",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  actionButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  noAlerts: {
    alignItems: "center",
    padding: 24,
  },
  noAlertsText: {
    fontSize: 18,
    color: "#4caf50",
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  noAlertsSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontFamily: "Poppins-Regular",
  },
  recommendationItem: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#2196f3",
  },
  recHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  recTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins-Bold",
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  recMessage: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontFamily: "Poppins-Regular",
  },
  recBarn: {
    fontSize: 12,
    color: "#999",
    marginBottom: 12,
    fontFamily: "Poppins-Regular",
  },
  recActions: {
    flexDirection: "row",
    gap: 8,
  },
  acceptButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  acceptButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  dismissButton: {
    backgroundColor: "#757575",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  dismissButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingLabel: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  settingValue: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
});
