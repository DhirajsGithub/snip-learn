import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type HobbyState = {
  selected: 'chess' | 'poker' | 'guitar' | null;
  level: 'casual' | 'enthusiast' | 'pro' | null;
  hobbyDetails: any;
};

const initialState: HobbyState = {
  selected: null,
  level: null,
  hobbyDetails: null,
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
  },
});

export const {setHobby, setLevel, setHobbyDetails} = hobbySlice.actions;
export default hobbySlice.reducer;
