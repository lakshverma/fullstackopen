import React from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  const parts = course.parts;
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  // const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return <p>Number of exercises {total}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  const parts = course.parts;

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
