// src/screens/LevelSelectScreen.tsx
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/MainNavigator';
import LevelCard from '../components/LevelCard';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {setLevel} from '../slices/hobbySlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/common/Header';
import { COLORS } from '../theme';


type LevelSelectNavProp = StackNavigationProp<
  RootStackParamList,
  'LevelSelect'
>;

const levels = [
  {
    id: 'casual',
    name: 'Casual',
    icon: 'emoticon-happy',
    description: 'Learn the basics to enjoy your hobby',
    timeCommitment: '2-3 hrs/week',
  },
  {
    id: 'enthusiast',
    name: 'Enthusiast',
    icon: 'rocket-launch',
    description: 'Build solid skills to impress others',
    timeCommitment: '4-6 hrs/week',
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: 'trophy',
    description: 'Master advanced techniques for competition',
    timeCommitment: '8+ hrs/week',
  },
];
const LevelSelectScreen = () => {
  const navigation = useNavigation<LevelSelectNavProp>();
  const dispatch = useDispatch();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const {hobbyDetails} = useSelector((state: any) => state?.hobby);

  const handleContinue = () => {
    if (selectedLevel) {
      dispatch(setLevel(selectedLevel as 'casual' | 'enthusiast' | 'pro'));
      navigation.navigate('LearningPath');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Select Level"
        onBackPress={() => navigation.goBack()}
        children={
          <TouchableOpacity>
            <Icon name="help-circle-outline" size={24} color="#6C5CE7" />
          </TouchableOpacity>
        }
      />
      <View style={styles.innerContianer}>
        <Text style={styles.header}>
          How serious are you about{' '}
          <Text style={{color: COLORS.action}}>{hobbyDetails?.name} ?</Text>
        </Text>
        <Text style={styles.subheader}>We'll customize your learning path</Text>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.levelsContainer}>
          {levels.map(level => (
            <LevelCard
              key={level.id}
              level={level}
              isSelected={selectedLevel === level.id}
              onPress={() => setSelectedLevel(level.id)}
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
  innerContianer:{
    padding: 24,
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
