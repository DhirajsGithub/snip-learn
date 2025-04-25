import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfettiCannon from 'react-native-confetti-cannon';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {COLORS} from '../theme';
import TechniqueCard from '../components/TechniqueCard';
import * as Progress from 'react-native-progress';
import {
  setLearningPath,
  setProgress,
  updateProgress,
} from '../slices/hobbySlice';
import {generateLearningPath} from '../components/services/aiService';
import Header from '../components/common/Header';
import {getLearningPathKey, getProgressKey} from '../utils/localStorage.Utils';

type Technique = {
  id: string;
  name: string;
  description: string;
  timeToMaster: string;
  difficulty: number;
  prerequisites: string[];
};

type ProgressState = {
  [key: string]: {
    completed: boolean;
    skipped: boolean;
    progress: number;
  };
};

type LearningPathScreenProps = {
  navigation: any;
};


const LearningPathScreen: React.FC<LearningPathScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const {
    selected: selectedHobby,
    level: selectedLevel,
    levelDetails,
    hobbyDetails,
    learningPath,
    progress,
  } = useSelector((state: {hobby: HobbyState}) => state.hobby);

  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const confettiRef = useRef<ConfettiCannon>(null);

  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const pathStorageKey = getLearningPathKey(hobbyDetails?.id || "", levelDetails?.id || "");
  const progressStorageKey = getProgressKey(hobbyDetails?.id || "", levelDetails?.id || "");
  console.log("pathStorageKey ", pathStorageKey)
  console.log("progressStorageKey ", progressStorageKey)
  const loadLearningPath = useCallback(async () => {
    try {
      setIsLoading(true);
      // Check if we have a cached version in AsyncStorage
      const cachedPath = await AsyncStorage.getItem(pathStorageKey);
      const cachedProgress = await AsyncStorage.getItem(progressStorageKey);
      if (cachedPath) {
        const parsedPath = JSON.parse(cachedPath);
        dispatch(setLearningPath(parsedPath));

        if (cachedProgress) {
          const parsedProgress = JSON.parse(cachedProgress);
          dispatch(setProgress(parsedProgress));
        } else {
          parsedPath.forEach((technique: Technique) => {
            dispatch(
              updateProgress({
                techniqueId: technique.id,
                progress: {
                  completed: false,
                  skipped: false,
                  progress: 0,
                },
              }),
            );
          });
        }

        setIsLoading(false);
        return;
      }

      // If no cached version, generate a new one
      const path: Technique[] = await generateLearningPath(
        selectedHobby,
        selectedLevel,
      );
      if (!path) {
        Alert.alert(
          'Error generating learning path, Please try again after some time',
        );
        navigation.goBack();
        return;
      }
      // Save to AsyncStorage
      await AsyncStorage.setItem(pathStorageKey, JSON.stringify(path));

      dispatch(setLearningPath(path));

      // Initialize progress for each technique
      path.forEach(technique => {
        dispatch(
          updateProgress({
            techniqueId: technique.id,
            progress: {
              completed: false,
              skipped: false,
              progress: 0,
            },
          }),
        );
      });

      setIsLoading(false);
      setShowConfetti(true);
    } catch (error) {
      console.error('Failed to load/generate path:', error);
      setIsLoading(false);
    }
  }, [selectedHobby, selectedLevel, dispatch, progress, pathStorageKey]);

  useFocusEffect(
    useCallback(() => {
      loadLearningPath();
    }, [selectedLevel, selectedHobby]),
  );

  const handleCompleteTechnique = useCallback(
    (techniqueId: string) => {
      ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);

      dispatch(
        updateProgress({
          techniqueId,
          progress: {
            completed: true,
            skipped: false,
            progress: 1,
          },
        }),
      );
    },
    [dispatch, hapticOptions],
  );

  const handleSkipTechnique = useCallback(
    (techniqueId: string) => {
      ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);

      dispatch(
        updateProgress({
          techniqueId,
          progress: {
            completed: false,
            skipped: true,
            progress: 0,
          },
        }),
      );
    },
    [dispatch, hapticOptions],
  );

  const handleTapTechnique = useCallback(
    (technique: Technique) => {
      navigation.navigate('TechniqueDetail', {technique});
    },
    [navigation],
  );

  // Calculate overall progress
  const calculateOverallProgress = useCallback((): number => {
    if (!learningPath || learningPath.length === 0) return 0;

    const completed = Object.values(progress).filter(p => p?.completed).length;
    return completed / learningPath.length;
  }, [progress, learningPath]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Getting your paths ready 🚀"
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.loadingContainer}>
          <Text style={styles.loadingTitle}>
            Crafting your personalized learning path
          </Text>
          <Text style={styles.loadingSubtitle}>
            Finding the perfect 5-8 techniques{'\n'}
            to get you started...
          </Text>
          <ActivityIndicator
            size="large"
            color={COLORS.action}
            style={styles.loader}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {showConfetti && (
        <ConfettiCannon
          ref={confettiRef}
          count={200}
          origin={{x: -10, y: 0}}
          autoStart={true}
          fadeOut={true}
          onAnimationEnd={() => setShowConfetti(false)}
        />
      )}

      <Header
        title={`Select ${hobbyDetails?.name} Level`}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.progressContainer}>
        <View style={{flexGrow: 1}}>
          <Progress.Bar
            progress={calculateOverallProgress()}
            width={null}
            height={8}
            color={COLORS.action}
            unfilledColor="rgba(0,0,0,0.1)"
            borderWidth={0}
            borderRadius={4}
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round(calculateOverallProgress() * 100)}%
        </Text>
      </View>

      <FlatList
        data={learningPath}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => (
          <TechniqueCard
            technique={item}
            progress={progress[item.id]}
            onComplete={() => handleCompleteTechnique(item.id)}
            onSkip={() => handleSkipTechnique(item.id)}
            onTap={() => handleTapTechnique(item)}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.bg1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.title,
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 16,
    color: COLORS.subtitle,
    marginBottom: 24,
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 12,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.title,
    marginBottom: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
});

export default LearningPathScreen;
