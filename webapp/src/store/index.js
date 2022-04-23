import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth_slice';
import authSlice from './auth_slice';

const store = configureStore({
    reducer: {auth: authSlice },
})

export default store;
