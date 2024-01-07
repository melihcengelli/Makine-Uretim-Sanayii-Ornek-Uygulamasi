// redux/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    title:'',
    text:'',
    situation:false,
    button_close_text:'Kapat',
    button_accept_text:'Onayla',
    icon:'bi-info',
    duty:null,
    data:null,
  },
  reducers: {
    modalOpen: (state,action) => {
      state.situation = action.payload.situation;
      state.title = action.payload.title;
      state.text = action.payload.text;
      state.button_close_text = action.payload.button_close_text;
      state.button_accept_text = action.payload.button_accept_text;
      state.icon = action.payload.icon;
      state.duty = action.payload.duty;
      state.data = action.payload.data;
    },
    modalClose: (state) => {
        state.situation = false;
        state.title = '';
        state.text = '';
        state.button_close_text = 'Kapat';
        state.button_accept_text = 'Onayla';
        state.icon = 'bi-info';
        state.duty = '';
    },
  },
});

export const { modalOpen, modalClose } = modalSlice.actions;
export default modalSlice.reducer;