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

export default function AIRecommendationsScreen() {
  const aiInsights = [
    {
      id: 1,
      type: "optimization",
      title: "Airflow Optimization",
      recommendation: "Reduce airflow by 10% to reach target humidity of 65%",
      confidence: 94,
      impact: "High",
      reasoning: "Current humidity is 2% below target. Historical data shows airflow reduction typically increases humidity by 0.8% per 5% reduction.",
      action: "Adjust ventilation controls",
      estimatedTime: "15 minutes"
    },
    {
      id: 2,
      type: "phase",
      title: "Phase Transition Ready",
      recommendation: "Switch to curing Phase 2 tomorrow at 6:00 AM",
      confidence: 98,
      impact: "Critical",
      reasoning: "Yellowing phase targets achieved. Leaf moisture content at optimal level (18.2%). Temperature profile indicates readiness for next phase.",
      action: "Schedule phase transition",
      estimatedTime: "Automated"
    },
    {
      id: 3,
      type: "energy",
      title: "Energy Efficiency Boost",
      recommendation: "Schedule high-energy operations between 11 AM - 2 PM for optimal solar efficiency",
      confidence: 87,
      impact: "Medium",
      reasoning: "Solar panel efficiency forecast shows 95%+ efficiency during this window. Can reduce grid dependency by 23%.",
      action: "Update operation schedule",
      estimatedTime: "5 minutes"
    },
    {
      id: 4,
      type: "maintenance",
      title: "Preventive Maintenance",
      recommendation: "Schedule sensor calibration for Barn 3B humidity sensor",
      confidence: 76,
      impact: "Medium",
      reasoning: "Sensor readings showing 2.1% variance from redundant sensors. Calibration will improve accuracy.",
      action: "Schedule maintenance",
      estimatedTime: "30 minutes"
    }
  ];

  const weeklyTrends = [
    {
      metric: "Curing Efficiency",
      current: 94.2,
      predicted: 96.8,
      change: "+2.6%"
    },
    {
      metric: "Energy Usage",
      current: 847,
      predicted: 723,
      change: "-14.6%"
    },
    {
      metric: "Quality Score",
      current: 87.3,
      predicted: 89.1,
      change: "+2.1%"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "optimization":
        return "⚙️";
      case "phase":
        return "🔄";
      case "energy":
        return "⚡";
      case "maintenance":
        return "🔧";
      default:
        return "🤖";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical":
        return "#f44336";
      case "High":
        return "#ff9800";
      case "Medium":
        return "#4caf50";
      case "Low":
        return "#2196f3";
      default:
        return "#666";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "#4caf50";
    if (confidence >= 75) return "#ff9800";
    return "#f44336";
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#cfd5cfff", "#8a8b8aff", "#c8c7c7ff"]}
        style={styles.background}>
        
        <Header
          centerComponent={{
            text: "AI Recommendations",
            style: styles.headerTitle,
          }}
          backgroundColor="rgba(46, 125, 50, 0.95)"
          containerStyle={styles.headerContainer}
        />

        <ScrollView contentContainerStyle={styles.container}>
          {/* AI Status */}
          <Card style={styles.cardLarge}>
            <Card.Content>
              <Text style={styles.cardTitle}>🤖 AI Status</Text>
              
              <View style={styles.statusRow}>
                <View style={styles.statusItem}>
                  <Text style={styles.statusIcon}>🟢</Text>
                  <Text style={styles.statusLabel}>AI Engine</Text>
                  <Text style={styles.statusValue}>Active</Text>
                </View>
                
                <View style={styles.statusItem}>
                  <Text style={styles.statusIcon}>📊</Text>
                  <Text style={styles.statusLabel}>Data Quality</Text>
                  <Text style={styles.statusValue}>98.2%</Text>
                </View>
                
                <View style={styles.statusItem}>
                  <Text style={styles.statusIcon}>🎯</Text>
                  <Text style={styles.statusLabel}>Accuracy</Text>
                  <Text style={styles.statusValue}>94.7%</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Weekly Predictions */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>📈 Weekly Predictions</Text>
              <Text style={styles.sectionDescription}>
                AI-powered forecasts for key metrics
              </Text>
              
              {weeklyTrends.map((trend, index) => (
                <View key={index} style={styles.trendItem}>
                  <View style={styles.trendHeader}>
                    <Text style={styles.trendLabel}>{trend.metric}</Text>
                    <Text style={[
                      styles.trendChange,
                      { color: trend.change.startsWith('+') ? '#4caf50' : '#f44336' }
                    ]}>
                      {trend.change}
                    </Text>
                  </View>
                  <View style={styles.trendValues}>
                    <Text style={styles.trendCurrent}>Current: {trend.current}</Text>
                    <Text style={styles.trendPredicted}>Predicted: {trend.predicted}</Text>
                  </View>
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* Active Recommendations */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>💡 Active Recommendations</Text>
              
              {aiInsights.map((insight) => (
                <View key={insight.id} style={styles.insightCard}>
                  <View style={styles.insightHeader}>
                    <View style={styles.insightTitleRow}>
                      <Text style={styles.typeIcon}>{getTypeIcon(insight.type)}</Text>
                      <Text style={styles.insightTitle}>{insight.title}</Text>
                    </View>
                    
                    <View style={styles.badgeRow}>
                      <View style={[styles.impactBadge, { backgroundColor: getImpactColor(insight.impact) }]}>
                        <Text style={styles.badgeText}>{insight.impact}</Text>
                      </View>
                      
                      <View style={[styles.confidenceBadge, { backgroundColor: getConfidenceColor(insight.confidence) }]}>
                        <Text style={styles.badgeText}>{insight.confidence}%</Text>
                      </View>
                    </View>
                  </View>

                  <Text style={styles.recommendation}>{insight.recommendation}</Text>
                  
                  <View style={styles.reasoningSection}>
                    <Text style={styles.reasoningTitle}>AI Reasoning:</Text>
                    <Text style={styles.reasoningText}>{insight.reasoning}</Text>
                  </View>

                  <View style={styles.actionSection}>
                    <View style={styles.actionInfo}>
                      <Text style={styles.actionLabel}>Action: {insight.action}</Text>
                      <Text style={styles.timeLabel}>Time: {insight.estimatedTime}</Text>
                    </View>
                    
                    <View style={styles.actionButtons}>
                      <TouchableOpacity style={styles.acceptButton}>
                        <Text style={styles.acceptButtonText}>✓ Accept</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity style={styles.learnButton}>
                        <Text style={styles.learnButtonText}>📚 Learn More</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* AI Learning */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>🧠 AI Learning</Text>
              
              <View style={styles.learningStats}>
                <View style={styles.learningStat}>
                  <Text style={styles.learningNumber}>247</Text>
                  <Text style={styles.learningLabel}>Recommendations Made</Text>
                </View>
                
                <View style={styles.learningStat}>
                  <Text style={styles.learningNumber}>189</Text>
                  <Text style={styles.learningLabel}>Accepted by Users</Text>
                </View>
                
                <View style={styles.learningStat}>
                  <Text style={styles.learningNumber}>94.7%</Text>
                  <Text style={styles.learningLabel}>Success Rate</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.feedbackButton}>
                <Text style={styles.feedbackButtonText}>💬 Provide AI Feedback</Text>
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
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statusItem: {
    alignItems: "center",
  },
  statusIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  statusValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins-Bold",
  },
  trendItem: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  trendHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  trendLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins-Bold",
  },
  trendChange: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  trendValues: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trendCurrent: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  trendPredicted: {
    fontSize: 12,
    color: "#4caf50",
    fontFamily: "Poppins-Regular",
  },
  insightCard: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#2196f3",
  },
  insightHeader: {
    marginBottom: 12,
  },
  insightTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  typeIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins-Bold",
    flex: 1,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  recommendation: {
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
  },
  reasoningSection: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  reasoningTitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    fontFamily: "Poppins-Bold",
  },
  reasoningText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins-Regular",
    lineHeight: 16,
  },
  actionSection: {
    marginTop: 8,
  },
  actionInfo: {
    marginBottom: 12,
  },
  actionLabel: {
    fontSize: 12,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  timeLabel: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  acceptButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
  },
  acceptButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  learnButton: {
    backgroundColor: "#2196f3",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
  },
  learnButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  learningStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  learningStat: {
    alignItems: "center",
  },
  learningNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4caf50",
    fontFamily: "Poppins-Bold",
  },
  learningLabel: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  feedbackButton: {
    backgroundColor: "#ff9800",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  feedbackButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
});
