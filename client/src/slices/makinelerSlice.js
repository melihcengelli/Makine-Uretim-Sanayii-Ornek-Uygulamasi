// redux/makinelerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const makinelerSlice = createSlice({
  name: 'makineler',
  initialState: {
    data:null
},
  reducers: {
    setMakineler: (state,action) => {
      state.data = action.payload
    },
    newMeasurement: (state,action) => {
      state.data = action.payload
    },
  },
});

export const { setMakineler,newMeasurement } = makinelerSlice.actions;
export default makinelerSlice.reducer;