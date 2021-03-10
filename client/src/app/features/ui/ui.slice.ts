import { createSlice } from '@reduxjs/toolkit';
import { IUiReducer } from './ui.types';

const initialState: IUiReducer = {
  sideBar: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sideBar = !state.sideBar;
    },
  },
});

export const uiReducer = uiSlice.reducer;
