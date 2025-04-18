import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HobbyState = {
  selected: 'chess' | 'poker' | 'guitar' | null;
  level: 'casual' | 'enthusiast' | 'pro' | null;
  hobbyDetails: any;
  learningPath: any[];
  progress: Record<string, {
    completed: boolean;
    skipped: boolean;
    progress: number;
  }>;
};

const initialState: HobbyState = {
  selected: null,
  level: null,
  hobbyDetails: null,
  learningPath: [],
  progress: {},
};

export const hobbySlice = createSlice({
  name: 'hobby',
  initialState,
  reducers: {
    setHobby: (
      state,
      action: PayloadAction<'chess' | 'poker' | 'guitar' | null>,
    ) => {
      state.selected = action.payload;
    },
    setLevel: (
      state,
      action: PayloadAction<'casual' | 'enthusiast' | 'pro' | null>,
    ) => {
      state.level = action.payload;
    },
    setHobbyDetails: (
      state,
      action: PayloadAction<any | null>,
    ) => {
      state.hobbyDetails = action.payload;
    },
    setLearningPath: (
      state,
      action: PayloadAction<any[]>,
    ) => {
      state.learningPath = action.payload;
    },
    setProgress: (
      state,
      action: PayloadAction<Record<string, {
        completed: boolean;
        skipped: boolean;
        progress: number;
      }>>,
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
      if (state.selected && state.level) {
        const storageKey = `PROGRESS_${state.selected}_${state.level}`;
        AsyncStorage.setItem(storageKey, JSON.stringify(state.progress))
          .catch(error => {
            console.error('Failed to save progress to AsyncStorage:', error);
          });
      }
    },
  },
});

export const {
  setHobby,
  setLevel,
  setHobbyDetails,
  setLearningPath,
  setProgress,
  updateProgress,
} = hobbySlice.actions;
export default hobbySlice.reducer;