// redux/makinelerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const sonuclarSlice = createSlice({
  name: 'sonuclar',
  initialState: {
    data:null
},
  reducers: {
    setSonuclar: (state,action) => {
      state.data = action.payload;
      
    },
  },
});

export const { setSonuclar } = sonuclarSlice.actions;
export default sonuclarSlice.reducer;