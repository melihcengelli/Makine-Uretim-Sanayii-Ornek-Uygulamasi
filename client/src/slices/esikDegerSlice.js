// redux/makinelerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const esikDegerSlice = createSlice({
  name: 'esikdegerler',
  initialState: {
    data:null,
},
  reducers: {
    changeEsikDeger: (state,action) => {
      state.spindle_sicakligi_esik_deger = action.payload.spindle_sicakligi_esik_deger;
      state.spindle_zorlanmasi_esik_deger = action.payload.spindle_zorlanmasi_esik_deger;
      state.sicaklik_esik_deger = action.payload.sicaklik_esik_deger;
      state.titresim_esik_deger = action.payload.titresim_esik_deger;
    },
    setEsikDeger: (state,action) => {
      state.data = action.payload
    },
  },
});

export const { changeEsikDeger, setEsikDeger } = esikDegerSlice.actions;
export default esikDegerSlice.reducer;