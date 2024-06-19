"use client";

import { Button, Modal } from "flowbite-react";

export default function CustomModal({ openModal, setOpenModal, headerText, jsxModalContent, showFooter }: any) {
  return (
    <>
      <Modal show={openModal === "default"} onClose={() => setOpenModal(undefined)}>
        {headerText && <Modal.Header>{headerText}</Modal.Header>}
        <Modal.Body>
          <div className="space-y-6">{jsxModalContent}</div>
        </Modal.Body>
        {showFooter && (
          <Modal.Footer>
            <Button onClick={() => setOpenModal(undefined)}>Close</Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}
