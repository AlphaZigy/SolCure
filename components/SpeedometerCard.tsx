import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// @ts-ignore
import Speedometer from 'react-native-speedometer-chart';

interface SpeedometerCardProps {
  value: number;
  maxValue: number;
  minValue?: number;
  title: string;
  unit: string;
  color: string;
  size?: number;
}

export default function SpeedometerCard({
  value,
  maxValue,
  minValue = 0,
  title,
  unit,
  color,
  size = 140
}: SpeedometerCardProps) {
  // Calculate percentage for gradient colors
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  
  // Determine color based on percentage (red to yellow to green)
  const getGradientColor = (percent: number) => {
    if (percent <= 33) return '#FF4444'; // Red for low values
    if (percent <= 66) return '#FFA500'; // Orange for medium values
    return '#4CAF50'; // Green for high values
  };

  const dynamicColor = getGradientColor(percentage);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.speedometerContainer}>
        <Speedometer
          value={value}
          totalValue={maxValue}
          size={size}
          outerColor="#E0E0E0"
          internalColor={dynamicColor}
          innerColor="#FFFFFF"
          showText={true}
          text={`${value}`}
          textStyle={{
            color: '#333333',
            fontSize: 18,
            fontWeight: 'bold',
            fontFamily: 'Poppins-Bold',
          }}
          showLabels={true}
          labelStyle={{
            color: '#666666',
            fontSize: 10,
            fontFamily: 'Poppins-Regular',
          }}
          showPercent={false}
          percentStyle={{
            color: '#333333',
            fontSize: 12,
            fontFamily: 'Poppins-Regular',
          }}
          innerCircleStyle={{
            backgroundColor: '#FFFFFF',
          }}
        />
      </View>
      <Text style={styles.unitText}>{unit}</Text>
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
    marginBottom: 5,
  },
  unitText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Poppins-Bold',
  },
  range: {
    fontSize: 10,
    color: '#999',
    fontFamily: 'Poppins-Regular',
  },
});
