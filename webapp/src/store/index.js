import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth_slice';
import authSlice from './auth_slice';
import {applicationsReducer} from './applications_slice';

const store = configureStore({
    reducer: {auth: authSlice, applications: applicationsReducer },
})

export default store;
