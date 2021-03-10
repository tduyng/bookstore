import { createSlice } from '@reduxjs/toolkit';
import { IUiReducer } from './ui.types';

const initialState: IUiReducer = {
  sideBar: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSideBar(state) {
      state.sideBar = !state.sideBar;
    },
  },
});

export const { toggleSideBar } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
