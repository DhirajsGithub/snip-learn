import React, { useState } from 'react';
import FlipCard from 'react-native-flip-card';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.4;

const HobbyCard = ({
  hobby,
  onChevronPress,
}: {
  hobby: { id: string; name: string; icon: string; color: string };
  onChevronPress: () => void;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Handle chevron press without flipping the card
  const handleChevronPress = (event) => {
    // Stop event propagation to prevent the card from flipping
    event.stopPropagation();
    onChevronPress();
  };

  return (
    <FlipCard
      style={styles.card}
      friction={12}
      perspective={1800}
      flipHorizontal={true}
      flipVertical={false}
      clickable={false} 
      flip={isFlipped} 
    >
      {/* Front Side */}
      <TouchableOpacity
        activeOpacity={0.95}
        style={[styles.face, { backgroundColor: hobby.color }]}
        onPress={() => setIsFlipped(true)}
      >
        <View style={styles.iconContainer}>
          <Icon name={hobby.icon} size={60} color="white" />
        </View>
        <Text style={styles.title}>{hobby.name}</Text>
      </TouchableOpacity>

      {/* Back Side */}
      <TouchableOpacity
        activeOpacity={0.95}
        style={[styles.back, { backgroundColor: hobby.color }]}
        onPress={() => setIsFlipped(false)}
      >
        <Text style={styles.description}>
          Tap to explore {hobby.name.toLowerCase()} techniques
        </Text>
        
        <TouchableOpacity 
          onPress={handleChevronPress} 
          activeOpacity={0.7}
          style={styles.chevronContainer}
        >
          <View style={styles.chevronButton}>
            <Icon
              name="chevron-double-right"
              size={28}
              color="white"
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </FlipCard>
  );
};

const styles = StyleSheet.create({
  card: {
    minWidth: CARD_WIDTH,
    maxWidth: CARD_WIDTH,
    height: CARD_WIDTH * 1.25,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  face: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  back: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  iconContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 45,
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  chevronContainer: {
    marginTop: 8,
  },
  chevronButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
});

export default HobbyCard;