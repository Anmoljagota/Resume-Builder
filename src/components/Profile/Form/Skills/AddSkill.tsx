import { twMerge } from "tailwind-merge";

import { MdOutlineAdd } from "react-icons/md";

const AddSkillColor = {
  light: {
    borderColor: "#D9D9D9",
    color: "#D9D9D9",
  },
  dark: {},
};

const AddSkill = ({ onClick, style }: { onClick: () => void; style?: React.CSSProperties }) => {
  const mode = "light";
  return (
    <div
      className={twMerge(
        "xs:h-[42px] xs:w-[42px] h-8 w-8 rounded-full flex justify-center items-center cursor-pointer",
        `border-2 border-solid border-[${AddSkillColor[mode].borderColor}]`
      )}
      onClick={onClick}
      style={style}
    >
      <MdOutlineAdd className="xs:h-6 xs:w-6 h-4 w-4" color={AddSkillColor[mode].color} />
    </div>
  );
};
export default AddSkill;
1;
