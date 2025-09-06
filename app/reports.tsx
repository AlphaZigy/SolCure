import { Header } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import {
    Alert,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

export default function ReportsScreen() {
  const handleExportPDF = () => {
    Alert.alert("Export PDF", "Performance report has been generated and saved to Downloads.");
  };

  const handleExportCSV = () => {
    Alert.alert("Export CSV", "Data has been exported to CSV format and saved to Downloads.");
  };

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [8.5, 12.2, 15.8, 18.3, 22.1, 25.6],
        color: () => "#4caf50",
        strokeWidth: 3,
      }
    ],
  };

  const energyData = {
    labels: ["Solar", "Grid", "Battery"],
    datasets: [
      {
        data: [75, 15, 10],
        colors: [
          () => "#ff9800",
          () => "#f44336", 
          () => "#4caf50"
        ]
      }
    ],
  };

  const performanceMetrics = [
    {
      title: "Total Tobacco Cured",
      value: "147.3 tons",
      change: "+18.5%",
      trend: "up",
      period: "vs last 6 months"
    },
    {
      title: "Average Curing Time",
      value: "8.2 days",
      change: "-12%",
      trend: "down", 
      period: "vs target 9.3 days"
    },
    {
      title: "Energy Efficiency",
      value: "92.4%",
      change: "+5.2%",
      trend: "up",
      period: "vs last quarter"
    },
    {
      title: "Quality Grade A+",
      value: "87%",
      change: "+3.1%",
      trend: "up",
      period: "vs last batch"
    }
  ];

  const carbonSavings = {
    totalSaved: "12.8 tons CO₂",
    equivalent: "2,847 km driving",
    trees: "586 trees planted",
    savings: "$3,247"
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? "📈" : "📉";
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "#4caf50" : "#f44336";
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#cfd5cfff", "#8a8b8aff", "#c8c7c7ff"]}
        style={styles.background}>
        
        <Header
          centerComponent={{
            text: "Reports & Analytics",
            style: styles.headerTitle,
          }}
          backgroundColor="rgba(46, 125, 50, 0.95)"
          containerStyle={styles.headerContainer}
        />

        <ScrollView contentContainerStyle={styles.container}>
          {/* Export Options */}
          <Card style={styles.cardLarge}>
            <Card.Content>
              <Text style={styles.cardTitle}>📊 Export Reports</Text>
              
              <View style={styles.exportButtons}>
                <TouchableOpacity style={styles.exportButton} onPress={handleExportPDF}>
                  <Text style={styles.exportButtonText}>📄 Export PDF</Text>
                  <Text style={styles.exportSubtext}>Comprehensive report</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.exportButton} onPress={handleExportCSV}>
                  <Text style={styles.exportButtonText}>📈 Export CSV</Text>
                  <Text style={styles.exportSubtext}>Raw data export</Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>

          {/* Performance Metrics */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>🎯 Key Performance Metrics</Text>
              
              <View style={styles.metricsGrid}>
                {performanceMetrics.map((metric, index) => (
                  <View key={index} style={styles.metricItem}>
                    <Text style={styles.metricTitle}>{metric.title}</Text>
                    <View style={styles.metricValueRow}>
                      <Text style={styles.metricValue}>{metric.value}</Text>
                      <Text style={styles.metricTrend}>
                        {getTrendIcon(metric.trend)}
                      </Text>
                    </View>
                    <Text style={[styles.metricChange, { color: getTrendColor(metric.trend) }]}>
                      {metric.change} {metric.period}
                    </Text>
                  </View>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Monthly Production Trend */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>📈 Monthly Production Trend</Text>
              <LineChart
                data={monthlyData}
                width={screenWidth - 48}
                height={220}
                chartConfig={{
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                  labelColor: () => "#000",
                  strokeWidth: 3,
                  decimalPlaces: 1,
                }}
                style={styles.chart}
                bezier
              />
              <Text style={styles.chartSubtext}>Production in tons per month</Text>
            </Card.Content>
          </Card>

          {/* Energy Usage */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>⚡ Energy Usage Breakdown</Text>
              <BarChart
                data={energyData}
                width={screenWidth - 48}
                height={220}
                chartConfig={{
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                  labelColor: () => "#000",
                  decimalPlaces: 0,
                }}
                style={styles.chart}
                showValuesOnTopOfBars
              />
              <Text style={styles.chartSubtext}>Energy source distribution (%)</Text>
            </Card.Content>
          </Card>

          {/* Carbon Savings & ROI */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>🌱 Environmental Impact & ROI</Text>
              
              <View style={styles.impactGrid}>
                <View style={styles.impactItem}>
                  <Text style={styles.impactIcon}>🌍</Text>
                  <Text style={styles.impactTitle}>Carbon Saved</Text>
                  <Text style={styles.impactValue}>{carbonSavings.totalSaved}</Text>
                </View>
                
                <View style={styles.impactItem}>
                  <Text style={styles.impactIcon}>🚗</Text>
                  <Text style={styles.impactTitle}>Equivalent</Text>
                  <Text style={styles.impactValue}>{carbonSavings.equivalent}</Text>
                </View>
                
                <View style={styles.impactItem}>
                  <Text style={styles.impactIcon}>🌳</Text>
                  <Text style={styles.impactTitle}>Trees Planted</Text>
                  <Text style={styles.impactValue}>{carbonSavings.trees}</Text>
                </View>
                
                <View style={styles.impactItem}>
                  <Text style={styles.impactIcon}>💰</Text>
                  <Text style={styles.impactTitle}>Cost Savings</Text>
                  <Text style={styles.impactValue}>{carbonSavings.savings}</Text>
                </View>
              </View>

              <View style={styles.roiSection}>
                <Text style={styles.roiTitle}>Return on Investment (ROI)</Text>
                <Text style={styles.roiValue}>167%</Text>
                <Text style={styles.roiSubtext}>System paid for itself in 18 months</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Quality Analysis */}
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>🏆 Quality Analysis</Text>
              
              <View style={styles.qualityGrid}>
                <View style={styles.qualityItem}>
                  <View style={styles.gradeBar}>
                    <View style={[styles.gradeFill, { width: '87%', backgroundColor: '#4caf50' }]} />
                  </View>
                  <Text style={styles.gradeLabel}>Grade A+ (87%)</Text>
                </View>
                
                <View style={styles.qualityItem}>
                  <View style={styles.gradeBar}>
                    <View style={[styles.gradeFill, { width: '12%', backgroundColor: '#ff9800' }]} />
                  </View>
                  <Text style={styles.gradeLabel}>Grade A (12%)</Text>
                </View>
                
                <View style={styles.qualityItem}>
                  <View style={styles.gradeBar}>
                    <View style={[styles.gradeFill, { width: '1%', backgroundColor: '#f44336' }]} />
                  </View>
                  <Text style={styles.gradeLabel}>Grade B (1%)</Text>
                </View>
              </View>
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
  exportButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  exportButton: {
    width: "48%",
    backgroundColor: "#4caf50",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  exportButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  exportSubtext: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "Poppins-Regular",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  metricItem: {
    width: "48%",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  metricTitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
    fontFamily: "Poppins-Regular",
  },
  metricValueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins-Bold",
  },
  metricTrend: {
    fontSize: 16,
  },
  metricChange: {
    fontSize: 11,
    marginTop: 4,
    fontFamily: "Poppins-Regular",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartSubtext: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    fontFamily: "Poppins-Regular",
  },
  impactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  impactItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
  },
  impactIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  impactTitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    fontFamily: "Poppins-Regular",
  },
  impactValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  roiSection: {
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  roiTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
    fontFamily: "Poppins-Regular",
  },
  roiValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4caf50",
    fontFamily: "Poppins-Bold",
  },
  roiSubtext: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  qualityGrid: {
    marginTop: 8,
  },
  qualityItem: {
    marginBottom: 16,
  },
  gradeBar: {
    height: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
  },
  gradeFill: {
    height: "100%",
    borderRadius: 10,
  },
  gradeLabel: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
});
