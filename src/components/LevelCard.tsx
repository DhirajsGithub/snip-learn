// src/components/LevelCard.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../theme';

type LevelCardProps = {
  level: {
    id: string;
    name: string;
    icon: string;
    description: string;
    timeCommitment: string;
  };
  isSelected: boolean;
  onPress: () => void;
};

const LevelCard = ({level, isSelected, onPress}: LevelCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          borderColor: isSelected ? COLORS.action : '#DFE6E9',
          backgroundColor: isSelected ? '#F0EDFC' : 'white',
        },
      ]}
      activeOpacity={0.8}>
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: isSelected ? COLORS.action : '#DFE6E9'},
          ]}>
          <Icon
            name={level.icon}
            size={24}
            color={isSelected ? 'white' : '#636E72'}
          />
        </View>
        <Text
          style={[styles.title, {color: isSelected ? '#6C5CE7' : '#2D3436'}]}>
          {level.name}
        </Text>
      </View>
      <Text style={styles.description}>{level.description}</Text>
      <Text style={styles.timeCommitment}>{level.timeCommitment}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.subtitle,
    lineHeight: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  timeCommitment: {
    fontSize: 13,
    color: COLORS.action,
    fontWeight: '600',
    marginTop: 8,
  },
});

export default LevelCard;
