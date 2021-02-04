import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from "./CourseForm";
import { newCourse } from "../../tools/mockData";

function ManageCoursePage({ courses, authors, loadCourses, loadAuthors, saveCourse, history, ...props }) { //we are getting some of these props from mapDispatchToProps

    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            });
        } else {
            setCourse({ ...props.course })
        }
        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            });
        }
    }, [props.course]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }));//you can pass an object or a function to set state
    }

    function handleSave(event) {
        event.preventDefault();
        // debugger;
        saveCourse(course).then(() => {
            history.push("/courses");
        });
    }

    return <CourseForm course={course} error={errors} authors={authors} onChange={handleChange} onSave={handleSave} />
}

ManageCoursePage.propTypes = {

    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

const mapDispatchToProps = {    //simpler way to use mapDispatchToProps. Dispatch is automatically injected to to the action creators 

    loadCourses,
    loadAuthors,
    saveCourse
}

export const getCourseBySlug = (courses, slug) => courses.find(course => course.slug === slug) || null;

function mapStateToProps(state, ownProps) { //ownProps is used to get the parameters from the URL, this provided by Redux

    const slug = ownProps.match.params.slug;
    const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;
    return {
        course,
        courses: state.courses,
        authors: state.authors
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
//we have an option not to use mapDispatchToProps, so that manually we can dispatch an action.
//when we dont use it, the dispatch prop gets injected automatically, which can be used to dispatch our actions