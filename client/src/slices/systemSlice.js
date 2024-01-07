// redux/makinelerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const systemSlice = createSlice({
  name: 'system',
  initialState: {
    data:null,
    server:false,
},
  reducers: {
    setSituationTrue: (state) => {
      state.server = true;
    },
    setSituationFalse: (state) => {
        state.server = false;
    },
  },
});

export const { setSituationTrue, setSituationFalse  } = systemSlice.actions;
export default systemSlice.reducer;