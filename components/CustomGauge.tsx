import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';

interface CustomGaugeProps {
  value: number;
  maxValue: number;
  minValue?: number;
  title: string;
  unit: string;
  size?: number;
}

export default function CustomGauge({
  value,
  maxValue,
  minValue = 0,
  title,
  unit,
  size = 140
}: CustomGaugeProps) {
  const radius = size / 2 - 20;
  const circumference = Math.PI * radius; // Half circle
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Color based on percentage
  const getColor = (percent: number) => {
    if (percent <= 33) return '#FF4444'; // Red
    if (percent <= 66) return '#FFA500'; // Orange
    return '#4CAF50'; // Green
  };

  const color = getColor(percentage);
  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.gaugeContainer}>
        <Svg
          width={size}
          height={size * 0.7}
          viewBox={`0 0 ${size} ${size * 0.7}`}>
          {/* Background arc */}
          <Path
            d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${
              centerX + radius
            } ${centerY}`}
            stroke="#E0E0E0"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />

          {/* Progress arc */}
          <Path
            d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${
              centerX + radius
            } ${centerY}`}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />

          {/* Center value text */}
          <SvgText
            x={centerX}
            y={centerY - 10}
            textAnchor="middle"
            fontSize="25"
            fontWeight="bold"
            fill="#333"
            fontFamily="Poppins-Bold">
            {value} <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}>{unit}</Text>
          </SvgText>

        </Svg>
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
  gaugeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  range: {
    fontSize: 10,
    color: '#999',
    fontFamily: 'Poppins-Regular',
  },
});
