import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/MainNavigator';
import LevelCard from '../components/LevelCard';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {setLevel, setLevelDetails} from '../slices/hobbySlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/common/Header';
import {COLORS} from '../theme';
import {prebuilt_levels} from '../assets/data.json';

type LevelSelectNavProp = StackNavigationProp<
  RootStackParamList,
  'LevelSelect'
>;

const LevelSelectScreen = () => {
  const navigation = useNavigation<LevelSelectNavProp>();
  const {hobbyDetails} = useSelector(
    (state: {hobby: HobbyState}) => state.hobby,
  );

  const dispatch = useDispatch();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [levelDetailsLocal, setLevelDetailsLocal] = useState<LevelType | null>(
    null,
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

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Select Hobby" onBackPress={() => navigation.goBack()} />
      <View style={styles.innerContianer}>
        <Text style={styles.header}>
          How serious are you about{' '}
          <Text style={{color: COLORS.action}}>{hobbyDetails?.name} ?</Text>
        </Text>
        <Text style={styles.subheader}>We'll customize your learning path</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.levelsContainer}>
          {prebuilt_levels.map((level: LevelType) => (
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

        <Button
          title="Create My Path"
          onPress={handleContinue}
          disabled={!selectedLevel}
          style={styles.button}
          textStyle={{fontSize: 18}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg1,
  },
  innerContianer: {
    padding: 24,
    paddingBottom: 12,
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.title,
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    color: COLORS.subtitle,
    marginBottom: 32,
  },
  levelsContainer: {
    paddingBottom: 24,
  },
  button: {
    marginTop: 24,
    width: '100%',
    paddingVertical: 18,
  },
});

export default LevelSelectScreen;
