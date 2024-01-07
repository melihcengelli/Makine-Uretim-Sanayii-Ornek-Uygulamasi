// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../slices/modalSlice';
import makinelerReducer from '../slices/makinelerSlice';
import esikDegelerReducer from '../slices/esikDegerSlice';
import raporlarReducer from '../slices/raporlarSlice';
import sonuclarReducer from '../slices/sonuclarSlice';
import grafik1Reducer from '../slices/grafik1Slice';
import systemReducer from '../slices/systemSlice';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    makineler : makinelerReducer,
    esikdegerler : esikDegelerReducer,
    raporlar : raporlarReducer,
    sonuclar : sonuclarReducer,
    grafik1 : grafik1Reducer,
    system : systemReducer,
  },
});

export default store;