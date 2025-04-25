import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hobbyData from '../assets/data.json';
import { getProgressKey } from '../utils/localStorage.Utils';

const hobbies = hobbyData.hobbies;

type HobbyName = Lowercase<(typeof hobbies)[number]['name']>;

const initialState: HobbyState = {
  selected: null,
  level: null,
  hobbyDetails: null,
  levelDetails: null,
  learningPath: [],
  progress: {},
};

export const hobbySlice = createSlice({
  name: 'hobby',
  initialState,
  reducers: {
    setHobby: (state, action: PayloadAction<HobbyName | null>) => {
      state.selected = action.payload;
    },
    setLevel: (
      state,
      action: PayloadAction<'casual' | 'enthusiast' | 'pro' | null>,
    ) => {
      state.level = action.payload;
    },
    setHobbyDetails: (state, action: PayloadAction<HobbyType | null>) => {
      state.hobbyDetails = action.payload;
    },
    setLevelDetails: (state, action: PayloadAction<LevelType | null>) => {
      state.levelDetails = action.payload;
    },
    setLearningPath: (state, action: PayloadAction<any[]>) => {
      state.learningPath = action.payload;
    },
    setProgress: (
      state,
      action: PayloadAction<
        Record<
          string,
          {
            completed: boolean;
            skipped: boolean;
            progress: number;
          }
        >
      >,
    ) => {
      state.progress = action.payload;
    },
    updateProgress: (
      state,
      action: PayloadAction<{
        techniqueId: string;
        progress: {
          completed?: boolean;
          skipped?: boolean;
          progress?: number;
        };
      }>,
    ) => {
      const {techniqueId, progress} = action.payload;
      state.progress[techniqueId] = {
        ...state.progress[techniqueId],
        ...progress,
      };

      // Save to AsyncStorage after updating the state
      if (state.hobbyDetails && state.levelDetails) {
        const storageKey = getProgressKey(state.hobbyDetails?.id, state.levelDetails?.id);
        AsyncStorage.setItem(storageKey, JSON.stringify(state.progress)).catch(
          error => {
            console.error('Failed to save progress to AsyncStorage:', error);
          },
        );
      }
    },
  },
});

export const {
  setHobby,
  setLevel,
  setLevelDetails,
  setHobbyDetails,
  setLearningPath,
  setProgress,
  updateProgress,
} = hobbySlice.actions;
export default hobbySlice.reducer;
