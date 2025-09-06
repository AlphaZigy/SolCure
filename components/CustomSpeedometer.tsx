import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

interface SpeedometerProps {
  value: number;
  maxValue: number;
  minValue?: number;
  title: string;
  unit: string;
  size?: number;
  color?: string;
}

export default function CustomSpeedometer({
  value,
  maxValue,
  minValue = 0,
  title,
  unit,
  size = 120,
  color = '#4CAF50'
}: SpeedometerProps) {
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.speedometerContainer}>
        <AnimatedCircularProgress
          size={size}
          width={8}
          fill={percentage}
          tintColor={color}
          backgroundColor="#e0e0e0"
          rotation={0}
          lineCap="round"
        >
          {() => (
            <View style={styles.centerContent}>
              <Text style={styles.value}>{value}</Text>
              <Text style={styles.unit}>{unit}</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
      <Text style={styles.range}>
        {minValue} - {maxValue} {unit}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
  speedometerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  unit: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  range: {
    fontSize: 10,
    color: '#999',
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
});
