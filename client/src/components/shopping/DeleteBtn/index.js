import React from "react";

// The ...props means, spread all of the passed props onto this element
function DeleteBtn(props) {
  return (
    <span {...props} role="button" tabIndex="0">
      ✗
    </span>
  );
}

export default DeleteBtn;
