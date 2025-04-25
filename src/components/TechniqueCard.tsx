import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import {COLORS} from '../theme';
import {Swipeable} from 'react-native-gesture-handler';


type TechniqueProgress = {
  completed: boolean;
  skipped: boolean;
  progress: number;
};

type TechniqueCardProps = {
  technique: Technique;
  progress?: TechniqueProgress;
  onComplete: () => void;
  onSkip: () => void;
  onTap: () => void;
};

// 🧠 Imports and types remain the same

const TechniqueCard: React.FC<TechniqueCardProps> = ({
  technique,
  progress = { completed: false, skipped: false, progress: 0 },
  onComplete,
  onSkip,
  onTap,
}) => {
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
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      enabled={!progress.completed && !progress.skipped}>
      <TouchableOpacity onPress={onTap} activeOpacity={0.9}>
        <View
          style={[
            styles.card,
            progress.completed && styles.completedCard,
            progress.skipped && styles.skippedCard,
          ]}>
          <Card.Content>
            {/* Header Section */}
            <View style={styles.header}>
              <Text
                style={[
                  styles.title,
                  progress.completed && styles.completedText,
                  progress.skipped && styles.skippedText,
                ]}>
                {technique.name}
                {technique.optional && (
                  <Text style={styles.optionalBadge}>  (Optional)</Text>
                )}
                {progress.completed && (
                  <Text style={styles.completedBadge}> ✓</Text>
                )}
                {progress.skipped && (
                  <Text style={styles.skippedBadge}> ⤑</Text>
                )}
              </Text>
              {/* Difficulty Stars */}
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

            {/* Description */}
            <Text
              style={[
                styles.description,
                progress.completed && styles.completedText,
                progress.skipped && styles.skippedText,
              ]}>
              {technique.description}
            </Text>

            {/* Prerequisites */}
            {technique.prerequisites.length > 0 && (
              <View style={styles.prerequisiteContainer}>
                <Text style={styles.prerequisiteTitle}>Requires:</Text>
                {technique.prerequisites.map((p, idx) => (
                  <Text key={idx} style={styles.prerequisiteItem}>• {p}</Text>
                ))}
              </View>
            )}

            {/* Footer */}
            <View style={styles.footer}>
              <View style={styles.timeContainer}>
                <Icon
                  name="clock-outline"
                  size={16}
                  color={
                    progress.completed
                      ? '#00b894'
                      : progress.skipped
                      ? '#d63031'
                      : COLORS.subtitle
                  }
                />
                <Text
                  style={[
                    styles.timeText,
                    progress.completed && styles.completedTimeText,
                    progress.skipped && styles.skippedTimeText,
                  ]}>
                  {technique.timeToMaster}
                </Text>
              </View>
              <Progress.Circle
                size={36}
                thickness={3}
                progress={progress.progress}
                color={progress.completed ? '#00b894' : COLORS.action}
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
    marginVertical: 4,
    elevation: 2,
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.action,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  completedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#00b894',
    opacity: 0.9,
  },
  skippedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#d63031',
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.title,
    flex: 1,
  },
  completedText: {
    color: '#00b894',
  },
  skippedText: {
    color: '#d63031',
  },
  completedBadge: {
    color: '#00b894',
  },
  skippedBadge: {
    color: '#d63031',
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
  completedTimeText: {
    color: '#00b894',
  },
  skippedTimeText: {
    color: '#d63031',
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
  optionalBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.subtitle,
  },
  prerequisiteContainer: {
    marginTop: 8,
  },
  prerequisiteTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.subtitle,
    marginBottom: 2,
  },
  prerequisiteItem: {
    fontSize: 13,
    color: COLORS.subtitle,
    marginLeft: 8,
  },

});

export default TechniqueCard;
