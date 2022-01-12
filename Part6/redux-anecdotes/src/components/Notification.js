import React from "react";
// import { useSelector } from "react-redux";
import { connect } from 'react-redux'


const Notification = (props) => {
  // const notification = useSelector((state) => state.notifications);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: props.notifications.display,
  };
  return <div style={style}>{props.notifications.message}</div>;
};

const mapStateToProps = (state) => {
  // console.log("state inside mapStateToProps: ", state)
  return {
    notifications: state.notifications,
  }
}
export default connect(mapStateToProps)(Notification);
