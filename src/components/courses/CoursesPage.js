import React from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CoureList from './CourseList'

class CoursesPage extends React.Component {

    componentDidMount() {

        const { courses, authors, actions } = this.props;

        if (courses.length === 0) {
            actions.loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            });
        }
        if (authors.length === 0) {
            actions.loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            });
        }
    }

    render() {
        return (
            <>
                <h2>Courses</h2>
                <CoureList courses={this.props.courses} />
            </>
        )
    }
}

CoursesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }
    };
}

function mapStateToProps(state) {

    return {
        courses:
            state.authors.length === 0 ?
                [] : state.courses.map(course => {
                    return {
                        ...course,
                        authorName: state.authors.find(a => a.id === course.authorId).name
                    };
                }),
        authors: state.authors
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
//we have an option not to use mapDispatchToProps, so that manually we can dispatch an action.
//when we dont use it, the dispatch prop gets injected automatically, which can be used to dispatch our actions