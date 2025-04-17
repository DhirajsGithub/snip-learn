import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Markdown from 'react-native-markdown-display';
import {COLORS} from '../theme';
import {useSelector, useDispatch} from 'react-redux';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { updateProgress } from '../slices/hobbySlice';
import { generateTechniqueContent } from '../components/services/aiService';
import Header from '../components/common/Header';

type Technique = {
  id: string;
  name: string;
  description: string;
  timeToMaster: string;
  difficulty: number;
  prerequisites: string[];
};

type TechniqueDetailScreenProps = {
  navigation: any;
  route: {
    params: {
      technique: Technique;
    };
  };
};

const STORAGE_KEY_PREFIX = 'TECHNIQUE_CONTENT_';

const TechniqueDetailScreen: React.FC<TechniqueDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const {technique} = route.params;
  const dispatch = useDispatch();
  const {
    selected: selectedHobby, 
    level: selectedLevel
  } = useSelector((state: any) => state.hobby);
  
  const progress = useSelector((state: any) => 
    state.hobby.progress[technique.id] || {
      completed: false,
      skipped: false,
      progress: 0,
    }
  );
  
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  
  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };
  
  const storageKey = `${STORAGE_KEY_PREFIX}${selectedHobby}_${selectedLevel}_${technique.id}`;

  const loadTechniqueContent = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Check if we have cached content
      const cachedContent = await AsyncStorage.getItem(storageKey);
      
      if (cachedContent) {
        setContent(cachedContent);
        setIsLoading(false);
        return;
      }
      
      // Generate new content from AI
      const generatedContent = await generateTechniqueContent(
        selectedHobby,
        selectedLevel,
        technique
      );

      
      // Save to cache
      await AsyncStorage.setItem(storageKey, generatedContent);
      setContent(generatedContent);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load/generate technique content:', error);
      setIsLoading(false);
      setContent(`# ${technique.name}\n\n${technique.description}\n\n*Could not load additional resources*`);
    }
  }, [selectedHobby, selectedLevel, technique, storageKey]);

  useEffect(() => {
    loadTechniqueContent();
  }, [loadTechniqueContent]);

  const handleComplete = () => {
    
    dispatch(updateProgress({
      techniqueId: technique.id,
      progress: {
        completed: true,
        skipped: false,
        progress: 1,
      },
    }));
    navigation.goBack();
  };
  
  const handleSkip = () => {
    
    dispatch(updateProgress({
      techniqueId: technique.id,
      progress: {
        completed: false,
        skipped: true,
        progress: 0,
      },
    }));
    navigation.goBack();
  };

  if (isLoading) {
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
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.action} />
          <Text style={styles.loadingText}>Generating learning content...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={technique.name}
        onBackPress={() => navigation.goBack()}
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Card.Content>
            <View style={styles.metaContainer}>
              <View style={styles.difficultyContainer}>
                <Text style={styles.metaLabel}>Difficulty:</Text>
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
                <Text style={styles.metaText}>
                  {technique.timeToMaster}
                </Text>
              </View>
            </View>
            
            <Markdown 
              style={markdownStyles}
              mergeStyle={true}
            >
              {content}
            </Markdown>
          </Card.Content>
        </View>
      </ScrollView>
      
      {!progress.completed && !progress.skipped && (
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
      )}
      
      {(progress.completed || progress.skipped) && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.footerButton, styles.resetButton]}
            onPress={() => {
              dispatch(updateProgress({
                techniqueId: technique.id,
                progress: {
                  completed: false,
                  skipped: false,
                  progress: 0,
                },
              }));
            }}>
            <Icon name="refresh" size={22} color={COLORS.white} />
            <Text style={styles.buttonText}>Reset Progress</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const markdownStyles = {
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.title,
    marginTop: 24,
    marginBottom: 16,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.title,
    marginTop: 20,
    marginBottom: 12,
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.title,
    marginTop: 16,
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    color: COLORS.subtitle,
    lineHeight: 24,
  },
  strong: {
    fontWeight: 'bold',
    color: COLORS.title,
  },
  link: {
    color: COLORS.action,
  },
  bullet_list: {
    marginBottom: 8,
  },
  ordered_list: {
    marginBottom: 8,
  },
  list_item: {
    fontSize: 16,
    color: COLORS.subtitle,
    marginBottom: 4,
  },
  paragraph: {
    marginBottom: 16,
  },
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
    marginTop: 12,
    paddingBottom: 80, // Add space for the footer
  },
  card: {
    borderRadius: 12,
    elevation: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 16,
    color: COLORS.title,
    marginRight: 8,
  },
  metaText: {
    fontSize: 16,
    color: COLORS.subtitle,
    marginLeft: 8,
  },
  stars: {
    flexDirection: 'row',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.subtitle,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    backgroundColor: COLORS.bg1,
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
  resetButton: {
    backgroundColor: COLORS.action,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default TechniqueDetailScreen;