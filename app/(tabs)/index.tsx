import CustomGauge from '@/components/CustomGauge';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Header, Icon } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Card } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const openDrawer = () => {
    try {
      // Try multiple methods to access the drawer
      const parentNavigation = navigation.getParent();
      if (parentNavigation && parentNavigation.dispatch) {
        parentNavigation.dispatch(DrawerActions.openDrawer());
      } else {
        // Alternative: navigate to a drawer screen and then open
        navigation.dispatch(DrawerActions.openDrawer());
      }
    } catch (error) {
      console.log('Drawer navigation error:', error);
      // Fallback: navigate to another screen to test navigation
      router.push('/barn-detail');
    }
  };
  return (
    <LinearGradient
      colors={["#cfd5cfff", "#8a8b8aff", "#c8c7c7ff"]}
      style={styles.background}>
      <Header
        leftComponent={
          <Icon
            name="menu"
            type="material"
            color="white"
            onPress={openDrawer}
            underlayColor="transparent"
          />
        }
        centerComponent={{
          text: "SolCure",
          style: styles.headerTitle,
        }}
        rightComponent={<Icon name="person" type="material" color="white" />}
        backgroundColor="rgba(46, 125, 50, 0.95)" // Semi-transparent dark green
        containerStyle={styles.headerContainer}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Barn Summary with Grid Layout and Circular Progress */}
        <Card style={styles.cardLarge}>
          <Card.Content>
            <Text style={styles.cardTitle}>Barn Summary</Text>

            {/* Grid Layout for Barn Info */}
            <View style={styles.barnInfoGrid}>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Status</Text>
                <Text style={styles.gridValue}>Active</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Location</Text>
                <Text style={styles.gridValue}>Plot 7A, Murehwa</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Batch</Text>
                <Text style={styles.gridValue}>03</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Leaf Type</Text>
                <Text style={styles.gridValue}>Virginia</Text>
              </View>
            </View>

            {/* Curing Progress with Circular Progress */}
            <View style={styles.progressSection}>
              <Text style={styles.subHeader}>Curing Progress Tracker</Text>
              <View style={styles.progressContainer}>
                <AnimatedCircularProgress
                  size={100}
                  width={10}
                  fill={60}
                  tintColor="#4caf50"
                  backgroundColor="#e0e0e0"
                  rotation={0}
                  lineCap="round">
                  {() => (
                    <View style={styles.progressCenter}>
                      <Text style={styles.progressValue}>60%</Text>
                      <Text style={styles.progressPhase}>Yellowing</Text>
                    </View>
                  )}
                </AnimatedCircularProgress>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressLabel}>Phase: Yellowing</Text>
                  <Text style={styles.progressLabel}>
                    Time Remaining: 12 hrs
                  </Text>
                </View>
              </View>
            </View>

            {/* System Health */}
            <View style={styles.healthSection}>
              <Text style={styles.subHeader}>System Health</Text>
              <View style={styles.healthGrid}>
                <View style={styles.healthItem}>
                  <Text style={styles.healthLabel}>Solar</Text>
                  <Text style={[styles.healthValue, styles.optimal]}>
                    Optimal
                  </Text>
                </View>
                <View style={styles.healthItem}>
                  <Text style={styles.healthLabel}>Sensors</Text>
                  <Text style={[styles.healthValue, styles.online]}>
                    All Online
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Real-time Environmental Data with Speedometers */}
        <View style={styles.gridRow}>
          <Card style={styles.gridCard}>
            <Card.Content>
              <CustomGauge
                value={68}
                maxValue={100}
                minValue={0}
                title="Temperature"
                unit="°C"
                size={120}
              />
            </Card.Content>
          </Card>

          <Card style={styles.gridCard}>
            <Card.Content>
              <CustomGauge
                value={65}
                maxValue={100}
                minValue={0}
                title="Humidity"
                unit="%"
                size={120}
              />
            </Card.Content>
          </Card>
        </View>

        <View style={styles.gridRow}>
          <Card style={styles.gridCard}>
            <Card.Content>
              <CustomGauge
                value={75}
                maxValue={100}
                minValue={0}
                title="Air Flow"
                unit="%"
                size={120}
              />
            </Card.Content>
          </Card>

          <Card style={styles.gridCard}>
            <Card.Content>
              <CustomGauge
                value={85}
                maxValue={100}
                minValue={0}
                title="Battery"
                unit="%"
                size={120}
              />
            </Card.Content>
          </Card>
        </View>

        {/* Charts & Trends */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Temperature Trend</Text>
            <LineChart
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
                datasets: [{ data: [65, 68, 70, 69, 67] }],
              }}
              width={screenWidth - 48}
              height={220}
              chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                labelColor: () => "#000",
              }}
              style={{ marginVertical: 8, borderRadius: 8 }}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Humidity Trend</Text>
            <LineChart
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
                datasets: [{ data: [60, 62, 63, 65, 64] }],
              }}
              width={screenWidth - 48}
              height={220}
              chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
                labelColor: () => "#000",
              }}
              style={{ marginVertical: 8, borderRadius: 8 }}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  headerContainer: {
    borderBottomWidth: 0,
    paddingTop: 40,
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
    fontSize: 23,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 2,
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 16,
    fontFamily: "Poppins-Bold",
  },
  subHeader: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    color: "#2E7D32",
    marginBottom: 8,
  },
  barnInfoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gridItem: {
    width: "48%",
    marginBottom: 12,
  },
  gridLabel: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  gridValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins-Bold",
  },
  progressSection: {
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4caf50",
    fontFamily: "Poppins-Bold",
  },
  progressPhase: {
    fontSize: 10,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  progressInfo: {
    flex: 1,
    marginLeft: 20,
  },
  progressLabel: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Poppins-Regular",
    marginBottom: 4,
  },
  healthSection: {
    marginTop: 8,
  },
  healthGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  healthItem: {
    alignItems: "center",
  },
  healthLabel: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  healthValue: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  optimal: {
    color: "#4caf50",
  },
  online: {
    color: "#2196f3",
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  gridCard: {
    width: "48%",
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
});
