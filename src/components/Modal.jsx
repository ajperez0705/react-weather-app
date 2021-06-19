import React, { Fragment } from "react";
import ReactDom from "react-dom";

const ModalOverlay = function (props) {
  return <div className="modal-container">{props.children}</div>;
};

function Modal(props) {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("modal")
      )}
    </Fragment>
  );
}

export default Modal;
