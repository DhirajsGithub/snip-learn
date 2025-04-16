import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type HobbyState = {
  selected: 'chess' | 'poker' | 'guitar' | null;
  level: 'casual' | 'enthusiast' | 'pro' | null;
};

const initialState: HobbyState = {
  selected: null,
  level: null,
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
  },
});

export const {setHobby, setLevel} = hobbySlice.actions;
export default hobbySlice.reducer;
