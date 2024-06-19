const Chip = ({ label, onClick, selected = false }: { label: string; onClick: () => void; selected?: boolean }) => {
  return (
    <button
      className="py-1 px-2 rounded-full border-2 border-[#00c853] "
      onClick={onClick}
      style={{
        backgroundColor: selected ? "#00c853" : "#fff",
        color: selected ? "#fff" : "#00c853",
      }}
    >
      {label}
    </button>
  );
};
export default Chip;
