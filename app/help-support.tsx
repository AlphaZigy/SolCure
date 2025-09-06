import { Header } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import {
    Alert,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HelpSupportScreen() {
  const faqs = [
    {
      id: 1,
      question: "How do I add a new barn to the system?",
      answer: "Go to Farm Setup > Register New Barn. Fill in the barn details including name, location, leaf type, and capacity. The system will automatically configure sensors and monitoring."
    },
    {
      id: 2,
      question: "What should I do if temperature readings seem incorrect?",
      answer: "First, check if sensors are properly connected. Go to Barn Detail > Manual Controls to verify readings. If issues persist, schedule sensor calibration in the maintenance section."
    },
    {
      id: 3,
      question: "How do I interpret the AI recommendations?",
      answer: "AI recommendations show confidence levels and expected impact. High confidence (90%+) recommendations are typically safe to implement. Always review the reasoning provided before accepting."
    },
    {
      id: 4,
      question: "Can I export my curing data?",
      answer: "Yes! Go to Reports & Analytics > Export Reports. You can download PDF reports or CSV data files for your records or sharing with buyers."
    },
    {
      id: 5,
      question: "What happens during a power outage?",
      answer: "The system includes battery backup for critical monitoring. Solar panels provide primary power. You'll receive alerts if backup power drops below 20%."
    }
  ];

  const troubleshooting = [
    {
      id: 1,
      issue: "Sensors Not Responding",
      solution: "Check power connections and wireless signal strength. Restart sensor by unplugging for 30 seconds.",
      severity: "Medium"
    },
    {
      id: 2,
      issue: "Temperature Spikes",
      solution: "Verify ventilation system operation. Check for blocked air vents. Consider manual override if automatic system fails.",
      severity: "High"
    },
    {
      id: 3,
      issue: "App Won't Sync Data",
      solution: "Check internet connection. Force close and restart app. Ensure you're logged in to the correct account.",
      severity: "Low"
    },
    {
      id: 4,
      issue: "Battery Backup Warning",
      solution: "Check solar panel connections and cleanliness. Verify battery connections. Contact support if battery fails to charge.",
      severity: "High"
    }
  ];

  const [expandedFAQ, setExpandedFAQ] = React.useState<number | null>(null);

  const handleContactSupport = () => {
    Alert.alert(
      "Contact Support",
      "Choose your preferred contact method:",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Phone", onPress: () => Linking.openURL("tel:+263123456789") },
        { text: "Email", onPress: () => Linking.openURL("mailto:support@solcure.com") },
        { text: "WhatsApp", onPress: () => Linking.openURL("whatsapp://send?phone=263123456789") }
      ]
    );
  };

  const handleReportIssue = () => {
    Alert.alert("Issue Reported", "Your issue has been logged. Our support team will contact you within 24 hours.");
  };

  const handleVideoTutorial = () => {
    Alert.alert("Video Tutorials", "Opening SolCure learning portal...");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "#f44336";
      case "Medium":
        return "#ff9800";
      case "Low":
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
            text: "Help & Support",
            style: styles.headerTitle,
          }}
          backgroundColor="rgba(46, 125, 50, 0.95)"
          containerStyle={styles.headerContainer}
        />

        <ScrollView contentContainerStyle={styles.container}>
          {/* Quick Actions */}
          <Card style={styles.cardLarge}>
            <Card.Content>
              <Text style={styles.cardTitle}>🚀 Quick Actions</Text>
              
              <View style={styles.actionGrid}>
                <TouchableOpacity style={styles.actionButton} onPress={handleContactSupport}>
                  <Text style={styles.actionIcon}>📞</Text>
                  <Text style={styles.actionText}>Contact Support</Text>
                  <Text style={styles.actionSubtext}>24/7 assistance</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton} onPress={handleReportIssue}>
                  <Text style={styles.actionIcon}>🐛</Text>
                  <Text style={styles.actionText}>Report Issue</Text>
                  <Text style={styles.actionSubtext}>Log a problem</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton} onPress={handleVideoTutorial}>
                  <Text style={styles.actionIcon}>🎥</Text>
                  <Text style={styles.actionText}>Video Tutorials</Text>
                  <Text style={styles.actionSubtext}>Step-by-step guides</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionIcon}>💬</Text>
                  <Text style={styles.actionText}>Live Chat</Text>
                  <Text style={styles.actionSubtext}>Instant help</Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>

          {/* Frequently Asked Questions */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>❓ Frequently Asked Questions</Text>
              
              {faqs.map((faq) => (
                <View key={faq.id} style={styles.faqItem}>
                  <TouchableOpacity
                    style={styles.faqQuestion}
                    onPress={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  >
                    <Text style={styles.questionText}>{faq.question}</Text>
                    <Text style={styles.expandIcon}>
                      {expandedFAQ === faq.id ? "▼" : "▶"}
                    </Text>
                  </TouchableOpacity>
                  
                  {expandedFAQ === faq.id && (
                    <View style={styles.faqAnswer}>
                      <Text style={styles.answerText}>{faq.answer}</Text>
                    </View>
                  )}
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* Troubleshooting Guide */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>🔧 Troubleshooting Guide</Text>
              <Text style={styles.sectionDescription}>
                Common issues and quick solutions
              </Text>
              
              {troubleshooting.map((item) => (
                <View key={item.id} style={styles.troubleItem}>
                  <View style={styles.troubleHeader}>
                    <Text style={styles.troubleIssue}>{item.issue}</Text>
                    <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(item.severity) }]}>
                      <Text style={styles.severityText}>{item.severity}</Text>
                    </View>
                  </View>
                  <Text style={styles.troubleSolution}>{item.solution}</Text>
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* Learning Resources */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>📚 Learning Resources</Text>
              
              <TouchableOpacity style={styles.resourceItem}>
                <View style={styles.resourceIcon}>
                  <Text style={styles.resourceEmoji}>📖</Text>
                </View>
                <View style={styles.resourceContent}>
                  <Text style={styles.resourceTitle}>User Manual</Text>
                  <Text style={styles.resourceDesc}>Complete guide to using SolCure</Text>
                </View>
                <Text style={styles.resourceArrow}>→</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resourceItem}>
                <View style={styles.resourceIcon}>
                  <Text style={styles.resourceEmoji}>🎯</Text>
                </View>
                <View style={styles.resourceContent}>
                  <Text style={styles.resourceTitle}>Best Practices</Text>
                  <Text style={styles.resourceDesc}>Tips for optimal tobacco curing</Text>
                </View>
                <Text style={styles.resourceArrow}>→</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resourceItem}>
                <View style={styles.resourceIcon}>
                  <Text style={styles.resourceEmoji}>🔬</Text>
                </View>
                <View style={styles.resourceContent}>
                  <Text style={styles.resourceTitle}>Technical Specs</Text>
                  <Text style={styles.resourceDesc}>Sensor specifications and limits</Text>
                </View>
                <Text style={styles.resourceArrow}>→</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resourceItem}>
                <View style={styles.resourceIcon}>
                  <Text style={styles.resourceEmoji}>🌐</Text>
                </View>
                <View style={styles.resourceContent}>
                  <Text style={styles.resourceTitle}>Online Community</Text>
                  <Text style={styles.resourceDesc}>Connect with other farmers</Text>
                </View>
                <Text style={styles.resourceArrow}>→</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>

          {/* Contact Information */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>📞 Contact Information</Text>
              
              <View style={styles.contactGrid}>
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>📧</Text>
                  <Text style={styles.contactLabel}>Email</Text>
                  <Text style={styles.contactValue}>support@solcure.com</Text>
                </View>
                
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>📱</Text>
                  <Text style={styles.contactLabel}>Phone</Text>
                  <Text style={styles.contactValue}>+263 123 456 789</Text>
                </View>
                
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>💬</Text>
                  <Text style={styles.contactLabel}>WhatsApp</Text>
                  <Text style={styles.contactValue}>+263 123 456 789</Text>
                </View>
                
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>🕒</Text>
                  <Text style={styles.contactLabel}>Hours</Text>
                  <Text style={styles.contactValue}>24/7 Emergency
                  {'\n'}8AM-6PM Support</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* App Information */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>ℹ️ App Information</Text>
              
              <View style={styles.infoGrid}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Version</Text>
                  <Text style={styles.infoValue}>2.1.0</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Last Update</Text>
                  <Text style={styles.infoValue}>Jan 27, 2025</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Device ID</Text>
                  <Text style={styles.infoValue}>SC-DEV-001</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.updateButton}>
                <Text style={styles.updateButtonText}>🔄 Check for Updates</Text>
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
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  actionSubtext: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
    fontFamily: "Poppins-Regular",
  },
  faqItem: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 12,
    overflow: "hidden",
  },
  faqQuestion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  questionText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 1,
    fontFamily: "Poppins-Regular",
  },
  expandIcon: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
  },
  faqAnswer: {
    padding: 16,
    backgroundColor: "#ffffff",
  },
  answerText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
    fontFamily: "Poppins-Regular",
  },
  troubleItem: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ff9800",
  },
  troubleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  troubleIssue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    fontFamily: "Poppins-Bold",
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  troubleSolution: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    fontFamily: "Poppins-Regular",
  },
  resourceItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e3f2fd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  resourceEmoji: {
    fontSize: 20,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins-Bold",
  },
  resourceDesc: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    fontFamily: "Poppins-Regular",
  },
  resourceArrow: {
    fontSize: 18,
    color: "#666",
  },
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  contactItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
  },
  contactIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  contactLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    fontFamily: "Poppins-Regular",
  },
  contactValue: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  infoGrid: {
    marginBottom: 16,
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
  updateButton: {
    backgroundColor: "#2196f3",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
});
