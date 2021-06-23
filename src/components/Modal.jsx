import React, { Fragment } from "react";
import ReactDom from "react-dom";

// Styling
import "../App.css";

const ModalOverlay = function (props) {
  return <div className="modal-container">{props.children}</div>;
};

const Backdrop = function (props) {
  return <div className="backdrop">{props.children}</div>;
};

const portalEntry = document.getElementById("modal");

function Modal(props) {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalEntry
      )}
      {ReactDom.createPortal(<Backdrop></Backdrop>, portalEntry)}
    </Fragment>
  );
}

export default Modal;
