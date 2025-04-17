// src/components/TechniqueCard.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import {COLORS} from '../theme';
import {Swipeable} from 'react-native-gesture-handler';

const TechniqueCard = ({technique, onComplete, onSkip, onTap}) => {
  const renderRightActions = () => (
    <TouchableOpacity
      style={[styles.swipeAction, styles.completeAction]}
      onPress={onComplete}>
      <Icon name="check" size={28} color={COLORS.white} />
      <Text style={styles.actionText}>Complete</Text>
    </TouchableOpacity>
  );

  const renderLeftActions = () => (
    <TouchableOpacity
      style={[styles.swipeAction, styles.skipAction]}
      onPress={onSkip}>
      <Icon name="skip-forward" size={28} color={COLORS.white} />
      <Text style={styles.actionText}>Skip</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable
     containerStyle={{borderRadius: 12}}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}>
      <TouchableOpacity onPress={onTap}>
        <View style={styles.card}>
          <Card.Content>
            <View style={styles.header}>
              <Text style={styles.title}>{technique.name}</Text>
              <View style={styles.difficultyContainer}>
                {[...Array(5)].map((_, index) => (
                  <Icon
                    key={index}
                    name="star"
                    size={16}
                    color={
                      index < technique.difficulty
                        ? COLORS.action
                        : 'rgba(0,0,0,0.2)'
                    }
                  />
                ))}
              </View>
            </View>
            <Text style={styles.description}>{technique.description}</Text>
            <View style={styles.footer}>
              <View style={styles.timeContainer}>
                <Icon name="clock-outline" size={16} color={COLORS.subtitle} />
                <Text style={styles.timeText}>{technique.timeToMaster}</Text>
              </View>
              <Progress.Circle
                size={36}
                thickness={3}
                progress={0}
                color={COLORS.action}
                unfilledColor="rgba(0,0,0,0.1)"
                borderWidth={0}
              />
            </View>
          </Card.Content>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    // marginVertical: 8,
    elevation: 2,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.action,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    // borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.title,
    flex: 1,
  },
  difficultyContainer: {
    flexDirection: 'row',
  },
  description: {
    fontSize: 14,
    color: COLORS.subtitle,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: COLORS.subtitle,
    marginLeft: 4,
  },
  swipeAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  completeAction: {
    backgroundColor: '#00b894',
  },
  skipAction: {
    backgroundColor: '#d63031',
  },
  actionText: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default TechniqueCard;
