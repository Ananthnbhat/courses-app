import * as actionTypes from './actionTypes';
import * as authorApi from '../../api/authorApi';

export function loadAuthorsSuccess(authors) {
    return { type: actionTypes.LOAD_AUTHORS_SUCCESS, authors }
}

export function loadAuthors() {
    // debugger;
    return function (dispatch) {
        return authorApi.getAuthors()
            .then(authors => {
                dispatch(loadAuthorsSuccess(authors))
            })
            .catch(err => { throw err })
    }
}
