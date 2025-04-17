import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
    },
  },
});

export const {
  setHobby,
  setLevel,
  setHobbyDetails,
  setLearningPath,
  updateProgress,
} = hobbySlice.actions;
export default hobbySlice.reducer;