import * as actionTypes from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall } from './apiStatusActions';

export function loadCoursesSuccess(courses) {
    return { type: actionTypes.LOAD_COURSES_SUCCESS, courses }
}

export function updateCourseSuccess(course) {
    return { type: actionTypes.UPDATE_COURSE_SUCCESS, course }
}

export function createCourseSuccess(newCourse) {

    return { type: actionTypes.CREATE_COURSE_SUCCESS, newCourse }
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
            .catch(err => { throw err })
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
            .catch(err => { throw err; });
    };
}