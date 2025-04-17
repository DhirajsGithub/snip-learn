import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ConfettiCannon from 'react-native-confetti-cannon';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {COLORS} from '../theme';
import TechniqueCard from '../components/TechniqueCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';


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

const LearningPathScreen: React.FC<LearningPathScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const {selected: selectedHobby, level: selectedLevel, hobbyDetails} = useSelector(
    (state : any) => state.hobby,
  );
  
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [learningPath, setLearningPath] = useState<Technique[]>([]);
  const [progress, setProgress] = useState<ProgressState>({});
  
  const confettiRef = useRef<ConfettiCannon>(null);
  
  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  useEffect(() => {
    const generatePath = async () => {
      try {
        // Artificial delay for UX        
        const path: Technique[] = [
          {
              "id": "1",
              "name": "Understanding the Board and Piece Movement",
              "description": "Learn the names of squares, how each piece moves (pawn, rook, knight, bishop, queen, king), and special moves like castling and en passant.",
              "timeToMaster": "3 hours",
              "difficulty": 1,
              "prerequisites": []
          },
          {
              "id": "2",
              "name": "Basic Checkmate Patterns",
              "description": "Learn how to checkmate with a queen and king, and a rook and king. Understanding these simplest checkmates is crucial for ending games.",
              "timeToMaster": "4 hours",
              "difficulty": 2,
              "prerequisites": [
                  "Understanding the Board and Piece Movement"
              ]
          },
          {
              "id": "3",
              "name": "The Importance of Piece Value",
              "description": "Understand the relative value of each piece (pawn=1, knight/bishop=3, rook=5, queen=9) and how to make beneficial trades. Learn about material advantage.",
              "timeToMaster": "2 hours",
              "difficulty": 2,
              "prerequisites": [
                  "Understanding the Board and Piece Movement"
              ]
          },
          {
              "id": "4",
              "name": "Basic Opening Principles",
              "description": "Focus on controlling the center of the board, developing your pieces (especially knights and bishops) early, and protecting your king.",
              "timeToMaster": "5 hours",
              "difficulty": 3,
              "prerequisites": [
                  "Understanding the Board and Piece Movement",
                  "The Importance of Piece Value"
              ]
          },
          {
              "id": "5",
              "name": "Recognizing and Avoiding Simple Traps",
              "description": "Learn about common opening traps like the Scholar's Mate and how to avoid falling victim to them. Also, learn how to exploit them when your opponent makes the mistake.",
              "timeToMaster": "4 hours",
              "difficulty": 3,
              "prerequisites": [
                  "Basic Opening Principles",
                  "The Importance of Piece Value"
              ]
          },
          {
              "id": "6",
              "name": "Basic Tactical Motifs: Forks, Pins, and Skewers",
              "description": "Learn to identify and utilize basic tactical motifs like forks (attacking two pieces at once), pins (restricting the movement of a piece), and skewers (similar to a pin, but the more valuable piece is attacked first).",
              "timeToMaster": "6 hours",
              "difficulty": 4,
              "prerequisites": [
                  "The Importance of Piece Value",
                  "Recognizing and Avoiding Simple Traps"
              ]
          },
          {
              "id": "7",
              "name": "Endgame Basics: King Activity and Pawn Promotion",
              "description": "Learn how to activate your king in the endgame, create passed pawns, and promote pawns to queens to win. Understand basic pawn endgame principles.",
              "timeToMaster": "5 hours",
              "difficulty": 3,
              "prerequisites": [
                  "Basic Checkmate Patterns",
                  "The Importance of Piece Value"
              ]
          },
          {
              "id": "8",
              "name": "Playing and Analyzing Games",
              "description": "The best way to improve is to play regularly and analyze your games afterward. Identify your mistakes and learn from them, even if it's just recognizing missed opportunities.",
              "timeToMaster": "Ongoing",
              "difficulty": 2,
              "prerequisites": [
                  "Basic Tactical Motifs: Forks, Pins, and Skewers",
                  "Endgame Basics: King Activity and Pawn Promotion"
              ]
          }
        ];
        
        // Initialize progress for each technique
        const initialProgress: ProgressState = {};
        path.forEach(technique => {
          initialProgress[technique.id] = {
            completed: false,
            skipped: false,
            progress: 0,
          };
        });
        
        setLearningPath(path);
        setProgress(initialProgress);
        setIsLoading(false);
        setShowConfetti(true);
      } catch (error) {
        console.error('Failed to generate path:', error);
        setIsLoading(false);
      }
    };
    
    generatePath();
  }, [selectedHobby, selectedLevel]);
  console.log("progress ", progress)
  const handleCompleteTechnique = (techniqueId: string) => {
    ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
    
    setProgress(prev => ({
      ...prev,
      [techniqueId]: {
        ...prev[techniqueId],
        completed: true,
        progress: 1,
      },
    }));
  };

  const handleSkipTechnique = (techniqueId: string) => {
    ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
    setProgress(prev => ({
      ...prev,
      [techniqueId]: {
        ...prev[techniqueId],
        skipped: true,
        progress: 0,
      },
    }));
  };

  const handleTapTechnique = (technique: Technique) => {
    navigation.navigate('TechniqueDetail', {technique});
  };

  // Calculate overall progress
  const calculateOverallProgress = useCallback((): number => {
    const total = learningPath.length;
    if (total === 0) return 0;
    
    const completed = Object.values(progress).filter(p => p.completed).length;
    return completed / total;
  },[progress]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingTitle}>Crafting your personalized learning path</Text>
        <Text style={styles.loadingSubtitle}>
          We're filtering out useless YouTube videos...
        </Text>
        <ActivityIndicator size="large" color={COLORS.action} style={styles.loader} />
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
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={COLORS.title} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Your 8-Step Path to {selectedLevel} {selectedHobby}
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {Math.round(calculateOverallProgress() * 100)}% Complete
        </Text>
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
      
      <FlatList
        data={learningPath}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => (
          <TechniqueCard
            technique={item}
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
    paddingHorizontal: 16,
    marginBottom: 16,
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
    gap: 8
  },
});

export default LearningPathScreen;