import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {
        case actionTypes.CREATE_COURSE_SUCCESS:
            return [...state, { ...action.newCourse }];
        case actionTypes.UPDATE_COURSE_SUCCESS:
            return state.map(course => course.id === action.course.id ? action.course : course);
        case actionTypes.LOAD_COURSES_SUCCESS:
            return action.courses;
        default:
            return state;
    }

}