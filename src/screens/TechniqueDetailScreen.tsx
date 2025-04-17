// src/screens/TechniqueDetailScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import {COLORS} from '../theme';
import {useSelector, useDispatch} from 'react-redux';
import { updateProgress } from '../slices/hobbySlice';

const TechniqueDetailScreen = ({navigation, route}) => {
  const {technique} = route.params;
  const dispatch = useDispatch();
  const progress = useSelector(state => state.hobby.progress[technique.id] || {
    completed: false,
    skipped: false,
    progress: 0,
  });
  
  const handleComplete = () => {
    dispatch(updateProgress({
      techniqueId: technique.id,
      progress: {
        completed: true,
        progress: 1,
      },
    }));
    navigation.goBack();
  };
  
  const handleSkip = () => {
    dispatch(updateProgress({
      techniqueId: technique.id,
      progress: {
        skipped: true,
      },
    }));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={COLORS.title} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{technique.name}</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Card.Content>
            <View style={styles.difficultyContainer}>
              <Text style={styles.difficultyLabel}>Difficulty:</Text>
              <View style={styles.stars}>
                {[...Array(5)].map((_, index) => (
                  <Icon
                    key={index}
                    name="star"
                    size={18}
                    color={index < technique.difficulty ? COLORS.action : 'rgba(0,0,0,0.2)'}
                  />
                ))}
              </View>
            </View>
            
            <View style={styles.timeContainer}>
              <Icon name="clock-outline" size={18} color={COLORS.subtitle} />
              <Text style={styles.timeText}>
                Time to master: {technique.timeToMaster}
              </Text>
            </View>
            
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{technique.description}</Text>
            
            {technique.prerequisites && technique.prerequisites.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Prerequisites</Text>
                {technique.prerequisites.map((prereq, index) => (
                  <Text key={index} style={styles.prerequisite}>
                    • {prereq}
                  </Text>
                ))}
              </>
            )}
            
            <Text style={styles.sectionTitle}>Key Points</Text>
            <Text style={styles.keyPoint}>
              • Focus on understanding the fundamentals
            </Text>
            <Text style={styles.keyPoint}>
              • Practice regularly to build muscle memory
            </Text>
            <Text style={styles.keyPoint}>
              • Start slow and gradually increase speed
            </Text>
            
            <Text style={styles.sectionTitle}>Resources</Text>
            <Text style={styles.resource}>
              • Books and articles to read
            </Text>
            <Text style={styles.resource}>
              • Online tutorials and courses
            </Text>
            <Text style={styles.resource}>
              • Practice exercises
            </Text>
          </Card.Content>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.footerButton, styles.skipButton]}
          onPress={handleSkip}>
          <Icon name="skip-forward" size={22} color={COLORS.white} />
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.footerButton, styles.completeButton]}
          onPress={handleComplete}>
          <Icon name="check" size={22} color={COLORS.white} />
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.title,
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    elevation: 4,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  difficultyLabel: {
    fontSize: 16,
    color: COLORS.title,
    marginRight: 8,
  },
  stars: {
    flexDirection: 'row',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeText: {
    fontSize: 16,
    color: COLORS.subtitle,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.title,
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: COLORS.subtitle,
    lineHeight: 24,
  },
  prerequisite: {
    fontSize: 16,
    color: COLORS.subtitle,
    marginBottom: 4,
  },
  keyPoint: {
    fontSize: 16,
    color: COLORS.subtitle,
    marginBottom: 4,
  },
  resource: {
    fontSize: 16,
    color: COLORS.subtitle,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    padding: 16,
  },
  footerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  skipButton: {
    backgroundColor: '#d63031',
  },
  completeButton: {
    backgroundColor: '#00b894',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default TechniqueDetailScreen;