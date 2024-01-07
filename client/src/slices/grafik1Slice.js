// redux/makinelerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const grafik1Slice = createSlice({
  name: 'grafik1',
  initialState: {
    data:null,
},
  reducers: {
    setGrafik1: (state,action) => {
      state.data = action.payload
    },
    
  },
});

export const { setGrafik1 } = grafik1Slice.actions;
export default grafik1Slice.reducer;