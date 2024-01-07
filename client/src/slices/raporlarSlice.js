// redux/makinelerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const raporlarSlice = createSlice({
  name: 'raporlar',
  initialState: {
    data:null
},
  reducers: {
    setRaporlar: (state,action) => {
      state.data = action.payload;
      
    },
  },
});

export const { setRaporlar } = raporlarSlice.actions;
export default raporlarSlice.reducer;