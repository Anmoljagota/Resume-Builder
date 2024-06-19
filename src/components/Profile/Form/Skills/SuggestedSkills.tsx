"use client";
const SuggestedSkillColor = {
  light: {
    heading: "#2E1971",
    skill: {
      background: "#F1E4FF",
      color: "#2E1971",
    },
  },
  dark: {
    heading: "#2E1971",
    skill: {
      background: "#F1E4FF",
      color: "#2E1971",
    },
  },
};
interface ISuggestedSkillProps {
  skills: string[] | [];
  onClick: (skill: string) => void;
}
const SuggestedSkills = ({ skills, onClick }: ISuggestedSkillProps) => {
  const mode = "light";
  if (skills?.length === 0) {
    return <></>;
  }

  return (
    <div className="my-4">
      <p
        className="text-base font-normal mb-4"
        style={{
          color: SuggestedSkillColor[mode]?.heading,
        }}
      >
        Suggesstions:
      </p>
      <div className="flex justify-start items-center flex-wrap gap-2">
        {skills.map((skill: string, index: number) => (
          <button
            type="button"
            key={index}
            className="flex items-center justify-center h-12 rounded-md"
            style={{
              backgroundColor: SuggestedSkillColor[mode]?.skill.background,
            }}
            onClick={() => onClick(skill)}
          >
            <p
              className="text-sm font-normal px-5 py-4"
              style={{
                color: SuggestedSkillColor[mode]?.heading,
              }}
            >
              {skill}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
export default SuggestedSkills;
