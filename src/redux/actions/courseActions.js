import * as actionTypes from './actionTypes';
import * as courseApi from '../../api/courseApi';

export function createCourse(course) {
    // debugger;
    return { type: actionTypes.CREATE_COURSE, course };
}

export function loadCoursesSuccess(courses) {
    return { type: actionTypes.LOAD_COURSES_SUCCESS, courses }
}
//loadCoursesFailure
//loadCoursesError

export function loadCourses() {     //this is a thunk
    // debugger;
    return function (dispatch) {    //every thunk returns a function which accepts dispatch as it's argument
        return courseApi.getCourses()
            .then(courses => {
                dispatch(loadCoursesSuccess(courses))
            })
            .catch(err => { throw err })
    }
}
