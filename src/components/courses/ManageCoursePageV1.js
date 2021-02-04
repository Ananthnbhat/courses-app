import React from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';

class ManageCoursePageV1 extends React.Component {

    componentDidMount() {

        const { courses, authors, loadCourses, loadAuthors } = this.props;

        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            });
        }
        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            });
        }
    }

    render() {
        return (
            <>
                <h2>Manage Course</h2>
            </>
        )
    }
}

ManageCoursePageV1.propTypes = {

    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
}

const mapDispatchToProps = {    //simpler way to use mapDispatchToProps. Dispatch is automatically injected to to the action creators 

    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors
}

function mapStateToProps(state) {

    return {
        courses: state.courses,
        authors: state.authors
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePageV1);
//we have an option not to use mapDispatchToProps, so that manually we can dispatch an action.
//when we dont use it, the dispatch prop gets injected automatically, which can be used to dispatch our actions