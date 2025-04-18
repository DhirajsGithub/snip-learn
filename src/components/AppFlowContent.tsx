import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme';

const AppFlowContent = () => {
  return (
    <View>
      <Text style={styles.heading}>📱 How This App Works</Text>

      <View style={styles.stepContainer}>
        <View style={styles.stepNumberBadge}>
          <Text style={styles.stepNumberText}>1</Text>
        </View>
        <View style={styles.stepTextContainer}>
          <Text style={styles.stepTitle}>Getting Started</Text>
          <Text style={styles.stepDescription}>
            Open the app and enjoy a delightful{' '}
            <Text style={styles.highlight}>splash animation</Text>.
          </Text>
        </View>
      </View>

      <View style={styles.stepContainer}>
        <View style={styles.stepNumberBadge}>
          <Text style={styles.stepNumberText}>2</Text>
        </View>
        <View style={styles.stepTextContainer}>
          <Text style={styles.stepTitle}>Choose Your Interest</Text>
          <Text style={styles.stepDescription}>
            Tap a <Text style={styles.highlight}>hobby card</Text> to flip it →
            then tap the arrow to continue.
          </Text>
        </View>
      </View>

      <View style={styles.stepContainer}>
        <View style={styles.stepNumberBadge}>
          <Text style={styles.stepNumberText}>3</Text>
        </View>
        <View style={styles.stepTextContainer}>
          <Text style={styles.stepTitle}>Select Your Skill Level</Text>
          <Text style={styles.stepDescription}>
            Choose your experience level:
          </Text>
          <View style={styles.levelContainer}>
            <View style={[styles.levelBadge, styles.casualBadge]}>
              <Text style={styles.levelBadgeText}>Casual</Text>
            </View>
            <View style={[styles.levelBadge, styles.enthusiastBadge]}>
              <Text style={styles.levelBadgeText}>Enthusiast</Text>
            </View>
            <View style={[styles.levelBadge, styles.proBadge]}>
              <Text style={styles.levelBadgeText}>Pro</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.stepContainer}>
        <View style={styles.stepNumberBadge}>
          <Text style={styles.stepNumberText}>4</Text>
        </View>
        <View style={styles.stepTextContainer}>
          <Text style={styles.stepTitle}>Create Your Learning Path</Text>
          <Text style={styles.stepDescription}>
            Hit <Text style={styles.highlight}>Create My Path</Text> → AI
            generates your personalized 8-step journey 🎯
          </Text>
        </View>
      </View>

      <View style={styles.stepContainer}>
        <View style={styles.stepNumberBadge}>
          <Text style={styles.stepNumberText}>5</Text>
        </View>
        <View style={styles.stepTextContainer}>
          <Text style={styles.stepTitle}>Track Your Progress</Text>
          <Text style={styles.stepDescription}>
            Mark techniques as <Text style={styles.complete}>Complete</Text>{' '}
            (swipe left) or <Text style={styles.skip}>Skip</Text> (swipe right).
          </Text>
          <View style={styles.swipeDemo}>
            <View style={styles.swipeLeft}>
              <Text style={styles.swipeText}>← Complete</Text>
            </View>
            <View style={styles.swipeCard}>
              <Text style={styles.swipeCardText}>Technique Card</Text>
            </View>
            <View style={styles.swipeRight}>
              <Text style={styles.swipeText}>Skip →</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.stepContainer}>
        <View style={styles.stepNumberBadge}>
          <Text style={styles.stepNumberText}>6</Text>
        </View>
        <View style={styles.stepTextContainer}>
          <Text style={styles.stepTitle}>Celebrate Achievements</Text>
          <Text style={styles.stepDescription}>
            Watch your <Text style={styles.highlight}>progress ring</Text> grow
            and earn smart achievements 🎉
          </Text>
        </View>
      </View>

      <View style={styles.stepContainer}>
        <View style={styles.stepNumberBadge}>
          <Text style={styles.stepNumberText}>7</Text>
        </View>
        <View style={styles.stepTextContainer}>
          <Text style={styles.stepTitle}>Master Each Step</Text>
          <Text style={styles.stepDescription}>
            Dive into <Text style={styles.highlight}>Technique Detail</Text>{' '}
            screens for rich, structured content.
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.footer}>
        Learn better. Stay consistent. Have fun ✨
      </Text>
    </View>
  );
};

export default AppFlowContent;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 20,
    flex: 1,
  },
  step: {
    fontSize: 15,
    color: COLORS.subtitle,
    marginBottom: 12,
    lineHeight: 22,
  },
  number: {
    fontWeight: 'bold',
    color: COLORS.action,
  },
  level: {
    fontStyle: 'italic',
    color: COLORS.action,
  },
  sheetBackground: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 16,
  },
  indicator: {
    backgroundColor: COLORS.subtitle,
    width: 40,
    height: 4,
    opacity: 0.5,
  },
  content: {
    padding: 24,
  },
  heading: {
    fontSize: 22,
    color: COLORS.title,
    fontWeight: '800',
    marginBottom: 24,
    textAlign: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  stepNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.action,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.title,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 15,
    color: COLORS.subtitle,
    lineHeight: 21,
  },
  levelContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginTop: 4,
  },
  casualBadge: {
    backgroundColor: '#E3F2FD',
  },
  enthusiastBadge: {
    backgroundColor: '#E8F5E9',
  },
  proBadge: {
    backgroundColor: '#FFF3E0',
  },
  levelBadgeText: {
    fontWeight: '600',
    fontSize: 12,
  },
  highlight: {
    fontWeight: 'bold',
    color: COLORS.action,
  },
  complete: {
    color: '#27AE60',
    fontWeight: '600',
  },
  skip: {
    color: '#E67E22',
    fontWeight: '600',
  },
  swipeDemo: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  swipeLeft: {
    backgroundColor: 'rgba(39, 174, 96, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  swipeRight: {
    backgroundColor: 'rgba(230, 126, 34, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  swipeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  swipeCard: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeCardText: {
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 16,
  },
  footer: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.subtitle,
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    marginTop: 24,
    backgroundColor: COLORS.action,
    paddingVertical: 14,
    borderRadius: 12,
  },
});
