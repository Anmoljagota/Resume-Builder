import { Modal } from "flowbite-react";
import React, { useRef } from "react";
import ClickableDiv from "../miniComponents/ClickableDiv";
import VariantButton from "@/components/common/Button/VariantButton";
import TextAreaComponent from "@/components/common/InputComponent/TextAreaComponent";

interface IResumeRequestModalProps {
  onClick: (value?: string) => void;
  isProcessing: boolean;
  disabled: boolean;
  buttonLabel: string;
}

const ResumeRequestModal = ({ onClick, disabled, isProcessing, buttonLabel }: IResumeRequestModalProps) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const textRef = useRef("");

  return (
    <div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Enter the changes you want to request</Modal.Header>
        <Modal.Body className="text-black">
          <div className="flex flex-col gap-2">
            <div className="font-semibold">Message</div>
            <TextAreaComponent
              placeholder="Enter the Message"
              name="Feedback-message"
              value={textRef.current}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => (textRef.current = e.target.value)}
              autoFocus={true}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <VariantButton onClick={() => setShowModal(false)} label="Cancel" style={{ backgroundColor: "red" }} />
          <VariantButton
            loading={isProcessing}
            label="Send"
            onClick={() => {
              setShowModal(false);
              onClick(textRef.current);
            }}
            style={{
              backgroundColor: "green",
            }}
            type="submit"
          />
        </Modal.Footer>
      </Modal>
      <ClickableDiv onClick={() => setShowModal(true)} label={buttonLabel} loading={isProcessing} />
    </div>
  );
};
export default ResumeRequestModal;
