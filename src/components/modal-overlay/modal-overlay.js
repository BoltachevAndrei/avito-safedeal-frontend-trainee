import React from 'react';
import ReactDOM from 'react-dom';

const ModalOverlay = () => {
  return ReactDOM.createPortal(
    <div className="modal-overlay"></div>,
    document.getElementById(`root-modal`)
  )
};

export default ModalOverlay;