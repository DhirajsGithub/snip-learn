import React from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/MainNavigator';
import HobbyCard from '../components/HobbyCard';
import {SafeAreaView} from 'react-native-safe-area-context';

type HobbySelectNavProp = StackNavigationProp<
  RootStackParamList,
  'HobbySelect'
>;

const hobbies = [
  {id: '1', name: 'Chess', icon: 'chess-knight', color: '#2C3E50'},
  {id: '2', name: 'Poker', icon: 'cards', color: '#E74C3C'},
  {id: '3', name: 'Guitar', icon: 'guitar-electric', color: '#3498DB'},
];

const HobbySelectScreen = () => {
  const navigation = useNavigation<HobbySelectNavProp>();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Choose Your Hobby</Text>
          <Text style={styles.subheader}>Select what excites you most</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          {hobbies.map(hobby => (
            <HobbyCard
              key={hobby.id}
              onChevronPress={() => {
                console.log('press');
                Alert.alert("fdj")
                navigation.navigate('LevelSelect', {hobby: hobby.id});
              }}
              hobby={hobby}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerContainer: {
    paddingVertical: 24,
    paddingHorizontal: 8,
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 4,
  },
  subheader: {
    fontSize: 16,
    color: '#636E72',
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
