// src/components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button = ({ 
  title, 
  onPress, 
  disabled = false, 
  style,
  textStyle
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        { opacity: disabled ? 0.6 : 1 },
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.action,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
  },
  text: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Button;