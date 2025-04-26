// LevelSelectScreen.tsx
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';

import {RootStackParamList} from '../navigation/MainNavigator';
import LevelCard from '../components/LevelCard';
import Button from '../components/Button';
import Header from '../components/common/Header';
import {setLevel, setLevelDetails} from '../slices/hobbySlice';
import {COLORS} from '../theme';
import {prebuilt_levels} from '../assets/data.json';

import {getLevelKey} from '../utils/localStorage.Utils';

type LevelSelectNavProp = StackNavigationProp<
  RootStackParamList,
  'LevelSelect'
>;

const LevelSelectScreen = () => {
  const navigation = useNavigation<LevelSelectNavProp>();

  const dispatch = useDispatch();
  const {hobbyDetails} = useSelector(
    (state: {hobby: HobbyState}) => state.hobby,
  );

  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [levelDetailsLocal, setLevelDetailsLocal] = useState<LevelType | null>(
    null,
  );
  const [customLevels, setCustomLevels] = useState<LevelType[]>([]);
  const STORAGE_KEY = getLevelKey(hobbyDetails?.id || '');

  const loadCustomLevels = async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCustomLevels(JSON.parse(saved));
    }
  };
  useFocusEffect(
    useCallback(() => {
      console.log('first');
      loadCustomLevels();
    }, []),
  );

  const handleContinue = () => {
    if (levelDetailsLocal) {
      dispatch(setLevelDetails(levelDetailsLocal));
    }
    if (selectedLevel) {
      dispatch(setLevel(selectedLevel as 'casual' | 'enthusiast' | 'pro'));
      navigation.navigate('LearningPath');
    }
  };

  const allLevels = [
    ...(Array.isArray(customLevels) ? customLevels : []),
    ...prebuilt_levels,
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Select Hobby" onBackPress={() => navigation.goBack()} />
      <View style={styles.innerContianer}>
        <Text style={styles.header}>
          How serious are you about{' '}
          <Text style={{color: COLORS.action}}>{hobbyDetails?.name}?</Text>
        </Text>
        <Text style={styles.subheader}>We'll customize your learning path</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('CustomLevelScreen')}
          style={styles.customizeBtn}>
          <Text style={styles.customizeText}>
            {' '}
            Customize your learning path
          </Text>
          <Icon name={`chevron-thin-right`} size={16} />
        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.levelsContainer}>
          {allLevels.map((level: LevelType) => (
            <LevelCard
              key={level.id}
              level={level}
              isSelected={selectedLevel === level.id}
              onPress={() => {
                setSelectedLevel(level.id);
                setLevelDetailsLocal(level);
              }}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.button}>
        <Button
          title="Create My Path"
          onPress={handleContinue}
          disabled={!selectedLevel}
          textStyle={{fontSize: 18}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.bg1},
  innerContianer: {paddingHorizontal: 20, paddingTop: 16, flex: 1},
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.title,
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    color: COLORS.subtitle,
    marginBottom: 24,
  },
  customizeBtn: {
    backgroundColor: '#EEE',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  customizeText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.title,
    textAlign: 'center',
  },
  levelsContainer: {paddingBottom: 24},
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
});

export default LevelSelectScreen;
