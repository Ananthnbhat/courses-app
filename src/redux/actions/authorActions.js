import * as actionTypes from './actionTypes';
import * as authorApi from '../../api/authorApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadAuthorsSuccess(authors) {
    return { type: actionTypes.LOAD_AUTHORS_SUCCESS, authors }
}

export function loadAuthors() {
    // debugger;
    return function (dispatch) {
        dispatch(beginApiCall());
        return authorApi.getAuthors()
            .then(authors => {
                dispatch(loadAuthorsSuccess(authors))
            })
            .catch(err => {
                dispatch(apiCallError(err))
                throw err
            })
    }
}
