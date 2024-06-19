import { RxCrossCircled } from "react-icons/rx";
const DeleteButton = ({ onDelete }: { onDelete: React.MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button
      className="bg-none border-none flex justify-center items-center text-[#FF8484] gap-x-2"
      type="button"
      onClick={onDelete}
    >
      <p>Remove</p>
      <RxCrossCircled color="#FF8484" className="w-5 h-6" />
    </button>
  );
};
export default DeleteButton;
