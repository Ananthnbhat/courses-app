import * as actionTypes from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadCoursesSuccess(courses) {
    return { type: actionTypes.LOAD_COURSES_SUCCESS, courses }
}

export function updateCourseSuccess(course) {
    return { type: actionTypes.UPDATE_COURSE_SUCCESS, course }
}

export function createCourseSuccess(newCourse) {

    return { type: actionTypes.CREATE_COURSE_SUCCESS, newCourse }
}

export function deleteCourseOptimistic(course) {

    return { type: actionTypes.DELETE_COURSE_OPTIMISTIC, course }
}
//loadCoursesFailure
//loadCoursesError

export function loadCourses() {     //this is a thunk
    // debugger;
    return function (dispatch) {    //every thunk returns a function which accepts dispatch as it's argument
        dispatch(beginApiCall());
        return courseApi.getCourses()
            .then(courses => {
                dispatch(loadCoursesSuccess(courses))
            })
            .catch(err => {
                dispatch(apiCallError(err))
                throw err
            })
    }
}

export function saveCourse(course) {
    // debugger;
    return (dispatch, getState) => {
        dispatch(beginApiCall());
        return courseApi.saveCourse(course)
            .then(savedCourse => {
                // debugger;
                course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse));
            })
            .catch(err => {
                dispatch(apiCallError(err))
                throw err;
            });
    };
}

export function deleteCourse(course) {
    // debugger;
    return (dispatch) => {
        dispatch(deleteCourseOptimistic(course));
        return courseApi.deleteCourse(course.id);
    };
}