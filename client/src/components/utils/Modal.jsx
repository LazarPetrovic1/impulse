import React, { useEffect } from 'react';

function Modal({ title, children, show, onClose, provideOwnClosure }) {
  const closeOnEscapeDown = (e) => (e.charCode || e.keyCode) === 27 && onClose()
  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeDown)
    return () => document.body.removeEventListener('keydown', closeOnEscapeDown)
    // eslint-disable-next-line
  }, [])
  if (!show) return null
  return (
    <div
      className="modal "
      style={{
        display: show ? "block" : "none",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        pointerEvents: 'all'
      }}
      tabIndex="-1"
      role="dialog"
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#111" }}>
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">
                <i className="fas fa-times text-danger" />
              </span>
            </button>
          </div>
          <div className="modal-body" style={{ backgroundColor: "#111" }}>
            {children}
          </div>
          {!provideOwnClosure && (
            <div className="modal-footer" style={{ backgroundColor: "#111" }}>
              <button type="button" className="btn btn-outline-danger" data-dismiss="modal" onClick={onClose}><i className="fas fa-ban pr-2" /> Close</button>
              <button type="button" className="btn btn-outline-primary"><i className="fas fa-save pr-2" /> Save changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal;
