import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Colors from '@/Constants/colors';

interface SectionProps {
  title?: string;
  children: ReactNode;
  style?: ViewStyle;
}

export default function Section({ title, children, style }: SectionProps) {
  return (
    <View style={[styles.section, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.card,
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
});