import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/MainNavigator';
import HobbyCard from '../components/HobbyCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import {setHobby, setHobbyDetails} from '../slices/hobbySlice';
import {useDispatch} from 'react-redux';
import {COLORS} from '../theme';
import {hobbies} from '../assets/data.json';
import AppFlowBottomSheet from '../components/AppFlowBottomSheet';
import AppFlowContent from '../components/AppFlowContent';

type HobbySelectNavProp = StackNavigationProp<
  RootStackParamList,
  'HobbySelect'
>;

const HobbySelectScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HobbySelectNavProp>();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleCloseSheet = () => {
    setIsBottomSheetVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Choose Your Hobby</Text>
            <Text style={styles.subheader}>Select what excites you most</Text>
          </View>
          <TouchableOpacity onPress={() => setIsBottomSheetVisible(true)}>
            <Icon name="help-circle-outline" size={24} color="#6C5CE7" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          {hobbies.map(hobby => (
            <HobbyCard
              key={hobby.id}
              onChevronPress={() => {
                dispatch(setHobby(hobby.name as any));
                dispatch(setHobbyDetails(hobby));
                navigation.navigate('LevelSelect');
              }}
              hobby={hobby}
            />
          ))}
        </ScrollView>
      </View>
      <AppFlowBottomSheet
        visible={isBottomSheetVisible}
        onClose={handleCloseSheet}>
        <AppFlowContent />
      </AppFlowBottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // position: 'relative',
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    gap: 20,
  },
  headerContainer: {},
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.title,
    marginBottom: 4,
  },
  subheader: {
    fontSize: 16,
    color: COLORS.subtitle,
    fontWeight: '500',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 24,
    gap: 20,
  },
  cardPressable: {
    marginBottom: 16,
  },
});

export default HobbySelectScreen;
