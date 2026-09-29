import { X } from "lucide-react";

function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className = "",
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`customer-modal ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        {(title || description) && (
          <div className="add-modal-header">
            <div>
              {title && <h2>{title}</h2>}
              {description && <p>{description}</p>}
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default Modal;
