import React from "react";
import Modal from "react-modal";

interface IModalComponentProps {
  showModal: boolean;
  setShowModal: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  width?: string;
  backgroundColor?: string;
}
const ModalComponent = ({
  showModal,
  setShowModal,
  header,
  footer,
  children,
  width,
  backgroundColor,
}: IModalComponentProps) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: backgroundColor || "#fff",
      border: "none",
      width: width || "100%",
    },
    overlay: {
      zIndex: 1000,
      backgroundColor: "rgba(100,100,100,0.78)",
    },
  };

  React.useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <div id="modal">
      <Modal isOpen={showModal} onRequestClose={setShowModal} style={customStyles} contentLabel="Example Modal">
        {header}
        {children}
        {footer}
      </Modal>
    </div>
  );
};
export default ModalComponent;
