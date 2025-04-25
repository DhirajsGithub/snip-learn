import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../theme';
import Header from '../components/common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLevelKey} from '../utils/localStorage.Utils';
import {useSelector} from 'react-redux';
import Button from '../components/Button';

type Props = {
  navigation: any;
};

const ICON_OPTIONS = [
  'lightbulb-on',
  'numeric-1-circle', // Level 1
  'numeric-2-circle', // Level 2
  'numeric-3-circle', // Level 3
  'star-outline', // Beginner
  'star-half', // Intermediate
  'star', // Advanced
  'medal-outline', // Basic achievement
  'medal', // Major achievement
  'trophy-outline', // Amateur
  'trophy', // Professional
  'lightning-bolt', // Quick progress
  'turtle', // Slow & steady
  'rocket', // Fast track
  'target', // Focused
  'chart-line', // Growth oriented
];

const CustomLevelScreen = ({navigation}: Props) => {
  const {hobbyDetails} = useSelector(
    (state: {hobby: HobbyState}) => state.hobby,
  );
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [timeCommitment, setTimeCommitment] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('lightbulb-on');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const STORAGE_KEY = getLevelKey(hobbyDetails?.id || '');
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length > 100) {
      newErrors.description = 'Description should be less than 100 characters';
    }

    if (!timeCommitment.trim()) {
      newErrors.timeCommitment = 'Time commitment is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const saveCustomLevel = async (level: LevelType) => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      let levels: LevelType[] = [];

      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          levels = parsed;
        }
      }
      levels.unshift(level);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(levels));
    } catch (error) {
      console.error('Error saving custom level:', error);
    }
  };

  const handleCreate = async () => {
    if (!validateForm()) {
      return;
    }

    const newLevel: LevelType = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      icon: selectedIcon,
      timeCommitment: timeCommitment.trim(),
    };

    await saveCustomLevel(newLevel);
    handleClose();
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Select Hobby Level"
        onBackPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled">
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Level Name</Text>
              <TextInput
                placeholder="E.g., Advanced Meditation"
                placeholderTextColor="#B2BEC3"
                value={name}
                onChangeText={text => {
                  setName(text);
                  if (errors.name) setErrors({...errors, name: ''});
                }}
                style={[styles.input, errors.name ? styles.inputError : null]}
                maxLength={30}
              />
              {errors.name ? (
                <Text style={styles.errorText}>{errors.name}</Text>
              ) : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                placeholder="Brief description of what this level entails"
                placeholderTextColor="#B2BEC3"
                value={description}
                onChangeText={text => {
                  setDescription(text);
                  if (errors.description)
                    setErrors({...errors, description: ''});
                }}
                style={[
                  styles.input,
                  errors.description ? styles.inputError : null,
                  styles.textArea,
                ]}
                multiline
                scrollEnabled={false}
                numberOfLines={3}
                maxLength={100}
              />
              <Text style={styles.charCount}>{description.length}/100</Text>
              {errors.description ? (
                <Text style={styles.errorText}>{errors.description}</Text>
              ) : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Time Commitment</Text>
              <TextInput
                placeholder="E.g., 5 hrs/week"
                placeholderTextColor="#B2BEC3"
                value={timeCommitment}
                onChangeText={text => {
                  setTimeCommitment(text);
                  if (errors.timeCommitment)
                    setErrors({...errors, timeCommitment: ''});
                }}
                style={[
                  styles.input,
                  errors.timeCommitment ? styles.inputError : null,
                ]}
              />
              {errors.timeCommitment ? (
                <Text style={styles.errorText}>{errors.timeCommitment}</Text>
              ) : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Choose Icon</Text>
              <View style={styles.iconGrid}>
                {ICON_OPTIONS.map(icon => (
                  <TouchableOpacity
                    key={icon}
                    style={[
                      styles.iconOption,
                      selectedIcon === icon ? styles.selectedIconOption : null,
                    ]}
                    onPress={() => setSelectedIcon(icon)}>
                    <Icon
                      name={icon}
                      size={24}
                      color={
                        selectedIcon === icon ? COLORS.white : COLORS.action
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.button}>
        <Button
          title="Create Level"
          onPress={handleCreate}
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
  keyboardAvoidView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.title,
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  rightSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  formContainer: {
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.title,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.title,
    backgroundColor: '#F9F9F9',
  },
  inputError: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFEDED',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#B2BEC3',
    textAlign: 'right',
    marginTop: 4,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  iconOption: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 12,
    backgroundColor: '#F9F9F9',
  },
  selectedIconOption: {
    backgroundColor: COLORS.action,
    borderColor: COLORS.action,
  },
  buttonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: COLORS.bg1,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
});

export default CustomLevelScreen;
