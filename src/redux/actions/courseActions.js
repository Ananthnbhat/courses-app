import * as actionTypes from './actionTypes';

export function createCourse(course) {
    // debugger;
    return { type: actionTypes.CREATE_COURSE, course };
}
