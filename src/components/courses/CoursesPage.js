import React from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';

class CoursesPage extends React.Component {

    state = {
        course: {
            title: ""
        }
    }
    handleChange = event => {
        const course = { ...this.state.course, title: event.target.value };
        this.setState({ course });
    }
    handleSubmit = event => {
        event.preventDefault();
        // debugger;
        this.props.dispatch(courseActions.createCourse(this.state.course));
        // this.props.createCourse(this.state.course);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Courses</h2>
                <h3>Add Course</h3>
                <input type="text" onChange={this.handleChange} value={this.state.course.title} />
                <input type="submit" value="Save" />
                {
                    this.props.courses.map(course => (
                        <div key={course.title}>{course.title}</div>
                    ))
                }
            </form>
        )
    }
}

CoursesPage.propTypes = {
    createCourse: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired
}

// function mapDispatchToProps(dispatch) {
//     return {
// createCourse: course => dispatch(courseActions.createCourse(course))
// createCourse: bindActionCreators((courseActions, dispatch))
//     };
// }

function mapStateToProps(state) {
    // debugger;
    return {
        courses: state.courses
    }
}
export default connect(mapStateToProps)(CoursesPage);
//we have an option not to use mapDispatchToProps, so that manually we can dispatch an action.
//when we dont use it, the dispatch prop gets injected automatically, which we can use to dispatch our actions