import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";


const applicationsSlice = createSlice({
    name: 'applications',
    initialState : {applications:[]},
    reducers : {
        fetchApplications(state,action) {
            state.applications = action.payload.applications;
        }
    },
});

export const applicationsActions = applicationsSlice.actions;


export const fetchStudentApplications=(studentId)=>{
    return async (dispatch) =>{

            const getStudentApplications = async ()=>{
                const response = await axios.get(`http://localhost:9000/applications?studentId=${studentId}`);
                return response.data;
            }

            try {
              const applications = await getStudentApplications();
              dispatch(
                  applicationsActions.fetchApplications({
                      applications})
              );
            }
            catch(err){
                console.error(err);
            }
    }
}

export const applicationsReducer = applicationsSlice.reducer; 