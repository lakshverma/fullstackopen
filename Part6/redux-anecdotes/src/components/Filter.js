import React from "react";
import { connect } from 'react-redux'
import { handleInputChange } from "../reducers/filterReducer";
// import { useDispatch } from "react-redux";

const Filter = (props) => {
//   const dispatch = useDispatch();
  const style = {
    marginBottom: 10,
  };

  const handleChange = (event) => {
    const input = event.target.value;
    props.handleInputChange(input);
  };
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default connect(
    null,
    { handleInputChange }
)(Filter);
