import React from 'react';
import {configureStore, createSlice} from '@reduxjs/toolkit';

// const initialAuthState = {isAuthenticated: true, loggedInStudent:[]};

const authSlice = createSlice({
    name:'authentication',
    initialState: {isAuthenticated: false, user:[]},
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
})


export const authActions = authSlice.actions;

export const userSelector = state => state.user;

export default authSlice.reducer;