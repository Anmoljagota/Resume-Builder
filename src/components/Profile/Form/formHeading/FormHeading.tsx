import { twMerge } from "tailwind-merge";

const PersonalDetailsColors = {
  light: {
    heading: {
      color: "#2E1971",
    },
  },
  dark: {},
};

const FormHeading = ({ label, style }: { label: string; style?: React.CSSProperties }) => {
  const mode = "light";
  return (
    <p
      className={twMerge(
        `font-medium tracking-normal`,
        `text-[${PersonalDetailsColors[mode]["heading"]?.color}]`,
        `md:text-3xl sm:text-2xl xs:text-xl sxs:text-lg text-sm`
      )}
      style={{
        color: PersonalDetailsColors[mode]["heading"]?.color,
        ...style,
      }}
    >
      {label}
    </p>
  );
};
export default FormHeading;
